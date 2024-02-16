"use client";
import AddRemoveModal from "@/components/AddRemoveModal";
import StockList from "@/components/StockList";
import Button from "@/components/Button";
import ActionButtons from "@/components/ActionButtons";
import PieChart from "@/components/PieChart";
import { PortfolioProvider } from "@/providers/PortfolioProvider";

export default function Home() {
  return (
    <main className="app">
      <section className="container">
        <PortfolioProvider>
          <div className="portfolioList">
            <ActionButtons />
            <StockList />
          </div>
          <PieChart />
          <AddRemoveModal />
        </PortfolioProvider>
      </section>
    </main>
  );
}
