"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectCategoryOption from "@/components/SelectGroup/SelectOption";
import ProductStatusOption from "@/components/SelectGroup/ProductStockOption";
import { useState, useRef, useContext, useEffect } from "react";
import { Contexts } from "@/app/Contexts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
interface PriceItem {
  size: string;
  price: number;
}

const EditProduct = ({ params }: { params: { id: string } }) => {
    const { id } = params;
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null| string>(null);
  const [type, setType] = useState<PriceItem[]>([]);
  const [des, setDes] = useState("");
  const [isStock, setIsStock] = useState("");
  const [discount, setDiscount] = useState(0);
  const {fetchProducts}:any = useContext(Contexts)
  const router = useRouter();
  
  useEffect(() => {
    axios
      .get(`http://localhost:8081/v1/api/user/products/` + id)
      .then((res) => {
        setProductName(res.data.name);
        setCategoryName(res.data.categoryId._id);
        setImagePreview(res.data.image);
        setImage(res.data.image);
        setType(res.data.type);
        setDes(res.data.description);
        setDiscount(res.data.discount);
        setIsStock(res.data.isStock);

      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handlePriceChange = (size: string, event: any) => {
    const newPrice = event.target.value;
  
    setType((prevTypes) => 
      prevTypes.map((item) =>
        item.size === size ? { ...item, price: Number(newPrice) } : item
      )
    );
    
  };
  console.log(type);

  const addSize = (size: string) => {
    setType((prevTypes) => {
      // Check if the size already exists
      const sizeIndex = prevTypes.findIndex(item => item.size === size);
      
      if (sizeIndex !== -1) {
        // If the size exists, remove it
        return prevTypes.filter(item => item.size !== size);
      } else {
        // If the size doesn't exist, add it with a default price
        return [...prevTypes, { size, price: 0 }];
      }
    });
  };

  const handleCategoryChange = (selectedType: string) => {
    setCategoryName(selectedType);
    console.log("Type đã chọn:", selectedType); // Xử lý giá trị tại đây
  };
  const handleStatusChange = (selectedType: string) => {
    setIsStock(selectedType);
    console.log("Type đã chọn:", selectedType); // Xử lý giá trị tại đây
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // let reader = new FileReader();
    const file = event.target.files?.[0] || null;

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
      setImage(file);
    }
  };

  console.log(categoryName);
  console.log(des);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData();
  
    // Kiểm tra các giá trị
    if (!productName) {
      toast.warning("Yêu cầu nhập tên sản phẩm", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (!categoryName) {
    
      toast.warning("Yêu cầu chọn loại sản phẩm", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (!des) {
      toast.warning("Yêu cầu nhập mô tả sản phẩm", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (!image) {
      toast.warning("Yêu cầu thêm hình ảnh cho sản phẩm", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (type.length === 0) {
      
      toast.warning("Yêu cầu các type cho sản phẩm", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
    if (!isStock) {
      
      toast.warning("Yêu cầu cập nhật lại status cho sản phẩm", {
        position: "top-right",
        autoClose: 1500
      })
      return;
    }
  
    form.append("name", productName);
    form.append("type", JSON.stringify(type));
    form.append("description", des);
    form.append("categoryId", categoryName);
    form.append("discount", discount.toString());
    form.append("isStock", isStock);
    if (image) {
      form.append("image", image);
    }
  
    axios
      .put(`http://localhost:8081/v1/api/user/products/` + id, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.success == false)
        {
          toast.error("Không thành công", {
            position: "top-right",
            autoClose: 1500
          })
          return;
        }
        console.log('Response:', res.data);
      })
      .catch((err) => {
        
        console.log("Error:", err.response ? err.response.data : err.message);
      })
      .finally(() => {
        
        fetchProducts();
        toast.success("Sửa sản phẩm thành công", {
          position: "top-right",
          autoClose: 2000,
          onClose: () =>{
            router.push("/product/overview")
          }
        })
        
        
      });
  };
  
 
  
  return (
    <DefaultLayout>
      <Breadcrumb
        items={[
          { name: "Dashboard", href: "/" },
          { name: "Product Overview", href: "/product/overview" },
          { name: "Edit Product" },
        ]}
      />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <SelectCategoryOption value={categoryName} onCategoryChange={handleCategoryChange} />
              {categoryName ? (
                <div className="flex flex-col">
                  <div className="mb-4.5 flex flex-row gap-4">
                    <button className="rounded px-3 py-1 font-medium text-black shadow-card shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card dark:text-white dark:hover:bg-boxdark" 
                    type="button" onClick={() => addSize("S")}>
                      Add Size S
                    </button>
                    <button className="rounded px-3 py-1 font-medium text-black shadow-card shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card dark:text-white dark:hover:bg-boxdark" 
                    type="button" onClick={() => addSize("M")}>
                      Add Size M
                    </button>
                    <button className="rounded px-3 py-1 font-medium text-black shadow-card shadow-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-card dark:text-white dark:hover:bg-boxdark" 
                    type="button" onClick={() => addSize("L")}>
                      Add Size L
                    </button>
                  </div>
                  {type ? (
                    type.map((item) => (
                      <div className="mb-4.5" key={item.size}>
                        <label className="capitalize mb-3 block text-sm font-medium text-black dark:text-white">
                          Enter Price for size {item.size}
                        </label>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handlePriceChange(item.size, e)}
                          placeholder="Enter price"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div></div>
              )}
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Product Description
                </label>
                <input
                  type="text"
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
                  placeholder="Enter product description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Product Discount
                </label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Enter product discount (Default value is 0)"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <ProductStatusOption value={isStock}  onStatusChange={handleStatusChange}/>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Attach Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
              {imagePreview && (
                <div className="mt-4">
                  {imagePreview && (
                    <div className="mt-4">
                      <Image
                        width={128}
                        height={128}
                        src={imagePreview}
                        alt="Preview"
                        className="h-32 w-32 rounded-lg border border-stroke object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
              <button
              onClick={handleSubmit}
              
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Edit Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditProduct;
