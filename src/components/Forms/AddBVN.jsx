import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import InfoContent from "../Store/InfoContent";
import Input from "../Input/Input";
import { Button } from "@chakra-ui/react";
import { AddBVNSchema } from "../../utils/validation/SettingsValidations";
import { PostBVN } from "../../utils/services/queries/settings.queries";
import responseHandler from "../../utils/notifications/responseHandler";
import { useQueryClient } from "react-query";

const AddBVNForm = ({ setIsOpen, data }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleBVN = async (values) => {
    setIsLoading(true);
    const { bvn: number } = values;
    return PostBVN(number)
      .then((res) => {
        queryClient.invalidateQueries(["Profile"]);
        responseHandler(res);
        setIsOpen(false);
      })
      .catch((err) => responseHandler(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <Formik
        onSubmit={(values) => handleBVN(values)}
        initialValues={{ bvn: data?.status }}
        validationSchema={AddBVNSchema}
      >
        {({ dirty, isValid, touched, errors }) => {
          return (
            <Form>
              <Field
                name={"bvn"}
                placeholder={"Enter the 11-digit code"}
                errorMessage={touched.bvn && errors.bvn}
                component={Input}
              />
              <InfoContent />
              <Button
                isDisabled={!dirty || !isValid || isLoading || data?.bvn}
                isLoading={isLoading}
                className="font-[Gilroy-Bold] mt-6"
                type="submit"
                width="100%"
                colorScheme="green"
              >
                Verify BVN
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddBVNForm;
