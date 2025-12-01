import DeliveryAddressComp from "../../components/Store/DeliveryAddressComp";
import AccountDetailShell from "./AccountDetailShell";

const DeliveryAddress = () => {
  return (
    <div className="w-screen ">
      <AccountDetailShell children={<DeliveryAddressComp />} />
    </div>
  );
};

export default DeliveryAddress;
