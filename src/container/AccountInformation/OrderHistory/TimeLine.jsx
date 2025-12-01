import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressIcon from "../../../assets/progressIcon.svg";
import { getSingleOrderDetails } from "../../../store/MyOrders/myordersActions";
import { selectMyorders } from "../../../store/MyOrders/myordersSlice";
import { useParams } from "react-router-dom";
import { formatDateTimezone } from "../../../utils/functions/formatDate";

const TimeLine = () => {
  const dispatch = useDispatch();
  let params = useParams();
  useEffect(() => {
    dispatch(getSingleOrderDetails({ reference: params?.reference }));
  }, []);
  const orders = useSelector(selectMyorders);
  const singleOrderData = orders?.data;
  return (
    <div className="my-[28px]">
      {singleOrderData?.order_timeline?.map((timeline, index) => (
        <ul key={index} className="flex gap-5 h-[110px]">
          <img src={ProgressIcon} alt=" " />
          <li className="mt-[-5px]">
            <p className="text-[#868A91] font-[Gilroy-Medium] text-sm font-[500]">
              {formatDateTimezone(timeline?.created_at) || "-"}
            </p>
            <p className="font-[Gilroy-Medium] text-base py-[6px] capitalize">
              Order {timeline?.status || "-"}
            </p>
            <p className="text-[#868A91] font-[Gilroy-Medium] text-base">
              {timeline?.action || "-"}.
            </p>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default TimeLine;
