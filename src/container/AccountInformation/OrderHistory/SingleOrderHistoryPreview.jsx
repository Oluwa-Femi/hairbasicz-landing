/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/Button/Button";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { MainContentBody } from "../../../components/Store/SettingContent";
import OrderDetails from "./OrderDetails";
import TimeLine from "./TimeLine";
import PaymentHistory from "./PaymentHistory";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrderDetails } from "../../../store/MyOrders/myordersActions";
import { selectMyorders } from "../../../store/MyOrders/myordersSlice";

const SingleOrderHistoryPreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let params = useParams();

  useEffect(() => {
    dispatch(getSingleOrderDetails({ reference: params?.reference }));
  }, []);

  const orders = useSelector(selectMyorders);
  const singleOrderData = orders?.data;

  const tabTypes = [
    {
      type: "Order details"
    },
    {
      type: "Timeline"
    }
  ];

  return (
    <div className="bg-white h-full w-full rounded-[10px] border-[0.5px] border-solid border-[#D8DCE2]">
      <div className="flex justify-between items-center py-[16px] px-[24px] bg-white border-b-[0.5px] border-solid border-[#D8DCE2]">
        <div className="flex gap-4 items-center">
          <a
            className="cursor-pointer hover:text-[green]"
            onClick={() => navigate("/store/profile/order-history")}
          >
            <ChevronLeftIcon boxSize="2em" />
          </a>
          <h2 className="text-[20px] font-[Gilroy-Medium] text-[#1C1D1F] capitalize">
            {params?.status} Order
          </h2>
        </div>
        <div className="flex gap-2">
          {location.pathname.includes("/approved") && (
            <Button
              backgroundColor={"bg-[#2922b3]"}
              borderColor={"border-[#2922b3]"}
              label={"Make Payment"}
              color={"text-[#ffffff]"}
              fontSize={"text-[16px]"}
              width={"w-[136px]"}
              height={"h-[36px]"}
              borderRadius={"rounded-[8px]"}
              paddingX={"px-[16px]"}
              paddingY={"px-[8px]"}
              onClick={() => navigate(`/checkout/${params?.reference}`)}
            />
          )}
        </div>
      </div>
      <div>
        <Tabs pos="relative" variant="unstyled">
          <TabList px="2.074rem" my="0">
            {tabTypes.map((item, index) => (
              <Tab
                key={index}
                _selected={{
                  color: "#2922b3",
                  fontWeight: "700",
                  fontFamily: "Gilroy-SemiBold"
                }}
              >
                <p className="text-[16px] font-[Gilroy-Regular] font-[400] px-[15px]">
                  {item?.type}
                </p>
              </Tab>
            ))}
            {singleOrderData?.order_repayment?.length > 0 && (
              <Tab
                _selected={{
                  color: "#2922b3",
                  fontWeight: "700",
                  fontFamily: "Gilroy-SemiBold"
                }}
              >
                <p className="text-[16px] font-[Gilroy-Regular] font-[400] px-[15px]">
                  Payment history
                </p>
              </Tab>
            )}
          </TabList>
          <TabPanel>
            <MainContentBody padding={"px-0"}>
              <OrderDetails />
            </MainContentBody>
          </TabPanel>
          <TabPanel>
            <MainContentBody>
              <TimeLine />
            </MainContentBody>
          </TabPanel>
          {singleOrderData?.order_repayment?.length > 0 && (
            <TabPanel>
              <MainContentBody>
                <PaymentHistory
                  singleOrderData={singleOrderData?.order_repayment}
                />
              </MainContentBody>
            </TabPanel>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default SingleOrderHistoryPreview;
