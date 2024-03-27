 import { useEffect, useState  } from "react";
import store from "../../store";
import { authActions } from '../../store/auth';
import axios from "axios";
// import { BACK_BASE_URL } from "../../config/urlConfig";

const checkAuth = (back_base_url) => {
  const [isAuthCheckedForInit, setIsAuthCheckedForInit] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuthFetchInit = async () => {
      try {
        const axiosConfig = {
          withCredentials: true
        };
  
        const response = await axios.get(
          back_base_url + "api/account/check-auth",
          axiosConfig
        );
        console.log("checkAuth çalıştı 1");
        if (response.status === 200 && response.data.status === "success") {
          store.dispatch(authActions.login());
          setIsAuth(true);
        } else {
          store.dispatch(authActions.logout());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsAuthCheckedForInit(true); // Auth kontrolünün tamamlandığını işaretliyoruz
      }
    };
    checkAuthFetchInit();
  },[]);
  return {isAuthCheckedForInit, isAuth};
};

export default checkAuth;