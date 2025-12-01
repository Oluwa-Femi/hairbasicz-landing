import { useState } from "react";

const useImageSet = () => {
    const [previewImg, setPreviewImg] = useState();
    const [img, setImg] = useState();

    const handleImage = (e) => {
    const image = e.target.files[0];
    setImg(e.target.files);
    setPreviewImg(URL.createObjectURL(image));
     };

    return { handleImage, previewImg, img }
};

export default useImageSet;
