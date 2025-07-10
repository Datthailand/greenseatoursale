
import React, { useState, useEffect, useRef } from 'react';
import { DayData, CostItem, FinalUsdPrices, GroupSizeKey, GROUP_SIZES } from '../types';
import { formatCurrency, secondTourData } from '../services/geminiService';

interface InlinePriceInputProps {
  initialValue: number | null | undefined;
  onSave: (newValue: number) => void;
  onCancel: () => void;
}

const InlinePriceInput: React.FC<InlinePriceInputProps> = ({ initialValue, onSave, onCancel }) => {
  const [value, setValue] = useState(initialValue || 0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleSave = () => {
    onSave(Number(value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <input
      ref={inputRef}
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      onBlur={handleSave}
      onKeyDown={handleKeyDown}
      className="w-full bg-gray-700 text-white text-right p-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  );
};


interface PriceDisplayProps {
  costData: { [day: string]: DayData };
  totalsVND: { [key in GroupSizeKey]: number } & { custom: number | null };
  finalUsdPrices: FinalUsdPrices;
  exchangeRate: number;
  showCustomColumn: boolean;
  customGuestCount: number;
  onEditItem: (day: string, itemIndex: number) => void;
  onEditRow: (day: string, itemIndex: number) => void;
  onAddCustomItem: (day: string) => void;
  onDeleteItem: (day: string, itemIndex: number) => void;
  onAddDay: () => void;
  onDeleteDay: (day: string) => void;
  onMoveItem: (source: { day: string; index: number }, destination: { day: string; index: number }) => void;
  editingCell: { day: string; itemIndex: number; priceKey: `${GroupSizeKey | 45} khách` } | null;
  onSetEditingCell: (cell: { day: string; itemIndex: number; priceKey: `${GroupSizeKey | 45} khách` } | null) => void;
  onPriceUpdate: (day: string, itemIndex: number, priceKey: `${GroupSizeKey | 45} khách`, newPrice: number) => void;
  singleSupplementUSD: number;
  showTlCostColumn: boolean;
  onTlInclusionChange: (day: string, itemIndex: number, isIncluded: boolean) => void;
}


const QuoteDisplay: React.FC<PriceDisplayProps> = ({
    costData,
    totalsVND,
    finalUsdPrices,
    exchangeRate,
    showCustomColumn,
    customGuestCount,
    onEditItem,
    onEditRow,
    onAddCustomItem,
    onDeleteItem,
    onAddDay,
    onDeleteDay,
    onMoveItem,
    editingCell,
    onSetEditingCell,
    onPriceUpdate,
    singleSupplementUSD,
    showTlCostColumn,
    onTlInclusionChange,
}) => {

    const [draggedItem, setDraggedItem] = useState<{ day: string; index: number } | null>(null);
    const [dragOverDayHeader, setDragOverDayHeader] = useState<string | null>(null);
    const [dragOverItem, setDragOverItem] = useState<{ day: string; index: number } | null>(null);

    const handleDragStart = (e: React.DragEvent, day: string, index: number) => {
        const payload = JSON.stringify({ sourceDay: day, sourceIndex: index });
        e.dataTransfer.setData('application/json', payload);
        e.dataTransfer.effectAllowed = 'move';
        setDraggedItem({ day, index });
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
        setDragOverDayHeader(null);
        setDragOverItem(null);
    };
    
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDayHeaderDrop = (e: React.DragEvent, destinationDay: string) => {
        e.preventDefault();
        e.stopPropagation();
        const payload = e.dataTransfer.getData('application/json');
        if (payload) {
            const { sourceDay, sourceIndex } = JSON.parse(payload);
            const destinationIndex = costData[destinationDay]?.length ?? 0;
            onMoveItem({ day: sourceDay, index: sourceIndex }, { day: destinationDay, index: destinationIndex });
        }
        setDragOverDayHeader(null);
    };

    const handleItemRowDrop = (e: React.DragEvent, destinationDay: string, destinationIndex: number) => {
        e.preventDefault();
        e.stopPropagation();
        const payload = e.dataTransfer.getData('application/json');
        if (payload) {
            const { sourceDay, sourceIndex } = JSON.parse(payload);
            onMoveItem({ day: sourceDay, index: sourceIndex }, { day: destinationDay, index: destinationIndex });
        }
        setDragOverItem(null);
    };


    const dollarTotals = React.useMemo(() => {
        const result: { [key in GroupSizeKey]: number } & { custom: number | null } = {} as any;
        GROUP_SIZES.forEach(size => {
            result[size] = Math.round(totalsVND[size] / exchangeRate);
        });
        result.custom = totalsVND.custom !== null ? Math.round(totalsVND.custom / exchangeRate) : null;
        return result;
    }, [totalsVND, exchangeRate]);
    
    const summaryHeaders = secondTourData.ranges;
    const mainTableColSpan = GROUP_SIZES.length + 1 + (showCustomColumn ? 1 : 0) + (showTlCostColumn ? 1 : 0);


  return (
    <>
      <div className="overflow-x-auto">
        <table id="priceTable" className="w-full min-w-[1100px] border-collapse separate border-spacing-0 rounded-2xl overflow-hidden bg-black bg-opacity-5 shadow-lg">
          <thead>
            <tr>
              <th className="p-4 text-left uppercase text-sm font-semibold bg-white/10">Danh mục</th>
              {GROUP_SIZES.map(size => <th key={size} className="p-4 uppercase text-sm font-semibold bg-white/10">{size} khách</th>)}
              {showCustomColumn && <th className="p-4 uppercase text-sm font-semibold bg-white/10">{customGuestCount} khách (tùy chỉnh)</th>}
              {showTlCostColumn && <th className="p-4 uppercase text-sm font-semibold bg-white/10 w-24 text-center">Tính cho TL?</th>}
            </tr>
          </thead>
          <tbody>
            {Object.entries(costData).map(([day, items]) => (
              <React.Fragment key={day}>
                <tr 
                    className={`bg-black/10 transition-colors ${dragOverDayHeader === day ? 'drag-over-active' : ''}`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDayHeaderDrop(e, day)}
                    onDragEnter={() => { setDragOverItem(null); setDragOverDayHeader(day); }}
                    onDragLeave={() => setDragOverDayHeader(null)}
                >
                  <td colSpan={mainTableColSpan} className="p-3 text-left font-bold text-blue-300 text-lg border-y-2 border-white/20">
                      <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                              <span>{day}</span>
                              <button onClick={() => onDeleteDay(day)} className="text-red-400 hover:text-red-300 text-xs transition">
                                  <i className="fas fa-trash-alt"></i>
                              </button>
                          </div>
                          <button onClick={() => onAddCustomItem(day)} className="text-sm bg-green-500/30 hover:bg-green-500/50 text-green-300 font-bold py-1 px-3 rounded-full transition">
                              <i className="fas fa-plus-circle mr-2"></i>Thêm hạng mục
                          </button>
                      </div>
                  </td>
                </tr>
                {items.map((item: CostItem, index) => {
                  const isPriceEditable = !('type' in item && item.type === 'calculated_per_person');
                  const isBeingDragged = draggedItem?.day === day && draggedItem?.index === index;
                  const isDropTarget = dragOverItem?.day === day && dragOverItem?.index === index;

                  return (
                  <tr 
                    key={`${day}-${index}-${item.category}-${(item as any).customId || ''}`} 
                    className={`hover:bg-white/5 group ${isBeingDragged ? 'item-dragging' : ''} ${isDropTarget ? 'drag-over-item-active' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, day, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleItemRowDrop(e, day, index)}
                    onDragEnter={(e) => {
                        e.stopPropagation();
                        // Don't show drop indicator on the item being dragged
                        if(!isBeingDragged) {
                            setDragOverDayHeader(null);
                            setDragOverItem({ day, index });
                        }
                    }}
                  >
                    <td className="p-3 border-b border-white/10 align-middle">
                      <div className="flex items-center gap-3 text-gray-200">
                        <i className="fas fa-grip-vertical mr-3 cursor-move text-gray-500 group-hover:text-gray-400" title="Kéo để di chuyển"></i>
                        <i className={`${item.icon} text-green-400 w-5 text-center`}></i>
                        <span className='mr-auto'>{item.current_name || item.category}</span>
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {isPriceEditable && (
                            <button onClick={() => onEditRow(day, index)} title="Chỉnh sửa hàng loạt" className="text-yellow-400 hover:text-yellow-200 transition"><i className="fas fa-table"></i></button>
                          )}
                          {('editable' in item && item.editable) && (
                            <button onClick={() => onEditItem(day, index)} title="Chỉnh sửa lựa chọn" className="text-blue-400 hover:text-blue-200 transition"><i className="fas fa-edit"></i></button>
                          )}
                          {item.isCustom && (
                            <button onClick={() => onDeleteItem(day, index)} title="Xóa hạng mục" className="text-red-400 hover:text-red-200 transition"><i className="fas fa-trash-alt"></i></button>
                          )}
                        </div>
                      </div>
                    </td>
                    {GROUP_SIZES.map(size => {
                      const priceKey = `${size} khách` as const;
                      const isEditing = editingCell?.day === day && editingCell?.itemIndex === index && editingCell?.priceKey === priceKey;
                      
                      return (
                          <td key={size} 
                              className={`p-3 border-b border-white/10 text-right text-gray-300 align-middle ${isPriceEditable ? 'cursor-pointer hover:bg-white/10' : ''}`}
                              onClick={() => isPriceEditable && onSetEditingCell({ day, itemIndex: index, priceKey })}>
                          {isEditing ? (
                              <InlinePriceInput 
                                  initialValue={item.current_prices?.[priceKey]} 
                                  onSave={(newPrice) => onPriceUpdate(day, index, priceKey, newPrice)}
                                  onCancel={() => onSetEditingCell(null)}
                              />
                          ) : (
                              formatCurrency(item.current_prices?.[priceKey])
                          )}
                          </td>
                      );
                    })}
                    {showCustomColumn && (
                       <td className="p-3 border-b border-white/10 text-right text-gray-300 align-middle">
                          {formatCurrency(item.current_prices?.['custom_khách'])}
                       </td>
                    )}
                    {showTlCostColumn && (
                       <td className="p-3 border-b border-white/10 text-center align-middle">
                          {(() => {
                            const isTlCategory = item.category === "Trưởng đoàn";
                            return (
                              <input
                                type="checkbox"
                                className="h-5 w-5 rounded accent-green-500 bg-gray-700 border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                checked={item.includeInTlCost ?? false}
                                onChange={(e) => onTlInclusionChange(day, index, e.target.checked)}
                                disabled={isTlCategory}
                                title={isTlCategory ? "Không thể tính chi phí trưởng đoàn cho chính hạng mục trưởng đoàn" : "Chọn để tính chi phí này cho trưởng đoàn mới"}
                              />
                            );
                          })()}
                       </td>
                    )}
                  </tr>
                )})}
              </React.Fragment>
            ))}
            
            {/* Total Rows */}
            <tr className="bg-black/10 font-bold text-lg">
              <td className="p-4 text-gray-100">Tổng (VNĐ)</td>
              {GROUP_SIZES.map(size => <td key={size} className="p-4 text-right text-gray-100">{formatCurrency(totalsVND[size])}</td>)}
              {showCustomColumn && <td className="p-4 text-right text-gray-100">{formatCurrency(totalsVND.custom)}</td>}
              {showTlCostColumn && <td className="p-4"></td>}
            </tr>
            <tr className="bg-black/10 font-bold text-lg">
              <td className="p-4 text-blue-300">Giá Dollar</td>
              {GROUP_SIZES.map(size => <td key={size} className="p-4 text-right text-blue-300">${formatCurrency(dollarTotals[size])}</td>)}
              {showCustomColumn && <td className="p-4 text-right text-blue-300">{dollarTotals.custom !== null ? `$${formatCurrency(dollarTotals.custom)}` : '-'}</td>}
              {showTlCostColumn && <td className="p-4"></td>}
            </tr>
             <tr className="bg-green-900/50 font-extrabold text-xl">
              <td className="p-4 text-green-300">Báo giá (USD)</td>
              {GROUP_SIZES.map(size => <td key={size} className="p-4 text-right text-green-300">${formatCurrency(Number(finalUsdPrices[size]))}</td>)}
              {showCustomColumn && <td className="p-4 text-right text-green-300">{finalUsdPrices.custom !== '-' && Number(finalUsdPrices.custom) > 0 ? `$${formatCurrency(Number(finalUsdPrices.custom))}`: '-'}</td>}
              {showTlCostColumn && <td className="p-4"></td>}
            </tr>
          </tbody>
          <tfoot>
              <tr>
                  <td colSpan={mainTableColSpan} className="p-4 text-center">
                      <button onClick={onAddDay} className="bg-blue-500/80 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-full transition">
                          <i className="fas fa-plus-circle mr-2"></i>Thêm Ngày Mới
                      </button>
                  </td>
              </tr>
          </tfoot>
        </table>
      </div>
      
      <div className="new-pricing-section mt-12">
            <h3 className="text-2xl font-bold text-center mb-6 text-white">Giá Tour Theo Số Lượng Khách ({secondTourData.date_range})</h3>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] border-collapse separate border-spacing-0 rounded-2xl overflow-hidden bg-black bg-opacity-20 shadow-lg">
                    <thead>
                        <tr className="bg-white/10">
                            <th className="p-4 text-left uppercase text-sm font-semibold">Thời gian</th>
                            {summaryHeaders.map(range => <th key={range.header} className="p-4 uppercase text-sm font-semibold">{range.header}</th>)}
                            <th className="p-4 uppercase text-sm font-semibold">Ngủ đơn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-black/5 hover:bg-white/5">
                            <td className="p-4 border-t border-white/10 font-medium">{secondTourData.date_range}</td>
                            {summaryHeaders.map(range => (
                                <td key={range.priceKey} className="p-4 border-t border-white/10 text-center font-medium">
                                    ${formatCurrency(Number(finalUsdPrices[range.priceKey]))}
                                </td>
                            ))}
                            <td className="p-4 border-t border-white/10 text-center font-medium">+{singleSupplementUSD}$</td>
                        </tr>
                        {/* Notes Row */}
                        <tr className="bg-black/10">
                            <td className="p-4 border-t border-white/10 font-bold align-top">Ghi chú:</td>
                            <td colSpan={3} className="p-4 border-t border-white/10 text-sm align-top">
                                <p className="font-bold text-red-400">Không phí trưởng đoàn tour</p>
                                <p>Nếu có trưởng đoàn tour riêng: +100$</p>
                            </td>
                            <td colSpan={3} className="p-4 border-t border-white/10 text-sm align-top">
                                <p className="font-bold text-blue-300">Phí trưởng đoàn tour 1 người</p>
                                <p>Nếu thêm trưởng đoàn tour khác: +60$</p>
                                <p>Nếu ngủ riêng: +100$</p>
                            </td>
                            <td className="p-4 border-t border-white/10" colSpan={2}></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  );
};

export default QuoteDisplay;