import { Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import { AddPhoneSchema } from "../../utils/validation/SettingsValidations";
import PhoneNumberInput from "../Input/PhoneNumberInput";

const AddPhoneForm = ({ handlePhone, isLoading }) => {
    return (
        <>
        <h2>Enter your Phone number</h2>
            <Formik
            initialValues={{ phone: "" }}
                validationSchema={AddPhoneSchema}
                onSubmit={(values) => handlePhone(values)}
            >
            {({ errors, ...rest }) => (

                <Form>
                   <Field
            name={"phone"}
            country={"ng"}
            placeholder={"Enter Phone number"}
            title={"Phone Number"}
            type={"number"}
            errorMessage={errors.phone}
            component={PhoneNumberInput}
              />

                    <Button
                className="font-[Gilroy-Bold] mt-6"
                isDisabled={!rest.dirty || !rest.isValid || isLoading}
                isLoading={isLoading}
                type="submit"
                width="100%"
                colorScheme="green"
              >
                Continue
              </Button>
            </Form>
        )}

        </Formik>
        </>
    );
};

export default AddPhoneForm;
