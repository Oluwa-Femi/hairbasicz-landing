/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from "react";
import Counter from "../../components/Counter/Counter";
import { Button } from "../../components/Button/Button";
import CartIcon from "../../assets/WhiteCartIcon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { IconsMenu } from "../../utils/MockData";
import TabComponent from "../../components/Tab/TabComponent";
import ProductReviews from "../../components/Product/ProductReviews";
import ProductsYouMayLike from "../../components/Product/ProductsYouMayLike";
import Footer from "../../components/Footer/Footer";
import Sort from "../../components/SortComponent/Sort";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../store/Products/productsSlice";
import imageLoader from "../../assets/loader.png";
import {
  getAllProducts,
  getSingleVariant
} from "../../store/Products/ProductsActions";
import { useLocation, useParams } from "react-router-dom";
import {
  addProductToCart,
  getCart,
  userInstorage
} from "../../store/Cart/cartActions";
import { selectCart } from "../../store/Cart/cartSlice";
import {
  assignAddCart,
  productInCart
} from "../../utils/functions/CreateNewArray";
import Storage from "../../utils/services/storage";
import StarRating from "../../components/startRating/starRating";
import { priceSplitter } from "../../utils/functions/priceSplitter";
import { Box, Skeleton, Spinner } from "@chakra-ui/react";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const localStorageCart = JSON.parse(Storage.get("localCart"));

  const [count, setCount] = useState(1);

  const id = location && location?.state?.id;
  let params = useParams();
  useEffect(() => {
    dispatch(getCart());
    dispatch(
      getAllProducts({
        limit: Number.MAX_SAFE_INTEGER,
        page: 1
      })
    );
    dispatch(getSingleVariant(id));
  }, [getSingleVariant, params?.id]);

  const data = useSelector(selectProducts);
  const carts = useSelector(selectCart);

  const product = data?.singleVaraint;
  const images = data?.singleVaraint?.images;
  const variants = data?.data.products;
  const cartsProducts = carts?.data?.cart ?? [];
  const productYouMayLike = product?.productsYouMayAlsoLike;
  const productReviews = product?.product_reviews_ratings ?? [];
  const isGetting = data?.isGetting;
  const isLoadingEdit = carts?.isEditing;

  let productArray = [];
  productArray.push(product);

  const newProduct =
    cartsProducts && cartsProducts.find((x) => x.reference === id);

  const [inCart, setInCart] = useState({});

  useEffect(() => {
    const cartItem = productInCart(cartsProducts, id);
    setInCart(cartItem);
  }, [carts]);

  const handleAddToCart = (id) => {
    const cartItems = assignAddCart(variants, id);
    setCount(1);

    const newObj = {};
    newObj[cartItems?.reference] = 1;

    const payload = {
      cartItems: newObj
    };

    const localCart = {
      carts: {
        data: {
          cart: localStorageCart?.carts?.data?.cart ?? []
        }
      }
    };

    localCart?.carts?.data?.cart?.push({ ...cartItems, cart_quantity: 1 });

    dispatch(addProductToCart(userInstorage() ? payload : localCart)).then(
      function () {
        dispatch(getCart());
      }
    );
  };

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  const selectImage = (index) => {
    setCurrentImage(index);
  };

  const thumbnailsRef = useRef(null);

  useEffect(() => {
    const thumbnails = thumbnailsRef?.current;
    const thumbnail = thumbnails.children[currentImage];
    const thumbnailRect = thumbnail?.getBoundingClientRect();
    const thumbnailsRect = thumbnails?.getBoundingClientRect();
    const thumbnailLeft = thumbnailRect?.left - thumbnailsRect.left;
    const thumbnailRight = thumbnailRect?.right - thumbnailsRect.right;
    const thumbnailWidth = thumbnailRect?.width;
    const thumbnailsWidth = thumbnailsRect?.width;
    const thumbnailsScrollLeft = thumbnails?.scrollLeft;

    if (thumbnailLeft < 0) {
      thumbnails.scrollTo({
        left: thumbnailsScrollLeft + thumbnailLeft - 16,
        behavior: "smooth"
      });
    } else if (thumbnailRight > 0) {
      thumbnails.scrollTo({
        left:
          thumbnailsScrollLeft +
          thumbnailRight +
          thumbnailWidth +
          16 -
          thumbnailsWidth,
        behavior: "smooth"
      });
    }
  }, [currentImage]);

  const Specifications = () => {
    let arr = [];
    for (const key in product?.specifications) {
      arr.push(
        <ul key={key} className="mt-4 list-disc">
          <li className="text-[#868A90] capitalize text-[14px]">
            {`${key?.replace(/_/g, " ")}: ${product?.specifications[key]}`}
          </li>
        </ul>
      );
    }
    if (arr?.length > 0) {
      return arr;
    } else {
      return (
        <ul className="mt-4 list-disc">
          <li className="text-[#868A90] capitalize text-[14px]">
            No Specification.
          </li>
        </ul>
      );
    }
  };
  return (
    <div className="bg-[#F7F7F8] w-screen">
      <Header
        showAllCategories
        showSearchInput
        showBtnAndCart
        showLogInButton
        top
      />
      <Sort product={product} />
      <div className="lg:px-[128px] xl:px-[128px] 2xl:px-[128px] mt-6 pb-[72px]">
        <div className="bg-white rounded-[10px] flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-[32px] md:p-[24px] xsm:p-[14px] sm:p-[14px] lg:p-[24px] xl:p-[24px] 2xl:p-[24px]  ">
          <div className="gallery sm:grid sm:place-items-center">
            <div className="main-image w-[358px] h-[239px] md:w-[479px] lg:w-[479px] xl:w-[479px] 2xl:w-[479px] lg:h-[404px] xl:h-[404px] 2xl:h-[404px]">
              {isGetting ? (
                <div className="animate-pulse">
                  <img
                    src={imageLoader}
                    alt="loader"
                    className="w-[425px] h-[425px]"
                  />
                </div>
              ) : (
                <img
                  className="w-[400px] h-[425px] object-contain"
                  src={`${images && images[currentImage]}?${Date.now()}`}
                  alt="Product"
                />
              )}
            </div>
            <div className="relative w-full xsm:mt-24 sm:mt-24 flex justify-center items-center ">
              <div
                className={`xsm:pb-3 sm:pb-3 xsm:mt-32 sm:mt-32 md:mt-32   no-scrollbar thumbnails overflow-auto  scrollbar-hide xsm:w-[98%] sm:w-[87%] md:min-w-[479px] lg:min-w-[479px] w-[479px]  min-h-[116px] flex  xsm:gap-0 sm:gap-0 gap-[10px] grid-cols-${
                  images && images.length
                } `}
                ref={thumbnailsRef}
              >
                {images &&
                  images.map((image, index) => (
                    <div
                      key={index}
                      className={`${
                        currentImage == index && "border-[2px]"
                      } p-3 bg-[#F8F9FB] mt-[16px] min-w-[100px] w-[100px] h-[100px] object-cover mx-[16px] rounded-[8px] border-solid border-[#2922b3] transition-all ease-in-out duration-500 xsm:min-w-[100px] sm:min-w-[100px] overflow-hidden`}
                      style={{
                        transform: `translateX(-${currentImage * 100}%)`
                      }}
                    >
                      {isGetting ? (
                        <img
                          src={imageLoader}
                          className="w-full h-full"
                          alt="loader"
                        />
                      ) : (
                        <img
                          alt="icon"
                          key={index}
                          src={`${image}?${Date.now()}`}
                          className={`${
                            index === currentImage ? "selected" : ""
                          } w-full h-full object-contain`}
                          onClick={() => selectImage(index)}
                        />
                      )}
                    </div>
                  ))}

                <div
                  onClick={prevImage}
                  className="absolute cursor-pointer top-[40%] left-[-2%] sm:left-5 w-6 h-6 bg-white rounded-full grid place-items-center drop-shadow-lg"
                >
                  <FontAwesomeIcon
                    className="text-[#5F6166]"
                    icon={faAngleLeft}
                  />
                </div>

                <div
                  onClick={nextImage}
                  className="absolute cursor-pointer top-[40%] right-[-2%] sm:right-[10%] w-6 h-6 bg-white rounded-full grid place-items-center drop-shadow-lg"
                >
                  <FontAwesomeIcon
                    className="text-[#5F6166]"
                    icon={faAngleRight}
                  />
                </div>
              </div>
            </div>
          </div>
          {isGetting ? (
            <Box
              padding="6"
              width={"100%"}
              display={"grid"}
              placeItems={"center"}
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#2922b3"
                size="lg"
              />
            </Box>
          ) : (
            <div className="md:w-fit w-full">
              <p className="text-[14px] text-[#868A91]">
                {product?.category_name}
              </p>
              <h2 className="font-[Gilroy-Bold] xsm:text-[18px] sm:text-[18px] text-[36px]">
                {product?.name}
              </h2>
              <div className="flex items-center gap-[16px] pb-[16px] border-solid border-b-[1px] border-[rgb(235,238,242)]">
                <p className="text-[16px] text-[#868A91]">
                  Brand:{" "}
                  <span className="text-black">{product?.brand_name}</span>
                </p>
                <span className="text-[#B5BAC2] font-[Gilroy-Medium]">|</span>
                <div className="flex">
                  <StarRating rating={product?.average_rating} />
                </div>
                <div>
                  <p className="text-[16px]">
                    {product.average_rating || 0} review(s)
                  </p>
                </div>
              </div>
              <div className="py-[24px] text-[24px] flex items-center gap-4 border-solid border-b-[1px] border-[rgb(235,238,242)]">
                {product?.discount_amount !== null ? (
                  <div className="flex items-center gap-2">
                    <p className="font-[Gilroy-Bold] text-[18px] md:text-[24px]">
                      ₦{" "}
                      {inCart?.quantity > 1 || newProduct?.cart_quantity > 1
                        ? priceSplitter(
                            product?.discount_amount *
                              (inCart?.quantity || newProduct?.cart_quantity)
                          )
                        : priceSplitter(product?.discount_amount) || 0.0}{" "}
                    </p>
                    {product?.discount_amount !== null && (
                      <span className="text-[12px] text-[#EF4444] line-through">
                        ₦{" "}
                        {inCart?.quantity > 1 || newProduct?.cart_quantity > 1
                          ? priceSplitter(
                              product?.amount *
                                (inCart?.quantity || newProduct?.cart_quantity)
                            )
                          : priceSplitter(product?.amount) || 0.0}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="font-[Gilroy-Bold]">
                      ₦{" "}
                      {inCart?.quantity > 1 || newProduct?.cart_quantity > 1
                        ? priceSplitter(
                            product?.amount *
                              (inCart?.quantity || newProduct?.cart_quantity)
                          )
                        : priceSplitter(product?.amount) || 0.0}
                    </p>
                  </div>
                )}
                {inCart?.discount_amount === null ||
                newProduct?.discount_amount === null ? (
                  <p className="text-[14px] p-[10px] border-solid border-[1px] rounded-[4px] text-center bg-[#EBEEF2] w-fit">
                    Price per month: ₦{" "}
                    {inCart?.quantity > 1 || newProduct?.cart_quantity > 1
                      ? priceSplitter(
                          (inCart?.variant_amount * inCart?.quantity -
                            0.25 *
                              (inCart?.variant_amount * inCart?.quantity)) /
                            5 ||
                            (newProduct?.amount *
                              (inCart?.quantity || newProduct?.cart_quantity) -
                              0.25 *
                                (newProduct?.amount *
                                  (inCart?.quantity ||
                                    newProduct?.cart_quantity))) /
                              5
                        )
                      : priceSplitter(product?.price_per_month || 0.0)}
                  </p>
                ) : (
                  <p className="text-[14px] p-[10px] border-solid border-[1px] rounded-[4px] text-center bg-[#EBEEF2] w-fit">
                    Price per month: ₦{" "}
                    {inCart?.quantity > 1 || newProduct?.cart_quantity > 1
                      ? priceSplitter(
                          (userInstorage() &&
                            (inCart?.discount_amount * inCart?.quantity -
                              0.25 *
                                (inCart?.discount_amount * inCart?.quantity)) /
                              5) ||
                            (newProduct?.discount_amount *
                              newProduct?.cart_quantity -
                              0.25 *
                                (newProduct?.discount_amount *
                                  newProduct?.cart_quantity)) /
                              5
                        )
                      : priceSplitter(product?.price_per_month || 0.0)}
                  </p>
                )}
              </div>
              <div className="pt-[24px]">
                <h2 className="text-[18px] font-[Gilroy-Bold]">
                  About product
                </h2>
                <p className="mt-2 text-[14px]">
                  {product?.product_description}
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  <span className="text-[16px] font-[Gilroy-Bold]">
                    Quantity
                  </span>
                  <Counter
                    id={product?.reference}
                    count={
                      (userInstorage()
                        ? inCart && inCart?.quantity
                        : newProduct && newProduct?.cart_quantity) || "-"
                    }
                    setCount={setCount}
                    carts={cartsProducts}
                    ProductDetailsPage={true}
                    isLoadingEdit={isLoadingEdit}
                    userInstorage={userInstorage}
                    newProduct={newProduct}
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  backgroundColor={"bg-[#2922b3]"}
                  width={
                    "xsm:w-full sm:w-full md:w-full lg:w-full xl:w-[460px] 2xl:w-[500px]"
                  }
                  height={"h-[56px]"}
                  borderRadius={"rounded-[8px]"}
                  label={
                    <div className="flex justify-center items-center gap-2">
                      <img src={CartIcon} alt="" />
                      <span className="font-[Gilroy-Bold] text-[16px] font-[600]">
                        Add to Cart
                      </span>
                    </div>
                  }
                  onClick={() => handleAddToCart(product?.reference)}
                  disabled={
                    (inCart &&
                      Object.values(inCart)?.includes(product?.reference)) ||
                    carts?.isGetting ||
                    isLoadingEdit ||
                    (inCart && !newProduct?.cart_quantity) ||
                    newProduct?.cart_quantity > 0 ||
                    (inCart && !inCart?.quantity)
                  }
                />
              </div>
            </div>
          )}
        </div>
        <div className="lg:grid xl:grid 2xl:grid mt-6 bg-white hidden grid-cols-5 w-full h-[116px] border-[0.5px] border-[#D8DCE2] border-solid rounded-lg content-center">
          {IconsMenu.map((menu, index) => (
            <div
              key={index}
              className="grid gap-1 justify-items-center border-r border-[#D8DCE2] border-solid"
            >
              <span className="p-[8px] bg-[#EFFFED] rounded-full">
                <img src={menu.img} alt="global-icon" className="" />
              </span>
              <h4 className="text-[#000] text-[14px] font-[Gilroy-SemiBold] font-[600]">
                {menu.name}
              </h4>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-white px-[40px] py-[24px] rounded-[10px]">
          <TabComponent
            TabOneTitle={"Product specifications"}
            TabTwoTitle={"Product refund policy"}
            TabOnePanel={
              <div>
                <h2 className="text-[#2F3133] font-[Gilroy-Bold] mt-6">
                  Specifications
                </h2>
                <>{Specifications()}</>
              </div>
            }
            TabTwoPanel={<div>{product?.product_refund_policy}</div>}
          />
        </div>
        <ProductReviews productReviews={productReviews} />
        <ProductsYouMayLike productYouMayLike={productYouMayLike} />
      </div>
      <div></div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
