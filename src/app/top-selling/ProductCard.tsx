import React from "react";
import Image from "next/image";

const ProductCard = ({ item, sales, discount }) => {
  return (
    <div className="flex items-center rounded-lg bg-white p-4 shadow">
      {/* Hình ảnh sản phẩm */}
      <div className="h-16 w-16 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          width={64} // Chiều rộng cố định (hoặc có thể thay đổi tùy theo nhu cầu)
          height={64} // Chiều cao cố định
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-medium text-gray-500">{item.name}</h3>
        {sales && (
          <p className="text-lg  text-gray-800">{sales} bán ra</p>
        )}
        {discount && (
          <p className="text-lg  text-gray-800">{item.discount}%</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
