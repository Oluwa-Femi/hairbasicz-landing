import { Field, Form, Formik } from "formik";
import Input from "../Input/Input";
import { Button } from "@chakra-ui/react";
import { ChangePasswordSchema } from "../../utils/validation/SettingsValidations";
import useChangePassword from "../../hooks/Settings/useChangePassword.hooks";

const ChangePasswordForm = () => {
  const { handleSubmit, isLoading } = useChangePassword();

  return (
    <Formik
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={ChangePasswordSchema}
      initialValues={{}}
    >
      {({ isValid, errors, touched }) => {
        return (
          <>
            <div id="password-wrapper" className="xl:w-[60%] xl:m-auto">
              <Form id="change-password">
                <Field
                  name={"currentPassword"}
                  title={"Current Password"}
                  type={"password"}
                  placeholder={"Enter your password"}
                  component={Input}
                  errorMessage={
                    touched.currentPassword && errors.currentPassword
                  }
                />
                <Field
                  name={"newPassword"}
                  title={"New Password"}
                  type={"password"}
                  placeholder={"Enter your new password"}
                  component={Input}
                  errorMessage={touched.newPassword && errors.newPassword}
                />
                <Field
                  name={"confirmPassword"}
                  title={"Confirm new Password"}
                  type={"password"}
                  placeholder={"Re-enter your password"}
                  component={Input}
                  errorMessage={
                    touched.confirmPassword && errors.confirmPassword
                  }
                />
                <div id="align-button" className="flex justify-end">
                  <Button
                    isLoading={isLoading}
                    isDisabled={isLoading || !isValid}
                    colorScheme="green"
                    type="submit"
                    className="bg-[rgba(79,186,71,1)] w-[115px] h-[36px] mx-2 text-white rounded-md font-[Gilroy-Bold]"
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default ChangePasswordForm;
