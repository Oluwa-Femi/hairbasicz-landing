/**
 * @name: Guarantor Form
 * @description: Gurantor form
 */
import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { Avatar, Button } from "@chakra-ui/react";
import Input from "../Input/Input";
import TextArea from "../Input/TextArea";
import { NextKinSchema } from "../../utils/validation/SettingsValidations";
import PhoneNumberInput from "../Input/PhoneNumberInput";
import {
  PatchGuarantor,
  PostGuarantor,
} from "../../utils/services/queries/settings.queries";
import responseHandler from "../../utils/notifications/responseHandler";
import { useQueryClient } from "react-query";
import ImgCam from "../../assets/imgCam.svg";

const GuarantorForm = ({ setIsOpen, isUpdate, currentUser }) => {
  // img
  const [previewImg, setPreviewImg] = useState();
  const [img, setImg] = useState();

  const handleImage = (e) => {
    const image = e.target.files[0];
    setImg(e.target.files);
    setPreviewImg(URL.createObjectURL(image));
  };

  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const queryClient = useQueryClient();
  const bareNumber = (value) => {
    if (value) {
      return value.replace(/[^\w\s]/gi, "");
    }
    return value;
  };
  const updateCurrent = {
    ...currentUser,
    ...{ phone: bareNumber(currentUser?.phone) },
  };

  const handleForm = (value) => {
    //covert data to formData
    const data = new FormData();
    data.append("id_card", img[0], img[0].name);
    data.append("firstName", value?.firstName);
    data.append("lastName", value?.lastName);
    data.append("phone", `+${value?.phone}`);
    data.append("email", value?.email);
    data.append("address", value?.address);

    setIsLoading(true);

    if (!isUpdate) {
      PostGuarantor(data)
        .then((res) => {
          setIsOpen(false);
          responseHandler(res);
          queryClient.invalidateQueries(["Profile"]);
        })
        .catch((err) => responseHandler(err))
        .finally(() => setIsLoading(false));
    }

    if (isUpdate) {
      PatchGuarantor(data)
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
      {({ isValid, dirty, errors, touched }) => (
        <Form>
          <div
            style={{ border: "1px dotted #D0D5DD" }}
            id="upload-section"
            className="grid grid-cols-12 gap-2 p-3 items-center justify-center"
          >
            <div id="image-sec" className="col-span-2">
              {previewImg ? (
                <Avatar src={previewImg} />
              ) : (
                <img src={ImgCam} alt="img-camr" />
              )}
            </div>
            <div id="text" className="col-span-10">
              <label htmlFor="image-upload">
                <a className="text-[14px] text-[#2922b3] underline font-[Gilroy-SemiBold] cursor-pointer">
                  {previewImg
                    ? "Change Uploaded identity document"
                    : "Upload identity document"}
                </a>
              </label>
              <p className="text-[12px] text-[#747A8B;]">
                Document accepted (NIN, driver’s license, passport)
              </p>
            </div>
          </div>
          <input
            id="image-upload"
            className="opacity-0"
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

          <Button
            className="font-[Gilroy-Bold] mt-6"
            isDisabled={!isValid || !img || isLoading || !dirty}
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

export default GuarantorForm;
