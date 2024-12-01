import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts';

interface RevenueChartProps {
  data: { date: string; revenue: number }[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const [timeFilter, setTimeFilter] = useState<'day' | 'month' | 'year'>('day'); // Mặc định lọc theo ngày

  // Kiểm tra nếu không có dữ liệu thì không render biểu đồ
  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Doanh thu theo thời gian</h3>
        <p className="text-center text-gray-500">Không có dữ liệu</p>
      </div>
    );
  }

  // Chuyển đổi dữ liệu theo filter
  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map((item) => parseInt(item, 10));
    return new Date(year, month - 1, day); // Lưu ý tháng trong JavaScript bắt đầu từ 0
  };

  const formatDate = (dateString: string, filter: 'day' | 'month' | 'year'): string => {
    const date = parseDate(dateString);
    if (filter === 'month') {
      return `${date.getFullYear()}-${date.getMonth() + 1}`; // Tháng (YYYY-MM)
    } else if (filter === 'year') {
      return `${date.getFullYear()}`; // Năm (YYYY)
    }
    return date.toLocaleDateString(); // Ngày (DD/MM/YYYY)
  };

  // Tổng hợp doanh thu theo ngày, tháng, hoặc năm
  const aggregateData = (data: { date: string; revenue: number }[], filter: 'day' | 'month' | 'year') => {
    const groupedData: Record<string, number> = {};

    data.forEach((d) => {
      const formattedDate = formatDate(d.date, filter);
      if (groupedData[formattedDate]) {
        groupedData[formattedDate] += d.revenue; // Cộng doanh thu nếu đã có ngày trong nhóm
      } else {
        groupedData[formattedDate] = d.revenue; // Tạo nhóm mới cho ngày, tháng, năm
      }
    });

    // Chuyển đổi groupedData thành mảng các giá trị để vẽ biểu đồ
    const result = Object.keys(groupedData).map((key) => ({
      date: key,
      revenue: groupedData[key],
    }));

    return result;
  };

  // Dữ liệu đã tổng hợp theo bộ lọc
  const aggregatedData = aggregateData(data, timeFilter);

  // Dữ liệu series và xAxis đã được xử lý theo filter
  const seriesData = aggregatedData.map((d) => d.revenue);
  const xAxisData = aggregatedData.map((d) => d.date);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Doanh thu theo thời gian</h3>

      {/* Nút lọc */}
      <div className="mb-4">
        <label className="mr-2 text-gray-600">Lọc theo: </label>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value as 'day' | 'month' | 'year')}
          className="border p-2 rounded"
        >
          <option value="day">Ngày</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>
      
      <div className='w-full'>
      <LineChart
        series={[{ type: 'line', data: seriesData }]}
        xAxis={[
          {
            scaleType: 'band', // Sử dụng 'band' vì chúng ta đang làm việc với dữ liệu đã được nhóm
            data: xAxisData,   // Dữ liệu ngày dưới dạng chuỗi
          },
        ]}
        height={300}
        
        tooltip={{
          valueFormatter: (value) => `${value.toLocaleString()} VND`, // Định dạng tooltip
        }}
      />
      </div>
    </div>
  );
};

export default RevenueChart;
