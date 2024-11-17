import Image from "next/image";
import { Product } from "@/types/product";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
const customerData: Customer[] = [
  {
    image: "/images/user/user-06.png",
    fullName: "Anh Minh dz",
    email: "gg@gmail.com",
    birthday: "01/01/2022"
  },
  {
    image: "/images/user/user-06.png",
    fullName: "Xoắn dé",
    email: "gg@gmail.com",
    birthday: "01/01/2022"
  },
  {
    image: "/images/user/user-06.png",
    fullName: "UIT 88",
    email: "gg@gmail.com",
    birthday: "01/01/2022"
  },
  {
    image: "/images/user/user-06.png",
    fullName: "Giá xăng đốt",
    email: "gg@gmail.com",
    birthday: "01/01/2022"
  },
  
];

const CustomerTable = () => {
  return (
    <DefaultLayout>

    
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Customers
        </h4>
      </div>

      <div className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-bold">Full Name</p>
        </div>
        <div className="col-span-3 hidden items-center sm:flex">
          <p className="font-bold">Email</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-bold">Birthday</p>
        </div>
      </div>

      {customerData.map((customer, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                width={200}
                height={150}
                style={{
                  width: "auto",
                  height: "auto",
                }}
                  src={customer.image}
                  
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {customer.fullName}
              </p>
            </div>
          </div>
          <div className="col-span-3 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {customer.email}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {customer.birthday}
            </p>
          </div>
       
        </div>
      ))}
    </div>
    </DefaultLayout>
  );
};

export default CustomerTable;
