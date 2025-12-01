/**
 * @name: useCompleteModal
 * @description:
 * items:
 * ! findIncompleteStatus: find current task with uncompleted status
 * ! useCompleteModal
 */

import { useEffect, useState } from "react";

export const findIncompleteStatus = (item) => item?.find((each) => each?.status === null);

const useCompleteModal = ({ menu, openModal }) => {
  const handleLocateComplete = (list = []) => {
    if (list.length > 0) {
      const incompleteStatus = findIncompleteStatus(list);
      if (incompleteStatus) {
        openModal(incompleteStatus);
      }
    }
  };

  const handleEditProfile = (item) => openModal(item);

  const [isComplete, setIsComplete] = useState(findIncompleteStatus(menu));

  useEffect(() => {
    if (menu) {
      setIsComplete(findIncompleteStatus(menu));
    }
  }, [menu]);

  return { handleLocateComplete, isComplete, handleEditProfile };
};

export default useCompleteModal;
