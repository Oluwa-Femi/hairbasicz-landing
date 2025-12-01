import OrderHistoryComp from "../../../components/Store/OrderHistory";
import AccountDetailShell from "../AccountDetailShell";

const OrderHistory = () => {
  return (
    <div className="w-screen ">
      <AccountDetailShell children={<OrderHistoryComp />} />
    </div>
  );
};

export default OrderHistory;
