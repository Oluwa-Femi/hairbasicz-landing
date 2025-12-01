import React from "react";
import TotalProductsIcon from "../../assets/TotalProductsIcon.svg";
import ProductManagementCard from "../../components/Product/ProductManagementCard";
import TotalProductsCategoryIcon from "../../assets/TotalProductsCategoryIcon.svg";
import TotalProductsBrand from "../../assets/TotalProductBrands.svg";

const ProductManagementCards = () => {

  return (
    <div>
      <div className="flex gap-6">
        <ProductManagementCard
          Title={"Total Products"}
          Total={"15,000"}
          Icon={TotalProductsIcon}
          TotalColor={"text-[#4F81E5]"}
          BackgroundColor={"bg-[#E3EBFB]"}
        />
        <ProductManagementCard
          Title={"Total Products Category"}
          Total={"24"}
          Icon={TotalProductsCategoryIcon}
          TotalColor={"text-[#FFB43B]"}
          BackgroundColor={"bg-[#FFF4E3]"}
        />
        <ProductManagementCard
          Title={"Total Product Brands"}
          Total={"135"}
          Icon={TotalProductsBrand}
          TotalColor={"text-[#1C1D1F]"}
          BackgroundColor={"bg-[#FEEFEF]"}
        />
      </div>
    </div>
  );
};

export default ProductManagementCards;
