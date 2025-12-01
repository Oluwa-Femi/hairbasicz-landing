/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import OTPInput from "otp-input-react";
import { Button } from "../../components/Button/Button";
// import { useNavigate } from "react-router-dom";
import CountDown from "../../pages/PasswordVerifyAccount/CountDown";
import ApiInstance from "../../libs/axios/apiInstance";
import responseHandler from "../../utils/notifications/responseHandler";
import { useQueryClient } from "react-query";

const VerifyOTPForm = ({ data, type, setIsOpen }) => {
  const [otp, setOtp] = useState("");
  const [over, setOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const resendVerify = () => {
    setIsLoading(true);
     ApiInstance.post("/user/customers/contacts/generate-otp", {
            [type]: data
        })
      .then(() => {
        setIsLoading('SET_OTP');

      })
       .catch((error) => {
        responseHandler(error)
        console.log({ error })
      })
      .finally(() => setIsLoading(false))
  };

  const disable = isLoading || otp === "" || otp.length < 6;
  const handleChange = (otp) => setOtp(otp);

  const sendVerify = () => {
    setIsLoading(true)
    ApiInstance.patch('/user/customers/contacts', {
      "otp": otp,
      [type]: data,
    })
      .then((res) => {
        responseHandler(res);
        setIsOpen(false);
        queryClient.invalidateQueries(["Profile"]);
      })
      .catch((err) => responseHandler(err))
    .finally(() => setIsLoading(false))
  };

  return (
      <div>
          <h2 className="font-[Gilroy-Bold]">OTP Verification</h2>
          <p>A 6-digit code was sent to {data}</p>
      <div className="my-6">
        <OTPInput
        className="block"
          value={otp}
          onChange={handleChange}
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

       {isLoading && (<div>Loading..... </div>)}

        <div className="flex justify-between text-sm font-medium mb-8">
          <div>
            Didn’t receive code? &nbsp;
           {isLoading ? (
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
      {/* )} */}
      <Button
        width="w-full"
        height="h-12"
        backgroundColor="bg-[#2922b3]"
        label="Continue"
        fontSize="text-base"
        borderRadius={"rounded-lg"}
        type={"button"}
        onClick={sendVerify}
        disabled={disable}
        isloading={isLoading}
      />
    </div>
  );
};

export default VerifyOTPForm;
