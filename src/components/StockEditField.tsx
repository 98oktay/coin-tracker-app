import { StockType, usePortfolio } from "@/providers/PortfolioProvider";
import { useState } from "react";
import Button from "./Button";

type StockEditFieldProps = {
  item: StockType;
};

const StockEditField = ({ item }: StockEditFieldProps) => {
  const [updatedValue, setUpdateValue] = useState();
  const [hasError, setHasError] = useState(false);
  const { searchVisible, items, toggleSearch, addUpdateItem, removeItem } =
    usePortfolio();

  const isChanged = (item) => {
    return typeof updatedValue !== "undefined";
  };

  const getAmountValue = (item) => {
    return typeof updatedValue !== "undefined"
      ? updatedValue
      : items.find((i) => i.symbol === item.symbol)?.amount;
  };

  const setAmountValue = (e) => {
    setUpdateValue(e.target.value);
    setHasError(false);
  };

  const toUpdatePortfolio = () => {
    if (isChanged(item) && updatedValue) {
      addUpdateItem(item.symbol, updatedValue);
      setUpdateValue(undefined);
      return;
    }
    setHasError(true);
  };

  const toRemovePortfolio = () => {
    removeItem(item.symbol);
    setUpdateValue(null);
    setHasError(false);
  };

  const isHave = items.find((i) => i.symbol === item.symbol);

  return (
    <div className="stockEditField">
      <div className="stockEditField-info">
        <h2 className="stockEditField-symbol">{item.symbol}</h2>
        <p className="stockEditField-prices">
          {item.lastPrice} - {item.weightedAvgPrice}
        </p>
      </div>
      <div className="stockEditField-actions">
        <input
          step={0.1}
          value={getAmountValue(item)}
          onChange={setAmountValue}
          type="number"
          className={`stockEditField-input ${
            hasError ? "stockEditField-input-error" : ""
          }`}
        />
        {!isHave ? (
          <Button
            size="small"
            variant={"success"}
            onClick={() => toUpdatePortfolio(item)}
          >
            Add
          </Button>
        ) : (
          <>
            <Button
              size="small"
              variant={isChanged(item) ? "success" : "secondary"}
              onClick={() => toUpdatePortfolio(item)}
            >
              Update
            </Button>
            <Button size="small" variant="danger" onClick={toRemovePortfolio}>
              Remove
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default StockEditField;
