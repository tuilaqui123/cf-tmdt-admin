import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import OrderTable from "@/components/Tables/OrderTable";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order Management" />

      <div className="inline-flex items-center gap-3 rounded-md bg-whiter p-2 dark:bg-meta-4 pb-4">
        <button className=" rounded  px-3 py-1 font-medium text-black shadow-card shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
          Pending
        </button>
        <button className="rounded px-3 py-1 font-medium text-black shadow-card shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
          Delivering
        </button>
        <button className="rounded px-3 py-1 font-medium text-black shadow-card shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
          Delivered
        </button>
      </div>
      <div className="flex flex-col gap-10">
        <OrderTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
