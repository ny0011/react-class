import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: "string";
  time_close: "string";
  open: "number";
  high: "number";
  low: "number";
  close: "number";
  volume: "number";
  market_cap: "number";
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => parseInt(price.close, 10)),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              labels: {
                show: false,
              },
              categories: data?.map((price) =>
                price.time_open.slice(0, price.time_open.indexOf("T"))
              ),
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
