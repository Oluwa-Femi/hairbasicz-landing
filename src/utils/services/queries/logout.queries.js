import ApiInstance from "../../../libs/axios/apiInstance";
import responseHandler from "../../notifications/responseHandler";
import Storage from "../storage";

export const LogoutApi = () => ApiInstance.post("user/customers/logout")
    .then((res) => responseHandler(res))
    .catch((err) => responseHandler(err))
    .finally(() => {
        Storage.remove("user-session-token");
        Storage.remove("localCart");
    })
