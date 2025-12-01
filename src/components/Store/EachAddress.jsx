/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import EditIcon from "../../assets/Edit.svg";

import DeleteIcon from "../../assets/Delete.svg";
const EachAddress = ({
  data,
  onClickEdit,
  onClickDelete,
  type,
  onClickPrimary,
}) => {
  const handlePrimary = () =>
    onClickPrimary({ ...data, ...{ is_primary_address: true } });
  return (
    <div
      key={data?.address_type}
      id="each_address"
      className="py-4 xl:grid grid-cols-12 last:border-none address"
    >
      <div id="content" className="xl:col-span-9">
        <div className="flex gap-3">
          <h2 className="text-[#1C1D1F] text-[18px]">{data?.street_address}</h2>
          {data?.is_primary_address !== "false" && data?.is_primary_address ? (
            <p className="border-[#F59E0B] border-2 bg-[#FFFBEB] text-[#F59E0B] p-2 rounded-full font-[Gilroy-Regular] text-[14px]">
              Primary address
            </p>
          ) : (
            <a className="cursor-pointer" onClick={handlePrimary}>
              <p className="bg-[#EBEEF2] text-[#868A90] p-2 rounded-full font-[Gilroy-Regular] text-[14px]">
                Make primary address
              </p>
            </a>
          )}
        </div>

        <p className="text-[#868A90]">
          {data?.local_government}, {data?.city},
        </p>
        <p className="text-[#868A90]">{data?.state}.</p>
      </div>
      <div id="icon" className="xl:col-span-3 flex justify-end">
        <div className="flex gap-4">
          <div
            className="cursor-pointer"
            onClick={() => onClickEdit(data, type)}
          >
            {" "}
            <img src={EditIcon} alt="editIcon" />{" "}
          </div>
          <div className="cursor-pointer" onClick={onClickDelete}>
            {" "}
            <img src={DeleteIcon} alt="deleteIcon" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachAddress;

//{"city":"Papa Ajao","state":"Lagos","street_address":"371 Agege motor road","local_government":"Oshodi","is_primary_address":true}
