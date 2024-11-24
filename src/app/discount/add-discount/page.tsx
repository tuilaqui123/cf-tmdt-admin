"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePicker from "@/components/FormElements/DatePicker/DatePicker";
import { useState, useCallback } from "react";
import VoucherTypeOption from "@/components/SelectGroup/VoucherTypeOption";
// import { usePathname } from "next/navigation";
const AddDiscount = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [expiredtDate, setExpiredDate] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [discountValue, setDiscountValue] = useState(0);
  function convertDateFormat(date: string): string {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }
  function convertToDate(date: string): Date {
    const [day, month, year] = date.split('/');
    return new Date(`${year}-${month}-${day}`);
  }
  const handleSubmit = () => {
    if (!discountCode) {
      alert("Vui lòng nhập code cho discount");
      return;
    }
    if (!startDate) {
      alert("Vui lòng chọn ngày bắt đầu cho discount");
      return;
    }
    if (!expiredtDate) {
      alert("Vui lòng nhập ngày kết thúc cho discount");
      return;
    }
    const currentDate = new Date();
    if (convertToDate(expiredtDate) < currentDate || convertToDate(expiredtDate) < convertToDate(startDate) ) {
      alert("Vui lòng nhập ngày hết hạn không nhỏ hơn hạn ngày hiện tại hoặc ngày bắt đầu");
      return;
    }
    if (!type) {
      alert("Vui lòng chọn loại discount");
      return;
    }
    if (!discountValue) {
      alert("Vui lòng nhập giá trị discount");
      return;
    }
    if (type=="Trade" && discountValue > 100) {
      alert("Vui lòng nhập giá trị discount bé hơn 100(%)");
      return;
    }
    fetch("http://localhost:8081/v1/api/user/vouchers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: discountCode,
        startDay: convertDateFormat(startDate),
        endDay: convertDateFormat(expiredtDate),
        type: type.toLowerCase(),
        value: discountValue
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Tạo voucher thành công");

        } else {
          alert("Tạo voucher thất bại");
        }
      })
      .catch((err) => console.error(err));
  };

  function removeSpaces(input: string): string {
    return input.replace(/[^a-zA-Z0-9]/g, ""); // Remove spaces and special characters
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = removeSpaces(e.target.value);
    setDiscountCode(sanitizedValue);
  };
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDiscountValue(value);
  };
  console.log(discountValue);

  const handleStartDateChange = useCallback((date: string) => {
    setStartDate(date);
    console.log("Ngày start đã chọn:", convertDateFormat(date)); // Xử lý giá trị tại đây
  }, []);

  const handleExpiredDateChange = useCallback((date: string) => {
    setExpiredDate(date);
    console.log("Ngày expired đã chọn:", date); // Xử lý giá trị tại đây
  }, []);

  const handleTypeChange = (selectedType: string) => {
    setType(selectedType);
    console.log("Type đã chọn:", selectedType); // Xử lý giá trị tại đây
  };
  return (
    <DefaultLayout>
      <Breadcrumb
        items={[
          { name: "Dashboard", href: "/" },
          { name: "Discount", href: "/discount" },
          { name: "Add Discount" },
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 uppercase text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <DatePicker
                  title="Select Start Date"
                  onDateChange={handleStartDateChange}
                />
              </div>
              <div className="mb-4.5">
                <DatePicker
                  title="Select Expired Date"
                  onDateChange={handleExpiredDateChange}
                />
              </div>
              <div className="mb-4.5">
                <VoucherTypeOption onVoucherChange={handleTypeChange} />
              </div>
              {type == "Trade" ? (
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Discount Value (%)
                  </label>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={handleValueChange}
                    placeholder="Enter discount code"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 uppercase text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              ) : type == "Chain" ? (
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Discount Value (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={handleValueChange}
                    placeholder="Enter discount code"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 uppercase text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              ) : (
                <div></div>
              )}

              <button
              onClick={handleSubmit} 
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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
