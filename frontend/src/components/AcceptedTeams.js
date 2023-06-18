import React, { useState, useEffect } from "react";
import { Grid } from '@material-ui/core';
import { useForm, Form } from './useForm';
import Controls from './controls/Controls';
import { Box } from '@mui/system';
import config from '../Constants';
import { withRouter } from 'react-router-dom';

function AcceptedTeams(props) {
    const initialFValues = {
        division: '',
    };
    const [divisions, setDivisions] = useState([]);
    const [searching, setSearching] = useState(false);

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFValues, false, true);

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();

        if (values.division !== null && values.division !== '') {
            props.history.push('../accepted-teams?division=' + values.division);
        }
    };

    useEffect(() => {
        setSearching(true);
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
                setSearching(false);
                setDivisions(result.division);
            })
            .catch((e) => {
                setSearching(false);
            });
    }, []);

    return (
        <Form autoComplete="on" onSubmit={handleRegistrationSubmit} style={{ backgroundColor: '#FFFFFF' }}>
            <Grid container spacing={1}>
                <Grid container item>
                    <Grid container item xs={1}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Box style={{ fontWeight: 700 }}>2021 Teams : </Box>
                    </Grid>
                    <Grid container item xs={2} >
                        <Controls.Select
                            variant="outlined"
                            name="division"
                            label="Divisions"
                            value={values.division}
                            onChange={handleInputChange}
                            disabled={searching}
                            options={divisions}
                        />
                    </Grid>
                    <Grid container item xs={1} style={{ marginLeft: '1rem' }}
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Controls.DisableButton
                            variant="contained"
                            color="secondary"
                            size="medium"
                            text="See Teams"
                            disabled={searching}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Form>
    )
}

export default withRouter(AcceptedTeams);
