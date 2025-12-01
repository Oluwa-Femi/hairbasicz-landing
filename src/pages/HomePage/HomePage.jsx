import React, { useState, useEffect } from "react";
import CategoryHeader from "../../container/home/CategoryHeader";
import Header from "../../components/Header/Header";
import PopularCategory from "../../container/home/PopularCategory";
import HomepageBody1 from "../../container/home/HomepageBody1";
// import TopBrand from "../../container/home/TopBrands";
import TopSelling from "../../container/home/TopSelling";
import ItemsOnPromotion from "../../container/home/ItemsOnPromotion";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { selectPromotions } from "../../store/Promotions/promotionsSlice";
import {
  getBanners,
  getProductsWithDiscount,
} from "../../store/Promotions/promotionsActions";
import { getTopSellingItems } from "../../store/Products/ProductsActions";
import { selectProducts } from "../../store/Products/productsSlice";
import { getPopularCategory } from "../../store/Categories/CategoriesActions";
import { selectCategories } from "../../store/Categories/categoriesSlice";
import { getPopularBrands } from "../../store/Brands/brandsActions";
import { selectBrands } from "../../store/Brands/brandsSlice";
import imageLoader from "../../assets/loader.png";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanners());
    dispatch(getProductsWithDiscount());
    dispatch(getTopSellingItems());
    dispatch(getPopularCategory());
    dispatch(getPopularBrands({ page: 1, limit: 10 }));
  }, [dispatch]);

  const banners = useSelector(selectPromotions);
  const products = useSelector(selectProducts);
  const popularCategories = useSelector(selectCategories);
  // const popularBrands = useSelector(selectBrands);

  const footerBanner = banners?.data?.data?.footer_banner;
  const bodyBannerOne = banners?.data?.data?.body_banner_one;
  const bodyBannerTwo = banners?.data?.data?.body_banner_two;
  const itemsOnPromotions = banners?.discountedProducts?.data?.products;
  const topSellingItems = products?.topSellingItems?.data;

  const [top, setTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 150 ? setTop(true) : setTop(false);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const handleLoading = () => {
    setIsLoading(false);
  };

  return (
    <div className="bg-[#F7F7F8] w-screen h-full pb-28">
      <Header
        showAllCategories={true}
        showSearchInput
        showBtnAndCart
        top={top}
        showLogInButton
      />
      <div className="bg-black">
        <CategoryHeader suggest />
      </div>
      <div className="grid gap-5 px-28 xsm:px-0 sm:px-0 md:px-10 w-full relative mt-[-25px] xsm:mt-[-20px] pb-[5rem] place-items-center">
        <HomepageBody1 banners={banners} />
        <PopularCategory data={popularCategories} />
        {/* <TopBrand data={popularBrands} /> */}
        <TopSelling
          data={topSellingItems}
          isFetching={products?.isGettingAll}
        />
        <div className="grid grid-cols-2 w-full gap-6 xsm:grid-cols-1 xsm:px-5 sm:px-5 md:px-0 lg:px-0 xl:px-0 2xl:px-0 ">
          {bodyBannerOne !== null && (
            <div>
              <img
                src={isLoading ? imageLoader : bodyBannerOne}
                alt="banner"
                className="w-full rounded-lg"
                onLoad={() => handleLoading()}
              />
            </div>
          )}
          {bodyBannerTwo !== null && (
            <div>
              <img
                src={isLoading ? imageLoader : bodyBannerTwo}
                alt="banner"
                className="w-full rounded-lg"
                onLoad={() => handleLoading()}
              />
            </div>
          )}
        </div>
        {banners?.isGettingAllSuccess && (
          <ItemsOnPromotion
            isFetching={banners?.isGettingAllSuccess}
            data={itemsOnPromotions}
          />
        )}
        {footerBanner !== null && (
          <div className="w-full">
            <div className="w-full">
              <img
                src={isLoading ? imageLoader : footerBanner}
                alt="banner"
                className="w-[100%] rounded-lg"
                onLoad={() => handleLoading()}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
