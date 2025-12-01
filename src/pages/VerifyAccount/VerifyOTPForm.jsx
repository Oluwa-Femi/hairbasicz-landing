/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import OTPInput from "otp-input-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button/Button";
import CountDown from "../PasswordVerifyAccount/CountDown";
import { useNavigate } from "react-router-dom";
import { resendGenerateCode, verifyOtp } from "../../store/User/AuthActions";
import { selectAuth } from "../../store/User/authSlice";
import Storage from "../../utils/services/storage";

const VerifyOTPForm = () => {
  const [otp, setOtp] = useState("");
  const [over, setOver] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  const resendVerify = () => {
    const emailOrPhoneNo = JSON.parse(Storage.get("customer-details"));
    const emailInput = Storage.get("input-type");

    const payload = {
      payloadValues: emailOrPhoneNo,
    };
    const payload2 = {
      payloadValues: emailOrPhoneNo,
    };
    dispatch(resendGenerateCode(emailInput ? payload : payload2));
    // reset();
  };

  const disable = auth?.isLoading || otp === "" || otp.length < 6;
  const handleChange = (otp) => setOtp(otp);

  const sendVerify = () => {
    const user = JSON.parse(Storage.get("customer-details"));
    const emailValues = {
      otp: otp,
      email: user.email,
    };

    const phoneNoValues = {
      otp: otp,
      phoneNumber: user.phoneNumber,
    };

    const payload = {
      payloadValues: emailValues,
      navigate,
    };

    const payload2 = {
      payloadValues: phoneNoValues,
      navigate,
    };

    dispatch(verifyOtp(user.email ? payload : payload2));
  };

  return (
    <div>
      <div className="my-6">
        <OTPInput
          value={otp}
          onChange={handleChange}
          // autoFocus
          OTPLength={6}
          otpType="number"
          inputStyles={{
            border: "1px solid #d0d5dd",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            borderRadius: "8px",
            width: "48px",
            height: "48px",
            fontSize: "18px",
            color: "#000",
            fontWeight: "400",
            margin: 8,
          }}
        />
      </div>
      {auth?.resendIsLoading ? (
        <div>Loading..... </div>
      ) : (
        <div className="flex justify-between text-sm font-medium mb-8">
          <div>
            Didn’t receive code? &nbsp;
            {auth?.resendIsLoading ? (
              <span className="text-[#2922b3] font-semibold">Resending...</span>
            ) : (
              <span
                className="text-[#2922b3] font-semibold cursor-pointer"
                onClick={() => {
                  over && resendVerify();
                }}
                disabled={!over}
              >
                Resend Code
              </span>
            )}
          </div>
          <CountDown setOver={setOver} over={over} />
        </div>
      )}
      <Button
        width="w-full"
        height="h-12"
        backgroundColor="bg-[#2922b3]"
        label="Continue"
        fontSize="text-base"
        borderRadius={"rounded-lg"}
        type={"submit"}
        onClick={sendVerify}
        disabled={disable}
        isloading={auth?.isLoading}
      />
    </div>
  );
};

export default VerifyOTPForm;
