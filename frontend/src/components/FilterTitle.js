import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { Paper } from "@material-ui/core";
import SSSFilter from "./SSSFilter";
import AcceptedTeams from "./AcceptedTeams";

function FilterTitle() {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper style={{ width: "100%", height: 'fit-content' }} className="paperTab">
            <Box className="tabBox">
                <TabContext value={value} className="tabContext">
                    <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
                        <TabList
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                            className="tabList"
                        >
                            <Tab className="tab" label="Schedules, Scores and Standings" value="1" sx={{ fontWeight: 900 }} />
                            <Tab className="tab" label="Accepted Teams" value="2" sx={{ fontWeight: 900 }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><SSSFilter /></TabPanel>
                    <TabPanel value="2"><AcceptedTeams /> </TabPanel>
                </TabContext>
            </Box>
        </Paper>
    )
}

export default FilterTitle
