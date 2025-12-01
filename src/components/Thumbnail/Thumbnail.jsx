import React from "react";

const Thumbnail = ({ image }) => {
  return (
    <div>
      <img src={image} alt="thumbnail" />
    </div>
  );
};

export default Thumbnail;
