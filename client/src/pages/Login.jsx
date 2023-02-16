import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";

const Login = () => {
  const { setLoggedIn, setUserRegistered } = useContext(AppContext);
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/home");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_LOCAL_HOST}/login`,
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          setLoggedIn(true);
          navigate("/home");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <>
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <h1>Seed Oil App</h1>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            autoComplete="username"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <span>Don't have an account ?</span>
        <button onClick={() => setUserRegistered(false)}> Register </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
