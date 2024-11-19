import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import OrderTable from "@/components/Tables/OrderTable";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";



const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order Table" />

      <div className="flex flex-col gap-10">
        
        <OrderTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
