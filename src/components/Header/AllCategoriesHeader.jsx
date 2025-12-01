/* eslint-disable no-unsafe-optional-chaining */
import { useState, useEffect } from "react";
import MenuIcon from "../../assets/menu.svg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../store/Categories/categoriesSlice";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { getAllCategories } from "../../store/Categories/CategoriesActions";
import { getAllProducts } from "../../store/Products/ProductsActions";
import AllCategoriesPopover from "../../container/Categories/AllCategoriesPopover";
import CategoriesPopover from "../../container/Categories/CategoriesPopover";

const AllCategoriesHeader = ({ showAllCategories }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState({
    index: 0,
    open: false,
  });
  const [menuIndex, setMenuIndex] = useState("");
  const [show, setShow] = useState({
    index: 0,
    open: false,
  });
  const onHover = (index, menu) => {
    setIsPopoverOpen({
      index: index,
      open: !isPopoverOpen.open,
    });
    setShow({
      open: !show.open,
    });
    setMenuIndex(menu);
  };
  let params = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    dispatch(getAllProducts({ page: 1, categoryId: params?.id }));
  }, [params?.id]);
  const AllCategories = useSelector(selectCategories);
  const CategoriesData = [
    ...AllCategories?.data?.map((item) => item),
    {
      category_name: "All Categories",
      category_reference: "",
      subcategories: [],
    },
  ];
  const AllCategoriesData = CategoriesData?.reverse();
  return (
    <div>
      {showAllCategories && (
        <div className="w-screen bg-black space-x-3 px-[108px] p-2 text-white">
          <div className="flex justify-between ">
            <img className="gap-0" src={MenuIcon} alt="menu-icon" />
            {AllCategoriesData?.map((menu, index) => (
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
                        />
                      ) : (
                        <>
                          <CategoriesPopover
                            AllCategories={AllCategories}
                            menu={menu}
                          />
                        </>
                      )}
                    </ArrowContainer>
                  </div>
                )}
              >
                <p
                  key={index}
                  onMouseEnter={() => onHover(index, menu)}
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

export default AllCategoriesHeader;
