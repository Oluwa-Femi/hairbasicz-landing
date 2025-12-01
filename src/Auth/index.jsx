import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Storage from "../utils/storage";
import ApiInstance from "../libs/axios/apiInstance";

export default function Auth() {
  const loaderMessage = "Please wait...";
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const avaliableRoutes = [
    { url: "store", title: "message-center" },
    { url: "store/profile/message-centre", title: "message-center" },
    { url: "store/profile", title: "profile" },
    {url: "cart", title: "cart"},
  ]

  useEffect(() => {
    const token = searchParams.get("token");
    const route = searchParams.get("route");
    if (token) {
      Storage.set("user-session-token", token);
      ApiInstance("user/customers/profile");
    }

    if (token && route && avaliableRoutes?.find((each) => each?.url === route)) {
      navigate(`/${route}`);
    } else {
      navigate('/');
    }
  }, [searchParams]);

  return (
    <div className="h-screen flex text-center align-middle justify-center items-center w-screen bg-white border">
      <div>
        {loaderMessage}
        <Spinner />
      </div>
    </div>
  );
}
