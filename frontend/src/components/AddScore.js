import React, { useState, useEffect } from "react";
import { Grid, Paper } from '@material-ui/core';
import { Box } from '@mui/system';
import config from '../Constants';
import { useForm, Form } from './useForm';
import Controls from './controls/Controls';

function AddScore() {
    const [teams, setTeams] = useState([]);

    const match_type = [
        { id: '1', value: 'group' },
        { id: '2', value: 'semi' },
        { id: '3', value: 'final' },
    ];

    const initialFValues = {
        team_1_name: "",
        team_2_name: "",
        team_1_goal: "",
        team_2_goal: "",
        match_stage: "",
        winner: "",
        match_result: ""
    };

    const submitScore = () => {
        let tempObj = {
            ...values,
            team_1_name: values.team_1_name.trim().split(' ')[2],
            team_2_name: values.team_2_name.trim().split(' ')[2],
        }
        if (values.team_1_goal > values.team_2_goal) {
            tempObj = {
                ...values,
                winner: values.team_1_name,
                match_result: 'won',
            };
        } else if (values.team_1_goal < values.team_2_goal) {
            tempObj = {
                ...values,
                winner: values.team_2_name,
                match_result: 'won',
            };
        } else {
            tempObj = {
                ...values,
                winner: -1,
                match_result: 'draw',
            };
        }

        alert(JSON.stringify(tempObj));
        fetch(config.BASE_URL + "updateMatchScore/", {
            body: JSON.stringify(tempObj),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Request-Headers": "Content-Type"
            },
        }).then((res) => res.json())
            .then((result) => {
                alert(JSON.stringify(result));
                if (result.update_status) {
                    document.getElementById('addScoreMessage').style.color = "green";
                    document.getElementById('addScoreMessage').innerHTML = 'Scores added successfully';
                } else {
                    document.getElementById('addScoreMessage').style.color = "red";
                    document.getElementById('addScoreMessage').innerHTML = 'Something went wrong. Please try again.';
                }
            })
            .catch((e) => {
                // alert(JSON.stringify(result));
                document.getElementById('addScoreMessage').style.color = "red";
                document.getElementById('addScoreMessage').innerHTML = 'Something went wrong. Please try again.';
            });
    };


    const validateAddScoreForm = (fieldValues = values) => {
        let temp = { ...errors };
        let isTeam1NameEntered = false;
        let isTeam2NameEntered = false;

        if ('team_1_name' in fieldValues) {
            if (fieldValues.team_1_name.trim().length > 0) {
                temp.team_1_name = '';
                isTeam1NameEntered = true;
            } else {
                temp.team_1_name = 'This field is required.';
            }
        }
        if ('team_2_name' in fieldValues) {
            if (fieldValues.team_2_name.trim().length > 0) {
                temp.team_2_name = '';
                isTeam2NameEntered = true;
            } else {
                temp.team_2_name = 'This field is required.';
            }
        }

        if ('match_stage' in fieldValues) {
            temp.match_stage = fieldValues.match_stage.trim().length > 0 ? '' : 'This field is required.';
        }

        if ('team_1_goal' in fieldValues) {
            if (fieldValues.team_1_goal.trim().length === 0) {
                temp.team_1_goal = 'This field is required.';
            } else if (isNaN(fieldValues.team_1_goal)) {
                temp.team_1_goal = 'Only numeric values are allowed.';
            } else if (parseInt(fieldValues.team_1_goal.trim()) < 0) {
                temp.team_1_goal = 'Scores cannot be negative.';
            } else {
                temp.team_1_goal = '';
            }
        }

        if ('team_2_goal' in fieldValues) {
            if (fieldValues.team_2_goal.trim().length === 0) {
                temp.team_2_goal = 'This field is required.';
            } else if (isNaN(fieldValues.team_2_goal)) {
                temp.team_2_goal = 'Only numeric values are allowed.';
            } else if (parseInt(fieldValues.team_2_goal.trim()) < 0) {
                temp.team_2_goal = 'Scores cannot be negative.';
            } else {
                temp.team_2_goal = '';
            }
        }

        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            let everythingFilled = Object.values(temp).every(x => x === "");
            if (everythingFilled) {
                if (fieldValues.team_1_name.trim() === fieldValues.team_2_name.trim()) {
                    document.getElementById('addScoreMessage').style.color = "red";
                    document.getElementById('addScoreMessage').innerHTML = 'Both teams cannot be same';
                    return false;
                } else {
                    return true;
                }
            } else {
                return everythingFilled;
            }
        }
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFValues, true, true, validateAddScoreForm);

    const handleAddScoreSubmit = (e) => {
        e.preventDefault();
        document.getElementById('addScoreMessage').innerHTML = '';
        if (validateAddScoreForm()) {
            submitScore();
        }
    }

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
                alert(JSON.stringify(result.teams));
                setTeams(result.teams);
            })
            .catch((e) => {
            });
    }, []);

    return (
        <React.Fragment>
            <Paper style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                backgroundColor: '#FFFFFF'
            }}>
                <Form autoComplete="on" onSubmit={handleAddScoreSubmit}>
                    <Grid container spacing={1}>
                        <Grid container item>
                            <Grid container item xs={4}>
                                <Controls.Select
                                    variant="outlined"
                                    name="team_1_name"
                                    label="Team 1"
                                    value={values.team_1_name}
                                    error={errors.team_1_name}
                                    onChange={handleInputChange}
                                    options={teams}
                                />
                            </Grid>
                            <Grid container item xs={4}>
                                <Box style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    fontWeight: '900',
                                    width: '100%',
                                    height: '100%',
                                    fontFamily: 'RobotoSlab',
                                    color: '#999999',
                                }}>
                                    VS
                                </Box>
                            </Grid>
                            <Grid container item xs={4}>
                                <Controls.Select
                                    variant="outlined"
                                    name="team_2_name"
                                    label="Team 2"
                                    value={values.team_2_name}
                                    error={errors.team_2_name}
                                    onChange={handleInputChange}
                                    options={teams}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item>
                            <Grid container item xs={4}>
                                <Controls.Input variant="outlined"
                                    label="Team 1 Goals"
                                    name="team_1_goal"
                                    type="number"
                                    value={values.team_1_goal}
                                    error={errors.team_1_goal}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid container item xs={4}>
                                <Controls.Select
                                    variant="outlined"
                                    name="match_stage"
                                    label="Type"
                                    value={values.match_stage}
                                    error={errors.match_stage}
                                    onChange={handleInputChange}
                                    options={match_type}
                                />
                            </Grid>
                            <Grid container item xs={4}>
                                <Controls.Input variant="outlined"
                                    label="Team 2 Goals"
                                    name="team_2_goal"
                                    type="number"
                                    value={values.team_2_goal}
                                    error={errors.team_2_goal}
                                    onChange={handleInputChange} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: '1rem', marginBottom: '0.3rem' }}
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Controls.Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            text="Add Score"
                        />
                    </Grid>
                </Form>
                <Box id="addScoreMessage" style={{
                    height: '3rem',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: '900',
                    fontFamily: 'RobotoSlab',
                    color: '#999999',
                }}>
                </Box>
            </Paper>
        </React.Fragment>
    )
}

export default AddScore
