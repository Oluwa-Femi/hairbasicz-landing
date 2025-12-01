import { useQuery } from "react-query";
import {
  GetBVN,
  GetDeliveryAddress,
  GetNotifications,
  GetProfileSettings,
  GetSingleOrder,
} from "../../utils/services/queries/settings.queries";

// Get all notifications
export const queryNotifications = (page, limit = 10, token) =>
  useQuery(["messages", page], () => GetNotifications(limit, page), {
    keepPreviousData: true,
    enabled: token,
  });

export const queryDeliveryAddress = () =>
  useQuery(["delivery_address"], () => GetDeliveryAddress());

export const queryNotificationSetting = () =>
  useQuery(["notification_settings"], () => GetProfileSettings());

export const queryBVN = () => useQuery(["bvn"], () => GetBVN());


export const querySingleOrder = (id) => useQuery(["single-order", id], () => GetSingleOrder(id));
