import { MainContentBody } from "./SettingContent";
import SettingTabTemp from "./SettingTabTemp";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AllOrders from "../Profile/MyOrders/AllOrders";
import OngoingOrders from "../Profile/MyOrders/OngoingOrders";
import ApprovedOrders from "../Profile/MyOrders/ApprovedOrders";
import DeclinedOrders from "../Profile/MyOrders/DeclinedOrders";
import PaidOrders from "../Profile/MyOrders/PaidOrders";
import DeliveredOrders from "../Profile/MyOrders/DeliveredOrders";
import ClosedOrders from "../Profile/MyOrders/ClosedOrders";
import { useDispatch, useSelector } from "react-redux";
import { selectMyorders } from "../../store/MyOrders/myordersSlice";
import { getAllOrders } from "../../store/MyOrders/myordersActions";
import { filterOrders } from "../../utils/functions/CreateNewArray";
import moment from "moment";

const OrderHistoryComp = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [showDatePicker] = useState(true);
  const dispatch = useDispatch();
  const orders = useSelector(selectMyorders);
  const myorders = orders?.allOrders?.data?.orders;
  const [filterDateRange, setFilterDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const ongoingOrders = filterOrders(myorders, "ongoing");
  const approvedOrders = filterOrders(myorders, "approved");
  const declinedOrders = filterOrders(myorders, "declined");
  const paidOrders = filterOrders(myorders, "paid");
  const deliveredOrders = filterOrders(myorders, "delivered");
  const closedOrders = filterOrders(myorders, "closed");

  useEffect(() => {
    dispatch(
      getAllOrders({
        page: 1,
        limit: Number.MAX_SAFE_INTEGER,
      }),
    );
  }, []);

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchValue(searchValue);
      dispatch(
        getAllOrders({
          search: searchValue,
        }),
      );
    }
  };

  const handleFilterDateChange = (ranges) => {
    const { selection } = ranges;
    setFilterDateRange([selection]);
    if (
      moment(selection?.startDate).format("YYYY-MM-DD") !==
      moment(selection?.endDate).format("YYYY-MM-DD")
    ) {
      setIsOpen(!isOpen);
    }
  };
  const handleTabSelect = () => {
    setSearchValue("");
    setFilterDateRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
  };
  const orderTypes = [
    {
      type: "All",
      count: myorders?.length || 0,
    },
    {
      type: "Ongoing",
      count: ongoingOrders?.length || 0,
    },
    {
      type: "Approved",
      count: approvedOrders?.length || 0,
    },
    {
      type: "Declined",
      count: declinedOrders?.length || 0,
    },
    {
      type: "Paid",
      count: paidOrders?.length || 0,
    },
    {
      type: "Delivered",
      count: deliveredOrders?.length || 0,
    },
    {
      type: "Closed",
      count: closedOrders?.length || 0,
    },
  ];
  return (
    <SettingTabTemp
      title="Order History"
      isMyOrder={true}
      ranges={filterDateRange}
      handleFilterDateChange={(e) => handleFilterDateChange(e)}
      handleSearch={(e) => onChange(e)}
      onSearch={(e) => handleKeyDown(e)}
      value={searchValue}
      dateValue={filterDateRange}
      showDatePicker={showDatePicker}
      isOpen={isOpen}
    >
      <div className="mx-9">
        <Tabs
          pos="relative"
          variant="unstyled"
          onSelect={() => handleTabSelect()}
        >
          <TabList px="2.074rem">
            {orderTypes.map((order, index) => (
              <Tab
                key={index}
                _selected={{
                  color: "#2922b3",
                  fontWeight: "700",
                  fontFamily: "Gilroy-SemiBold",
                }}
              >
                <p className="text-[16px] font-[Gilroy-Regular] font-[400]">
                  {order.type} ({order.count})
                </p>
              </Tab>
            ))}
          </TabList>
          <TabPanel>
            <MainContentBody padding={"px-0"}>
              <AllOrders
                searchValue={searchValue}
                filterDateRange={filterDateRange}
              />
            </MainContentBody>
          </TabPanel>
          <TabPanel>
            <MainContentBody padding={"px-0"}>
              <OngoingOrders
                searchValue={searchValue}
                filterDateRange={filterDateRange}
              />
            </MainContentBody>
          </TabPanel>
          <TabPanel>
            <MainContentBody padding={"px-0"}>
              <ApprovedOrders
                searchValue={searchValue}
                filterDateRange={filterDateRange}
              />
            </MainContentBody>
          </TabPanel>
          <TabPanel>
            <MainContentBody padding={"px-0"}>
              <DeclinedOrders
                searchValue={searchValue}
                filterDateRange={filterDateRange}
              />
            </MainContentBody>
          </TabPanel>
          <TabPanel>
            <MainContentBody padding={"px-0"}>
              <PaidOrders
                searchValue={searchValue}
                filterDateRange={filterDateRange}
              />
            </MainContentBody>
          </TabPanel>
          <TabPanel>
            <MainContentBody padding={"px-0"}>
              <DeliveredOrders
                searchValue={searchValue}
                filterDateRange={filterDateRange}
              />
            </MainContentBody>
          </TabPanel>
          <TabPanel>
            <MainContentBody padding={"px-0"}>
              <ClosedOrders
                searchValue={searchValue}
                filterDateRange={filterDateRange}
              />
            </MainContentBody>
          </TabPanel>
        </Tabs>
      </div>
    </SettingTabTemp>
  );
};

export default OrderHistoryComp;
