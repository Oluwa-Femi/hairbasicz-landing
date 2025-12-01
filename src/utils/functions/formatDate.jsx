import React from "react";
import moment from "moment";

export const formatDate = (date) => {
  return moment(date)?.format("MMMM DD, YYYY");
};

export const relativeDate = (date = new Date()) => moment(date).startOf('hour').fromNow();

export const readableDate = (date) => moment(date).format("D-MM-yyyy");

export const formatDateTimezone = (date) => {
  return (
    <div className="flex gap-5">
      {moment(date)?.format("DD/MM/yyyy")} &#9702;{" "}
      <span className="uppercase text-[#868A91] font-[Gilroy-Medium] text-sm font-[500]">
        {moment(date)?.format("h:mm a")}
      </span>
    </div>
  );
};
