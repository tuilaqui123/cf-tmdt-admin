"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePicker from "@/components/FormElements/DatePicker/DatePicker";
import { useState, useCallback, useContext } from "react";
import VoucherTypeOption from "@/components/SelectGroup/VoucherTypeOption";
import { Contexts } from "@/app/Contexts";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
const AddDiscount = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [expiredtDate, setExpiredDate] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [discountValue, setDiscountValue] = useState(0);

const {fetchVouchers}:any = useContext(Contexts)
const router = useRouter();
  function convertDateFormat(date: string): string {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }
  function convertToDate(date: string): Date {
    const [day, month, year] = date.split('/');
    return new Date(`${year}-${month}-${day}`);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!discountCode) {
    
      toast.warning("Yêu cầu nhập code cho phiếu", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (!startDate) {
      
      toast.warning("Yêu cầu chọn ngày bắt đầu", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (!expiredtDate) {
      
      toast.warning("Yêu cầu chọn ngày hết hạn", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    const currentDate = new Date();
    if (convertToDate(expiredtDate) < currentDate || convertToDate(expiredtDate) < convertToDate(startDate) ) {
      
      toast.warning("Yêu cầu chọn ngày hết hạn lớn hơn ngày bắt đầu và ngày hiện tại", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (!type) {
      toast.warning("Yêu cầu chọn loại phiếu", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (!discountValue) {
      
      toast.warning("Yêu cầu nhập giá trị phiếu", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (type=="Trade" && (discountValue > 50 || discountValue < 0)) {
      toast.warning("Yêu cầu nhập giá trị phần trăm trong khoảng 0-50(%)", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    fetch("http://localhost:8081/v1/api/user/vouchers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: discountCode.toUpperCase(),
        startDay: convertDateFormat(startDate),
        endDay: convertDateFormat(expiredtDate),
        type: type.toLowerCase(),
        value: discountValue
      }),
    })
      .then((res) => res.json())
      .then((data) => {

          console.log(data);
          fetchVouchers()
          toast.success("Tạo phiếu giảm giá thành công", {
            position: "top-right",
            autoClose: 2000,
          });
          router.push("/discount"); 
  })
      .catch((err) => {
        console.error(err);
        toast.error("Tạo phiếu giảm giá thất bại", {
          position: "top-right",
          autoClose: 2000,
        });
      });
      
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
          { name: "Phiếu giảm giá", href: "/discount" },
          { name: "Thêm phiếu" },
        ]}
      />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mã Code
                </label>
                <input
                  type="text"
                  value={discountCode}
                  onChange={handleInputChange}
                  placeholder="Nhập mã phiếu"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 uppercase text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <DatePicker
                value={startDate}
                  title="Chọn ngày bắt đầu"
                  onDateChange={handleStartDateChange}
                />
              </div>
              <div className="mb-4.5">
                <DatePicker
                value={expiredtDate}
                  title="Chọn ngày hết hạn"
                  onDateChange={handleExpiredDateChange}
                />
              </div>
              <div className="mb-4.5">
                <VoucherTypeOption value={type} onVoucherChange={handleTypeChange} />
              </div>
              {type == "Trade" ? (
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Giá trị phần trăm (%)
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
                  Giá trị số tiền giảm (VNĐ)
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
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddDiscount;
