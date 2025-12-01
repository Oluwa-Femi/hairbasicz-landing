import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../../store/MyOrders/myordersActions";
import { Button } from "../../../components/Button/Button";
import TextArea from "../../../components/Input/TextArea";
import StarRating from "../../../components/startRating/starRating";
import { Form, Formik } from "formik";
import { selectMyorders } from "../../../store/MyOrders/myordersSlice";
import { useLocation, useNavigate } from "react-router-dom";

const WriteAReviewForm = ({ setOpenModal, openModal }) => {
  const [rating, setRating] = useState(0);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const reviews = useSelector(selectMyorders);

  const productVariantId = location?.state?.productVariantId;
  const orderRef = location?.state?.orderReference;

  return (
    <div>
      <Formik
        initialValues={{ comment: "", rating: "" }}
        onSubmit={(values) => {
          const payload = {
            comment: value,
            rating: rating,
            orderReference: orderRef
          };
          const payloadValues = {
            variant_id: productVariantId,
            payload
          };
          dispatch(createReview(payloadValues)).then(function () {
            setOpenModal(!openModal);
          });
        }}
      >
        {() => {
          return (
            <Form id="form">
              <div className="my-[24px]">
                <p className="text-base text-black font-[500px] font-[Gilroy-Medium] mb-[8px]">
                  Leave a review about this product{" "}
                </p>
                <StarRating rating={rating} setRating={setRating} />
                <TextArea
                  borderColor="!border-[#D8DCE2]"
                  height="!h-[228px]"
                  textColor="text-[#868A91]"
                  defaultValue={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className=" flex justify-between">
                <div></div>
                <div className="flex gap-4">
                  <Button
                    backgroundColor={"bg-white"}
                    borderColor={"border-[#2922b3]"}
                    label={"Cancel"}
                    color={"text-[#2922b3]"}
                    fontSize={"text-[16px]"}
                    width={"w-[136px]"}
                    height={"h-[36px]"}
                    borderRadius={"rounded-[8px]"}
                    paddingX={"px-[16px]"}
                    paddingY={"px-[8px]"}
                    type={"button"}
                    onClick={() => navigate(-1)}
                  />
                  <Button
                    backgroundColor={"bg-[#2922b3]"}
                    borderColor={"border-[#2922b3]"}
                    label={"Leave feedback"}
                    color={"text-[#ffffff]"}
                    fontSize={"text-[16px]"}
                    width={"w-[147px]"}
                    height={"h-[36px]"}
                    borderRadius={"rounded-[8px]"}
                    paddingX={"px-[14px]"}
                    paddingY={"px-[6px]"}
                    type={"submit"}
                    disabled={
                      reviews?.isCreating || rating === 0 || value === ""
                    }
                    isloading={reviews?.isCreating}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default WriteAReviewForm;
