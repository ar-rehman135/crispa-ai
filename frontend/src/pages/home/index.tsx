import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import SharePrice from "components/tabs/sharePrice";

import { StyledTabsContainer, StyledTabsWrapper } from "./index.styles";
import EntryList from "components/tabs/entryList";

interface TabPanel {
  label: string;
  component: JSX.Element;
}

export default function Home() {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs: TabPanel[] = React.useMemo(
    () => [
      { label: "Share price", component: <SharePrice /> },
      { label: "Dashboard", component: <div>Dashboard content</div> },
      { label: "Entry list", component: <EntryList /> },
    ],
    []
  );
  return (
    <>
      <StyledTabsContainer>
        <StyledTabsWrapper>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabs.map((tab, index) => (
              <Tab className="tabs" label={tab.label} key={index} />
            ))}
          </Tabs>
        </StyledTabsWrapper>
      </StyledTabsContainer>
      {tabs[value].component}
    </>
  );
}
