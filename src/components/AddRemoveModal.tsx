"use client";

import Link from "next/link";
import Button from "./Button";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/providers/PortfolioProvider";
import StockEditField from "./StockEditField";

function AddRemoveModal() {
  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { searchVisible, items, assets, toggleSearch, error } = usePortfolio();
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        toggleSearch();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [toggleSearch]);

  useEffect(() => {
    setSearchText("");
  }, [searchVisible]);

  useEffect(() => {
    if (searchText) {
      setFilteredItems(
        assets.filter((item) =>
          item.symbol.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setShowResults(true);
    } else {
      setFilteredItems([]);
      setShowResults(false);
    }
  }, [searchText, assets]);

  if (!searchVisible) {
    return null;
  }

  return (
    <div className="addRemoveModal">
      <div className="addRemoveModal-container">
        <div>
          <div className="addRemoveModal-header">
            <h3 className="addRemoveModal-title">Add Portfolio</h3>
            <Button onClick={toggleSearch}>Close</Button>
          </div>

          <div className="addRemoveModal-search">
            <input
              type="text"
              placeholder="Search"
              className="addRemoveModal-searchInput"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <ul className="addRemoveModal-list">
            {!!error && (
              <li className="addRemoveModal-error">
                <p>{error}</p>
              </li>
            )}
            {!!showResults && (
              <p>
                {filteredItems.length} results for &quot;{searchText}&quot;
              </p>
            )}
            {!!showResults
              ? filteredItems.map((item) => (
                  <li key={item.symbol} className="addRemoveModal-listItem">
                    <StockEditField item={item} />
                  </li>
                ))
              : items.map((item) => (
                  <li key={item.symbol} className="addRemoveModal-listItem">
                    <StockEditField item={item} />
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddRemoveModal;
