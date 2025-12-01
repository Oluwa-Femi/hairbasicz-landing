/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from "react";

import { Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import ApiInstance from "../../libs/axios/apiInstance";
import responseHandler from "../../utils/notifications/responseHandler";
import ImgIcon from "../../assets/ImgIcon.svg";
import { useQueryClient } from "react-query";

const UploadDoc = ({ setIsOpen, idNumber, idType }) => {
  const queryClient = useQueryClient();
  const [img, setImg] = useState([]);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState();
  const handleImage = (e) => {
    const image = e.target.files[0];
    setImg(e.target.files);
    setPreviewImg(URL.createObjectURL(image));
  };

  const removeImg = () => {
    setPreviewImg("");
    setImg([]);
    inputRef.current.value = "";
  };

  const sendPic = () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("image", img[0], img[0].name);
    data.append("id_type", idType);
    data.append("id_number", idNumber);
    ApiInstance.post("/user/customers/id-card", data)
      .then((res) => {
        responseHandler(res);
        setIsOpen(false);
        queryClient.invalidateQueries(["Profile"]);
      })
      .catch((error) => responseHandler(error))
      .finally(() => setIsLoading(false));
  };
  return (
    <div>
      <h2 className="font-[Gilroy-Bold] text-center my-2">Upload ID Card</h2>
      {img && img[0] && (
        <>
          <div id="flex" className="flex">
            <div
              onClick={removeImg}
              id="close"
              className="self-end cursor-pointer"
            >
              <CloseIcon />
            </div>
          </div>
          <div className="min-h-[10em] border p-2 w-[100%] bgColor-[rgba(0, 0, 0, 0.2)]">
            <img src={previewImg} className="object-cover" alt="img" />
          </div>
        </>
      )}

      {img && !img[0] && (
        <label htmlFor="image-upload">
          <div className="flex justify-center items-center gap-3 text-center">
            <div>
              <img src={ImgIcon} className="m-auto" alt="img icon" />
              <p className="cursor-pointer font-[Gilroy-Bold] text-green text-center text-[green] text-[1.2em]">
                Select from gallery
              </p>

              <p>(PNG & Jpeg format)</p>
            </div>
          </div>
        </label>
      )}
      <input
        id="image-upload"
        className="opacity-0"
        ref={inputRef}
        accept="image/*"
        onChange={(e) => handleImage(e)}
        type="file"
        title="upload Selfie"
      />
      {img && img[0] && (
        <Button
          className="font-[Gilroy-Bold] mt-6"
          type="button"
          onClick={sendPic}
          width="100%"
          isLoading={isLoading}
          isDisabled={isLoading}
          colorScheme="green"
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default UploadDoc;
