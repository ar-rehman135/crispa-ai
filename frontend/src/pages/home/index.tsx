import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SharePrice from "../../components/tabs/sharePrice";

import "./index.css";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{ borderBottom: 1, borderColor: "#9DA3AE", width: "max-content" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Share price" {...a11yProps(0)} className="tab" />
            <Tab label="Dashboard" {...a11yProps(1)} className="tab" />
            <Tab label="Entry list" {...a11yProps(2)} className="tab" />
          </Tabs>
        </Box>
      </Box>
      {value === 0 && <SharePrice />}
    </>
  );
}
