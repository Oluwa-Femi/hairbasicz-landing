/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import BackgroundImage from "../../assets/Trolly.jpg";
import MobileBackgroundImage from "../../assets/MobileTrolly.jpg";
import SearchInput from "../../components/Input/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../store/Products/ProductsActions";
import { selectProducts } from "../../store/Products/productsSlice";

function CategoryHeader() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(true);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();
  const AllProducts = useSelector(selectProducts);
  const productData = AllProducts?.data?.products;

  useEffect(() => {
    dispatch(getAllProducts({ limit: Number.MAX_SAFE_INTEGER }));
  }, []);

  useEffect(() => {
    const filtered = productData?.filter(
      (product) =>
        product?.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        product?.tags?.some((tag) =>
          tag?.toLowerCase().includes(searchValue?.toLowerCase())
        )
    );
    setFilteredSuggestions(filtered);
  }, [searchValue, productData]);

  const onChange = (e) => {
    setSearchValue(e.target.value);
    setShowDropdown(true);
  };
  const onSearch = (item) => {
    setSearchValue(item);
    setShowDropdown(false);
    dispatch(getAllProducts({ search: item })), navigate(`/search/${item}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchValue(searchValue);
      dispatch(getAllProducts({ search: searchValue })),
        navigate(`/search/${searchValue}`);
    }
  };
  const handleSearch = () => {
    dispatch(getAllProducts({ search: searchValue })),
      navigate(`/search/${searchValue}`);
  };
  return (
    <div className="relative flex justify-center items-center w-full min-h-[168px]">
      <img
        src={MobileBackgroundImage}
        className="lg:hidden xl:hidden 2xl:hidden min-w-full"
        alt=""
      />
      <img
        src={BackgroundImage}
        alt="menu-icon"
        className="relative min-w-full hidden lg:block xl:block 2xl:block"
      />
      <div className="absolute">
        <SearchInput
          width={
            "w-[350px] md:w-[530px] lg:w-[730px] xl:w-[730px] 2xl:w-[730px]"
          }
          height={"h-[48px]"}
          borderRadius={"rounded-[8px]"}
          placeholder={"What are you looking for..."}
          buttonHeight={"h-[44px]"}
          btnTop={"top-[-12%]"}
          btnRight={"right-[1.6px]"}
          onChange={(e) => onChange(e)}
          onClick={() => handleSearch()}
          onKeyDown={(e) => handleKeyDown(e)}
          value={searchValue}
        />
        {searchValue && showDropdown && (
          <div className="absolute mt-1 w-full overflow-y-auto bg-white rounded-bl rounded-br p-2 max-h-28 shadow-lg z-50">
            {filteredSuggestions?.length === 0 && (
              <div className="text-[10px] py-[2px]"> No result found</div>
            )}
            {filteredSuggestions?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => onSearch(item?.name)}
                  className="cursor-pointer hover:bg-[#FAF9F9] text-[12px] py-[2px]"
                >
                  {item?.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryHeader;
