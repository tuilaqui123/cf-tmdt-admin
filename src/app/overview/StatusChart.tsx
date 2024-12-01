import React from 'react';
import { PieChart } from '@mui/x-charts';

interface StatusChartProps {
  data: { label: string; value: number }[];  // Cập nhật lại kiểu dữ liệu
}

const StatusChart: React.FC<StatusChartProps> = ({ data }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Tình trạng đơn hàng</h3>
      <PieChart
        series={[
          {
            data,  // Truyền data vào series
            type: 'pie',
          },
        ]}
        height={300}
        tooltip={{
          trigger: 'item',  // Hiển thị tooltip khi hover
        }}
        slotProps={{
          legend: {
            position: { vertical: 'middle', horizontal: 'right' }, // Đặt vị trí legend ở giữa
          },
        }}
      />
    </div>
  );
};

export default StatusChart;
