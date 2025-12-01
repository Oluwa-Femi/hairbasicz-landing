import { useEffect, useState } from 'react';
import Storage from '../../utils/services/storage';

const useCheckToken = () => {
  // check for loggedin user
  const token = Storage.get("user-session-token");

  const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(() => {
      setIsLoggedIn(token ? true : false)
    }, [token])

  return {isLoggedIn, token};


};

export default useCheckToken;
