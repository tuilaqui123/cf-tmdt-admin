"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import OrderTable from "@/components/Tables/OrderTable";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const TablesPage = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const toggleStatus = (status: string) => {
    setFilterStatus((prevStatus) => (prevStatus === status ? "all" : status));
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Quản lý đơn hàng" />

      <div className="flex items-center justify-end gap-5 rounded-md p-2 mb-4 dark:bg-meta-4">
        <button
          onClick={() => toggleStatus("pending")}
          className=" rounded px-3  py-1 font-medium text-warning  shadow-card 
        shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card 
        dark:bg-cyan-950 dark:text-warning dark:hover:bg-[#3d50e0] dark:hover:text-white"
        >
          Chờ xác nhận
        </button>
        <button
          onClick={() => toggleStatus("confirmed")}
          className=" rounded px-3  py-1 font-medium text-orange-500  shadow-card 
        shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card 
        dark:bg-cyan-950  dark:hover:bg-[#3d50e0] dark:hover:text-white"
        >
          Đã xác nhận
        </button>
        <button
          onClick={() => toggleStatus("doing")}
          className=" rounded px-3  py-1 font-medium text-blue-500  shadow-card 
        shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card 
        dark:bg-cyan-950   dark:hover:bg-[#3d50e0] dark:hover:text-white"
        >
          Đang làm
        </button>
        <button
          onClick={() => toggleStatus("shipping")}
          className=" rounded px-3  py-1 font-medium text-zinc-500  shadow-card 
        shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card 
        dark:bg-cyan-950   dark:hover:bg-[#3d50e0] dark:hover:text-white"
        >
          Đang vận chuyển
        </button>
        <button
          onClick={() => toggleStatus("success")}
          className=" rounded px-3  py-1 font-medium text-success  shadow-card 
        shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card 
        dark:bg-cyan-950 dark:text-success  dark:hover:bg-[#3d50e0] dark:hover:text-white"
        >
          Thành công
        </button>
        <button 
          onClick={() => toggleStatus("fail")}
          className=" text-danger rounded  px-3 py-1 font-medium  shadow-card 
          shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card 
          dark:bg-cyan-950 dark:text-danger dark:hover:bg-[#3d50e0] dark:hover:text-white">            
          Thất bại
          </button>
        <button 
          onClick={() => toggleStatus("systemCancel")}
          className=" text-danger rounded  px-3 py-1 font-medium  shadow-card 
          shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card 
          dark:bg-cyan-950 dark:text-danger dark:hover:bg-[#3d50e0] dark:hover:text-white">            
          Hệ thống hủy
          </button>
          <button 
          onClick={() => toggleStatus("customerCancel")}
          className=" text-danger rounded  px-3 py-1 font-medium  shadow-card 
          shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card 
          dark:bg-cyan-950 dark:text-danger dark:hover:bg-[#3d50e0] dark:hover:text-white">            
         Khách hàng hủy
          </button>
      </div>
      <div className="flex flex-col gap-10">
        <OrderTable
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
