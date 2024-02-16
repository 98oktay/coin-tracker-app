type AssetType = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  lastPrice: string;
};

interface StockType extends AssetType {
  amount: number;
}

type PortfolioState = {
  refresh: () => void;
  toggleSearch: () => void;
  searchVisible: boolean;
  items: StockType[];
  assets: AssetType[];
  isLoading: boolean;
  addUpdateItem: (symbol: string, amount: number) => void;
};

export type { AssetType, StockType, PortfolioState };
