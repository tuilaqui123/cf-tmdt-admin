import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DiscountTable from "@/components/Tables/DiscountTable";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Discount" />
      <div className="flex flex-row w-full justify-between">
        <Link 
          href="/discount/add-discount"
          className="mb-3 inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-center font-normal text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
        >
          Add Discount
        </Link>
        <div className="flex items-center  gap-3 rounded-md bg-whiter p-2 dark:bg-meta-4 ">
          <button className=" text-success rounded  px-3 py-1 font-medium  shadow-card shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
            Available
          </button>
          <button className="text-danger rounded px-3 py-1 font-medium shadow-card shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
            Expired
          </button>
          
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <DiscountTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
