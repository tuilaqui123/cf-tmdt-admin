import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import ProductTable from "@/components/Tables/ProductTable";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ProductOverview = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Overview" />

      <div className="flex flex-col gap-10">
        
        <ProductTable />
      </div>
    </DefaultLayout>
  );
};

export default ProductOverview;
