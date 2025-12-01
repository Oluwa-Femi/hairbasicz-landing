import Storage from "../services/storage";

export const clearStorage = (redirect = "/login") => {
  Storage.remove("user-session-token");
  Storage.remove("user-email");
  Storage.remove("email-value");
  Storage.remove("user-details");
  Storage.remove("orderRef");
  Storage.remove("pageBeforeLogin");
  Storage.remove("localCart");
  Storage.remove("fromCartToProfilePage");
  Storage.remove("id");
  Storage.remove("SingleMessage");
  Storage.remove("page");
  Storage.remove("perPage");
  if (typeof window !== "undefined") {
    window.location.href = redirect;
  }
};
