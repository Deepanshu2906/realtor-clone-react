import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // need  to give some time to load/ checking status
  const [checkingStatus, setCheckingStatus] = useState(true);

  // useeffect
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });
  }, []);
  return { loggedIn, checkingStatus };
};

// export default useAuthStatus
// when we export two thing we can  not use default;
export { useAuthStatus };
