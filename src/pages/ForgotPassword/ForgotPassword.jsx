/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../store/Password/passwordActions";
import {
  forgotPasswordWithEmailSchema,
  forgotPasswordWithPhoneNoSchema,
} from "../../utils/validation/ecommerceValidation";
import { useNavigate } from "react-router-dom";
import { selectPassword } from "../../store/Password/passwordSlice";
// eslint-disable-next-line import/extensions
import { PhoneNumberInput } from "@/components";

function ForgotPassword() {
  const forgotPasswordData = useSelector(selectPassword);
  const [emailInput, setEmailInput] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeInput = () => {
    setEmailInput(!emailInput);
  };
  const countryCode = "+";

  return (
    <AuthWrapper
      title="Forgot Password"
      subtitle="Enter your registered email address or phone number"
      link={"/signup"}
      rightText1={"New to Hairbasicz?"}
      rightText2={"Create account"}
    >
      <Formik
        initialValues={{ email: "", phoneNumber: "" }}
        validationSchema={
          emailInput
            ? forgotPasswordWithEmailSchema
            : forgotPasswordWithPhoneNoSchema
        }
        onSubmit={(values) => {
          const phoneNoValues = {
            phoneNumber: countryCode.concat(values.phoneNumber),
          };

          const emailValues = {
            email: values.email.trim(),
          };

          const payload = {
            payloadValues: emailInput ? emailValues : phoneNoValues,
            navigate,
          };
          dispatch(forgotPassword(payload));
        }}
      >
        {({ touched, errors, isValid, dirty, setFieldValue }) => {
          return (
            <Form id="form">
              <div>
                <Field
                  name={emailInput ? "email" : "phoneNumber"}
                  title={emailInput ? "Email Address" : "Phone Number"}
                  placeholder={
                    emailInput ? "Enter email address" : "Enter phone number"
                  }
                  secondTitle={
                    emailInput ? "Use phone number" : "Use email address"
                  }
                  secondTitleColor="text-[#2922b3]"
                  type={emailInput ? "email" : ""}
                  component={emailInput ? Input : PhoneNumberInput}
                  emptyValue={setFieldValue}
                  changeInput={changeInput}
                  errorMessage={
                    (touched.email && errors.email) ||
                    (touched.phoneNumber && errors.phoneNumber)
                  }
                  country={"ng"}
                />
              </div>

              <Button
                width="w-full"
                height="h-12"
                backgroundColor="bg-[#2922b3]"
                label="Send Otp"
                fontSize="text-base"
                borderRadius={"rounded-md"}
                type={"submit"}
                disabled={
                  !((isValid && dirty) || forgotPasswordData?.isLoading)
                }
                isloading={forgotPasswordData?.isLoading}
              />
            </Form>
          );
        }}
      </Formik>
    </AuthWrapper>
  );
}

export default ForgotPassword;
