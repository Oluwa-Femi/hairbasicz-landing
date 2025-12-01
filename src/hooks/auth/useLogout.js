import { useEffect } from "react";
import { clearStorage } from "../../utils/functions/ClearStorage";
import { useNavigate } from "react-router-dom";
import { LogoutApi } from "../../utils/services/queries/logout.queries";
import Storage from "../../utils/services/storage";

export default function useLoggout(logout) {
  useEffect(() => {
    if (logout === "true") {
      clearStorage();
    }
  }, [logout]);
}

export function useLogOut() {
  const handleLogout = () => {
    clearStorage('/')
    return LogoutApi()
  }

  return { handleLogout }

}

export function useCheckLoggedIn() {
  const token = Storage.get("user-session-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/store");
    }
  }, [])



}
