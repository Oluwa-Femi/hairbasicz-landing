import { Field, Form, Formik } from "formik";
import Input from "../Input/Input";
import { Button } from "@chakra-ui/react";
import { AddEMailSchema } from "../../utils/validation/SettingsValidations";

const AddEmail = ({ handleEmail }) => {
    return (
        <>
        <h2>Enter your Email Address</h2>
            <Formik
            initialValues={{ email: "" }}
                validationSchema={AddEMailSchema}
                onSubmit={(values) => handleEmail(values)}
            >
            {({ errors, touched, ...rest }) => (

                <Form>
                    <Field
                        name={"email"}
                        component={Input}
                        errorMessage={touched.email && errors.email}
                    />
                    <Button
                className="font-[Gilroy-Bold] mt-6"
                isDisabled={!rest.dirty || !rest.isValid || rest.isLoading}
                isLoading={rest.isLoading}
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

export default AddEmail;
