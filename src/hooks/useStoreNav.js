import { useNavigate } from "react-router-dom";
import ApiInstance from "../libs/axios/apiInstance";
import {
  PAYSMOSMO_HOME_URL,
  PAYSMOSMO_SAVING_URL,
} from "../utils/constants/config.constant";
import Storage from "../utils/services/storage";

const useStoreNav = () => {
  const token = Storage.get("user-session-token") || false;
  const navigate = useNavigate();


  const handleGoToHome = (noToken) => {
    if (!noToken) return window.location.href = `${PAYSMOSMO_HOME_URL}auth`;
    return navigate('/store');
  };


  const handleLogout = () => {

  ApiInstance.post('user/customer/logout').finally(() => {
    Storage.remove('user-session-token');
    navigate('/?logout=true');

  });

  };

  const handleSavings = (noToken) => {
    if (!noToken) return window.location.href = `${PAYSMOSMO_SAVING_URL}auth?`;
  window.location.href = `${PAYSMOSMO_SAVING_URL}auth?token=${token}`;
};



  return {
    handleGoToHome,
    handleLogout,
    handleSavings,
  };
};

export default useStoreNav;
