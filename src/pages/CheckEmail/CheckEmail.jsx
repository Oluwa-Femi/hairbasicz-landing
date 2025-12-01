import React from "react";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import CheckEmailIcon from "../../assets/checkemail.svg";

function CheckEmail() {
  return (
    <AuthWrapper
      link={"/signup"}
      rightText1={"New to Hairbasicz?"}
      rightText2={"Create account"}
    >
      <img src={CheckEmailIcon} alt="Check Email Icon" className="m-auto" />
      <h1 className="font-bold text-center mt-6 text-2xl">
        Check your Email Address
      </h1>
      <h4 className="font-normal text-center  text-[#5f6166] text-sm my-2 mb-6">
        A reset password link has been sent to your registered email address
      </h4>
    </AuthWrapper>
  );
}

export default CheckEmail;
