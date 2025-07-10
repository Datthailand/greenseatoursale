
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { produce } from 'immer';
import * as XLSX from 'xlsx';
import { 
    CostItem, EditableCostItem, StandardCostItem,
    GroupSizeKey, GROUP_SIZES, FinalUsdPrices, ModalState, PriceDict, CurrentPriceDict, LegacyTourSaveData, DayData, ItemLibrary, EditableOption, DetailedProfitSettings, TieredProfitSettings, ProfitSetting, FullTourSaveData
} from './types';
import { tourData as staticTourData, profitSettingRanges, exportToXlsx, formatCurrency, saveTourData } from './services/geminiService';
import QuoteForm from './components/QuoteForm';
import QuoteDisplay from './components/QuoteDisplay';


// --- Modal Components (defined in App.tsx to avoid creating new files) ---

const BaseModal: React.FC<{ show: boolean; onClose: () => void; children: React.ReactNode; size?: '2xl' | '4xl' | '5xl' }> = ({ show, onClose, children, size = '2xl' }) => {
  if (!show) return null;
  const sizeClass = {
      '2xl': 'max-w-2xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl'
  }[size];
  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={`modal-content relative w-full ${sizeClass} p-8 rounded-2xl`} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-white">&times;</button>
        {children}
      </div>
    </div>
  );
};


const EditItemModal: React.FC<{
    item: EditableCostItem;
    onClose: () => void;
    onApply: (selectedOptionId: string, updatedPrices: { [optionId: string]: number }) => void;
}> = ({ item, onClose, onApply }) => {
    const [localPrices, setLocalPrices] = useState(() => 
        item.options.reduce((acc, option) => {
            acc[option.id] = option.prices['8 khách'];
            return acc;
        }, {} as { [key: string]: number })
    );
    const [selectedId, setSelectedId] = useState(item.selected_option_id);

    const handlePriceChange = (optionId: string, price: number) => {
        setLocalPrices(prev => ({ ...prev, [optionId]: price }));
    };
    
    const handleApply = () => {
        onApply(selectedId, localPrices);
        onClose();
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Chỉnh sửa: {item.category}</h3>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {item.options.map(option => (
                    <div key={option.id} onClick={() => setSelectedId(option.id)} className={`modal-option p-4 rounded-lg cursor-pointer transition flex items-center justify-between ${selectedId === option.id ? 'bg-blue-900/70 border border-blue-400' : 'bg-gray-800/50 border border-transparent hover:bg-gray-700/50'}`}>
                        <label className="flex items-center text-lg text-gray-200 cursor-pointer">
                            <input type="radio" name="itemOption" value={option.id} checked={selectedId === option.id} onChange={() => {}} className="mr-4 h-5 w-5 accent-blue-500" />
                            {option.name}
                        </label>
                        <div className="flex items-center gap-2">
                           <input type="number" value={localPrices[option.id]} onChange={e => handlePriceChange(option.id, Number(e.target.value))} className="w-32 p-2 bg-gray-900/70 rounded-md text-right focus:ring-2 focus:ring-green-400 focus:outline-none" />
                           <span className="text-gray-400">VNĐ</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-8">
                <button onClick={handleApply} className="apply-btn bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">Áp dụng</button>
            </div>
        </div>
    );
};

const AddItemModal: React.FC<{
    library: ItemLibrary;
    onClose: () => void;
    onAdd: (newItem: CostItem) => void;
}> = ({ library, onClose, onAdd }) => {
    const [activeTab, setActiveTab] = useState('hotels');

    const handleAddItem = (item: CostItem) => {
        // Use produce to create a deep copy and set defaults to avoid mutation issues
        const newItem = produce(item, draft => {
            // Add a unique identifier to custom added items to prevent key issues
            if (draft.isCustom) {
                (draft as any).customId = Date.now();
            }
            // Set default value for TL cost inclusion
            draft.includeInTlCost = false;
        });
        onAdd(newItem);
    };
    
    const renderLibraryItems = (items: CostItem[]) => (
        <div className="space-y-3">
            {items.map((item, index) => (
                <div key={`${item.category}-${index}-${(item as any).customId || ''}`} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <i className={`${item.icon} text-green-400 w-5 text-center`}></i>
                        <span>{'editable' in item && item.editable ? item.options.find(o => o.id === item.selected_option_id)?.name : item.category}</span>
                    </div>
                    <button onClick={() => handleAddItem(item)} className="bg-blue-500/80 hover:bg-blue-500 text-white font-bold text-xs py-1 px-3 rounded-full transition">Thêm</button>
                </div>
            ))}
        </div>
    );

    const CustomItemCreator = () => {
        const [name, setName] = useState('');
        const [icon, setIcon] = useState('fas fa-plus-circle');
        const [price, setPrice] = useState(0);

        const handleAddCustom = () => {
            if (!name || price < 0) {
                alert("Vui lòng nhập tên và giá hợp lệ.");
                return;
            }
            const prices: PriceDict = {} as PriceDict;
            GROUP_SIZES.forEach(s => prices[`${s} khách`] = price);
            prices['45 khách'] = price;

            handleAddItem({
                category: name,
                icon,
                prices,
                isCustom: true,
            });
            // Clear fields after adding
            setName('');
            setPrice(0);
            setIcon('fas fa-plus-circle');
        };

        return (
             <div className="p-4 bg-gray-800/30 rounded-lg">
                <h4 className="font-semibold text-lg mb-4 text-blue-300">Tạo hạng mục tùy chỉnh mới</h4>
                <div className="space-y-4">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Tên hạng mục (ví dụ: Phí chụp ảnh)" className="w-full p-3 bg-gray-900/70 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"/>
                    <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Giá tiền (VNĐ/người)" className="w-full p-3 bg-gray-900/70 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"/>
                </div>
                <div className="text-right mt-4">
                    <button onClick={handleAddCustom} className="apply-btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition transform hover:scale-105">Thêm mục tùy chỉnh</button>
                </div>
            </div>
        );
    };

    const tabs = [
        { id: 'hotels', name: 'Khách sạn', data: library.hotels },
        { id: 'meals', name: 'Bữa ăn', data: library.meals },
        { id: 'activities', name: 'Vé & Hoạt động', data: library.ticketsAndActivities },
        { id: 'others', name: 'Chi phí khác', data: library.others },
        { id: 'custom', name: 'Tùy chỉnh' },
    ];

    return (
        <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Thêm hạng mục vào tour</h3>
            <div className="flex border-b border-gray-700 mb-4">
                {tabs.map(tab => (
                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-2 px-4 font-semibold transition-colors ${activeTab === tab.id ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'}`}>
                        {tab.name}
                    </button>
                ))}
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-1">
                {activeTab !== 'custom' && renderLibraryItems(tabs.find(t => t.id === activeTab)!.data!)}
                {activeTab === 'custom' && <CustomItemCreator />}
            </div>
        </div>
    );
};

const EditRowModal: React.FC<{
    item: CostItem;
    onClose: () => void;
    onSave: (newPrices: PriceDict) => void;
}> = ({ item, onClose, onSave }) => {
    const getInitialPrices = (item: CostItem): PriceDict => {
        let initialPrices: PriceDict = {} as PriceDict;
        const defaultPrices = GROUP_SIZES.reduce((acc, size) => {
            acc[`${size} khách`] = 0;
            return acc;
        }, {} as PriceDict);
        defaultPrices['45 khách'] = 0;

        if ('editable' in item && item.editable) {
            const selectedOption = item.options.find(opt => opt.id === item.selected_option_id);
            initialPrices = selectedOption?.prices ? { ...defaultPrices, ...selectedOption.prices } : defaultPrices;
        } else if ('prices' in item) {
            initialPrices = { ...defaultPrices, ...item.prices };
        }
        return initialPrices;
    };

    const [prices, setPrices] = useState<PriceDict>(() => getInitialPrices(item));
    const [masterPrice, setMasterPrice] = useState<string>('');

    const handleMasterPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMasterPrice = e.target.value;
        setMasterPrice(newMasterPrice);
        const priceValue = newMasterPrice === '' ? 0 : parseInt(newMasterPrice, 10);
        if (!isNaN(priceValue)) {
            const newPrices = { ...prices };
            GROUP_SIZES.forEach(s => newPrices[`${s} khách`] = priceValue);
            newPrices['45 khách'] = priceValue;
            setPrices(newPrices);
        }
    };
    
    const handleIndividualPriceChange = (key: keyof PriceDict, value: string) => {
        const priceValue = value === '' ? 0 : parseInt(value, 10);
        if (!isNaN(priceValue)) {
            setPrices(prev => ({ ...prev, [key]: priceValue }));
        }
    };
    
    const handleApply = () => {
        onSave(prices);
    };

    const currentItemName = ('editable' in item && item.editable) 
        ? item.options.find(opt => opt.id === item.selected_option_id)?.name 
        : item.category;

    return (
        <div>
            <h3 className="text-2xl font-bold mb-2 text-white">Chỉnh sửa hàng loạt</h3>
            <p className="text-lg text-blue-300 mb-6">{currentItemName}</p>

            <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                <label className="block text-lg font-semibold text-green-300 mb-2">Đặt giá chung</label>
                <p className="text-sm text-gray-400 mb-3">Nhập một giá trị vào đây để cập nhật tất cả các nhóm khách bên dưới.</p>
                <input 
                    type="number"
                    value={masterPrice}
                    onChange={handleMasterPriceChange}
                    placeholder="Nhập giá chung..."
                    className="w-full p-3 bg-gray-900/70 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none text-right"
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[40vh] overflow-y-auto pr-2">
                {[...GROUP_SIZES, 45].map(size => {
                    const key = `${size} khách` as keyof PriceDict;
                    return (
                        <div key={size} className="bg-gray-800/50 p-3 rounded-lg">
                            <label className="block text-sm font-medium text-gray-300 mb-1">{size} khách</label>
                            <input
                                type="number"
                                value={prices[key] || 0}
                                onChange={(e) => handleIndividualPriceChange(key, e.target.value)}
                                className="w-full p-2 bg-gray-900/70 rounded-md text-right focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>
                    );
                })}
            </div>
             <div className="text-center mt-8">
                <button onClick={handleApply} className="apply-btn bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">Áp dụng thay đổi</button>
            </div>
        </div>
    );
};


const ConfirmationModal: React.FC<{ message: string; onConfirm: () => void; onCancel: () => void }> = ({ message, onConfirm, onCancel }) => (
    <div className="text-center">
        <h3 className="text-2xl font-bold mb-6 text-white">{message}</h3>
        <div className="flex justify-center gap-4">
            <button onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition">Không</button>
            <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition">Có, Chắc chắn</button>
        </div>
    </div>
);

const AlertModal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
     <div className="text-center">
        <h3 className="text-xl font-bold mb-6 text-white">{message}</h3>
        <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-12 rounded-full transition">OK</button>
    </div>
);


// --- Main App Component ---

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [itemLibrary, setItemLibrary] = useState<ItemLibrary | null>(null);
    const [tourTitle, setTourTitle] = useState("Tour mới");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [costData, setCostData] = useState<{ [key: string]: DayData }>({ "Ngày 1": [] });
    const [exchangeRate, setExchangeRate] = useState(staticTourData.exchange_rates.usd_to_vnd);
    const [showCustomColumn, setShowCustomColumn] = useState(false);
    const [showTlCostColumn, setShowTlCostColumn] = useState(false);
    const [customGuestCount, setCustomGuestCount] = useState(8);
    const [addOns, setAddOns] = useState<{ [key: string]: number }>({});
    const [modalState, setModalState] = useState<ModalState>({ type: 'none' });
    const [editingCell, setEditingCell] = useState<{ day: string; itemIndex: number; priceKey: `${GroupSizeKey | 45} khách` } | null>(null);
    
    // New unified profit state
    const [profitGroupingMode, setProfitGroupingMode] = useState<'detailed' | 'tiered'>('detailed');

    const initialDetailedSettings = useMemo(() => profitSettingRanges.reduce((acc, range) => {
        let defaultValue = 10; // Default for 20+
        if (range.lookup_guest_count <= 8) defaultValue = 20;
        else if (range.lookup_guest_count <= 10) defaultValue = 15;
        else if (range.lookup_guest_count <= 15) defaultValue = 12;
        acc[range.header] = { mode: 'fixed', value: defaultValue };
        return acc;
    }, {} as DetailedProfitSettings), []);

    const [detailedProfitSettings, setDetailedProfitSettings] = useState<DetailedProfitSettings>(initialDetailedSettings);

    const initialTieredSettings: TieredProfitSettings = {
        under15: { mode: 'fixed', value: 20 },
        over15: { mode: 'fixed', value: 15 },
    };
    const [tieredProfitSettings, setTieredProfitSettings] = useState<TieredProfitSettings>(initialTieredSettings);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const excelInputRef = useRef<HTMLInputElement>(null);

    const parseGoogleSheetCsv = (csvText: string): { [key: string]: any }[] => {
        if (!csvText) return [];
        
        const rows = csvText.trim().split('\n');
        if (rows.length < 2) return [];

        const headers = rows[0].match(/"[^"]*"|[^,]+/g)?.map(h => h.replace(/"/g, '')) || [];

        return rows.slice(1).map(row => {
            const values = row.match(/"[^"]*"|[^,]+/g) || [];
            const obj: { [key: string]: any } = {};
            headers.forEach((header, i) => {
                const value = (values[i] || '').replace(/"/g, '');
                obj[header] = value;
            });
            return obj;
        });
    };

    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const [libraryResponse, sheetResponse] = await Promise.all([
                    fetch('./item-library.json'),
                    fetch('https://docs.google.com/spreadsheets/d/1RU3jggSUKWbi45HYU2UR3S3yBjdpdArK5obL6257lgY/gviz/tq?tqx=out:csv&sheet=SuggestedItems').catch(e => {
                        console.warn("Could not fetch Google Sheet, will use local data as fallback.", e);
                        return null; // Return null on failure to not break Promise.all
                    })
                ]);


                if (!libraryResponse.ok) {
                    throw new Error(`HTTP error! status: ${libraryResponse.status}`);
                }
                const localLibraryData: ItemLibrary = await libraryResponse.json();
                let combinedLibrary = localLibraryData;

                if (sheetResponse && sheetResponse.ok) {
                    const sheetCsvText = await sheetResponse.text();
                    const parsedSheetItems = parseGoogleSheetCsv(sheetCsvText);

                    const sheetMeals: StandardCostItem[] = parsedSheetItems
                        .filter(item => item['Loại'] === 'Bữa ăn' && item['Tên'])
                        .map(item => {
                            const price = parseInt(String(item['Giá_VND'] || '0').replace(/[.,]/g, ''), 10) || 0;
                            
                            const prices: PriceDict = {} as PriceDict;
                            GROUP_SIZES.forEach(s => prices[`${s} khách`] = price);
                            prices['45 khách'] = price;

                            return {
                                category: item['Tên'],
                                icon: item['Biểu tượng'] || 'fas fa-utensils',
                                prices: prices,
                                isCustom: true, // Treat as deletable
                            };
                        });
                    
                    if (sheetMeals.length > 0) {
                        combinedLibrary = {
                            ...localLibraryData,
                            meals: sheetMeals,
                        };
                    }
                }
                
                setItemLibrary(combinedLibrary);

                // Set default tour after library is loaded
                setTourTitle("Shopping miền Trung 3 ngày 2 đêm");

                const defaultHotel = combinedLibrary.hotels[0];
                const mealsSource = combinedLibrary.meals.length > 0 ? combinedLibrary.meals : localLibraryData.meals;
                const defaultMeal1 = mealsSource[0];
                const defaultMeal2 = mealsSource.length > 1 ? mealsSource[1] : mealsSource[0];
                const defaultActivity1 = combinedLibrary.ticketsAndActivities[0];
                const defaultActivity2 = combinedLibrary.ticketsAndActivities[2];

                setCostData({
                    "Ngày 1": [
                        produce(defaultHotel, draft => {}),
                        produce(defaultMeal1, draft => {}),
                        produce(defaultActivity1, draft => {}),
                    ],
                    "Ngày 2": [
                        produce(defaultHotel, draft => {}),
                        produce(defaultMeal2, draft => {}),
                        produce(defaultActivity2, draft => {}),
                    ]
                });
            } catch (error) {
                console.error("Failed to load item library:", error);
                setModalState({ type: 'alert', message: 'Không thể tải thư viện dữ liệu. Vui lòng thử lại.' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchLibrary();
    }, []);

    const getPriceForCustomGuestCount = useCallback((prices: PriceDict | undefined, guestCount: number) => {
        if (!prices || !showCustomColumn || guestCount === 0) return null;
        let priceToUse = 0;
        let foundMatch = false;

        const sortedSizes = [...GROUP_SIZES, 45].sort((a,b) => a-b);

        for (const size of sortedSizes) {
            const key = `${size} khách` as keyof PriceDict;
            if (guestCount <= size && prices[key] !== undefined) {
                priceToUse = prices[key]!;
                foundMatch = true;
                break;
            }
        }
        if (!foundMatch) {
             priceToUse = prices['45 khách'] ?? prices['35 khách'] ?? 0;
        }

        return priceToUse;
    }, [showCustomColumn]);


    const processedCostData = useMemo(() => {
        return produce(costData, (draft: { [key: string]: CostItem[] }) => {
            for (const day in draft) {
                draft[day].forEach(item => {
                    item.current_prices = {} as CurrentPriceDict;
                    if ('editable' in item && item.editable) {
                        const selectedOption = item.options.find(opt => opt.id === item.selected_option_id);
                        if (selectedOption) {
                             item.current_name = selectedOption.name;
                             GROUP_SIZES.forEach(s => item.current_prices![`${s} khách`] = selectedOption.prices[`${s} khách`]);
                             item.current_prices!['45 khách'] = selectedOption.prices['45 khách'];
                             item.current_prices!['custom_khách'] = getPriceForCustomGuestCount(selectedOption.prices, customGuestCount);
                        }
                    } else if ('type' in item && item.type === 'calculated_per_person') {
                        item.current_name = item.category;
                        GROUP_SIZES.forEach(s => {
                            const totalCost = s >= 15 ? item.fixed_total_costs["Xe 45"] : item.fixed_total_costs["Xe 35"];
                            let price = (item.category === "Trưởng đoàn" && s < 15) ? 0 : Math.round(totalCost / s);
                            item.current_prices![`${s} khách`] = price;
                        });
                        const totalCostCustom = customGuestCount >= 15 ? item.fixed_total_costs["Xe 45"] : item.fixed_total_costs["Xe 35"];
                        item.current_prices!['custom_khách'] = (item.category === "Trưởng đoàn" && customGuestCount < 15) ? 0 : showCustomColumn ? Math.round(totalCostCustom / customGuestCount) : null;
                    } else if ('prices' in item) {
                        item.current_name = item.category;
                        GROUP_SIZES.forEach(s => item.current_prices![`${s} khách`] = item.prices[`${s} khách`]);
                        item.current_prices!['45 khách'] = item.prices['45 khách'];
                        item.current_prices!['custom_khách'] = getPriceForCustomGuestCount(item.prices, customGuestCount);
                    }
                });
            }
        });
    }, [costData, customGuestCount, showCustomColumn, getPriceForCustomGuestCount]);

    const { totalsVND, finalUsdPrices } = useMemo(() => {
        const totalsVND: { [key in GroupSizeKey]: number } & { custom: number | null } = { 8:0, 10:0, 15:0, 20:0, 25:0, 30:0, 35:0, custom: 0 };
        for (const day in processedCostData) {
            processedCostData[day].forEach(item => {
                GROUP_SIZES.forEach(size => {
                    totalsVND[size] += item.current_prices?.[`${size} khách`] || 0;
                });
                if (showCustomColumn && totalsVND.custom !== null) {
                    totalsVND.custom += item.current_prices?.['custom_khách'] || 0;
                }
            });
        }
        if (!showCustomColumn) totalsVND.custom = null;

        const finalUsdPrices: FinalUsdPrices = {};
        
        const calculateFinalPrice = (totalVnd: number, guestSize: number): number => {
            if (totalVnd <= 0) return 0;
            const dollarValue = Math.round(totalVnd / exchangeRate);
            
            let profitSetting: ProfitSetting = { mode: 'fixed', value: 0 };

            if (profitGroupingMode === 'detailed') {
                const applicableRange = [...profitSettingRanges].reverse().find(r => guestSize >= r.lookup_guest_count) || profitSettingRanges[0];
                if (applicableRange && detailedProfitSettings[applicableRange.header]) {
                    profitSetting = detailedProfitSettings[applicableRange.header];
                }
            } else { // 'tiered' mode
                profitSetting = guestSize < 15 ? tieredProfitSettings.under15 : tieredProfitSettings.over15;
            }

            if (profitSetting.mode === 'fixed') {
                return dollarValue + profitSetting.value;
            } else { // percentage
                return Math.round(dollarValue * (1 + profitSetting.value / 100));
            }
        };

        GROUP_SIZES.forEach(size => {
            finalUsdPrices[size] = calculateFinalPrice(totalsVND[size], size);
        });

        if (totalsVND.custom !== null) {
             finalUsdPrices.custom = calculateFinalPrice(totalsVND.custom, customGuestCount);
        } else {
            finalUsdPrices.custom = '-';
        }

        return { totalsVND, finalUsdPrices };
    }, [processedCostData, exchangeRate, showCustomColumn, customGuestCount, profitGroupingMode, detailedProfitSettings, tieredProfitSettings]);

    const singleSupplementUSD = useMemo(() => {
        let totalHotelCostVND = 0;
        for (const day in processedCostData) {
            processedCostData[day].forEach(item => {
                if (item.category.includes('Khách sạn')) {
                    totalHotelCostVND += item.current_prices?.['8 khách'] || 0;
                }
            });
        }
        if (totalHotelCostVND === 0) return 0;
        
        return Math.round(totalHotelCostVND / exchangeRate);
    }, [processedCostData, exchangeRate]);

    const tourLeaderCostVND = useMemo(() => {
        let totalCost = 0;
        for (const day in processedCostData) {
            processedCostData[day].forEach(item => {
                if (item.includeInTlCost) {
                    // Use the smallest group size price as the per-person cost,
                    // as it's typically the highest and represents a single person's cost accurately.
                    let price = item.current_prices?.['8 khách'] ?? 0;
                    
                    // If the item is a hotel, double its price to account for the single occupancy surcharge.
                    if (item.category.includes('Khách sạn')) {
                        price *= 2;
                    }

                    totalCost += price;
                }
            });
        }
        return totalCost;
    }, [processedCostData]);

    // --- Tour Management Handlers ---
    const handleNewTour = () => {
        setTourTitle("Tour mới chưa có tên");
        setCostData({ "Ngày 1": [] });
        setExchangeRate(25800);
        setAddOns({});
        setShowCustomColumn(false);
        setModalState({ type: 'none' });
    };

    const handleLoadTourClick = () => fileInputRef.current?.click();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== 'string') throw new Error("File could not be read");
                const data: any = JSON.parse(text);
                
                // Check for new full-save format
                if (data.version === 1 && data.profitSettings) {
                    const fullData = data as FullTourSaveData;
                    setTourTitle(fullData.tourTitle);
                    setCostData(fullData.costData);
                    setExchangeRate(fullData.exchangeRate);
                    setShowCustomColumn(fullData.showCustomColumn);
                    setCustomGuestCount(fullData.customGuestCount);
                    setShowTlCostColumn(fullData.showTlCostColumn ?? false); // Default to false for legacy saves
                    setAddOns(fullData.addOns);
                    setProfitGroupingMode(fullData.profitSettings.mode);
                    setDetailedProfitSettings(fullData.profitSettings.detailed);
                    setTieredProfitSettings(fullData.profitSettings.tiered);

                } else if (data.tourTitle && data.days) {
                    // Handle old legacy format
                    const oldData = data as LegacyTourSaveData;
                    setTourTitle(oldData.tourTitle);
                    setCostData(oldData.days);
                    
                    // Reset other settings to default for old format files
                    setExchangeRate(staticTourData.exchange_rates.usd_to_vnd);
                    setShowCustomColumn(false);
                    setShowTlCostColumn(false);
                    setCustomGuestCount(8);
                    setAddOns({});
                    setProfitGroupingMode('detailed');
                    setDetailedProfitSettings(initialDetailedSettings);
                    setTieredProfitSettings(initialTieredSettings);
                    
                } else {
                    throw new Error("Tệp JSON không hợp lệ hoặc có định dạng không được hỗ trợ.");
                }
                
                setModalState({ type: 'alert', message: 'Tải tour thành công!' });
            } catch (error) {
                const message = error instanceof Error ? error.message : "Đã xảy ra lỗi khi đọc tệp.";
                setModalState({ type: 'alert', message: `Lỗi: ${message}` });
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const handleExcelFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                if (!data) throw new Error("Could not read file");
    
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                // IMPORTANT: Use raw: true to get the underlying numeric or string value, not the formatted text.
                const json: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });
    
                let newTourTitle = "Tour từ file Excel";
                const newCostData: { [key: string]: DayData } = {};
                let headerIndex = -1;
                let currentDay = "";
                const headerKeyMap: { [colIndex: number]: `${GroupSizeKey | 45} khách` } = {};
    
                for(let i = 0; i < Math.min(5, json.length); i++) {
                    const rowStr = String(json[i][0] || '');
                    if (rowStr.includes('Chương Trình Du Lịch')) {
                        const titleMatch = rowStr.match(/"([^"]+)"/);
                        if (titleMatch && titleMatch[1]) {
                            newTourTitle = titleMatch[1];
                            break;
                        }
                    }
                }
                
                for (let i = 0; i < json.length; i++) {
                    const row = json[i];
                    if (row && row.some(cell => String(cell).trim() === "Danh mục")) {
                        headerIndex = i;
                        row.forEach((header, colIndex) => {
                            const match = String(header).trim().match(/^(\d+)/);
                            if (match) {
                                const size = parseInt(match[1]);
                                 if ([...GROUP_SIZES, 45].includes(size)) {
                                    headerKeyMap[colIndex] = `${size as GroupSizeKey | 45} khách`;
                                }
                            }
                        });
                        break;
                    }
                }
                
                if (headerIndex === -1) {
                    throw new Error("Không tìm thấy hàng tiêu đề (header) với cột 'Danh mục'. Vui lòng đảm bảo file Excel có cấu trúc đúng.");
                }
    
                for (let i = headerIndex + 1; i < json.length; i++) {
                    const row = json[i];
                    if (!row || row.length === 0 || !row[0]) continue;
                    
                    const firstCell = String(row[0]).trim();
                    
                    if (firstCell.toLowerCase().startsWith("ngày")) {
                        currentDay = firstCell;
                        if (!newCostData[currentDay]) newCostData[currentDay] = [];
                        continue;
                    }
    
                    if (firstCell.toLowerCase().startsWith("tổng") || firstCell.toLowerCase().startsWith("báo giá")) break;
                    
                    if (!currentDay) {
                       currentDay = "Ngày 1";
                       if (!newCostData[currentDay]) newCostData[currentDay] = [];
                    }
    
                    const prices: PriceDict = {} as PriceDict;
                    GROUP_SIZES.forEach(s => prices[`${s} khách`] = 0);
                    prices['45 khách'] = 0;
    
                    Object.entries(headerKeyMap).forEach(([colIndexStr, priceKey]) => {
                        const colIndex = parseInt(colIndexStr);
                        const priceValue = row[colIndex];
                        let finalPrice = 0;

                        if (typeof priceValue === 'number') {
                            finalPrice = Math.round(priceValue);
                        } else if (typeof priceValue === 'string' && priceValue.trim() !== '') {
                            // For strings, remove any non-digit characters (like currency symbols, thousands separators)
                            const cleanedValue = priceValue.replace(/[^\d]/g, '');
                            if (cleanedValue) {
                                const parsed = parseInt(cleanedValue, 10);
                                if (!isNaN(parsed)) {
                                    finalPrice = parsed;
                                }
                            }
                        }
                        
                        prices[priceKey] = finalPrice;
                    });
    
                    const newItem: StandardCostItem = {
                        category: firstCell,
                        icon: 'fas fa-file-invoice-dollar',
                        prices: prices,
                        isCustom: true,
                        includeInTlCost: false,
                    };
                    
                    newCostData[currentDay].push(newItem);
                }
    
                if (Object.keys(newCostData).length === 0 || Object.values(newCostData).every(day => day.length === 0)) {
                     throw new Error("Không tìm thấy dữ liệu hạng mục chi phí nào trong file Excel. Vui lòng kiểm tra lại file.");
                }
    
                setTourTitle(newTourTitle);
                setCostData(newCostData);
                setModalState({ type: 'alert', message: 'Nhập dữ liệu từ Excel thành công!' });
    
            } catch (error) {
                const message = error instanceof Error ? error.message : "Đã xảy ra lỗi khi đọc tệp Excel.";
                setModalState({ type: 'alert', message: `Lỗi: ${message}` });
            } finally {
                if (event.target) event.target.value = '';
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const handleSaveTour = () => {
        const dataToSave: FullTourSaveData = {
            version: 1,
            tourTitle,
            costData,
            exchangeRate,
            showCustomColumn,
            customGuestCount,
            showTlCostColumn,
            addOns,
            profitSettings: {
                mode: profitGroupingMode,
                detailed: detailedProfitSettings,
                tiered: tieredProfitSettings,
            }
        };
        saveTourData(dataToSave);
        setModalState({ type: 'alert', message: 'Đã lưu tour thành công!' });
    };


    // --- Item/Day Management Handlers ---
    const handleApplyEdit = (selectedOptionId: string, updatedPrices: { [optionId: string]: number }) => {
        if (modalState.type !== 'edit') return;
        const { day, itemIndex } = modalState;
        
        setCostData(currentCostData =>
            produce(currentCostData, draft => {
                const item = draft[day][itemIndex] as EditableCostItem;
                item.selected_option_id = selectedOptionId;
                item.options.forEach(opt => {
                    if (updatedPrices[opt.id] !== undefined) {
                        const newPrice = updatedPrices[opt.id];
                        GROUP_SIZES.forEach(s => opt.prices[`${s} khách`] = newPrice);
                        opt.prices['45 khách'] = newPrice;
                    }
                });
            })
        );
        setModalState({ type: 'none' });
    };
    
    const handleAddItem = (newItem: CostItem) => {
        if (modalState.type !== 'add_item') return;
        const { day } = modalState;
        setCostData(produce(draft => {
            draft[day].push(newItem);
        }));
    };
    
    const handleDeleteItem = () => {
        if (modalState.type !== 'confirm_delete_item') return;
        const { day, itemIndex } = modalState;
        setCostData(produce(draft => {
            draft[day].splice(itemIndex, 1);
        }));
        setModalState({ type: 'none' });
    };
    
    const handleAddDay = () => {
        setCostData(produce(draft => {
            const dayNumber = Object.keys(draft).length + 1;
            draft[`Ngày ${dayNumber}`] = [];
        }));
    };
    
    const handleDeleteDay = () => {
        if (modalState.type !== 'confirm_delete_day') return;
        const { day } = modalState;
        setCostData(produce(draft => {
           delete draft[day];
        }));
        setModalState({ type: 'none' });
    };

    const handleMoveItem = (
        source: { day: string; index: number },
        destination: { day: string; index: number }
    ) => {
        // Prevent dropping an item onto itself or right after itself in the same list, which is a no-op.
        if (source.day === destination.day && (source.index === destination.index || source.index + 1 === destination.index)) {
            return;
        }
        
        setCostData(produce(draft => {
            const itemToMove = draft[source.day]?.[source.index];
            if (!itemToMove) {
                return; // Should not happen with a correct UI
            }
    
            // Add to destination
            if (!draft[destination.day]) {
                draft[destination.day] = []; // Ensure destination day array exists
            }
            draft[destination.day].splice(destination.index, 0, itemToMove);
            
            // Determine the correct index to remove from the source
            let sourceIndexToRemove = source.index;
            if (source.day === destination.day && destination.index <= source.index) {
                // If we inserted an item before its original position in the same array, its original index has now shifted by one.
                sourceIndexToRemove++;
            }
            
            // Remove from source
            draft[source.day].splice(sourceIndexToRemove, 1);
        }));
    };

    const handleExport = () => {
        exportToXlsx(
            tourTitle, 
            processedCostData, 
            totalsVND, 
            finalUsdPrices, 
            exchangeRate, 
            showCustomColumn, 
            customGuestCount,
            singleSupplementUSD
        );
        setModalState({ type: 'alert', message: 'Đã xuất file Excel (XLSX) thành công!' });
    };

    const handleAddOnAdd = (type: string) => setAddOns(produce(draft => { draft[type] = (draft[type] || 0) + 1; }));
    const handleAddOnRemove = (type: string) => setAddOns(produce(draft => { if(draft[type] > 1) draft[type] -= 1; else delete draft[type]; }));

    const handlePriceUpdate = (day: string, itemIndex: number, priceKey: `${GroupSizeKey | 45} khách`, newPrice: number) => {
        setCostData(produce(draft => {
            const item = draft[day][itemIndex];
            if (('editable' in item && item.editable)) {
                const selectedOption = item.options.find(opt => opt.id === item.selected_option_id);
                if (selectedOption) {
                    selectedOption.prices[priceKey] = newPrice;
                }
            } else if ('prices' in item) { // StandardCostItem
                item.prices[priceKey] = newPrice;
            }
            // CalculatedCostItem prices are not directly editable.
        }));
        setEditingCell(null);
    };

    const handleUpdateRowPrices = (day: string, itemIndex: number, newPrices: PriceDict) => {
        setCostData(produce(draft => {
            const item = draft[day][itemIndex];
            if ('editable' in item && item.editable) {
                const selectedOption = item.options.find(opt => opt.id === item.selected_option_id);
                if (selectedOption) {
                    selectedOption.prices = newPrices;
                }
            } else if ('prices' in item) { // StandardCostItem
                item.prices = newPrices;
            }
        }));
        setModalState({ type: 'none' });
    };

    const handleTlInclusionChange = useCallback((day: string, itemIndex: number, isIncluded: boolean) => {
        setCostData(produce(draft => {
            const item = draft[day][itemIndex];
            if (item) {
                item.includeInTlCost = isIncluded;
            }
        }));
    }, []);

    // Render Modal Content
    const renderModal = () => {
        switch (modalState.type) {
            case 'edit':
                const item = costData[modalState.day][modalState.itemIndex] as EditableCostItem;
                return <EditItemModal item={item} onClose={() => setModalState({ type: 'none' })} onApply={handleApplyEdit} />;
            case 'edit_row':
                const rowItem = costData[modalState.day][modalState.itemIndex];
                return <EditRowModal item={rowItem} onClose={() => setModalState({ type: 'none' })} onSave={(newPrices) => handleUpdateRowPrices(modalState.day, modalState.itemIndex, newPrices)} />;
            case 'add_item':
                if (!itemLibrary) return null;
                return <AddItemModal library={itemLibrary} onClose={() => setModalState({ type: 'none' })} onAdd={handleAddItem} />;
            case 'confirm_delete_item':
                return <ConfirmationModal message="Bạn có chắc chắn muốn xóa hạng mục này?" onConfirm={handleDeleteItem} onCancel={() => setModalState({ type: 'none' })} />;
            case 'confirm_delete_day':
                return <ConfirmationModal message={`Bạn có chắc chắn muốn xóa "${modalState.day}"?`} onConfirm={handleDeleteDay} onCancel={() => setModalState({ type: 'none' })} />;
            case 'confirm_new_tour':
                return <ConfirmationModal message="Tạo tour mới sẽ xóa mọi thay đổi chưa lưu. Bạn có chắc chắn?" onConfirm={handleNewTour} onCancel={() => setModalState({ type: 'none' })} />;
            case 'alert':
                return <AlertModal message={modalState.message} onClose={() => setModalState({ type: 'none' })} />;
            default:
                return null;
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-2xl font-bold text-white">Đang tải thư viện dữ liệu...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="container max-w-screen-2xl mx-auto p-4 sm:p-6 md:p-8 rounded-3xl">
                <header className="text-center mb-8 pb-6 border-b border-white/10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                        Green<span className="text-green-400">Sea</span>Tour
                    </h1>
                    {isEditingTitle ? (
                        <input
                            type="text"
                            value={tourTitle}
                            onChange={(e) => setTourTitle(e.target.value)}
                            onBlur={() => setIsEditingTitle(false)}
                            onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingTitle(false); }}
                            autoFocus
                            className="mt-2 text-xl md:text-2xl font-semibold text-blue-300 bg-transparent border-b-2 border-blue-400 w-full max-w-2xl mx-auto text-center focus:outline-none"
                        />
                    ) : (
                        <h2 onClick={() => setIsEditingTitle(true)} className="mt-2 text-xl md:text-2xl font-semibold text-blue-300 cursor-pointer hover:bg-white/10 rounded-md p-1 transition-colors">
                            Bảng Báo Giá: "{tourTitle}" <i className="fas fa-pencil-alt text-sm text-gray-400 ml-2"></i>
                        </h2>
                    )}
                    <div className="mt-6 flex justify-center flex-wrap gap-3">
                        <button onClick={() => setModalState({ type: 'confirm_new_tour' })} className="bg-yellow-500/80 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full text-sm transition"><i className="fas fa-file-alt mr-2"></i>Tạo Tour Mới</button>
                        <button onClick={() => excelInputRef.current?.click()} className="bg-green-500/80 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full text-sm transition"><i className="fas fa-file-excel mr-2"></i>Nhập từ Excel</button>
                        <input type="file" ref={excelInputRef} onChange={handleExcelFileChange} accept=".xlsx, .xls" className="hidden" />
                        <button onClick={handleLoadTourClick} className="bg-blue-500/80 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full text-sm transition"><i className="fas fa-folder-open mr-2"></i>Tải Tour (JSON)</button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
                        <button onClick={handleSaveTour} className="bg-purple-500/80 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full text-sm transition"><i className="fas fa-save mr-2"></i>Lưu Tour (JSON)</button>
                    </div>
                </header>

                <main>
                    <QuoteDisplay
                        costData={processedCostData}
                        totalsVND={totalsVND}
                        finalUsdPrices={finalUsdPrices}
                        exchangeRate={exchangeRate}
                        showCustomColumn={showCustomColumn}
                        customGuestCount={customGuestCount}
                        onEditItem={(day, itemIndex) => setModalState({ type: 'edit', day, itemIndex })}
                        onEditRow={(day, itemIndex) => setModalState({ type: 'edit_row', day, itemIndex })}
                        onAddCustomItem={(day) => setModalState({ type: 'add_item', day })}
                        onDeleteItem={(day, itemIndex) => setModalState({ type: 'confirm_delete_item', day, itemIndex })}
                        onAddDay={handleAddDay}
                        onDeleteDay={(day) => setModalState({ type: 'confirm_delete_day', day })}
                        onMoveItem={handleMoveItem}
                        editingCell={editingCell}
                        onSetEditingCell={setEditingCell}
                        onPriceUpdate={handlePriceUpdate}
                        singleSupplementUSD={singleSupplementUSD}
                        showTlCostColumn={showTlCostColumn}
                        onTlInclusionChange={handleTlInclusionChange}
                    />
                    <QuoteForm 
                        exchangeRate={exchangeRate}
                        onExchangeRateChange={setExchangeRate}
                        showCustomColumn={showCustomColumn}
                        onShowCustomColumnChange={setShowCustomColumn}
                        customGuestCount={customGuestCount}
                        onCustomGuestCountChange={setCustomGuestCount}
                        onExport={handleExport}
                        addOns={addOns}
                        onAddOnAdd={handleAddOnAdd}
                        onAddOnRemove={handleAddOnRemove}
                        // New profit props
                        profitGroupingMode={profitGroupingMode}
                        onProfitGroupingModeChange={setProfitGroupingMode}
                        detailedProfitSettings={detailedProfitSettings}
                        onDetailedProfitSettingsChange={setDetailedProfitSettings}

                        tieredProfitSettings={tieredProfitSettings}
                        onTieredProfitSettingsChange={setTieredProfitSettings}
                        showTlCostColumn={showTlCostColumn}
                        onShowTlCostColumnChange={setShowTlCostColumn}
                        tourLeaderCostVND={tourLeaderCostVND}
                        singleSupplementUSD={singleSupplementUSD}
                    />
                </main>
            </div>
            
            <BaseModal 
                show={modalState.type !== 'none'} 
                onClose={() => setModalState({type: 'none'})} 
                size={modalState.type === 'add_item' ? '4xl' : modalState.type === 'edit_row' ? '5xl' : '2xl'}
            >
                {renderModal()}
            </BaseModal>
        </div>
    );
};

export default App;
