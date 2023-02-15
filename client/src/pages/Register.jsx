import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";

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
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        />
        <input
          type="username"
          placeholder="Username"
          name="username"
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="current-password"
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
        />
        <button type="submit">Submit</button>
        <span>Already have an account ?</span>
        <button onClick={() => setUserRegistered(true)}>Login</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Register;
