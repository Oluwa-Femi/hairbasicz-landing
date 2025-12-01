/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { resendGenerateCode, verifyOtp } from "../../../store/User/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import Storage from "../../../utils/services/storage";
import { selectAuth } from "../../../store/User/authSlice";

const AuthenticateForm = () => {
  const auth = useSelector(selectAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [over, setOver] = React.useState(false);
  const [[m, s], setTime] = React.useState([5, 0]);

  const [state, setState] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
  });

  const tick = () => {
    if (over) return;
    if (m === 0 && s === 0) {
      setOver(true);
    } else if (s === 0) {
      setTime([m - 1, 59]);
    } else {
      setTime([m, s - 1]);
    }
  };

  const reset = () => {
    setInputValue(Object.values(state).join(""));
    setTime([parseInt(5), parseInt(0)]);
    setOver(false);
  };

  useEffect(
    () => {
      setInputValue(Object.values(state).join(""));
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    },
    // eslint-disable-next-line
    [tick],
  );

  useEffect(
    () => {
      if (auth?.isSuccess === "true") {
        setState({
          ...state,
          inputValue: "",
        });
        reset();
      }
    },
    // eslint-disable-next-line
    [auth?.isSuccess === "true"],
  );

  const updateInputValue = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const moveOnMax = (field, nextId) => {
    if (field.length >= 1) {
      document.getElementById(nextId).focus();
    }
  };

  const sendVerify = () => {
    const user = JSON.parse(Storage.get("customer-details"));
    const emailValues = {
      otp: inputValue,
      email: user.email,
    };

    const phoneNoValues = {
      otp: inputValue,
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
    reset();
  };

  const disable =
    auth?.isLoading === "true" || inputValue === "" || inputValue.length < 6;

  return (
    <div>
      <div className="flex justify-between  my-6">
        <input
          className="verification-wrap-input"
          type="number"
          pattern="[0-9]"
          maxLength="1"
          name="value1"
          value={state.value1}
          id="one"
          onChange={updateInputValue}
          onKeyUp={() => moveOnMax(state.value1, "two")}
        />
        <input
          className="verification-wrap-input"
          type="number"
          pattern="[0-9]"
          maxLength="1"
          name="value2"
          value={state.value2}
          onChange={updateInputValue}
          id="two"
          onKeyUp={() => moveOnMax(state.value2, "three")}
        />
        <input
          className="verification-wrap-input"
          type="number"
          pattern="/[0-9]/"
          maxLength="1"
          name="value3"
          value={state.value3}
          id="three"
          onChange={updateInputValue}
          onKeyUp={() => moveOnMax(state.value3, "four")}
        />
        <input
          className="verification-wrap-input"
          type="number"
          pattern="/^-?\d*$/"
          maxLength="1"
          name="value4"
          value={state.value4}
          onChange={updateInputValue}
          id="four"
          onKeyUp={() => moveOnMax(state.value4, "five")}
        />
        <input
          className="verification-wrap-input"
          type="number"
          pattern="/^-?\d*$/"
          maxLength="1"
          name="value5"
          value={state.value5}
          id="five"
          onChange={updateInputValue}
          onKeyUp={() => moveOnMax(state.value5, "six")}
        />
        <input
          className="verification-wrap-input"
          type="number"
          pattern="/^-?\d*$/"
          maxLength="1"
          name="value6"
          value={state.value6}
          id="six"
          onChange={updateInputValue}
          onKeyUp={() => sendVerify()}
          // onKeyDown={checkKey}
        />
      </div>
      <div className="flex justify-between text-sm font-medium mb-8">
        <div>
          Didn’t receive code? &nbsp;
          {auth?.resendIsLoading === "true" ? (
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
        {over ? (
          <div className="text-red-500">Code expired</div>
        ) : (
          <div className="font-normal text-base text-black">
            {`${m.toString().padStart(2, "0")}:${s
              .toString()
              .padStart(2, "0")}`}
          </div>
        )}
      </div>

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

export default AuthenticateForm;
