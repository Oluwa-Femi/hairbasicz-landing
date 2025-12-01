import { useState } from "react";
import ApiInstance from "../../libs/axios/apiInstance";
import responseHandler from "../../utils/notifications/responseHandler";

const useReadOne = () => {
    const [isSuccess, setisSuccess] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const postUseReadOne = (reference) => {
        setisLoading(true);

        ApiInstance.put(`user/customers/notifications/mark-read/${reference}`)
            .then(() => setisSuccess(true))
            .catch((err) => responseHandler(err))
            .finally(() => setisLoading(false))
    }

    return { isSuccess, postUseReadOne, isLoading }

};

export default useReadOne;
