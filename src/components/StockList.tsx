import { usePortfolio } from "@/providers/PortfolioProvider";
import PortfolioLoading from "./PortfolioLoading";
import PortfolioEditField from "./StockEditField";

const StockList = () => {
  const { items, error, isLoading } = usePortfolio();
  return (
    <div className="stockList">
      <ul className="stockList-list">
        {!!error && (
          <li className="stockList-error">
            <p>{error}</p>
          </li>
        )}
        {!isLoading && !items.length && (
          <li className="stockList-noItems">
            <p>No items on your portfolio. Add some stocks!</p>
          </li>
        )}
        {items.map((asset) => (
          <li key={asset.symbol} className="stockList-item">
            <PortfolioEditField item={asset} />
          </li>
        ))}
      </ul>
      <PortfolioLoading />
    </div>
  );
};

export default StockList;
