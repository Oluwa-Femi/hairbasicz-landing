import React from "react";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import Input from "../../components/Input/Input";
import PhoneNumberInput from "../../components/Input/PhoneNumberInput";
import { Button } from "../../components/Button/Button";
import { Field, Form, Formik } from "formik";
import {
  signupWithEmailSchema,
  signupWithPhoneNoSchema,
} from "../../utils/validation/ecommerceValidation";
import { useDispatch, useSelector } from "react-redux";
import { generateCode } from "../../store/User/AuthActions";
import { useNavigate } from "react-router";
import Storage from "../../utils/services/storage";

function Signup() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = React.useState(true);

  const changeInput = () => {
    setEmailInput(!emailInput);
  };

  const countryCode = "+";
  return (
    <AuthWrapper
      title="Let’s get you started"
      subtitle="  Fill all fields to get onboarded properly on Paysmosmo"
      link={"/login"}
      rightText1={"Have an account?"}
      rightText2={"Login"}
    >
      <Formik
        initialValues={{ email: "", phoneNumber: "" }}
        validationSchema={
          emailInput ? signupWithEmailSchema : signupWithPhoneNoSchema
        }
        onSubmit={(values) => {
          Storage.set("input-type", emailInput);

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

          dispatch(generateCode(payload));
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
                label="Continue"
                fontSize="text-base"
                borderRadius={"rounded-md"}
                type={"submit"}
                disabled={!(isValid && dirty) || auth?.isLoading}
                isloading={auth?.isLoading}
              />
            </Form>
          );
        }}
      </Formik>
    </AuthWrapper>
  );
}

export default Signup;
