import ApiInstance from "../../../libs/axios/apiInstance";
import responseHandler from "../../notifications/responseHandler";

export const GetNotifications = (limit, page) =>
  ApiInstance.get("/user/customers/notifications", { params: { limit, page } })
    .then((res) => res?.data?.data)
    .catch((err) => responseHandler(err));

export const GetDeliveryAddress = () =>
  ApiInstance.get("user/customers/shipping-address")
    .then((res) => res?.data?.data)
    .catch((err) => console.log(err));

export const CreateDeliveryAddress = (address) =>
  ApiInstance.post("user/customers/shipping-address", address);

export const UpdateDeliveryAddress = (address) =>
  ApiInstance.put("user/customers/shipping-address", address);

export const DeleteDeliveryAddress = (addressType) =>
  ApiInstance.patch("user/customers/shipping-address", addressType);

export const UpdatePassword = (passwordData) =>
  ApiInstance.put("user/Customers/change-password", passwordData);

export const GetState = () =>
  ApiInstance.get("https://locus.fkkas.com/api/all");

export const GetLGA = ({ params }) =>
  ApiInstance.get(`https://locus.fkkas.com/api/regions/${params}`);

export const GetProfile = () =>
  ApiInstance("user/customers/profile")
    .then((res) => res?.data?.data)
    .catch((err) => responseHandler(err));

// /user/customers/profile-settings
export const GetProfileSettings = () =>
  ApiInstance("user/customers/profile-settings").then((res) => res?.data?.data);

export const PostProfileSettings = (data) =>
  ApiInstance.put("user/customers/profile-settings", data);

export const PostBankEnquiry = (data) =>
  ApiInstance.post("user/customers/account-enquiry", data);

export const PostBank = (data) =>
  ApiInstance.post("user/customers/bank-account", data);

export const PatchBank = (data) =>
  ApiInstance.patch("user/customers/bank-account", data);

export const PostBVN = (number) =>
  ApiInstance.post("/user/customers/bvn", { bvn: number });

export const GetBVN = () =>
  ApiInstance("/user/customers/bvn").then((res) => res?.data?.data);

export const PostThirdParty = (data) =>
  ApiInstance.post("user/customers/third-party/next-of-kin", data);

export const PatchNextKin = (data) =>
  ApiInstance.patch("user/customers/third-party/next-of-kin", data);

export const PostGuarantor = (data) =>
  ApiInstance.post("user/customers/third-party/guarantor", data);

export const PatchGuarantor = (data) =>
  ApiInstance.patch("user/customers/third-party/guarantor", data);

export const GetBanks = () =>
  ApiInstance("user/customers/fetch-banks").then((res) => res?.data?.data);

export const GetSingleOrder = (id) => ApiInstance(`ecommerce/orders/${id}`)
  .then((res) => res?.data?.data)
  .catch((err) => responseHandler(err))
