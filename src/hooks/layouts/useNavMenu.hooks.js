import { useState } from "react";

const useNavMenu = () => {
  const [showMyAccount, setShowMyAccount] = useState(false);
  const toggleMyAccountNav = () => {
    setShowMyAccount(!showMyAccount);
  };

  return { showMyAccount, toggleMyAccountNav };
};

export default useNavMenu;
