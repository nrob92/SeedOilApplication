import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TextField } from "@mui/material";
import AppContext from "../../Contexts/AppContext";

export default function ScrollableTabsButtonAuto() {
  const { tagValue, setTagValue } = React.useContext(AppContext);
  const [inputValue, setInputValue] = React.useState("");

  const handleChange = (event, newValue) => {
    if (!tagValue.includes(newValue)) {
      setTagValue([...tagValue, newValue]);
    }
  };

  let tagsInfo = [
    "grass-fed",
    "grass-finished",
    "organic",
    "butter",
    "canola",
    "seed-oil",
  ];

  const filterTags = tagsInfo.filter((word) => word.includes(inputValue));
  const tabValue = filterTags[0];
  const tabsValue = tagValue[tagValue.length - 1];

  return (
    <>
      <TextField
        onChange={(e) => setInputValue(e.target.value)}
        id="outlined-basic"
        label="Search and tap tags"
        variant="outlined"
        name="input"
      />
      <Tabs
        value={tabsValue ? tabsValue : tabValue}
        onChange={handleChange}
        textColor="inherit"
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        aria-label="primary tabs example"
      >
        {filterTags.map((tab, i) => {
          return (
            <Tab
              height="10px"
              sx={{
                p: 0,
                margin: "3px",
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
      {tagValue.length > 0 ? (
        <Tabs
          value={tagValue[tagValue.length - 1]}
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          {tagValue.map((tab, i) => {
            return (
              <Tab
                key={i}
                sx={{
                  p: 0,
                  margin: "5px",
                  border: "2px solid",
                  borderRadius: "10px",
                  background: "#4c3202",
                  color: "#edba45",
                }}
                value={tab}
                label={tab}
              />
            );
          })}
        </Tabs>
      ) : undefined}
    </>
  );
}
