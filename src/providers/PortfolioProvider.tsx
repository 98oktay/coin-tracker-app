import { getTickerItems } from "@/service/api";
import { PortfolioState } from "@/types";
import { Asset } from "next/font/google";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const PortfolioContext = createContext<PortfolioState>({
  refresh: () => {},
  addUpdateItem: () => {},
  items: [],
  searchVisible: false,
  assets: [],
  isLoading: false,
  error: "",
});

const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

const getStorageArray = (key) => {
  const items = localStorage.getItem(key) || "[]";
  try {
    return JSON.parse(items);
  } catch (e) {
    console.warn(`local storage data "${key}" is invalid`, e);
  }
  return [];
};

const setStorageArray = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const autoRelloadTimer = useRef<TimerHandler>(null);

  const mergePortfolio = (localItems, assets) => {
    return localItems.map((item) => {
      const asset = assets.find((asset) => asset.symbol === item.symbol);
      if (asset) {
        return {
          symbol: asset.symbol,
          weightedAvgPrice: asset.weightedAvgPrice,
          lastPrice: asset.lastPrice,
          amount: item.amount,
        };
      }
      return null;
    });
  };

  const addUpdateItem = (symbol: string, amount: int) => {
    const localItems = getStorageArray("portfolio");
    const symbolIndex = localItems.findIndex((item) => item.symbol === symbol);

    if (symbolIndex !== -1) {
      localItems[symbolIndex].amount = parseFloat(amount);
    } else {
      localItems.push({ symbol, amount: parseFloat(amount) });
    }
    setStorageArray("portfolio", localItems);
    setPortfolio(mergePortfolio(localItems, assets));
  };

  const removeItem = (symbol: string) => {
    const localItems = getStorageArray("portfolio");
    const newItems = localItems.filter((item) => item.symbol !== symbol);
    setStorageArray("portfolio", newItems);
    const portfolio = mergePortfolio(newItems, assets);
    setPortfolio(portfolio);
  };

  const fetchPortfolio = useCallback(() => {
    setLoading(true);
    getTickerItems()
      .then((data) => {
        setAssets(data);
        const localItems = getStorageArray("portfolio");
        setPortfolio(mergePortfolio(localItems, data));
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  useEffect(() => {
    fetchPortfolio();
    autoRelloadTimer.current = setInterval(fetchPortfolio, 300000);
    return () => {
      clearInterval(autoRelloadTimer.current);
    };
  }, [fetchPortfolio]);

  return (
    <PortfolioContext.Provider
      value={{
        refresh: fetchPortfolio,
        items: portfolio,
        addUpdateItem,
        removeItem,
        searchVisible,
        assets,
        isLoading,
        error,
        toggleSearch,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export { PortfolioProvider, PortfolioContext, usePortfolio };
