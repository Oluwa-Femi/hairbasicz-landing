/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Order from "./Order";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../store/MyOrders/myordersActions";
import { selectMyorders } from "../../../store/MyOrders/myordersSlice";
import MessageIcon from "../../../assets/MessageIcon.svg";
import { Spinner } from "@chakra-ui/react";
import ChecklistIcon from "../../../assets/no-orders.svg";
import { useNavigate } from "react-router-dom";
import { addProductToCart, getCart } from "../../../store/Cart/cartActions";
import Pagination from "../../../components/Pagination/Pagination";
import moment from "moment";
import { assignReorderData } from "../../../utils/functions/CreateNewArray";

const AllOrders = ({ searchValue, filterDateRange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  const startDate = filterDateRange[0]?.startDate;
  const endDate = filterDateRange[0]?.endDate;
  useEffect(() => {
    dispatch(
      getOrders({
        page: currentPage,
        limit: 4,
        search: searchValue,
        from: filterDateRange[0]?.startDate
          ? moment(startDate).format("YYYY-MM-DD")
          : null,
        to: filterDateRange[0]?.endDate
          ? moment(endDate).format("YYYY-MM-DD")
          : null
      })
    );
  }, [searchValue, currentPage, filterDateRange]);

  const orders = useSelector(selectMyorders);
  const myorders = orders?.data?.data;
  const pageCount = myorders && Math.ceil(Number(myorders?.total / 4));

  const handleReOrderClick = (myorder) => {
    const cartItems = assignReorderData(myorder);

    const payload = {
      cartItems: cartItems
    };
    dispatch(addProductToCart(payload)).then(function () {
      dispatch(getCart());
    });
    navigate("/cart");
  };

  return (
    <div>
      {orders?.isGetting ? (
        <div className="h-full bg-white flex flex-col items-center justify-center gap-2 mt-20">
          <img alt="message" src={MessageIcon} />
          <h1 className="text-[18px] text-[#1C1D1F]">Please wait, loading</h1>
          <Spinner size="xl" />
        </div>
      ) : (
        <>
          {myorders?.orders?.length > 0 ? (
            <div>
              {myorders?.orders?.map((myorder, index) => (
                <Order
                  myorder={myorder}
                  index={index}
                  key={index}
                  handleReOrderClick={() =>
                    handleReOrderClick(myorder?.order_items)
                  }
                  onClick={() =>
                    navigate(
                      `/store/profile/order-history/${myorder?.reference}/${myorder?.status}`
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <div className="h-full  bg-white flex flex-col items-center justify-center gap-2 pt-20">
              <img alt="icon" src={ChecklistIcon} />
              <h1 className="text-[18px] text-[#1C1D1F]">
                You don't have any orders
              </h1>
              <p className="text-[#868A90]  text-center">
                Here you will be able to see and track the status <br /> of all
                the orders you have made.
              </p>
            </div>
          )}
        </>
      )}
      {myorders?.orders?.length > 0 && !orders?.isGetting && (
        <div className="bg-white m-[20px]">
          <Pagination
            handlePageClick={handlePageClick}
            pageCount={pageCount}
            currentPage={currentPage}
            forcePage={currentPage - 1}
          />
        </div>
      )}
    </div>
  );
};

export default AllOrders;
