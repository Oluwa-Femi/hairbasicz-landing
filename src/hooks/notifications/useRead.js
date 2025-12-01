import { useState } from "react";
import { useQueryClient } from "react-query";
import ApiInstance from "../../libs/axios/apiInstance";
import responseHandler from "../../utils/notifications/responseHandler";

const useReadAll = () => {
    const [isSuccess, setisSuccess] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const queryClient = useQueryClient();
    const postUseReadAll = () => {
        setisLoading(true);
        ApiInstance.put('user/customers/notifications/read-all')
            .then(() => {
                queryClient.invalidateQueries();
                setisSuccess(true)
            })
            .catch((err) => responseHandler(err))
            .finally(() => setisLoading(false))
    }

    return { isSuccess, postUseReadAll, isLoading }

};

export default useReadAll;
