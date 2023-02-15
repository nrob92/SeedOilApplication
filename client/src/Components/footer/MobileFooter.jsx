import React, { useContext } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppContext from "../../Contexts/AppContext";
import { Stack, Box, Tabs, Tab } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MobileFooter = () => {
  const matches = useMediaQuery("(max-width:700px)");
  const { loggedIn, footerTag, setFooterTag, setLoggedIn } =
    useContext(AppContext);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setFooterTag(newValue);
  };
  const logOut = () => {
    removeCookie("jwt");
    navigate("/");
    setLoggedIn(false);
  };

  let tagsInfo = [
    "grass-fed",
    "grass-finished",
    "organic",
    "butter",
    "canola",
    "seed-oil",
  ];

  return (
    <>
      {matches && loggedIn ? (
        <div className="footer">
          {location.pathname !== "/profile" && (
            <Box
              sx={{
                p: 1,
                maxWidth: "95%",
                backgroundColor: "transparent",
              }}
            >
              <Tabs
                value={footerTag ? footerTag : ""}
                onChange={handleChange}
                textColor="inherit"
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                <Tab
                  sx={{
                    m: 0.5,
                    p: 1,
                    fontSize: 10,
                    minHeight: "20px",
                    minWidth: "90px",
                    border: "2px solid",
                    borderRadius: "10px",
                    background: "#4c3202",
                    color: "#edba45",
                  }}
                  value={""}
                  label={"none"}
                />
                {tagsInfo.map((tab, i) => {
                  return (
                    <Tab
                      sx={{
                        m: 0.5,
                        p: 1,
                        fontSize: 10,
                        minHeight: "20px",
                        minWidth: "90px",
                        border: "2px solid",
                        borderRadius: "10px",
                        background: "#4c3202",
                        color: "#edba45",
                      }}
                      key={i}
                      value={tab}
                      label={tab}
                    />
                  );
                })}
              </Tabs>
            </Box>
          )}

          <Stack direction="row">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/profile")}>Profile</button>
            <button onClick={logOut}>Logout</button>
          </Stack>
        </div>
      ) : null}
    </>
  );
};

export default MobileFooter;
