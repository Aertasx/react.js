import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const addLoginHandler = async (enteredLoginData) => {
    const loginResponse = await fetchLogin(
      enteredLoginData.email,
      enteredLoginData.pass
    );
    if (loginResponse === "success") {
      dispatch(authActions.login());
      window.location.href = '/admin';
      // window.location.reload();
      // router.push("/admin");
    } else {
      alert(loginResponse);
    }
  };

  return <LoginForm onLogin={addLoginHandler} />;
};

const fetchLogin = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3500/api/account/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (response.status === 200 && response.data.status === "success") {
      return (response.data.status);
    }
  } catch (error) {
    if (error.response.status === 401) {
      return (error.response.data.text);
      // alert(
      //   "Status: " +
      //     error.response.data.status +
      //     " Message: " +
      //     error.response.data.text
      // );
    } else {
      console.error("Error fetching data:", error);
    }
  }
};

export default LoginPage;
