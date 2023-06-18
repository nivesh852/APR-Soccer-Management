import { Grid, Paper, Button, CircularProgress, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import './../css/SSSFilter.css';
import { Form } from './useForm';
import config from '../Constants';

function MatchSchedule() {

    const [disable, setDisable] = useState(false);
    const [checkScheduled, setcheckScheduled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch(config.BASE_URL + "scheduleMatches/", {
            method: "GET",
            headers: { "Content-Type": "application/json", }
        })
            .then(res => res.json())
            .catch(err => console.log(err));

        setLoading(false);
        setcheckScheduled(true);

    }



    const getScheduledMatches = async () => {
        const scheduleResponse = await fetch(config.BASE_URL + "getMatches/", {
            method: "GET",
            headers: { "Content-Type": "application/json", }
        })
            .then(res => res.json())
            .catch(err => console.log(err));
        setTableData(scheduleResponse.matches);
    }

    useEffect(() => {
        getScheduledMatches()
    }, [checkScheduled])

    useEffect(async () => {
        const response = await fetch(config.BASE_URL + "checkMatchesScheduled/", {
            method: "GET",
            headers: { "Content-Type": "application/json", }
        })
            .then(res => res.json())
            .catch(err => console.log(err));
        if (response["count"] == 0) {
            //button should be enabled
            setDisable(false);
        } else {
            //button should be disabled
            setDisable(true);
        }
    }, [checkScheduled]);

    const columnNames = {
        "field_id": "Field ID",
        "ground_number": "Ground Number",
        "match_date": "Date",
        "match_division": "Division",
        "match_time": "Time",
        "team_1_id": "Team 1",
        "team_2_id": "Team 2",
    }
    return (
        <React.Fragment>
            <Grid container direction="row">
                <Paper elevation={1} style={{ width: "100%", marginBottom: 6 }} className="paperTab">
                    <Grid container justifyContent="center">
                        <Grid xs={11} item>
                            <Box py={1.5} className="sssFilterDeclarationHead">2021 Game Schedule</Box>
                            <Box className="sssFilterDeclarationContent">Scheduling matches to Teams!!!</Box>
                            <Box className="sssFilterDividor"></Box>
                            &nbsp;
                        </Grid>
                    </Grid>
                    <Form autoComplete="on">
                        <Grid container justifyContent="center">
                            <Box m={4} style={{ position: "relative" }}>
                                <Button
                                    disabled={disable}
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={handleSubmit} >
                                    Schedule
                                </Button>
                                {loading && (<CircularProgress style={{
                                    position: "absolute", top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }} size={24} />)}
                            </Box>
                        </Grid>
                    </Form>
                </Paper>

                {tableData && tableData.length > 0 && <TableContainer component={Paper}>
                    <Box p={4}>
                        <Table width={400}>
                            <TableHead>
                                <TableRow>
                                    {Object.keys(columnNames).map(prop => <TableCell align="center">{columnNames[prop]}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row) => (
                                    <TableRow
                                        key={row["field_id"]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {Object.keys(columnNames).map(prop => <TableCell align="center">{row[prop]}</TableCell>)}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </TableContainer>}
            </Grid>
        </React.Fragment>
    )
}
// onClick={() => setDisable(true)}
export default MatchSchedule
