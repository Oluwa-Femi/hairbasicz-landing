import { useState } from "react";
const useTotal = () => {
  const [total] = useState(0);
  return { total };
};

export default useTotal;
