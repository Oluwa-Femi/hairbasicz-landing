import AccountInformationSideBar from "./AccountInformationSideBar";
import AccountInformationHeader from "../../components/Header/AccountInformationHeader";
import Footer from "../../components/Footer/Footer";

const AccountInformation = () => (
  <div className="w-screen">
    <AccountInformationHeader />
    <div className="flex">
      <AccountInformationSideBar />
    </div>
    <Footer />
  </div>
);

export default AccountInformation;
