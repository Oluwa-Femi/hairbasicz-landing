/* eslint-disable no-unused-vars */
import { ADDRESS1, ADDRESS2 } from "../../constants/settings/settings";

export const CheckAddressType = (data) => {
  if (data?.address1) return ADDRESS2;
  if (data?.address2) return ADDRESS1;
  return ADDRESS1;
};

export const ModalTitle = (id) => {
  switch (id) {
    case "#address":
      return "Add Delivery Address";
    case "#update":
      return "Update Delivery Address";
    default:
      return "";
  }
};

export const shippingAddress = (objData) => {
  if (objData) {
    return Object.entries(objData)
      ?.filter(([key, value]) => value !== null)
      ?.map(([key, value]) => {
        value;
      });
  }
  return null;
};
