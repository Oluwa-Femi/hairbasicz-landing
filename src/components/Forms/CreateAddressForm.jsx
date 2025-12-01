import { Button } from "@chakra-ui/react";
import React from "react";
import { Field, Form, Formik } from "formik";
import Input from "../Input/Input";
import TextArea from "../Input/TextArea";
import { CheckAddressType } from "../../utils/functions/settings/address.helpers";
import { useCreateDeliveryAddress } from "../../hooks/Settings/useAddress.hooks";
import ReactSelect from "../Select/ReactSelect";

const CreateAddressForm = ({ allAddress, isOpen }) => {
  const initialValues = {
    address_type: CheckAddressType(allAddress),
    is_primary_address: false,
  };
  const {
    handleSubmit,
    allState,
    selectedState,
    selectedLGA,
    allLGA,
    setSelectedLGA,
    handleStateChange,
  } = useCreateDeliveryAddress({
    isOpen,
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) =>
        handleSubmit({
          ...values,
          state: selectedState?.value,
          local_government: selectedLGA?.value,
        })
      }
    >
      {({ isSubmitting }) => {
        return (
          <Form id="update">
            <div className="mb-[20px]">
              <ReactSelect
                label="State"
                options={allState}
                name={"state"}
                value={selectedState}
                onChange={(e) => handleStateChange(e)}
                loading={{}}
              />
              <div className="flex gap-2 justify-between items-center w-full">
                <Field name={"city"} title={"City"} component={Input} />{" "}
                <div className="w-[45%]">
                  <ReactSelect
                    label="LGA"
                    name={"local_government"}
                    options={allLGA}
                    value={selectedLGA}
                    onChange={(e) => {
                      setSelectedLGA(e);
                    }}
                    loading={{}}
                  />{" "}
                </div>
              </div>
              <Field
                name={"street_address"}
                title={"Street Address"}
                component={TextArea}
              />
              <Button
                isLoading={isSubmitting}
                disabled={isSubmitting}
                type="submit"
                bgColor="green"
                color="white"
                w="100%"
              >
                Save
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateAddressForm;
