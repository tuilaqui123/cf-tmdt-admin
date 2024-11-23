"use client";
import { useState, useContext } from "react";

import Image from "next/image";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Contexts } from "@/app/Contexts";

const CustomerTable = () => {
  const{users}: any = useContext(Contexts);
  // console.log(users);
  return (
    <DefaultLayout>

    
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Customers
        </h4>
      </div>

      <div className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center ">
          <p className="font-bold">Full Name</p>
        </div>
        <div className="col-span-3 hidden items-center sm:flex">
          <p className="font-bold">Email</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-bold">Address</p>
        </div>
      </div>

      {users.map((user:any, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={user._id}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                width={50}
                height={50}
                style={{
                  width: "50",
                  height: "50",
                }}
                src={"/images/user/siu.png"}
                  
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {user.name}
              </p>
            </div>
          </div>
          <div className="col-span-3 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {user.email}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {user.address}
            </p>
          </div>
       
        </div>
      ))}
    </div>
    </DefaultLayout>
  );
};

export default CustomerTable;
