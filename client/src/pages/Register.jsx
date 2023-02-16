import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { Stack } from "@mui/system";

const Register = () => {
  const { setLoggedIn, setUserRegistered } = useContext(AppContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [cookies] = useCookies(["jwt"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/home");
    }
  }, [cookies, navigate]);

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_LOCAL_HOST}/register`,
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
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <h1>Seed Oil App</h1>
        <h2>Register</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="username"
            name="username"
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
        <span>Already have an account ?</span>
        <button onClick={() => setUserRegistered(true)}>Login</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Register;
