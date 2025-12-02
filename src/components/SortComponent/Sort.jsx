/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useNavigate } from "react-router-dom";
import ArrowRight from "../../assets/arrowright.png";
import { useLocation } from "react-router";
import useMyAccountSite from "../../hooks/Settings/useSiteMap.hooks";
import Filter from "../../assets/filter-icon.svg";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
const Sort = ({ pageTitle, onClick, sortIndex, sortList, product }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const myAccount = "/store/profile";
  const { pageName, pageUrl } = useMyAccountSite(location);

  return (
    <div className="px-[128px]  xsm:px-5 sm:px-5 py-[16px] xsm:py-3 bg-white">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-4">
          <p
            onClick={() => window.open("https://paystack.shop/hairbasicz-nigeria", "_blank", "noopener,noreferrer")}
            className="text-[14px] text-[#9DA1A8] cursor-pointer"
          >
            Store
          </p>

          <p
            onClick={() => window.open("https://paystack.shop/hairbasicz-international", "_blank", "noopener,noreferrer")}
            className="text-[14px] text-[#9DA1A8] cursor-pointer"
          >
            Shop internationally
          </p>
        </div>

        {/* site map for text */}

        <img alt="icon" src={ArrowRight}></img>
        {location.pathname.includes("/product/") && (
          <p
            onClick={() =>
              navigate(
                `/category/${product?.category_name}/${product?.category_id}?type=category`
              )
            }
            className="text-[14px] text-[#9DA1A8] cursor-pointer"
          >
            {pageTitle || product?.category_name}
          </p>
        )}
        {location.pathname.includes("/product/") && (
          <img alt="icon" src={ArrowRight}></img>
        )}
        {location.pathname.includes("/product/") && (
          <p className="text-[14px] font-[Gilroy-Medium]">{product?.name}</p>
        )}
        {location.pathname.includes("/category/") && (
          <p className="text-[14px] font-[Gilroy-Bold] capitalize">
            {pageTitle}
          </p>
        )}
        {location.pathname.includes("/search/") && (
          <p className="text-[14px] font-[Gilroy-Bold] capitalize">
            {pageTitle}
          </p>
        )}

        {location.pathname.includes(myAccount) && (
          <>
            <a
              onClick={() => navigate(myAccount)}
              className="text-[14px] text-[#9DA1A8] cursor-pointer hover:text-[#9DA1A8]"
            >
              My account
            </a>
          </>
        )}

        {pageName && pageUrl && (
          <>
            <img alt="icon" src={ArrowRight}></img>
            <p className="text-[14px] text-[#5c7094]">{pageName}</p>
          </>
        )}
      </div>

      {location.pathname.includes("/category/") && (
        <div className="mt-[32px] flex items-center justify-between">
          <p className="text-[24px] font-[Gilroy-Bold] capitalize">
            {pageTitle}
          </p>
          <div>
            <div className="flex items-center gap-[16px]">
              <span className="font-[Gilroy-Medium] text-[16px] xsm:hidden sm:hidden  ">
                Sort by:
              </span>

              <div className="flex child:cursor-pointer child:text-[14px] xsm:hidden sm:hidden">
                {sortList?.map((sort, index) => (
                  <div
                    key={index}
                    onClick={() => onClick(sort)}
                    className={`transition ease-in-out delay-100 px-[16px] py-[8px] lg:border-[1px] xl:border-[1px] 2xl:border-[1px] ${
                      sortIndex == index
                        ? "border-[#2922b3]  text-[#2922b3]"
                        : "border-[#D8DCE2]"
                    }  w-fit border-solid`}
                  >
                    {sort?.name}
                  </div>
                ))}
              </div>
              <div>
                <Menu>
                  <MenuButton>
                    <p className="font-[Gilroy-SemiBold] text-[16px] md:hidden lg:hidden xl:hidden 2xl:hidden flex items-center gap-2">
                      Filter:{" "}
                      <span>
                        <img src={Filter} alt="filter" />
                      </span>
                    </p>
                  </MenuButton>
                  <MenuList>
                    {sortList?.map((sortItem, index) => (
                      <MenuItem onClick={() => onClick(sortItem)} key={index}>
                        {sortItem?.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      )}
      {location.pathname.includes("/search/") && (
        <div className="mt-[32px] flex items-center justify-between">
          <p className="text-[24px] font-[Gilroy-Bold] capitalize">
            {pageTitle}
          </p>
          <div>
            <div className="flex items-center gap-[16px]">
              <span className="font-[Gilroy-Medium] text-[16px]">Sort by:</span>
              <div className="flex child:cursor-pointer child:text-[14px]">
                {sortList?.map((sort, index) => (
                  <div
                    key={index}
                    onClick={() => onClick(sort)}
                    className={`transition ease-in-out delay-100 px-[16px] py-[8px] border-[1px] ${
                      sortIndex == index
                        ? "border-[#2922b3] text-[#2922b3]"
                        : "border-[#D8DCE2]"
                    }  w-fit border-solid`}
                  >
                    {sort?.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {location.pathname.includes(myAccount) && (
        <h1 className="text-[24px] mt-2">Account Information</h1>
      )}
    </div>
  );
};

export default Sort;
