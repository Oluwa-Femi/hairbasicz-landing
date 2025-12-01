import React from "react";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import Storage from "../../utils/services/storage";
import PasswordVerifyOTPForm from "./PasswordVerifyOTPForm";

function VerifyAccount() {
  const user = JSON.parse(Storage.get("customer-details"));

  return (
    <AuthWrapper
      title={"OTP Verification"}
      subtitle={`A 6-digit code was sent to ${user.email || user.phoneNumber}`}
      showBottomText={true}
      bottomText={user.email ? "Wrong email?" : "Wrong phone number?"}
      bottomText2={"Start over"}
      link={"/forgot-password"}
      rightText1={"Have an account?"}
      rightText2={"Login"}
    >
      <PasswordVerifyOTPForm />
    </AuthWrapper>
  );
}

export default VerifyAccount;
