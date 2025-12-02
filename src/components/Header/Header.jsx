/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import CartIcon from "../../assets/Cart.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Button/Button";
import {
  faBars,
  faXmark,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import SearchInput from "../Input/SearchInput";
// import Storage from "../../utils/services/storage";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../store/Categories/CategoriesActions";
import { selectCategories } from "../../store/Categories/categoriesSlice";
import { ArrowContainer, Popover } from "react-tiny-popover";
import MenuIcon from "../../assets/menu.svg";
import { getCart, userInstorage } from "../../store/Cart/cartActions";
import { selectCart } from "../../store/Cart/cartSlice";
import { getAllProducts } from "../../store/Products/ProductsActions";
import classNames from "classnames";
import { CloseIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import NotificationMenu from "../Notifications/NotificationMenu";
import NotificationBell from "../../assets/NotificationIcon.svg";
import AdminDropdown from "../Dropdown/AdminDropdown";
import AllCategoriesPopover from "../../container/Categories/AllCategoriesPopover";
import CategoriesPopover from "../../container/Categories/CategoriesPopover";
import { useLogOut } from "../../hooks/auth/useLogout";
import { PAYSMOSMO_HOME_URL } from "../../utils/constants/config.constant";
import useStoreNav from "../../hooks/useStoreNav";
import useNavMenu from "../../hooks/layouts/useNavMenu.hooks";
import AccountInformationSideBar from "../../pages/AccountInformation/AccountInformationSideBar";
import useCheckToken from "../../hooks/cheks/useCheckToken";
import { queryNotifications } from "../../libs/useQueries/notifications.queries";
import Storage from "../../utils/services/storage";

const Header = ({
  link,
  rightText1,
  rightText2,
  showBtnAndCart,
  showLogInButton,
  showSearchInput,
  showCheckout,
  showAllCategories,
  store,
  top,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [menuIndex, setMenuIndex] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const AllCategories = useSelector(selectCategories);
  const carts = useSelector(selectCart);
  const [token] = useState(Storage.get("user-session-token"));

  const { showMyAccount, toggleMyAccountNav } = useNavMenu();

  const [isPopoverOpen, setIsPopoverOpen] = useState({
    index: 0,
    open: false,
  });
  const [show, setShow] = useState({
    index: 0,
    open: false,
  });
  const { pathname } = useLocation();
  const onHover = (menu, index) => {
    setIsPopoverOpen({
      index: index,
      open: !isPopoverOpen.open,
    });
    setShow({
      open: !show.open,
    });
    setMenuIndex(menu);
  };
  const handleCategoryClick = (menu, index) => {
    setIsPopoverOpen({
      index: index,
      open: false,
    });
    navigate(
      `/category/${menu?.category_name}/${menu?.category_reference}?type=category`
    );
  };

  const handleSubCategoryClick = (el, index) => {
    setIsPopoverOpen({
      index: index,
      open: false,
    });
    navigate(`/category/${el?.name}/${el?.reference}?type=subCategory`);
  };

  const { status: notificationStatus, data: notifications } =
    queryNotifications(1, 10, token ? true : false);

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (notifications) {
      const unread = notifications?.notifications?.filter(
        (each) => each.is_read === false
      );
      setNotificationCount(unread?.length);
    }
  }, [notificationStatus === "success", notifications]);

  useEffect(() => {
    dispatch(getAllCategories({ page: 1, limit: 10 }));
    dispatch(getCart());
  }, [getCart]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    dispatch(getAllProducts({ search: e.target.value }));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${e.target.value}`);
    }
  };
  const cartNumber = carts?.data?.cart?.length;
  const CategoriesData = [
    ...AllCategories?.data?.map((item) => item),
    {
      category_name: "All Categories",
      category_reference: "",
      subcategories: [],
    },
  ];
  const AllCategoriesData = CategoriesData?.reverse().slice(0, 9);
  const CategoryList = AllCategoriesData.flatMap((x) => x);

  const handleGoToProfile = () => {
    navigate("/store/profile");
  };

  const { handleLogout } = useLogOut();
  const { isLoggedIn } = useCheckToken();

  const authscreens =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/onboarding" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/account-created" &&
    location.pathname !== "/reset-password" &&
    location.pathname !== "/verify-account" &&
    location.pathname !== "/forgot-password";

  const isTokenActive = userInstorage();

  const { handleGoToHome, handleSavings } = useStoreNav();

  return (
    <div
      className={`${
        showAllCategories || showCheckout || showSearchInput || store
          ? "sticky"
          : "absolute"
      } top-0 z-50 w-full`}
    >
      <div className="header px-[128px] xsm:px-[20px] sm:px-[20px] md:px-5 py-[16px] flex justify-between items-center text-[#868A90] shadow-[0px_2px_2px_rgba(16,24,40,0.05)] bg-white">
        <div className="flex items-center justify-between lg:justify-normal xl:justify-normal 2xl:justify-normal xsm:w-full sm:w-full md:w-full">
          <a
            className="cursor-pointer"
            onClick={() => handleGoToHome(isLoggedIn)}
          >
            <img src={Logo} alt="logo" />
          </a>
          <div className="flex  md:flex-row-reverse lg:flex-row-reverse xl:flex-row-reverse 2xl:flex-row-reverse items-center gap-[8px] ">
            {showBtnAndCart &&  <div
              className="relative cursor-pointer md:hidden lg:hidden xl:hidden 2xl:hidden"
              onClick={() => navigate("/cart")}
            >
              <img
                className="p-3 border-solid border-[1px] rounded-[8px]"
                src={CartIcon}
                alt="cart"
              />
              {cartNumber > 0 && (
                <div className="absolute text-[9px] font-400 bg-[#EF4444] text-white font-[Gilroy-Bold] w-[16px] h-[16px] rounded-full grid place-items-center top-2 right-2 border-[2px] border-solid border-white">
                  {cartNumber}
                </div>
              )}
            </div>}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="2xl:hidden xl:hidden lg:hidden md:hidden w-[50px] grid place-items-center h-[50px] bg-[#F8F9FB] rounded-[8px]"
            >
              {!isOpen && (
                <FontAwesomeIcon
                  className="text-[black] cursor-pointer text-[20px]"
                  icon={faBars}
                />
              )}
              {isOpen && <CloseIcon color={"black"} fontSize={"20px"} />}
            </div>
            <div className="relative cursor-pointer 2xl:hidden xl:hidden lg:hidden md:hidden xsm:hidden sm:hidden">
              <img
                className="p-3 border-solid border-[1px] rounded-[8px]"
                src={CartIcon}
                alt="cart"
              />
              <div className="absolute text-[9px] font-400 bg-[#EF4444] text-white font-[Gilroy-Bold] w-[16px] h-[16px]  rounded-full grid place-items-center top-2 right-2 border-[2px] border-solid border-white">
                {cartNumber}
              </div>
            </div>
          </div>
          {showCheckout && (
            <h2 className="hidden lg:block xl:block 2xl:block font-[700] text-[24px] text-[#2F3133] font-[Gilroy-Bold] ml-[35vw]">
              Checkout
            </h2>
          )}

          {!showCheckout && !isLoggedIn && (
            <span className="xsm:hidden sm:hidden  md:block border-r-[1px] px-[24px] cursor-pointer">
              <a
                className="hover:text-[#2922b3]"
                onClick={() => handleGoToHome(isLoggedIn)}
                rel="noopener noreferrer"
              >
                Home
              </a>
            </span>
          )}
          {!showCheckout && (
            <div className="px-[24px] items-center gap-3 cursor-pointer xsm:hidden sm:hidden md:flex">
              <div className="flex items-center gap-3">
                <Button
                  width={"w-[140px]"}
                  height={"h-[40px]"}
                  borderRadius={"rounded-[8px]"}
                  backgroundColor={"bg-[#2922b3]"}
                  fontSize={"text-[14px]"}
                  fontWeight={"font-[600]"}
                  label={"Shop in Nigeria"}
                  color={"text-white"}
                  onClick={() => window.open("https://paystack.shop/hairbasicz-nigeria", "_blank", "noopener,noreferrer")}
                />

                <Button
                  width={"w-[160px]"}
                  height={"h-[40px]"}
                  borderRadius={"rounded-[8px]"}
                  backgroundColor={"bg-transparent"}
                  borderColor={"border-[#2922b3]"}
                  fontSize={"text-[14px]"}
                  fontWeight={"font-[600]"}
                  label={"Shop internationally"}
                  color={"text-[#2922b3]"}
                  onClick={() => window.open("https://paystack.shop/hairbasicz-international", "_blank", "noopener,noreferrer")}
                />
              </div>
            </div>
          )}
          {/* {!showCheckout && (
            <div className="px-[24px] items-center gap-3 cursor-pointer xsm:hidden sm:hidden md:flex">
              <a
                className="hover:text-[#2922b3]"
                onClick={() => handleSavings(isLoggedIn)}
                rel="noopener noreferrer"
              >
                Savings
              </a>
            </div>
          )} */}
        </div>
        <div
          className={`gap-[8px] items-center hidden md:flex lg:flex xl:flex 2xl:flex  ${
            showSearchInput && "items-center"
          }`}
        >
          {!showBtnAndCart && <span>{rightText1}</span>}
          {!showBtnAndCart && (
            <Link to={link}>
              <span className="font-[Gilroy-Bold] text-[16px] font-[600] text-[#2922b3] cursor-pointer">
                {rightText2}
              </span>
            </Link>
          )}

          {top && showSearchInput && (
            <>
              <SearchInput
                width={"w-[287px]"}
                height={"h-[48px]"}
                borderRadius={"rounded-lg"}
                placeholder="Search..."
                borderSize={"border-[1px]"}
                onChange={(e) => handleSearchChange(e)}
                onKeyDown={(e) => handleKeyDown(e)}
                value={searchValue}
              />
            </>
          )}
          {isTokenActive && authscreens && notifications && isLoggedIn && (
            <Menu>
              <MenuButton>
                <div className="flex items-center p-[12px] w-[48px] h-[48px] rounded-[8px] border-solid border-[1px] border-[#D8DCE2] relative cursor-pointer">
                  <img src={NotificationBell} alt="notification-bell" />
                  <div
                    className={`absolute top-2 right-2 w-[16px] h-[16px] bg-[#2922b3] rounded-full text-[10px] text-white grid place-items-center border-[1px] border-solid border-white ${
                      notificationCount === 0 && "hidden"
                    }`}
                  >
                    {notificationCount > 0 && notificationCount}
                  </div>
                </div>
              </MenuButton>
              <MenuList>
                <NotificationMenu
                  counts={notificationCount}
                  notifications={notifications?.notifications}
                />
              </MenuList>
            </Menu>
          )}
          {isTokenActive && authscreens && isLoggedIn && (
            <AdminDropdown
              Label="My Account"
              height={"48px"}
              ButtonBackgroundColor={"white"}
              handleClick={handleGoToProfile}
              handleLogout={handleLogout}
            />
          )}
          <div className="flex items-center gap-[16px]">
            {showLogInButton && (
              <div>
                {!isLoggedIn && (
                  <Button
                    width={"w-[115px]"}
                    height={"h-[48px]"}
                    borderRadius={"rounded-[8px]"}
                    backgroundColor={"bg-[#2922b3]"}
                    fontSize={"text-[16px]"}
                    fontWeight={"font-[600]"}
                    label="Log In"
                    onClick={() => navigate("/login")}
                  />
                )}
              </div>
            )}
            {showBtnAndCart && (
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <img
                  className="p-3 border-solid border-[1px] rounded-[8px]"
                  src={CartIcon}
                  alt="cart"
                />
                {cartNumber > 0 && (
                  <div className="absolute text-[9px] font-400 bg-[#EF4444] text-white font-[Gilroy-Bold] w-[16px] h-[16px] rounded-full grid place-items-center top-2 right-2 border-[2px] border-solid border-white">
                    {cartNumber}
                  </div>
                )}
              </div>
            )}
          </div>

          {store && (
            <div>
              <Link to={`/faqs`} className=" px-[24px] cursor-pointer hover:text-[#2922b3]">
                FAQs
              </Link>
              <Link to={`/contact-us`} className=" px-[24px] cursor-pointer hover:text-[#2922b3]">
                Contact
              </Link>
              <Link to={`/about-us`} className=" px-[24px] cursor-pointer hover:text-[#2922b3]">
                About
              </Link>
              {!isTokenActive && (
                <Button
                  width={"w-[115px]"}
                  height={"h-[48px]"}
                  borderRadius={"rounded-[8px]"}
                  backgroundColor={"bg-[#2922b3]"}
                  fontSize={"text-[16px]"}
                  fontWeight={"font-[600]"}
                  label="Log In"
                  onClick={() => navigate("/login")}
                />
              )}
            </div>
          )}
        </div>
        {isOpen && (
          <div className="absolute nav-mobile top-0 left-0 md:hidden h-[100vh] w-screen backdrop-blur-sm bg-white py-[15px]  transition-opacity">
            <div className="border-b-[1px] pb-7 flex items-center justify-between px-[30px]">
              <img src={Logo} alt="logo" />
              <FontAwesomeIcon
                onClick={() => setIsOpen(false)}
                className="text-[20px] text-black"
                icon={faXmark}
              />
            </div>
            <div className="mt-[8vh] text-[#2922b3]  text-[24px] flex flex-col gap-4 px-[30px]">
              <span className="hover:bg-[#2922b3] hover:text-[white] cursor-pointer  font-[Gilroy-Medium] pl-3">
                <a
                  className="hover:text-[#2922b3]"
                  href={PAYSMOSMO_HOME_URL}
                  rel="noopener noreferrer"
                >
                  Home
                </a>
              </span>
              <div className="gap-5 cursor-pointer flex items-center hover:bg-[#2922b3] hover:text-[white]">
                <span className="flex flex-col gap-2">
                  <a
                    href={"https://paystack.shop/hairbasicz-nigeria"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={"text-[#2922b3] font-[Gilroy-Medium] font-[500] hover:text-[#2922b3]"}
                  >
                    Shop in Nigeria
                  </a>
                  <a
                    href={"https://paystack.shop/hairbasicz-international"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={"text-[#2922b3] font-[Gilroy-Medium] font-[500] hover:text-[#2922b3]"}
                  >
                    Shop internationally
                  </a>
                </span>
              </div>
              <div className="hover:bg-[#2922b3] hover:text-[white] gap-5 cursor-pointer flex items-center ">
                <span className="pl-3 font-[Gilroy-Medium]">Savings</span>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Link to="/faqs" className="hover:text-white">FAQs</Link>
                <Link to="/contact-us" className="hover:text-white">Contact</Link>
                <Link to="/about-us" className="hover:text-white">About</Link>
              </div>
            </div>
            <div className="flex gap-3 flex-col justify-center items-center mt-24">
              <span className="text-[20px]">{rightText1}</span>
              <Link to={link}>
                <span className="font-[Gilroy-Bold] text-[18px] font-[600] text-[#2922b3] cursor-pointer">
                  {rightText2}
                </span>
              </Link>
            </div>
          </div>
        )}
        <div
          className={classNames(
            "absolute top-20 left-0 px-[20px] w-screen  bg-white max-h-[0px] overflow-hidden ease-in-out transition-all duration-500 md:hidden",
            {
              "max-h-[100vh] overflow-auto shadow-[0_7px_7px_2px_rgba(0,0,0,.3)]":
                isOpen,
            }
          )}
        >
          <div className="child:text-[#47494D] child:py-[16px] child:font-[Gilroy-Medium] text-[16px] flex flex-col gap-[16px]">
            <div className="flex items-center gap-3">
              <a href={"https://paystack.shop/hairbasicz-nigeria"} target="_blank" rel="noopener noreferrer">Shop in Nigeria</a>
              <a href={"https://paystack.shop/hairbasicz-international"} target="_blank" rel="noopener noreferrer">Shop internationally</a>
            </div>
            <NavLink to={"/faqs"}>FAQs</NavLink>
            <NavLink to={"/contact-us"}>Contact</NavLink>
            <NavLink to={"/about-us"}>About</NavLink>
            <a
              className="hover:text-[#2922b3]"
              onClick={() => handleSavings(isLoggedIn)}
              rel="noopener noreferrer"
            >
              Savings
            </a>
            {!isLoggedIn && <NavLink to={"/signup"}>Create Account</NavLink>}

            {isLoggedIn && (
              <>
                <a
                  onClick={toggleMyAccountNav}
                  className="flex items-center justify-between py-0"
                >
                  <span className="font-[Gilroy-Medium] focus:text-yellow-500">
                    My Account{" "}
                  </span>
                  <FontAwesomeIcon
                    icon={showMyAccount ? faAngleUp : faAngleDown}
                  />
                </a>
                {showMyAccount && (
                  <div className="-mt-5 ease-in-out transition-all duration-500">
                    <AccountInformationSideBar />
                  </div>
                )}
              </>
            )}
            <div></div>
          </div>
          <div className="mt-[50px]">
            {!isLoggedIn && (
              <Link to={"/login"}>
                <Button
                  backgroundColor={"bg-[#2922b3]"}
                  label={"Log In"}
                  color={"text-white"}
                  borderRadius={"rounded-[8px]"}
                  height={"h-[48px]"}
                  fontSize={"text-[16px]"}
                  width={"w-full"}
                />
              </Link>
            )}
            {isLoggedIn && (
              <Button
                backgroundColor={"bg-[#2922b3]"}
                label={"Log Out"}
                color={"text-white"}
                borderRadius={"rounded-[8px]"}
                height={"h-[48px]"}
                fontSize={"text-[16px]"}
                width={"w-full"}
                onClick={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
      {showAllCategories && (
        <div className="w-screen bg-black px-[128px] p-2 text-white flex items-center xsm:px-[20px] sm:px-[20px] overflow-scroll">
          <div className="mr-[10px]">
            <img src={MenuIcon} alt="menu-icon" />
          </div>
          <div className="flex gap-[38px] w-[1313px] xsm:w-[113px] sm:w-[113px]">
            {CategoryList?.map((menu, index) => (
              <Popover
                key={index}
                isOpen={isPopoverOpen.index == index && isPopoverOpen.open}
                onClickOutside={() =>
                  setIsPopoverOpen({
                    index: index,
                    open: !isPopoverOpen.open,
                  })
                }
                padding={10}
                positions={["bottom"]} // preferred positions by priority
                content={({ position, childRect, popoverRect }) => (
                  <div className="">
                    <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                      position={position}
                      childRect={childRect}
                      popoverRect={popoverRect}
                      arrowColor={"#FFFFFF"}
                      arrowSize={20}
                      className="popover-arrow-container"
                      arrowClassName="popover-arrow"
                    >
                      {menu?.category_name == "All Categories" ? (
                        <AllCategoriesPopover
                          AllCategories={AllCategories}
                          menuIndex={menuIndex}
                          setMenuIndex={setMenuIndex}
                          setShow={setShow}
                          show={show}
                          handleCategoryClick={(menuIndex) =>
                            handleCategoryClick(menuIndex, index)
                          }
                          handleSubCategoryClick={(el) =>
                            handleSubCategoryClick(el, index)
                          }
                        />
                      ) : (
                        <>
                          <CategoriesPopover
                            AllCategories={AllCategories}
                            menu={menu}
                            handleCategoryClick={(menu) =>
                              handleCategoryClick(menu, index)
                            }
                            handleSubCategoryClick={(el) =>
                              handleSubCategoryClick(el, index)
                            }
                          />
                        </>
                      )}
                    </ArrowContainer>
                  </div>
                )}
              >
                <p
                  key={index}
                  onMouseEnter={() => onHover(menu, index)}
                  className="category-link"
                >
                  {menu?.category_name}
                </p>
              </Popover>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

[
  {
    name: "Dashboard",
  },
  {
    name: "Store",
  },
  {
    name: "Savings",
  },
  {
    name: "Transactions",
  },
  {
    name: "Notifications",
  },
  {
    name: "My Account",
  },
];
