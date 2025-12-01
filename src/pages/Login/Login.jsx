/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Field, Form, Formik } from "formik";
import {
  loginWithEmailSchema,
  loginWithPhoneNoSchema,
} from "../../utils/validation/ecommerceValidation";
import { login } from "../../store/User/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import PhoneNumberInput from "../../components/Input/PhoneNumberInput";
import Input from "../../components/Input/Input";

function Login() {
  const auth = useSelector((state) => state.auth);

  const [emailInput, setEmailInput] = React.useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goToResetPassword = () => {
    navigate("/forgot-password");
  };

  const changeInput = () => {
    setEmailInput(!emailInput);
  };
  const countryCode = "+";

  return (
    <AuthWrapper
      title="Log In"
      subtitle="Let’s get you started"
      link={"/signup"}
      rightText1={"New to Hairbasicz?"}
      rightText2={"Create account"}
    >
      <Formik
        initialValues={{ email: "", phoneNumber: "", password: "" }}
        validationSchema={
          emailInput ? loginWithEmailSchema : loginWithPhoneNoSchema
        }
        onSubmit={(values) => {
          const phoneNoValues = {
            phoneNumber: countryCode.concat(values.phoneNumber),
            password: values.password,
          };

          const emailValues = {
            email: values.email.trim(),
            password: values.password,
          };

          const payload = {
            payloadValues: emailInput ? emailValues : phoneNoValues,
            navigate,
          };
          dispatch(login(payload));
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
                  type={emailInput ? "email" : "number"}
                  component={emailInput ? Input : PhoneNumberInput}
                  emptyValue={setFieldValue}
                  changeInput={changeInput}
                  errorMessage={
                    (touched.email && errors.email && errors.email) ||
                    (touched.phoneNumber &&
                      errors.phoneNumber &&
                      errors.phoneNumber)
                  }
                  country={"ng"}
                />
              </div>

              <div>
                <Field
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  title="Password"
                  component={Input}
                  emptyValue={setFieldValue}
                  errorMessage={
                    touched.password && errors.password && errors.password
                  }
                />
              </div>
              <p
                className="text-[#2922b3] font-[Gilroy-Medium] text-base font-semibold mt-[-5px] mb-6 cursor-pointer"
                onClick={goToResetPassword}
              >
                Forgot password?
              </p>
              <Button
                width="w-full"
                height="h-12"
                backgroundColor="bg-[#2922b3]"
                label="Log In"
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

export default Login;
