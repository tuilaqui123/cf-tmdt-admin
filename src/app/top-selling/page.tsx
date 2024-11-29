"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { useContext, useState } from "react";
import { Contexts } from "../Contexts";
import TopSellingDashboard from "@/components/Dashboard/TopSelling";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface Product {
  name: string;
  sales: number;
  image: string;
}

interface Item {
  product: {
    _id: string;
    name: string;
    image: string;
  };
  quantity: number;
}

const TopSelling = () => {
  const { orders } = useContext(Contexts);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const filterOrdersByDate = (orders: Order[]) => {
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const orderDay = orderDate.getDate();
      const orderMonth = orderDate.getMonth() + 1; // Tháng bắt đầu từ 0
      const orderYear = orderDate.getFullYear();

      const isDayMatch = selectedDate
        ? orderDay === parseInt(selectedDate)
        : true;
      const isMonthMatch = selectedMonth
        ? orderMonth === parseInt(selectedMonth)
        : true;
      const isYearMatch = selectedYear
        ? orderYear === parseInt(selectedYear)
        : true;

      return isDayMatch && isMonthMatch && isYearMatch;
    });
  };

  const filteredOrders = filterOrdersByDate(orders);

  const productSales = filteredOrders.reduce(
    (
      acc: Record<string, { name: string; sales: number; image: string }>,
      order,
    ) => {
      order.items.forEach((item) => {
        const productId = item.product._id;
        const productName = item.product.name;
        const productQuantity = item.quantity;

        if (acc[productId]) {
          acc[productId].sales += productQuantity;
        } else {
          acc[productId] = {
            name: productName,
            sales: productQuantity,
            image: item.product.image,
          };
        }
      });
      return acc;
    },
    {},
  );

  const topSellingProducts = Object.values(productSales);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Revenue" />

      <div className="container mx-auto py-12 ">
        {/* Form để chọn ngày, tháng, năm */}

        <div className="mb-5 flex flex-row place-items-center items-center space-x-4 ">
          <p className="text-lg font-semibold">Chọn Thời Gian:</p>
          <div className="basis-1/4 flex flex-row gap-2">
          <input
            type="number"
            min="1"
            max="31"
            placeholder="Ngày"
            className="border px-4 py-2 rounded-lg flex-grow text-center bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <input
            type="number"
            min="1"
            max="12"
            placeholder="Tháng"
            className="border px-4 py-2 rounded-lg flex-grow w-20 text-center bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
          <input
            type="number"
            min="2000"
            placeholder="Năm"
            className="border px-4 py-2 rounded-lg flex-grow w-24 text-center bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />
        </div>
          </div>


        {/* Hiển thị Dashboard sản phẩm bán chạy */}
        <TopSellingDashboard products={topSellingProducts} />
      </div>
    </DefaultLayout>
  );
};

export default TopSelling;
