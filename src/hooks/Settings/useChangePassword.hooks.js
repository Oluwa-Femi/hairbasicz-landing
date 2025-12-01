/**
 * @name: useChangePassword
 * @description: Hooks to handle password change
 */

import { useState } from "react";
import responseHandler from "../../utils/notifications/responseHandler";
import { UpdatePassword } from "../../utils/services/queries/settings.queries";
import { useNavigate } from "react-router-dom";

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { currentPassword, newPassword } = values;
    const updatedValue = { currentPassword, newPassword };
    setIsLoading(true);
    // update password
    UpdatePassword(updatedValue)
      .then((res) => {
        responseHandler(res);
        navigate("/store/profile");
      })
      .catch((err) => responseHandler(err))
      .finally(() => setIsLoading(false));
  };

  return { isLoading, handleSubmit };
};

export default useChangePassword;
