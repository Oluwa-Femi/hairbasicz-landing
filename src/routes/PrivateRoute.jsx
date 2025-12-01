import React from "react";
import { Navigate } from "react-router-dom";
import Storage from "../utils/services/storage";
import jwt_decode from "jwt-decode";
import { clearStorage } from "../utils/functions/ClearStorage";
// import { useSelector } from "react-redux";
import responseHandler from "../utils/notifications/responseHandler";
// import { selectAdminAuth } from "../store/Admin/Auth/authSlice";

const PrivateRoute = ({ element: Component }) => {
  const initialstate = {
    user: null,
  };
  // const user = useSelector(selectAdminAuth);

  if (Storage.get("user-session-token")) {
    const jwt_Token_decoded = jwt_decode(Storage.get("user-session-token"));

    if (jwt_Token_decoded.exp * 1000 < Date.now()) {
      const response = {
        messages: "Session Expired!,Kindly login again",
        error: "eeror",
      };
      clearStorage();
      responseHandler(response);
    } else {
      initialstate.user = jwt_Token_decoded;
    }
  }

  const userInstorage =
    Storage.get("user-session-token") &&
    jwt_decode(Storage.get("user-session-token"));

  if (!userInstorage) {
    return <Navigate to="/login" />;
  }

  return Component;
};

export default PrivateRoute;
