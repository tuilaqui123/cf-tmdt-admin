import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DiscountTable from "@/components/Tables/DiscountTable";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";



const TablesPage = () => {
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Discount" />

      <Link
              href="/discount/add-discount"
              className="mb-3 inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-center font-normal text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
            >
              Add Discount
            </Link>
      <div className="flex flex-col gap-10">
        <DiscountTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
