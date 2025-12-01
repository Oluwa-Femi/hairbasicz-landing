/**
 * @name: useMessageStored
 * @description: Custom hooks to track the persistant storage of selected message
 */

import { useEffect, useState } from "react";
import Storage from "../../utils/services/storage";

const useMessageStored = () => {
  const [selected, setSelected] = useState();
  const [storage, setStorage] = useState();

  useEffect(() => {
    const message = Storage.get("SingleMessage");
    setStorage(JSON.parse(message));
  }, []);

  useEffect(() => {
    if (storage && !selected) {
      setSelected(storage);
    }
  }, [storage]);

  return { selected };
};

export default useMessageStored;
