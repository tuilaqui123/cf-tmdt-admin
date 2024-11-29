import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";



import RevenueChart from "@/components/Dashboard/RevenueChart";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";



const Revenue = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Revenue" />

      <div className="flex flex-col gap-10">
      <RevenueChart />
      </div>
    </DefaultLayout>
  );
};

export default Revenue;
