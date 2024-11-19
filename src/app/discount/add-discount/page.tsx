"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePicker from "@/components/FormElements/DatePicker/DatePicker";
import { useState } from "react";

const AddDiscount = () => {
  const [discountCode, setDiscountCode] = useState("");

  function removeSpaces(input: string): string {
    return input.replace(/[^a-zA-Z0-9]/g, ""); // Remove spaces and special characters
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = removeSpaces(e.target.value);
    setDiscountCode(sanitizedValue);
  };

  return (
    <DefaultLayout>
      <Breadcrumb
  items={[
    { name: "Dashboard", href: "/" },
    { name: "Discount", href: "/discount" },
    { name: "Add Discount" }
  ]}
/>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Discount Code
                </label>
                <input
                  type="text"
                  value={discountCode}
                  onChange={handleInputChange}
                  placeholder="Enter discount code"
                  className="uppercase w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
              <DatePicker  title="Select Start Date" />
              </div>
              <div className="mb-4.5">
              <DatePicker title="Select Expired Date" />
              </div>
              

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddDiscount;
