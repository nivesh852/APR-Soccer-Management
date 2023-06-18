import React, { useState, useEffect } from "react";
import { Grid } from '@material-ui/core';
import { useForm, Form } from './useForm';
import Controls from './controls/Controls';
import { Box } from '@mui/system';
import './../css/SSSFilter.css';
import { DataGrid } from "@material-ui/data-grid";
import { withRouter } from 'react-router-dom';
import config from '../Constants';

function SSSFilter(props) {
    const [searching, setSearching] = useState(false);
    const [tableData, setTableData] = useState([]);

    const [divisions, setDivisions] = useState([]);
    const [dates, setDates] = useState([]);
    const [venues, setVenues] = useState([]);
    const [teams, setTeams] = useState([]);
    const [clubs, setClubs] = useState([]);

    const columns = [
        { field: 'id', headerName: 'NUMBER', minWidth: 200, flex: 2, headerClassName: 'super-app-theme--header', editable: false },
        {
            field: 'match_division', headerName: 'DIVISION', minWidth: 200, flex: 2, headerClassName: 'super-app-theme--header', editable: false,
            renderCell: (params) => {
                return (<a href={'../accepted-teams?division=' + params.value} className="cellAnchor">{params.value}</a>);
            }
        },
        { field: 'match_time', headerName: 'TIME', minWidth: 200, flex: 2, headerClassName: 'super-app-theme--header', editable: false },
        {
            field: 'field_id', headerName: 'FIELD', minWidth: 200, flex: 2, headerClassName: 'super-app-theme--header', editable: false,
            renderCell: (params) => {
                return (<a href="../maps" className="cellAnchor">{params.value}</a>);
            }
        },
        {
            field: 'team_1_name', headerName: 'TEAM 1', minWidth: 200, flex: 2, headerClassName: 'super-app-theme--header', editable: false,
            renderCell: (params) => {
                return (<a href={'../schedule?team=' + findValue(teams, params.row.team_1_id)[0].value} className="cellAnchor">{params.value}</a>);
            }
        },
        {
            field: 'team_2_name', headerName: 'TEAM 2', minWidth: 200, flex: 2, headerClassName: 'super-app-theme--header', editable: false,
            renderCell: (params) => {
                // alert(JSON.stringify(params.row));
                return (<a href={'../schedule?team=' + findValue(teams, params.row.team_2_id)[0].value} className="cellAnchor">{params.value}</a>);
            }
        },
    ];

    const initialFValues = {
        division: '',
        day: '',
        venue: '',
        team_id: '',
        club_name: '',
    }

    const findID = (array, value) => {
        return array.filter(obj => obj.value === value);
    };

    const findValue = (array, id) => {
        return array.filter(obj => obj.id === id);
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFValues, false, true);

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();

        let resDivisions = divisions.map(x => x.value);
        let resDay = dates.map(x => x.value);
        let resVenue = venues.map(x => x.value);
        let resTeams = teams.map(x => x.value);
        let resClub = clubs.map(x => x.value);

        let division = values['division'];
        let day = values['day'];
        let venue = values['venue'];
        let team = values['team_id'];
        let club = values['club_name'];
        let data = {
            division: '',
            day: '',
            venue: '',
            team_id: '',
            club_name: '',
        };
        let thereIsAValue = false;

        if (division !== null && division !== '') {
            if (resDivisions.indexOf(division) !== -1) {
                data.division = division;
                thereIsAValue = true;
            }
        }

        if (day !== null && day !== '') {
            if (resDay.indexOf(day) !== -1) {
                data.day = day;
                thereIsAValue = true;
            }
        }

        if (venue !== null && venue !== '') {
            if (resVenue.indexOf(venue) !== -1) {
                // data.venue = venue;
                data.venue = findID(venues, venue)[0].id;
                thereIsAValue = true;
            }
        }

        if (team !== null && team !== '') {
            if (resTeams.indexOf(team) !== -1) {
                data.team_id = findID(teams, team)[0].id;
                thereIsAValue = true;
            }
        }

        if (club !== null && club !== '') {
            if (resClub.indexOf(club) !== -1) {
                data.club_name = club;
                thereIsAValue = true;
            }
        }

        console.debug(data);
        let location = {
            ...props.location,
        };

        let params = new URLSearchParams(location.search);
        delete location.key;
        if (data.division === "") {
            params.delete("division");
        } else {
            params.set("division", data.division);
        }

        if (data.day === "") {
            params.delete("day");
        } else {
            params.set("day", data.day);
        }

        if (data.venue === "") {
            params.delete("venue");
        } else {
            params.set("venue", venue);
        }

        if (data.team_id === "") {
            params.delete("team");
        } else {
            params.set("team", team);
        }

        if (data.club_name === "") {
            params.delete("club");
        } else {
            params.set("club", data.club_name);
        }

        location.search = params.toString();
        props.history.push(location);

        if (thereIsAValue) {
            setSearching(true);
            setValues({
                ...data,
                venue: venue,
                team_id: team,
            });
            setTableData([]);
            // create a searching variable and use it to disable dropdowns.
            fetch(config.BASE_URL + "filterMatches/", {
                body: JSON.stringify(data),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Access-Control-Request-Headers": "Content-Type"
                },
            }).then((res) => res.json())
                .then((result) => {
                    setTableData(result.matches);
                    console.log(result);
                    setSearching(false);
                })
                .catch((e) => {
                    setSearching(false);
                });
        } else {
            setTableData([]);
        }
    };

    /* const handleCellClick = (param, event) => {
        if (param.colIndex === 2) {
            event.stopPropagation();
        }
    }; */

    useEffect(() => {
        fetch(config.BASE_URL + "getFilterParams/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Request-Headers": "Content-Type"
            },
        }).then((res) => res.json())
            .then((result) => {
                setDivisions(result.division);
                let resDivisions = result.division.map(x => x.value);
                setDates(result.day);
                let resDay = result.day.map(x => x.value);
                setVenues(result.venue);
                let resVenue = result.venue.map(x => x.value);
                setTeams(result.teams);
                let resTeams = result.teams.map(x => x.value);
                setClubs(result.club);
                let resClub = result.club.map(x => x.value);

                let param = new URLSearchParams(props.location.search);
                let division = param.get('division');
                let day = param.get('day');
                let venue = param.get('venue');
                let team = param.get('team');
                let club = param.get('club');
                let data = {
                    division: '',
                    day: '',
                    venue: '',
                    team_id: '',
                    club_name: '',
                };
                let thereIsAValue = false;

                if (division !== null && division !== '') {
                    if (resDivisions.indexOf(division) !== -1) {
                        data.division = division;
                        thereIsAValue = true;
                    }
                }

                if (day !== null && day !== '') {
                    if (resDay.indexOf(day) !== -1) {
                        data.day = day;
                        thereIsAValue = true;
                    }
                }

                if (venue !== null && venue !== '') {
                    if (resVenue.indexOf(venue) !== -1) {
                        data.venue = findID(venues, venue)[0].id;
                        thereIsAValue = true;
                    }
                }

                if (team !== null && team !== '') {
                    if (resTeams.indexOf(team) !== -1) {
                        data.team_id = findID(result.teams, team)[0].id;
                        thereIsAValue = true;
                    }
                }

                if (club !== null && club !== '') {
                    if (resClub.indexOf(club) !== -1) {
                        data.club_name = club;
                        thereIsAValue = true;
                    }
                }

                let location = {
                    ...props.location,
                };

                let params = new URLSearchParams(location.search);
                delete location.key;
                if (data.division === "") {
                    params.delete("division");
                } else {
                    params.set("division", data.division);
                }

                if (data.day === "") {
                    params.delete("day");
                } else {
                    params.set("day", data.day);
                }

                if (data.venue === "") {
                    params.delete("team");
                } else {
                    params.set("venue", venue);
                }

                if (data.team_id === "") {
                    params.delete("team");
                } else {
                    params.set("team", team);
                }

                if (data.club_name === "") {
                    params.delete("club");
                } else {
                    params.set("club", data.club_name);
                }

                location.search = params.toString();
                props.history.push(location);

                if (thereIsAValue) {
                    setSearching(true);
                    let tempData = {
                        ...data,
                        venue: venue,
                        team_id: team
                    }
                    setValues(tempData);
                    setTableData([]);
                    // create a searching variable and use it to disable dropdowns.
                    fetch(config.BASE_URL + "filterMatches/", {
                        body: JSON.stringify(data),
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "POST",
                            "Access-Control-Request-Headers": "Content-Type"
                        },
                    }).then((res) => res.json())
                        .then((result) => {
                            setTableData(result.matches);
                            setSearching(false);
                        })
                        .catch((e) => {
                            setSearching(false);
                        });
                }
            })
            .catch((e) => {
            });
    }, []);

    return (
        <React.Fragment>
            <Box className="sssMainDiv">
                <Grid container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    <Box className="sssFilterDeclarationHead">2021 Game Schedule</Box>
                    <Box className="sssFilterDeclarationContent">Select one of the following searches to find your team's games. Game times, location and opponents subject to change. Scores are posted as soon as available, but subject to change in the event of a review.</Box>
                    <Box className="sssFilterDividor"></Box>
                </Grid>
                <Form autoComplete="on" onSubmit={handleRegistrationSubmit}>
                    <Grid container spacing={1}>
                        <Grid container item>
                            <Grid container item xs={4}>
                                <Controls.Select
                                    variant="outlined"
                                    name="division"
                                    label="Search by Division"
                                    value={values.division}
                                    onChange={handleInputChange}
                                    options={divisions}
                                    disabled={searching}
                                />
                            </Grid>
                            <Grid container item xs={4}>
                                <Controls.Select
                                    variant="outlined"
                                    name="day"
                                    label="Search by Day"
                                    value={values.day}
                                    onChange={handleInputChange}
                                    options={dates}
                                    disabled={searching}
                                />
                            </Grid>
                            <Grid container item xs={4}>
                                <Controls.Select
                                    variant="outlined"
                                    name="venue"
                                    label="Search by Venue"
                                    value={values.venue}
                                    onChange={handleInputChange}
                                    options={venues}
                                    disabled={searching}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item>
                            <Grid container item xs={6}>
                                <Controls.Select
                                    variant="outlined"
                                    name="team_id"
                                    label="Search by Team"
                                    value={values.team_id}
                                    onChange={handleInputChange}
                                    options={teams}
                                    disabled={searching}
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <Controls.Select
                                    variant="outlined"
                                    name="club_name"
                                    label="Search by Club"
                                    value={values.club_name}
                                    onChange={handleInputChange}
                                    options={clubs}
                                    disabled={searching}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: '1rem', marginBottom: '0.3rem' }}
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Controls.DisableButton
                            variant="contained"
                            color="secondary"
                            size="large"
                            text="See Games"
                            disabled={Object.values(values).filter(x => x !== "").length === 0 || searching}
                        />
                    </Grid>
                </Form>

                <Box className="sssTableBox" style={{
                    height: '27rem',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <DataGrid style={{
                        width: '90%',
                        height: '90%',
                        backgroundColor: '#FFFFFF'
                    }} className='teamTable'
                        rows={tableData}
                        columns={columns}
                        pageSize={5}
                        disableSelectionOnClick
                        rowsPerPageOptions={[15, 30, 45, 60, 75, 90]}
                        // onCellClick={handleCellClick}
                        isCellEditable="false"
                    ></DataGrid>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default withRouter(SSSFilter);
