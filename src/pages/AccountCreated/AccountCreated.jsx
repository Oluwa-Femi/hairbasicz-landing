import React from "react";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import { Button } from "../../components/Button/Button";
import AcctCreatedIcon from "../../assets/approval--work-approval.svg";
import { useNavigate } from "react-router-dom";

function AccountCreated() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <AuthWrapper
      link={"/login"}
      rightText1={"Have an account?"}
      rightText2={"Login"}
    >
      <img
        src={AcctCreatedIcon}
        alt="Account Created Icon"
        className="m-auto"
      />
      <h1 className="font-bold text-center mt-6 text-2xl">Account Created</h1>
      <h4 className="font-normal text-center text-sm text-[#5f6166] my-2 mb-6">
        Your Paysmosmo account was successfully created, you now have the
        privilege shopping for goods.
      </h4>
      <Button
        width="w-full"
        height="h-12"
        backgroundColor="bg-[#2922b3]"
        label="Proceed to Homepage"
        fontSize="text-base"
        borderRadius={"rounded-md"}
        onClick={handleClick}
      />
    </AuthWrapper>
  );
}

export default AccountCreated;
