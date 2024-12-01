import React from "react";
import { BarChart } from "@mui/x-charts";

interface ProductChartProps {
  data: { product: any; sales: number }[];
}

const ProductChart: React.FC<ProductChartProps> = ({ data }) => {
  
  const seriesData = data.map((d) => d.sales);
  const xAxisData = data.map((d) => d.product.name);
  console.log(xAxisData);
  const valueFormatter = (value) => `${value} bán ra`
  return (
    <div className="rounded-lg bg-white p-4 shadow h-auto">
      <h3 className="mb-4 text-sm font-medium text-gray-500">
        Biểu đồ bán chạy
      </h3>
      <div className="w-full h-auto">
        <BarChart
          
          xAxis={[
            {
              data: xAxisData,
              scaleType: "band",

            },
          ]}
          height={700}
          series={[{ data: seriesData, valueFormatter }]}
          bottomAxis={{
      
            tickLabelStyle: {
              angle: 62,
              textAnchor: 'start',
              fontSize: 15,
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProductChart;
