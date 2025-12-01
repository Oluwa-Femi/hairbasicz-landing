import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Sort from "../../components/SortComponent/Sort";
import Product from "../../components/Product/Product";
import ProductSort from "../../components/SortComponent/SortByCategories";
import { Divider } from "@chakra-ui/react";
import SortByPrice from "../../components/SortComponent/SortByPrice";
import SortByRating from "../../components/SortComponent/SortByRating";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../store/Products/productsSlice";
import { getAllProducts } from "../../store/Products/ProductsActions";
import PageLoader from "../../components/Loader/PageLoader";
import { selectBrands } from "../../store/Brands/brandsSlice";
import { priceRange } from "../../utils/functions/priceRangeSwitch";
import { useDebounce } from "use-debounce";
import { getAllBrands } from "../../store/Brands/brandsActions";
import { sortList } from "../../utils/MockData/sortBy";
import Profile from "../../assets/UserProfileIcon.svg";
import CartIcon from "../../assets/CartIcon.svg";
import Input from "../../components/Input/Input";
import SearchInput from "../../components/Input/SearchInput";
import NoProductFound from "../../components/Product/NoProductFound";

function SearchView() {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const AllBrands = useSelector(selectBrands);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [priceValue, setPriceValue] = useState(null);
  const [ratingValue, setRatingValue] = useState(null);

  const dispatch = useDispatch();
  let params = useParams();
  const data = useSelector(selectProducts);
  const { state, pathname } = useLocation();
  const [sortIndex, setSortIndex] = useState(sortList[0]);
  const [searchDebounce] = useDebounce(searchValue, 1000);
  const searchData = data?.data?.products ? data?.data?.products : data?.data;

  useEffect(() => {
    if (pathname.includes("/top-brands")) {
      dispatch(
        getAllProducts({
          brand: params?.brandName,
          page: currentPage,
          limit: 12
        })
      );
    } else {
      dispatch(
        getAllProducts({ search: params?.id, page: currentPage, limit: 12 })
      );
    }
  }, [currentPage]);

  const handleProductSearchFilter = ({ item, sort }) => {
    setSortIndex(sort?.id);
    if (sort?.value == "allListings") {
      dispatch(getAllProducts({ page: 1, limit: 12 }));
    } else {
      dispatch(
        getAllProducts({
          fromPrice: minPrice,
          toPrice: maxPrice,
          brand: item?.name,
          sort: sort?.value
        })
      );
      window.scrollTo(0, 0);
    }
    setMinPrice(null), setMaxPrice(null);
  };

  useEffect(() => {
    dispatch(
      getAllBrands({
        page: 1,
        limit: 1000,
        brandName: searchDebounce
      })
    );
  }, [searchDebounce]);

  const handlePriceRange = (e) => {
    setPriceValue(e);
    dispatch(getAllProducts(priceRange(e)));
    window.scrollTo(0, 0);
  };

  const handleFilterByRating = (e) => {
    setRatingValue(e);
    dispatch(getAllProducts({ rating: e }));
    window.scrollTo(0, 0);
  };

  const pageTitle = params?.id;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = searchData && searchData?.slice(itemOffset, endOffset);
  const pageCount = searchData && Math.ceil(Number(data?.data?.total / 12));
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
    window.scrollTo(0, 0);
  };

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    dispatch(getAllProducts({ search: e.target.value }));
    window.scrollTo(0, 0);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${e.target.value}`);
    }
  };

  return (
    <div className="lg:bg-[#F7F7F8] xl:bg-[#F7F7F8] 2xl:bg-[#F7F7F8] bg-white w-screen h-full pb-28">
      <Header showSearchInput showBtnAndCart top showLogInButton />
      {/* <Sort
        pageTitle={pageTitle}
        sortList={sortList}
        sortIndex={sortIndex}
        onClick={(sort) => handleProductSearchFilter({ sort })}
      /> */}
      <div className="px-5 lg:px-[128px] xl:px-[128px] 2xl:px-[128px] xsm:mt-0 sm:mt-0 mt-6 pb-[72px] grid gap-6">
        <div className="w-full sticky top-0 z-50 pt-8 bg-white pb-4 md:hidden lg:hidden xl:hidden 2xl:hidden">
          <div className="mt-4 -z-10">
            <SearchInput
              width={"w-full"}
              height={"h-[48px]"}
              borderRadius={"rounded-lg"}
              placeholder="Search..."
              borderSize={"border-[1px]"}
              onChange={(e) => handleSearchChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              value={searchValue}
            />
            <h3 className="text-[16px] font-[Gilroy-Bold] mt-4">
              Search results ({searchData?.length}){" "}
            </h3>
          </div>
        </div>
        <div className="w-[100%] flex">
          <div className="bg-white border-[0.5px] border-[#D8DCE2] border-solid rounded-lg w-[25%] hidden md:block lg:block xl:block 2xl:block">
            <ProductSort />
            <Divider orientation="horizontal" />
            <SortByPrice
              onCustomPriceClick={() => handleProductSearchFilter({})}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              priceValue={priceValue}
              onChange={(e) => handlePriceRange(e)}
            />
            <Divider orientation="horizontal" />
            <SortByRating
              onChange={(e) => handleFilterByRating(e)}
              ratingValue={ratingValue}
            />
          </div>
          <div className="bg-white rounded-lg w-full xl:w-[75%] md:ml-5 lg:ml-5 xl:ml-[24px] 2xl:ml-8 lg:p-[24px] xl:p-[24px] 2xl:p-[24px]">
            {data?.isGettingAll ? (
              <PageLoader />
            ) : (state?.length > 0 ? state : currentItems)?.length === 0 ? (
              <NoProductFound />
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                {(state?.length > 0 ? state : currentItems)?.map(
                  (item, index) => (
                    <Product menu={item} key={index} />
                  )
                )}
              </div>
            )}
            {data?.isGettingAllSuccess && data?.data?.total > 12 && (
              <Pagination
                handlePageClick={handlePageClick}
                pageCount={pageCount}
                currentPage={currentPage}
                forcePage={currentPage - 1}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchView;
