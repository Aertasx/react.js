import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from "axios";

const TestPage = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  // console.log("Oturum: "+isAuth); iki kere basıyor.

  useEffect(() => {
    const fetchData = async () => {
      try {
        let prodId = 1;
        const axiosConfig = {
          withCredentials: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };

        const response = await axios.post(
          "http://localhost:3500/api/admin/postProductTest",
          { prodId },
          axiosConfig
        );

        if (response.status === 200 && response.data.status === "success") {
          setContent(response.data.product.name);
        }
      } catch (error) {
        if (error.response.status === 401) {
          // alert(
          //   "Status: " +
          //     error.response.data.status +
          //     " Message: " +
          //     error.response.data.text
          // );
        } else if (error.response.status === 403) {
          console.log("Error fetching data:", error);
        }
        setContent(error.response.data.text);
        dispatch(authActions.logout());
      }
    };

    if (isAuth) {
      fetchData();
    } else {
      // router.push("/");
      return window.location.href = "/";
    }
  }, [isAuth]);

  return (
    <>
      <p>{content}</p>
    </>
  );
};

export default TestPage;
