import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AppContext from "../Contexts/AppContext";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Container } from "@mui/system";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { setLoggedIn } = useContext(AppContext);
  const [userData, setUserData] = useState({});

  const deleteUser = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_LOCAL_HOST}/deleteUser`, {
        withCredentials: true,
      });
      setLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = cookies.jwt;
      if (!token) {
        navigate("/");
      } else {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_LOCAL_HOST}/checkuser`,
            { withCredentials: true }
          );
          if (!data.status) {
            removeCookie("jwt");
            navigate("/");
          } else {
            setLoggedIn(true);
          }
        } catch (err) {
          console.log(err);
          removeCookie("jwt");
          navigate("/");
        }
      }
    };
    verifyUser();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_LOCAL_HOST}/getUser`,
          {
            withCredentials: true,
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  return (
      <div className="profile-container">
        <Container maxWidth="md">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>User</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Username: {userData.user}</Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Typography>Email: {userData.email}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Notification Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Manage Account</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <button onClick={deleteUser}>Delete Account</button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Contact Us</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </div>
  );
};

export default Profile;
