import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Button } from "../../components/Button/Button";

const SubscriptionForm = () => {
  return (
    <div>
      <Formik initialValues={{ email: "" }}>
        {({ touched, errors }) => {
          return (
            <Form id="form">
              <div className="flex justify-between items-center pl-[20px] sm:mx-auto xsm:pl-[0px] sm:pl-[0px] w-[460px] sm:gap-3 xsm:flex-col sm:w-full xsm:w-full xsm:items-start">
                <Field
                  name={"email"}
                  placeholder="Enter your email address"
                  type={"email"}
                  className="focus:outline-0 py-[8px] font-[Gilroy-Regular] text-[#5F6166] px-[16px] w-[285px] xsm:w-[100%] sm:w-[100%] rounded-md h-[48px]"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <ErrorMessage name="email" />
                <div className="xsm:mt-[20px]">
                  <Button
                    width={"w-[140px]"}
                    height={"h-[48px]"}
                    borderRadius={"rounded-[8px]"}
                    backgroundColor={"bg-[#2922b3]"}
                    type={"submit"}
                    fontSize={"text-[16px]"}
                    fontWeight={"font-[600]"}
                    label="Subscribe"
                    color={"text-white"}
                    // disabled={!(isValid && dirty)}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SubscriptionForm;
