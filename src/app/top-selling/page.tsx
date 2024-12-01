"use client";

import React, { useContext } from "react";
import { Contexts } from "../Contexts";
import ProductCard from "./ProductCard";
import ProductChart from "./ProductChart";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ProductTracking = () => {
  const { orders, products } = useContext(Contexts);

  const productSales = orders.reduce(
    (acc, order) => {
      order.items.forEach((item) => {
        const product = item.product;
        if (product) {
          const productId = product._id;
          if (!acc[productId]) acc[productId] = { product, sales: 0 };
          acc[productId].sales += item.quantity;
        }
      });
      return acc;
    },
    {} as Record<string, { product: any; sales: number }>,
  );

  const productSalesToday = orders.reduce(
    (acc, order) => {
      const orderDate = new Date(order.createdAt).toLocaleDateString("en-GB");
      const todayDate = new Date().toLocaleDateString("en-GB");

      if (orderDate === todayDate) {
        order.items.forEach((item) => {
          const product = item.product;
          if (product) {
            const productId = product._id;
            if (!acc[productId]) acc[productId] = { product, sales: 0 };
            acc[productId].sales += item.quantity; // Chỉ cộng số lượng
          }
        });
      }
      return acc;
    },
    {} as Record<string, { product: any; sales: number }>,
  );

  const topSellingProducts = Object.values(productSales)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);
    const topSellingProductsToday = Object.values(productSalesToday)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);


  const topSellingProducts10 = Object.values(productSales)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10);

  const topDiscountedProducts = products
    .filter((product) => product !== null)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 5);

  const unsoldProducts = products.filter(
    (product) => product !== null && !productSales[product._id],
  );


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Tracking" />
      <div className="min-h-screen bg-gray-100 p-8">
      <div className="w-full">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Top 5 Sản phẩm bán chạy hôm nay
          </h2>
        </div>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {topSellingProductsToday.map((item) => (
            <ProductCard
              key={item.product._id}
              item={item.product}
              sales={item.sales}
            />
          ))}
        </div>
        <div className="w-full ">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Top 5 Sản phẩm bán chạy nhất
          </h2>
        </div>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {topSellingProducts.map((item) => (
            <ProductCard
              key={item.product._id}
              item={item.product}
              sales={item.sales}
            />
          ))}
        </div>

        <div className="w-full ">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Top 5 giảm giá nhiều nhất
          </h2>
        </div>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {topDiscountedProducts.map((product) => (
            <ProductCard key={product._id} item={product} discount={true} />
          ))}
        </div>

        <ProductChart data={topSellingProducts10} />
      </div>
    </DefaultLayout>
  );
};

export default ProductTracking;
