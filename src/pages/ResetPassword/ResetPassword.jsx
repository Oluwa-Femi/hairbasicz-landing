import React from "react";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import { Button } from "../../components/Button/Button";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import Input from "../../components/Input/Input";
import { Field, Form, Formik } from "formik";
import { resetPasswordSchema } from "../../utils/validation/ecommerceValidation";
import { resetPassword } from "../../store/Password/passwordActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Storage from "../../utils/services/storage";

function ResetPassword() {
  const resetPasswordData = useSelector((state) => state.password);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = JSON.parse(Storage.get("token"));

  return (
    <AuthWrapper
      title="Reset Password"
      subtitle="Enter your new password"
      link={"/signup"}
      rightText1={"New to Hairbasicz?"}
      rightText2={"Create account"}
    >
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={(values) => {
          const payloadValues = {
            token: token,
            password: values.password,
          };

          const payload = {
            payloadValues,
            navigate,
          };
          dispatch(resetPassword(payload));
        }}
      >
        {({ touched, errors, isValid, dirty, setFieldValue, values }) => {
          return (
            <Form id="form">
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
              <div className="mt-[15px] mb-[-8px]">
                <Checkbox
                  disabled={values.password.length < 8}
                  checked={"checked"}
                  label="Minimum of 8 characters"
                />
                <div className="my-[8px]">
                  <Checkbox
                    disabled={!values.password.match(/[A-Z]/)}
                    checked={"checked"}
                    label="One UPPERCASE letter"
                  />
                </div>

                <Checkbox
                  disabled={!values.password.match(/[^\w]/)}
                  checked={"checked"}
                  label="One special characters (#$%&!@)"
                />
              </div>
              <div>
                <Field
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  title="Confirm Password"
                  component={Input}
                  emptyValue={setFieldValue}
                  errorMessage={
                    touched.confirmPassword &&
                    errors.confirmPassword &&
                    errors.confirmPassword
                  }
                />
              </div>
              <Button
                width="w-full"
                height="h-12"
                backgroundColor="bg-[#2922b3]"
                label="Reset Password"
                fontSize="text-base"
                borderRadius={"rounded-md"}
                type={"submit"}
                disabled={!(isValid && dirty) || resetPasswordData?.isLoading}
                isloading={resetPasswordData?.isLoading}
              />
            </Form>
          );
        }}
      </Formik>
    </AuthWrapper>
  );
}

export default ResetPassword;
