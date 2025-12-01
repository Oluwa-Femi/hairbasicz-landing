/**
 * @name: KinForm
 * @description: Next of Kin form
 */
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import Input from "../Input/Input";
import TextArea from "../Input/TextArea";
import { NextKinSchema } from "../../utils/validation/SettingsValidations";
import PhoneNumberInput from "../Input/PhoneNumberInput";
import {
  PatchNextKin,
  PostThirdParty,
} from "../../utils/services/queries/settings.queries";
import responseHandler from "../../utils/notifications/responseHandler";
import { useQueryClient } from "react-query";
import ReactSelect from "../Select/ReactSelect";

const KinForm = ({ setIsOpen, isUpdate, currentData }) => {
  // Relationship
  const relationships = [
    { value: "Spouse", label: "Spouse" },
    { value: "Child", label: "Child" },
    { value: "Sister", label: "Sister" },
    { value: "Mother", label: "Mother" },
    { value: "Father", label: "Father" },
    { value: "Relative", label: "Relative" },
  ];

  const [selectedRelation, setSelectedRelationship] = useState(
    currentData && {
      label: currentData?.relationship,
      value: currentData?.relationship,
    },
  );

  const bareNumber = (value) => {
    if (value) return value.replace(/[^\w\s]/gi, "");
    return value;
  };

  const [updateCurrent] = useState(
    currentData
      ? { ...currentData, ...{ phone: bareNumber(currentData?.phone) } }
      : {},
  );

  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const handleForm = (value) => {
    setIsLoading(true);

    const updatedData = {
      ...value,
      ...{ phone: `+${value?.phone}`, relationship: selectedRelation?.value },
    };
    if (!isUpdate) {
      PostThirdParty(updatedData)
        .then((res) => {
          setIsOpen(false);
          responseHandler(res);
          queryClient.invalidateQueries(["Profile"]);
        })
        .catch((err) => responseHandler(err))
        .finally(() => setIsLoading(false));
    }

    if (isUpdate) {
      PatchNextKin(updatedData)
        .then((res) => {
          setIsOpen(false);
          responseHandler(res);
          queryClient.invalidateQueries(["Profile"]);
        })
        .catch((err) => responseHandler(err))
        .finally(() => setIsLoading(false));
    }
  };
  return (
    <Formik
      initialValues={updateCurrent}
      validationSchema={NextKinSchema}
      onSubmit={(value) => handleForm(value)}
    >
      {({ isValid, errors, touched }) => (
        <Form>
          <div
            style={{ marginBottom: "-1em" }}
            className="flex gap-6 justify-between"
          >
            <Field
              name={"firstName"}
              placeholder={"Enter first name"}
              title={"First Name"}
              component={Input}
              errorMessage={touched.firstName && errors.firstName}
            />
            <Field
              name={"lastName"}
              placeholder={"Enter last name"}
              title={"Last Name"}
              component={Input}
              errorMessage={touched.lastName && errors.lastName}
            />
          </div>
          <Field
            name={"email"}
            placeholder={"Enter email address"}
            title={"Email Address"}
            errorMessage={touched.email && errors.email}
            component={Input}
          />
          <Field
            name={"phone"}
            country={"ng"}
            placeholder={"Enter Phone number"}
            title={"Phone Number"}
            type={"number"}
            errorMessage={errors.phone}
            component={PhoneNumberInput}
          />
          <Field
            name={"address"}
            placeholder={"Enter home address"}
            title={"Home Address"}
            errorMessage={touched.address && errors.address}
            component={TextArea}
          />
          <ReactSelect
            label="Relationship"
            name={"relationship"}
            options={relationships}
            defaultValue={{
              label: currentData?.relationship,
              value: currentData?.relationship,
            }}
            value={selectedRelation}
            onChange={(e) => {
              setSelectedRelationship(e);
            }}
            loading={{}}
          />{" "}
          <Button
            className="font-[Gilroy-Bold] mt-6"
            isDisabled={!isValid || !selectedRelation || isLoading}
            isLoading={isLoading}
            type="submit"
            width="100%"
            colorScheme="green"
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default KinForm;
