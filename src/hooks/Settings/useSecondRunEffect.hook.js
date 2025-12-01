import { useEffect, useRef } from "react";
// avoid running effect on mount
const useSecondRunEffect = (callback, deps) => {
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    callback();
  }, deps);
};
export default useSecondRunEffect;
