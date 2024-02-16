"use client";
import { usePortfolio } from "@/providers/PortfolioProvider";
import dynamic from "next/dynamic";
import PortfolioLoading from "./PortfolioLoading";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Asset = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  lastPrice: string;
  amount: number;
};

type PieChartProps = {
  assets: Asset[];
};

const PieChart = ({ assets }) => {
  const { items, isLoading } = usePortfolio();

  const option = {
    fill: {
      opacity: 1,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "bottom",
    },
    dataLabels: {
      formatter: function (val, opts) {
        return `${items[opts.seriesIndex].amount} x ${
          items[opts.seriesIndex].weightedAvgPrice
        }`;
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        color: "#00ff00",
        shadeTo: "dark",
        shadeIntensity: 0.9,
      },
    },
    labels: items.map((asset) => asset.symbol),
  };

  const totalAmount = items.reduce((acc, asset) => acc + asset.amount, 0);

  const series = items.map((asset) => asset.amount / totalAmount);

  return (
    <div className="pieChart">
      {!isLoading && !items.length && (
        <div className="pieChart-noItems">
          <p>No items for PieChart</p>
        </div>
      )}
      <ApexChart
        type="pie"
        options={option}
        series={series}
        height={"100%"}
        width={"100%"}
      />
      <PortfolioLoading />
    </div>
  );
};

export default PieChart;
