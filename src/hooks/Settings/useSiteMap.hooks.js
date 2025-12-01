import { useEffect, useState } from "react";

const useMyAccountSite = (location) => {
  const [pageName, setPageName] = useState();
  const [pageUrl, setPageUrl] = useState();
  const myAccount = "/store/profile";

  useEffect(() => {
    if (location.pathname.includes(`${myAccount}/settings`)) {
      setPageName("Settings");
      setPageUrl("settings");
    }
    if (location.pathname.includes(`${myAccount}/message-centre/message`)) {
      setPageName("Message");
      setPageUrl("message");
    }
    if (location.pathname.includes(`${myAccount}/order-history`)) {
      setPageName("Order history");
      setPageUrl("order-history");
    }
    if (location.pathname.includes(`${myAccount}/message-centre`)) {
      setPageName("Message centre");
      setPageUrl("message-centre");
    }
    if (location.pathname.includes(`${myAccount}/delivery-address`)) {
      setPageName("Delivery address");
      setPageUrl("delivery-address");
    }
  }, [location]);

  return { pageName, pageUrl };
};

export default useMyAccountSite;
