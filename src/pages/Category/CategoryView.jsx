import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Sort from "../../components/SortComponent/Sort";
import Product from "../../components/Product/Product";
import { Divider } from "@chakra-ui/react";
import SortByPrice from "../../components/SortComponent/SortByPrice";
import SortByRating from "../../components/SortComponent/SortByRating";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../store/Products/productsSlice";
import { getAllProducts } from "../../store/Products/ProductsActions";
import PageLoader from "../../components/Loader/PageLoader";
import { selectCategories } from "../../store/Categories/categoriesSlice";
import { useDebounce } from "use-debounce";
import { selectBrands } from "../../store/Brands/brandsSlice";
import {
  getAllBrands,
  getPopularBrands,
} from "../../store/Brands/brandsActions";
import { priceRange } from "../../utils/functions/priceRangeSwitch";
import { sortList } from "../../utils/MockData/sortBy";
import { getAllCategories } from "../../store/Categories/CategoriesActions";
import NoProductFound from "../../components/Product/NoProductFound";
import { getBanners } from "../../store/Promotions/promotionsActions";
import { selectPromotions } from "../../store/Promotions/promotionsSlice";
import imageLoader from "../../assets/loader.png";

function CategoryView() {
  const itemsPerPage = 12;
  const [itemOffset] = useState(0);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [priceValue, setPriceValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortIndex, setSortIndex] = useState(sortList[0]);
  const [searchDebounce] = useDebounce(searchValue, 1000);
  const [ratingValue, setRatingValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  let params = useParams();
  const [query] = useSearchParams();
  const categoryType = query.get("type");
  const pageTitle = params?.name;
  const AllCategories = useSelector(selectCategories);
  const AllProducts = useSelector(selectProducts);
  const AllBrands = useSelector(selectBrands);
  const subProducts = AllProducts?.data;
  const banners = useSelector(selectPromotions);

  useEffect(() => {
    dispatch(
      getAllProducts({
        page: 1,
        limit: 12,
        [categoryType === "subCategory"
          ? "subCategoryReference"
          : "categoryReference"]: params?.id,
      })
    );
    dispatch(getPopularBrands({ page: 1, limit: 10 }));
    dispatch(getBanners());
  }, [params]);

  useEffect(() => {
    dispatch(getAllBrands({ page: 1, limit: 1000, brandName: searchDebounce }));
  }, [searchDebounce]);

  const handleFilterByRating = (e) => {
    setRatingValue(e);
    dispatch(getAllProducts({ rating: e }));
    window.scrollTo(0, 0);
  };

  const data = useSelector(selectProducts);

  const products = data?.data?.products;

  useEffect(() => {
    dispatch(getAllCategories({ page: 1, limit: 100 }));
  }, []);
  const handlePriceRange = (e) => {
    setPriceValue(e);
    dispatch(getAllProducts(priceRange(e)));
    window.scrollTo(0, 0);
  };
  const handleProductSearchFilter = ({ el, item, sort }) => {
    setSortIndex(sort?.id);
    if (sort?.value == "allListings") {
      dispatch(getAllProducts({ page: 1, limit: 12 }));
    } else {
      dispatch(
        getAllProducts({
          brand: item?.name,
          subCategoryReference: el?.reference,
          sort: sort?.value,
          fromPrice: minPrice,
          toPrice: maxPrice,
        })
      );
      window.scrollTo(0, 0);
    }
    setMinPrice(null), setMaxPrice(null);
  };

  // const footerBanner = banners?.data?.data?.footer_banner;
  const bodyBannerOne = banners?.data?.data?.body_banner_one;
  const bodyBannerTwo = banners?.data?.data?.body_banner_two;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products
    ? products?.slice(itemOffset, endOffset)
    : subProducts?.slice(itemOffset, endOffset);

  const pageCount = products
    ? products && Math.ceil(Number(data?.data?.total / 12))
    : subProducts && Math.ceil(data?.data?.total / 12);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
    dispatch(getAllProducts({ page: currentPage, limit: 12 }));
    window.scrollTo(0, 0);
  };

  const handleLoading = () => {
    setIsLoading(false);
  };

  return (
    <div className="bg-[#F7F7F8] w-screen h-full pb-28">
      <Header
        showAllCategories={true}
        showSearchInput
        showBtnAndCart
        showLogInButton
        top
      />
      <Sort
        pageTitle={pageTitle}
        sortList={sortList}
        sortIndex={sortIndex}
        onClick={(sort) => handleProductSearchFilter({ sort })}
      />
      <div className="lg:px-[128px] mt-6 pb-[72px] grid gap-6">
        <div className="w-full  flex ">
          <div className="bg-white border-[0.5px] border-[#D8DCE2] border-solid rounded-lg w-[25%] xsm:hidden sm:hidden ">
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
          <div className="bg-white rounded-lg w-full xl:w-[75%] md:ml-5 lg:ml-5 xl:ml-[24px] 2xl:ml-8 p-[24px]">
            {AllProducts?.isGettingAll ? (
              <PageLoader />
            ) : currentItems?.length === 0 ? (
              <NoProductFound />
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                {currentItems?.map((item, index) => (
                  <Product menu={item} key={index} />
                ))}
              </div>
            )}
            {!AllProducts?.isGettingAll && data?.data?.total > 12 && (
              <Pagination
                handlePageClick={handlePageClick}
                pageCount={pageCount}
                currentPage={currentPage}
                forcePage={currentPage - 1}
              />
            )}
          </div>
        </div>
        <div className="xsm:px-5 sm: px-5 grid sm:grid-cols-1 xsm:grid-cols-1 grid-cols-2 w-full gap-6">
          <div>
            <img
              src={isLoading ? imageLoader : bodyBannerOne}
              alt="banner"
              className="w-full rounded-lg"
              onLoad={() => handleLoading()}
            />
          </div>
          <div>
            <img
              src={isLoading ? imageLoader : bodyBannerTwo}
              alt="banner"
              className="w-full rounded-lg"
              onLoad={() => handleLoading()}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CategoryView;
