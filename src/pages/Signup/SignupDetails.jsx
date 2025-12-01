import { useState } from "react";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import { Button } from "../../components/Button/Button";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import Input from "../../components/Input/Input";
import { Field, Form, Formik } from "formik";
import { signupDetailsSchema } from "../../utils/validation/ecommerceValidation";
import DatePicker from "../../components/DatePicker/DatePicker";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../store/User/AuthActions";
import Storage from "../../utils/services/storage";
import { useDispatch, useSelector } from "react-redux";

function SignupDetails() {
  const auth = useSelector((state) => state.auth);
  const [errorState, setErrorState] = useState(false);
  const dispatch = useDispatch();

  const [status, setStatus] = useState("Select");
  const [gender, setGender] = useState("Select");
  const dropdownList = [
    { name: "Single", value: "single" },
    { name: "Married", value: "married" },
  ];

  const genderDropdownList = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];
  // const [date, setDate] = useState("");
  const navigate = useNavigate();

  // const handleChange = (value) => {
  //   setDate(value);
  // };

  const user = JSON.parse(Storage.get("customer-details"));

  return (
    <AuthWrapper
      title="Let’s get you started"
      subtitle="  Fill all fields to get onboarded properly on Paysmosmo"
      showBottomText={true}
      link={"/login"}
      rightText1={"Have an account?"}
      rightText2={"Login"}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          password: "",
        }}
        validationSchema={signupDetailsSchema}
        onSubmit={(values) => {
          setErrorState(true);
          const payloadValues = {
            firstName: values.firstName,
            lastName: values.lastName,
            dateOfBirth: values.dateOfBirth,
            gender: gender.toLowerCase(),
            maritalStatus: status.toLowerCase(),
            password: values.password,
            email: user.email,
          };

          const payloadValues2 = {
            firstName: values.firstName,
            lastName: values.lastName,
            dateOfBirth: values.dateOfBirth,
            gender: gender.toLowerCase(),
            maritalStatus: status.toLowerCase(),
            password: values.password,
            phoneNumber: user?.phoneNumber,
          };

          const data = user?.email ? payloadValues : payloadValues2;

          const payload = {
            data,
            navigate,
          };
          dispatch(signUp(payload));
        }}
      >
        {({ touched, errors, isValid, dirty, setFieldValue, values }) => {
          return (
            <Form id="form">
              <div className="grid grid-cols-2 justify-between gap-x-4 ">
                <Field
                  name="firstName"
                  title="First Name"
                  placeholder="First Name"
                  type="text"
                  component={Input}
                  emptyValue={setFieldValue}
                  errorMessage={
                    touched.firstName && errors.firstName && errors.firstName
                  }
                />
                <Field
                  name="lastName"
                  title="Last Name"
                  placeholder="Last Name"
                  type="text"
                  component={Input}
                  emptyValue={setFieldValue}
                  errorMessage={
                    touched.lastName && errors.lastName && errors.lastName
                  }
                />
              </div>
              <div className="grid grid-cols-2 justify-between gap-x-4 -mt-[15px] ">
                <Field
                  title="Date of Birth"
                  width="100%"
                  errorMessage={
                    touched.dateOfBirth &&
                    errors.dateOfBirth &&
                    errors.dateOfBirth
                  }
                  id="dateOfBirth"
                  name="dateOfBirth"
                  component={DatePicker}
                />

                <Dropdown
                  dropdownOption={gender}
                  setDropdownOption={setGender}
                  dropdownList={genderDropdownList}
                  dropdownTitle="Gender"
                  width="w-full"
                  errorMessage={
                    gender == "Select" && errorState && "Please choose a gender"
                  }
                />
              </div>
              <div className="my-6">
                <Dropdown
                  dropdownOption={status}
                  setDropdownOption={setStatus}
                  dropdownTitle="Marital status"
                  width="w-full"
                  dropdownList={dropdownList}
                  errorMessage={
                    status == "Select" &&
                    errorState &&
                    "Please choose a marital status"
                  }
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
              <div className="-mt-[15px]">
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

              <Button
                width="w-full"
                height="h-12"
                backgroundColor="bg-[#2922b3]"
                label="Create Account"
                fontSize="text-base"
                borderRadius={"rounded-md"}
                type={"submit"}
                marginTop={"mt-8"}
                disabled={
                  !(isValid && dirty) ||
                  auth?.isLoading ||
                  gender === "Select" ||
                  status === "Select"
                }
                isloading={auth?.isLoading}
              />
            </Form>
          );
        }}
      </Formik>
    </AuthWrapper>
  );
}

export default SignupDetails;
