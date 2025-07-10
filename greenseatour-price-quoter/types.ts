
export type GroupSizeKey = 8 | 10 | 15 | 20 | 25 | 30 | 35;
export const GROUP_SIZES: GroupSizeKey[] = [8, 10, 15, 20, 25, 30, 35];

export type PriceDict = { [key in `${GroupSizeKey} khách`]: number } & { '45 khách': number };
export type CurrentPriceDict = PriceDict & { 'custom_khách'?: number | null };

export interface EditableOption {
  name: string;
  id: string;
  prices: PriceDict;
}

export interface BaseCostItem {
  category: string;
  icon: string;
  current_name?: string;
  current_prices?: CurrentPriceDict;
  isCustom?: boolean;
  includeInTlCost?: boolean;
}

export interface EditableCostItem extends BaseCostItem {
  editable: true;
  options: EditableOption[];
  selected_option_id: string;
}

export interface CalculatedCostItem extends BaseCostItem {
  type: 'calculated_per_person';
  fixed_total_costs: { [key: string]: number };
}

export interface StandardCostItem extends BaseCostItem {
  editable?: false;
  type?: never;
  prices: PriceDict;
}

export type CostItem = EditableCostItem | CalculatedCostItem | StandardCostItem;

export type DayData = CostItem[];

export interface AddOn {
  name: string;
  cost?: number;
  description: string;
}

export interface TourData {
  exchange_rates: {
    usd_to_vnd: number;
  };
  add_ons: {
    [key: string]: AddOn;
  };
}

export interface ItemLibrary {
  hotels: EditableCostItem[];
  meals: (EditableCostItem | StandardCostItem)[];
  ticketsAndActivities: StandardCostItem[];
  others: StandardCostItem[];
}


export interface SecondTourData {
    date_range: string;
    single_supplement: number;
    ranges: { header: string; priceKey: GroupSizeKey }[];
}

// Legacy format for backward compatibility
export interface LegacyTourSaveData {
    tourTitle: string;
    days: {
      [day: string]: DayData;
    };
}

// New comprehensive save format
export interface FullTourSaveData {
  version: 1;
  tourTitle: string;
  costData: { [day: string]: DayData };
  exchangeRate: number;
  showCustomColumn: boolean;
  customGuestCount: number;
  showTlCostColumn: boolean;
  addOns: { [key: string]: number };
  profitSettings: {
      mode: 'detailed' | 'tiered';
      detailed: DetailedProfitSettings;
      tiered: TieredProfitSettings;
  };
}


export type FinalUsdPrices = { [key in GroupSizeKey | 'custom']?: number | string };

export type ModalState = 
  | { type: 'none' }
  | { type: 'edit'; day: string; itemIndex: number }
  | { type: 'edit_row'; day: string; itemIndex: number }
  | { type: 'add_item'; day: string }
  | { type: 'confirm_delete_item'; day: string; itemIndex: number }
  | { type: 'confirm_delete_day'; day: string }
  | { type: 'confirm_new_tour' }
  | { type: 'alert'; message: string };

// --- New Profit Setting Types ---
export interface ProfitSetting {
  mode: 'fixed' | 'percentage';
  value: number;
}

export interface DetailedProfitSettings {
  [key: string]: ProfitSetting;
}

export interface TieredProfitSettings {
  under15: ProfitSetting;
  over15: ProfitSetting;
}
