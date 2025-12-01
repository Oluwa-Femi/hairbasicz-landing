import { useQueryClient } from "react-query";
import { UpdateSchema } from "../../utils/functions/settings/notification.helper";
import { useState } from "react";
import { PostProfileSettings } from "../../utils/services/queries/settings.queries";
import responseHandler from "../../utils/notifications/responseHandler";

const useUpdateSettings = (notificationSettings = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [opt, setOpt] = useState([]);

  // change settings options
  const handleChoice = () => {
    setIsLoading(true);
    const dataSchema = {
      order_confirmation: UpdateSchema(
        opt,
        "order_confirmation",
        notificationSettings,
      ),
      shipping_updates: UpdateSchema(
        opt,
        "shipping_updates",
        notificationSettings,
      ),
      special_offers: UpdateSchema(opt, "special_offers", notificationSettings),
      promotion_discounts: UpdateSchema(
        opt,
        "promotion_discounts",
        notificationSettings,
      ),
    };

    PostProfileSettings(dataSchema)
      .then((res) => {
        queryClient.invalidateQueries(["notification_settings"]);
        responseHandler(res);
      })
      .catch((err) => responseHandler(err))
      .finally(() => setIsLoading(false));
  };
  return { isLoading, setOpt, opt, handleChoice };
};

export default useUpdateSettings;
