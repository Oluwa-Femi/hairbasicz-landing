/**
 * @name: Profile Form
 * @description: Profile form
 */
import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { Avatar, Button } from "@chakra-ui/react";
import Input from "../Input/Input";
import TextArea from "../Input/TextArea";
import PhoneNumberInput from "../Input/PhoneNumberInput";
import responseHandler from "../../utils/notifications/responseHandler";
import { useQueryClient } from "react-query";
import ApiInstance from "../../libs/axios/apiInstance";
import useImageSet from "../../hooks/Settings/useImage";
import bareNumber from "../../utils/functions/BareNumber";

const ProfileForm = ({ setIsOpen, profile }) => {

  const { img, previewImg, handleImage } = useImageSet();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const queryClient = useQueryClient();


  const [user] = useState({
    first_name: profile?.first_name,
    last_name: profile?.last_name,
    phone_number: profile?.phone_number,
    address: `${profile?.address1?.street_address}, ${profile?.address1?.city}, ${profile?.address1?.local_government}, ${profile?.address1?.state}`,
    email: profile?.email,
  });
  const updateCurrent = {
    ...user,
    ...{ phone_number: bareNumber(user?.phone_number) },
  };

  const handleForm = () => {
    const data = new FormData();
    data.append("image", img[0], img[0].name);

    setIsLoading(true);

    ApiInstance.post("/user/customers/profile-picture", data)
      .then((res) => {
        setIsOpen(false);
        responseHandler(res);
        queryClient.invalidateQueries(["Profile"]);
      })
      .catch((err) => responseHandler(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <Formik
      initialValues={updateCurrent}
      onSubmit={(value) => handleForm(value)}
    >
      {({ errors, touched }) => (
        <Form>
          <div
            style={{ border: "1px dotted #D0D5DD" }}
            id="upload-section"
            className="grid grid-cols-12 gap-2 p-3 items-center justify-center"
          >
            <div id="image-sec" className="col-span-2">
              {<Avatar src={previewImg || profile?.profile_picture} />}
            </div>

            <div id="text" className="col-span-10">
              <label htmlFor="image-upload">
                <a className="text-[14px] text-[#2922b3] underline font-[Gilroy-SemiBold] cursor-pointer">
                  {previewImg ? "Change Profile picture" : "Change image"}
                </a>
              </label>
              <p className="text-[12px] text-[#747A8B;]">
                Format accepted (jpg,png)
              </p>
            </div>
          </div>

          <input
            id="image-upload"
            className="opacity-0 h-0"
            ref={inputRef}
            accept="image/*"
            onChange={(e) => handleImage(e)}
            type="file"
            title="upload Selfie"
          />

          <div
            style={{ marginBottom: "-1em" }}
            className="flex gap-6 justify-between"
          >
            <Field
              name={"first_name"}
              placeholder={"Enter first name"}
              title={"First Name"}
              component={Input}

              errorMessage={touched.first_name && errors.first_name}
            />
            <Field
              name={"last_name"}
              placeholder={"Enter last name"}
              title={"Last Name"}
              component={Input}

              errorMessage={touched.last_name && errors.last_name}
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
              name={"phone_number"}
              country={"ng"}
              placeholder={"Enter Phone number"}
              title={"Phone Number"}
              type={"number"}

              errorMessage={touched.phone && errors.phone}
              component={PhoneNumberInput}
            />


          {profile?.address1 && (
            <Field
              name={"address"}
              placeholder={"Enter home address"}

              title={"Home Address"}
              errorMessage={touched.address && errors.address}
              component={TextArea}
            />
          )}

          <Button
            className="font-[Gilroy-Bold]"
            isDisabled={!img || isLoading}
            isLoading={isLoading}
            type="submit"
            width="100%"
            colorScheme="green"
          >
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
