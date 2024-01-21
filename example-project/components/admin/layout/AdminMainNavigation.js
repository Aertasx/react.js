import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";
import { Cookies } from "react-cookie";
import classes from "./MainNavigation.module.css";
import { useEffect } from "react";
// import { useEffect, useState } from "react";

function AdminMainNavigation() {
  // const [isAuthChecked, setIsAuthChecked] = useState(false);
  // console.log("isAuthChecked: "+ isAuthChecked);
  const router = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  useEffect(() => {
    const currentPath = router.pathname;
    console.log('Mevcut sayfanın rotası:', currentPath);
  }, []);

  const checkAuthFetch = async (path) => {
    let isAuth = false;
    try {
      const axiosConfig = {
        withCredentials: true,
      };

      const response = await axios.get(
        "http://localhost:3500/api/account/check-auth",
        axiosConfig
      );
      console.log("checkAuth çalıştı 2");
      if (response.status === 200 && response.data.status === "success") {
        dispatch(authActions.login());
        isAuth = true;
      } else {
        dispatch(authActions.logout());
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (!isAuth) {
        return window.location.href = "/";
      }
      return router.push(path);
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3500/api/account/logout",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200 && response.data.status === "success") {
        cookies.remove("checkToken");
        cookies.remove("user");
        dispatch(authActions.logout());
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert(
          "Status: " +
            error.response.data.status +
            " Message: " +
            error.response.data.text
        );
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Products</div>
      <nav>
        <ul>
          <li>
            <Link href="/admin" onClick={(e) => { e.preventDefault(); checkAuthFetch("/admin"); }}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/test"
              onClick={(e) => { e.preventDefault(); checkAuthFetch("/admin/test"); }}
            >
              Test
            </Link>
          </li>
          <li>
            <Link
              href="/admin/products/edit-product"
              onClick={(e) => { e.preventDefault(); checkAuthFetch("/admin/products/edit-product"); }}
            >
              Edit Product
            </Link>
          </li>
          <li>
            <Link
              href="/admin/products/new-product"
              onClick={(e) => { e.preventDefault(); checkAuthFetch("/admin/products/new-product"); }}
            >
              Add New Product
            </Link>
          </li>
          <li>
            <a href="#" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AdminMainNavigation;
