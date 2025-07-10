
import React from 'react';
import { produce } from 'immer';
import { AddOn, DetailedProfitSettings, TieredProfitSettings } from '../types';
import { tourData, formatCurrency, profitSettingRanges } from '../services/geminiService';

interface QuoteFormProps {
  exchangeRate: number;
  onExchangeRateChange: (rate: number) => void;
  showCustomColumn: boolean;
  onShowCustomColumnChange: (show: boolean) => void;
  customGuestCount: number;
  onCustomGuestCountChange: (count: number) => void;
  onExport: () => void;
  addOns: { [key: string]: number };
  onAddOnAdd: (type: string) => void;
  onAddOnRemove: (type: string) => void;
  profitGroupingMode: 'detailed' | 'tiered';
  onProfitGroupingModeChange: (mode: 'detailed' | 'tiered') => void;
  detailedProfitSettings: DetailedProfitSettings;
  onDetailedProfitSettingsChange: (settings: DetailedProfitSettings) => void;
  tieredProfitSettings: TieredProfitSettings;
  onTieredProfitSettingsChange: (settings: TieredProfitSettings) => void;
  showTlCostColumn: boolean;
  onShowTlCostColumnChange: (show: boolean) => void;
  tourLeaderCostVND: number;
  singleSupplementUSD: number;
}

const QuoteForm: React.FC<QuoteFormProps> = ({
  exchangeRate,
  onExchangeRateChange,
  showCustomColumn,
  onShowCustomColumnChange,
  customGuestCount,
  onCustomGuestCountChange,
  onExport,
  addOns,
  onAddOnAdd,
  onAddOnRemove,
  profitGroupingMode,
  onProfitGroupingModeChange,
  detailedProfitSettings,
  onDetailedProfitSettingsChange,
  tieredProfitSettings,
  onTieredProfitSettingsChange,
  showTlCostColumn,
  onShowTlCostColumnChange,
  tourLeaderCostVND,
  singleSupplementUSD
}) => {

  const getAddOnCost = (key: string) => {
      if (key === 'add_tl') {
          return tourLeaderCostVND;
      }
      if (key === 'add_tl_single') {
          const singleSupplementVND = singleSupplementUSD * exchangeRate;
          // User's requested formula: (2 * single_supplement_cost) + tour_leader_cost
          return (2 * singleSupplementVND) + tourLeaderCostVND;
      }
      return 0; // No other add-ons have static costs
  }

  const totalAddOnVND = Object.entries(addOns).reduce((acc, [key, quantity]) => {
      return acc + (getAddOnCost(key) * quantity);
  }, 0);

  const totalAddOnUSD = Math.round(totalAddOnVND / exchangeRate);

  const handleDetailedValueChange = (header: string, value: number) => {
    if (!isNaN(value)) {
        onDetailedProfitSettingsChange(produce(detailedProfitSettings, draft => {
            draft[header].value = value;
        }));
    }
  };

  const handleDetailedModeChange = (header: string, mode: 'fixed' | 'percentage') => {
    onDetailedProfitSettingsChange(produce(detailedProfitSettings, draft => {
        draft[header].mode = mode;
    }));
  };

  const handleTieredValueChange = (tier: 'under15' | 'over15', value: number) => {
    if (!isNaN(value)) {
        onTieredProfitSettingsChange(produce(tieredProfitSettings, draft => {
            draft[tier].value = value;
        }));
    }
  };

  const handleTieredModeChange = (tier: 'under15' | 'over15', mode: 'fixed' | 'percentage') => {
    onTieredProfitSettingsChange(produce(tieredProfitSettings, draft => {
        draft[tier].mode = mode;
    }));
  };
  
  const renderProfitInput = (
    label: string,
    value: number,
    mode: 'fixed' | 'percentage',
    onValueChange: (val: number) => void,
    onModeChange: (m: 'fixed' | 'percentage') => void
  ) => (
    <div className="flex items-center justify-between gap-4">
        <label className="text-base font-medium text-gray-300 flex-shrink-0">{label}</label>
        <div className="flex items-center gap-2">
            <input
                type="number"
                value={value}
                onChange={(e) => onValueChange(Number(e.target.value))}
                className="w-24 p-2.5 border border-gray-600 rounded-lg bg-gray-900/70 text-white text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <div className="flex items-center bg-gray-800 p-0.5 rounded-full border border-gray-700">
                <button
                    onClick={() => onModeChange('fixed')}
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-colors ${mode === 'fixed' ? 'bg-green-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                    aria-pressed={mode === 'fixed'}
                >
                    $
                </button>
                <button
                    onClick={() => onModeChange('percentage')}
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-colors ${mode === 'percentage' ? 'bg-green-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                    aria-pressed={mode === 'percentage'}
                >
                    %
                </button>
            </div>
        </div>
    </div>
  );


  return (
    <div className="controls-section mt-10 p-6 bg-black bg-opacity-20 rounded-2xl border border-gray-700/50">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-8 items-start">
        
        {/* Column 1: Core Settings */}
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xl font-semibold text-blue-300 mb-4 text-center">Cài đặt chung</h4>
            <div className="exchange-rate-input-group flex flex-col items-center gap-2 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50">
              <label htmlFor="usdExchangeRateInput" className="text-base font-semibold text-gray-300">
                Tỷ giá USD/VNĐ
              </label>
              <input
                type="number"
                id="usdExchangeRateInput"
                value={exchangeRate}
                onChange={(e) => onExchangeRateChange(Number(e.target.value))}
                className="w-48 p-3 border border-gray-600 rounded-lg bg-gray-900/70 text-white text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
          <div className="custom-guest-control-group p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 space-y-4">
             <label className="custom-guest-checkbox-label text-base font-semibold text-gray-300 flex items-center justify-center cursor-pointer">
              <input
                type="checkbox"
                checked={showCustomColumn}
                onChange={(e) => onShowCustomColumnChange(e.target.checked)}
                className="mr-3 h-5 w-5 rounded accent-green-500 bg-gray-700 border-gray-500"
              />
              Cột khách tùy chỉnh
            </label>
            {showCustomColumn && (
              <div className="custom-guest-input-wrapper mt-4 flex flex-col items-center gap-2">
                <label htmlFor="customGuestCountInput" className="text-sm text-gray-400">Số khách (8-42)</label>
                <input
                  type="number"
                  id="customGuestCountInput"
                  value={customGuestCount}
                  onChange={(e) => onCustomGuestCountChange(Number(e.target.value))}
                  min="8"
                  max="42"
                  className="w-48 p-3 border border-gray-600 rounded-lg bg-gray-900/70 text-white text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            )}
             <label className="custom-guest-checkbox-label text-base font-semibold text-gray-300 flex items-center justify-center cursor-pointer pt-4 border-t border-gray-700">
              <input
                type="checkbox"
                checked={showTlCostColumn}
                onChange={(e) => onShowTlCostColumnChange(e.target.checked)}
                className="mr-3 h-5 w-5 rounded accent-green-500 bg-gray-700 border-gray-500"
              />
              Cột tính phí TL
            </label>
          </div>
        </div>
        
        {/* Column 2: Profit Settings */}
        <div className="profit-margins-section">
            <h4 className="text-xl font-semibold text-blue-300 mb-2 text-center">Cài đặt lợi nhuận</h4>
            <p className="text-sm text-gray-400 mb-4 text-center">
                Chọn chế độ cài đặt lợi nhuận.
            </p>

            <div className="flex justify-center mb-4">
                <div className="flex items-center bg-gray-900/50 p-1 rounded-full border border-gray-700/50">
                    <button
                        onClick={() => onProfitGroupingModeChange('detailed')}
                        className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                            profitGroupingMode === 'detailed' ? 'bg-green-500 text-white shadow-md' : 'text-gray-300 hover:bg-gray-800/60'
                        }`}
                        aria-pressed={profitGroupingMode === 'detailed'}
                    >
                        Chi tiết
                    </button>
                    <button
                        onClick={() => onProfitGroupingModeChange('tiered')}
                        className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                            profitGroupingMode === 'tiered' ? 'bg-green-500 text-white shadow-md' : 'text-gray-300 hover:bg-gray-800/60'
                        }`}
                        aria-pressed={profitGroupingMode === 'tiered'}
                    >
                        Theo nhóm lớn
                    </button>
                </div>
            </div>

            {profitGroupingMode === 'detailed' && (
                <div className="flex flex-col gap-3 bg-gray-900/30 p-4 rounded-lg border border-gray-700/50">
                    {profitSettingRanges.map(range => {
                        const setting = detailedProfitSettings[range.header] || { value: 0, mode: 'fixed' };
                        return renderProfitInput(
                          range.header,
                          setting.value,
                          setting.mode,
                          (value) => handleDetailedValueChange(range.header, value),
                          (mode) => handleDetailedModeChange(range.header, mode)
                        );
                    })}
                </div>
            )}
            {profitGroupingMode === 'tiered' && (
                <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-700/50 flex flex-col gap-3">
                   {renderProfitInput(
                      "Nhóm < 15 khách",
                      tieredProfitSettings.under15.value,
                      tieredProfitSettings.under15.mode,
                      (value) => handleTieredValueChange('under15', value),
                      (mode) => handleTieredModeChange('under15', mode)
                   )}
                   {renderProfitInput(
                      "Nhóm >= 15 khách",
                      tieredProfitSettings.over15.value,
                      tieredProfitSettings.over15.mode,
                      (value) => handleTieredValueChange('over15', value),
                      (mode) => handleTieredModeChange('over15', mode)
                   )}
                </div>
            )}
        </div>


        {/* Column 3: Surcharges & Actions */}
        <div className="flex flex-col justify-between h-full gap-6">
            <div className="add-ons-compact-section">
              <h4 className="text-xl font-semibold text-blue-300 mb-4 text-center">Chi phí phát sinh trưởng đoàn</h4>
              <div className="add-ons-compact-grid flex flex-col gap-3">
                {Object.keys(tourData.add_ons).map((type) => {
                  const addOn = tourData.add_ons[type as keyof typeof tourData.add_ons];
                  const quantity = addOns[type] || 0;
                  const dynamicCost = getAddOnCost(type);
                  const dynamicCostUSD = Math.round(dynamicCost / exchangeRate);
                  return (
                    <div key={type} className="add-on-compact-item bg-gray-900/30 border border-gray-700/50 rounded-lg p-3 flex justify-between items-center transition hover:bg-gray-900/50">
                      <div className="add-on-info">
                        <span className="font-medium text-gray-200">{addOn.name} {quantity > 0 && <span className="text-sm text-gray-400">(x{quantity})</span>}</span>
                        <div className="text-xs text-gray-400">
                          <span>{formatCurrency(dynamicCost)} VNĐ</span>
                          <span className="font-medium text-blue-400 ml-2">/ {formatCurrency(dynamicCostUSD)} USD</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => onAddOnAdd(type)} className="add-on-button bg-green-500/30 text-green-300 text-xs font-bold w-16 h-8 rounded-full transition hover:bg-green-500/50">
                          Thêm
                        </button>
                        {quantity > 0 && (
                          <button onClick={() => onAddOnRemove(type)} className="text-red-400 transition hover:text-red-300 w-8 h-8 rounded-full hover:bg-red-500/20 flex items-center justify-center">
                              <i className="fas fa-trash-alt"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {totalAddOnVND > 0 && (
                  <div className="add-on-compact-item border-t-2 border-green-400/50 mt-2 pt-3 flex justify-between items-center text-lg">
                      <span className="font-bold text-gray-200">Tổng phát sinh:</span>
                      <div className="flex flex-col items-end">
                          <span className="font-bold text-green-400">{formatCurrency(totalAddOnVND)} VNĐ</span>
                          <span className="text-sm font-semibold text-blue-300">{formatCurrency(totalAddOnUSD)} USD</span>
                      </div>
                  </div>
                )}
              </div>
            </div>

            <div className="export-buttons-group mt-auto">
              <button
                onClick={onExport}
                className="w-full apply-btn bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transition transform hover:scale-105"
              >
                <i className="fas fa-file-excel mr-2"></i> Xuất Excel
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
