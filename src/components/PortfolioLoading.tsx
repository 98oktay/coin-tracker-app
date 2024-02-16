import { usePortfolio } from "@/providers/PortfolioProvider";

const PortfolioLoading = () => {
  const { isLoading } = usePortfolio();
  return (
    <div
      className={`portfolioLoading ${!isLoading && `portfolioLoading--hidden`}`}
    >
      <p className="portfolioLoading-text">Loading...</p>
    </div>
  );
};

export default PortfolioLoading;
