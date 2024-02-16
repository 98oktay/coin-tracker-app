import { usePortfolio } from "@/providers/PortfolioProvider";
import Button from "./Button";

const ActionButtons = () => {
  const { refresh, toggleSearch } = usePortfolio();

  return (
    <div className="actionButtons">
      <Button onClick={toggleSearch}>Add Stock</Button>
      <Button onClick={refresh}>Refresh</Button>
    </div>
  );
};

export default ActionButtons;
