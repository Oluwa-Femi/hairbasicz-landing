/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import FeedbackSuccessModal from "../../../components/AccountInformation/FeedbackSuccessModal";
import WriteAReviewForm from "./WriteAReviewForm";
import { useParams } from "react-router-dom";
import { getSingleOrderDetails } from "../../../store/MyOrders/myordersActions";
import ReviewCard from "../../../components/Profile/MyOrders/ReviewCard";
import { selectMyorders } from "../../../store/MyOrders/myordersSlice";

const WriteAReview = () => {
  const location = useLocation();
  const cardIndex = location?.state?.index;
  const orders = useSelector(selectMyorders);
  const [singleOrder, setSingleOrder] = useState(
    orders?.data?.order_items?.[cardIndex]
  );

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  let params = useParams();
  useEffect(() => {
    dispatch(getSingleOrderDetails({ reference: params?.reference }));
  }, []);
  return (
    <div>
      <div className="bg-white h-full w-full rounded-[10px]">
        <div className="flex gap-4 items-center py-[16px] px-[24px] border-b-[0.5px] border-solid border-[#D8DCE2]">
          <a
            className="cursor-pointer hover:text-[green]"
            onClick={() => navigate(-1)}
          >
            <ChevronLeftIcon boxSize="2em" />
          </a>
          <h2 className="text-[20px] font-[Gilroy-Medium] text-[#1C1D1F]">
            Write A Review
          </h2>
        </div>
        <div className="px-[24px]">
          <ReviewCard order={singleOrder} />
          <WriteAReviewForm
            orderRef={params?.reference}
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
        </div>
      </div>
      {openModal && (
        <FeedbackSuccessModal
          isOpen={openModal}
          onClick={() => {
            setOpenModal(!openModal);
            navigate(-1);
          }}
        />
      )}
    </div>
  );
};

WriteAReview.propTypes = {
  title: PropTypes.string,
  height: PropTypes.string,
  errorMessage: PropTypes.string
};

export default WriteAReview;
