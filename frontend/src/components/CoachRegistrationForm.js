import { Box, Grid, Paper } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import { useFormTeamReg, Form } from './useFormTeamReg';
import Controls from './controls/Controls';
import config from '../Constants';
import { useHistory } from 'react-router-dom';

const genderItems = [
    { id: '0', value: 'M' },
    { id: '1', value: 'F' }
];


const USAStateList = [
    { id: 'Alabama', value: 'AL' },
    { id: 'Alaska', value: 'AK' },
    { id: 'Arizona', value: 'AZ' },
    { id: 'Arkansas', value: 'AR' },
    { id: 'California', value: 'CA' },
    { id: 'Colorado', value: 'CO' },
    { id: 'Connecticut', value: 'CT' },
    { id: 'Delaware', value: 'DE' },
    { id: 'Florida', value: 'FL' },
    { id: 'Georgia', value: 'GA' },
    { id: 'Hawaii', value: 'HI' },
    { id: 'Idaho', value: 'ID' },
    { id: 'Illinois', value: 'IL' },
    { id: 'Indiana', value: 'IN' },
    { id: 'Iowa', value: 'IA' },
    { id: 'Kansas', value: 'KS' },
    { id: 'Kentucky', value: 'KY' },
    { id: 'Louisiana', value: 'LA' },
    { id: 'Maine', value: 'ME' },
    { id: 'Maryland', value: 'MD' },
    { id: 'Massachusetts', value: 'MA' },
    { id: 'Michigan', value: 'MI' },
    { id: 'Minnesota', value: 'MN' },
    { id: 'Mississippi', value: 'MS' },
    { id: 'Missouri', value: 'MO' },
    { id: 'Montana', value: 'MT' },
    { id: 'Nebraska', value: 'NE' },
    { id: 'Nevada', value: 'NV' },
    { id: 'New Hampshire', value: 'NH' },
    { id: 'New Jersey', value: 'NJ' },
    { id: 'New Mexico', value: 'NM' },
    { id: 'New York', value: 'NY' },
    { id: 'North Carolina', value: 'NC' },
    { id: 'North Dakota', value: 'ND' },
    { id: 'Ohio', value: 'OH' },
    { id: 'Oklahoma', value: 'OK' },
    { id: 'Oregon', value: 'OR' },
    { id: 'Pennsylvania', value: 'PA' },
    { id: 'Rhode Island', value: 'RI' },
    { id: 'South Carolina', value: 'SC' },
    { id: 'South Dakota', value: 'SD' },
    { id: 'Tennessee', value: 'TN' },
    { id: 'Texas', value: 'TX' },
    { id: 'Utah', value: 'UT' },
    { id: 'Vermont', value: 'VT' },
    { id: 'Virginia', value: 'VA' },
    { id: 'Washington', value: 'WA' },
    { id: 'West Virginia', value: 'WV' },
    { id: 'Wisconsin', value: 'WI' },
    { id: 'Wyoming', value: 'WY' },
];



const division = [
    { id: '0', value: 'blue' },
    { id: '1', value: 'green' },
    { id: '2', value: 'yellow' },
    { id: '3', value: 'red' },
];




function CoachRegistrationForm() {

    const history = useHistory();

    const submitTeamRegistration = () => {
        fetch(config.BASE_URL + "teamRegistration/", {
            body: JSON.stringify(finalFormValues),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Request-Headers": "Content-Type"
            },
        }).then((res) => res.json())
            .then((result) => {
                console.log(result)
                history.push("/payment-gateway", { 'team_id': result.team_id })
            })
            .catch((e) => {
            });
    };

    const submitTeamID = () => {
        history.push("/teammatches", { 'team_id': finalFormValues.team_id });
    };

    const initialFValues = {
        team_id: '',
        team_name: '',
        gender: '',
        age_group: 8,
        coach_name: '',
        team_city: '',
        team_state: '',
        club_name: '',
        primary_contact: '',
        division: '',
        player_names: '',
    };

    const validateRegitrationForm = (fieldValues = finalFormValues) => {
        let temp = { ...errors };

        if ('team_name' in fieldValues)
            temp.team_name = fieldValues.team_name.trim() ? '' : 'This field is required.';
        if ('club_name' in fieldValues)
            temp.club_name = fieldValues.club_name.trim() ? '' : 'This field is required.';
        if ('coach_name' in fieldValues)
            temp.coach_name = fieldValues.coach_name.trim() ? '' : 'This field is required.';
        if ('team_city' in fieldValues)
            temp.team_city = (fieldValues.team_city.trim().length > 0) ? '' : 'This field is required.';
        if ('gender' in fieldValues)
            temp.gender = (fieldValues.gender.trim().length > 0) ? '' : 'This field is required.';
        if ('team_state' in fieldValues)
            temp.team_state = (fieldValues.team_state.trim().length > 0) ? '' : 'This field is required.';
        if ('division' in fieldValues)
            temp.division = (fieldValues.division.trim().length > 0) ? '' : 'This field is required.';

        if ('primary_contact' in fieldValues) {
            if (fieldValues.primary_contact.trim().length === 0) {
                temp.primary_contact = 'This field is required.';
            } else if (isNaN(fieldValues.primary_contact)) {
                temp.primary_contact = 'Only numeric values are allowed.';
            } else if (fieldValues.primary_contact.trim().length < 10) {
                temp.primary_contact = 'Minimum 10 digits are required.';
            } else {
                temp.primary_contact = '';
            }
        }

        if ('age_group' in fieldValues) {
            if (fieldValues.age_group.length === 0) {
                temp.age_group = 'This field is required.';
            } else {
                temp.age_group = '';
            }
        }

        setErrors({
            ...temp
        });

        if (fieldValues === finalFormValues) {
            return Object.values(temp).every(x => x === "");
        }
    };

    const {
        finalFormValues,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useFormTeamReg(initialFValues, false, true, validateRegitrationForm);

    const boxStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex - start',
        alignItems: 'center',
    };

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        if (validateRegitrationForm()) {
            submitTeamRegistration();
        }
    };

    const viewTeamSchedule = (e) => {
        e.preventDefault();
        submitTeamID();
    };

    const fileRef = useRef(null);

    return (
        <Box style={boxStyles}>
            <Form autoComplete="on" onSubmit={viewTeamSchedule} style={{ backgroundColor: '#FFFFFF' }}>
                <Grid container spacing={1}>
                    <Grid container item>
                        <Grid container item xs={10} >
                            <Controls.Input variant="outlined"
                                label="Team ID"
                                name="team_id"
                                value={finalFormValues.team_id}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid container item xs={2} spacing={1}
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <Controls.Button
                                variant="contained"
                                color="primary"
                                size="large"
                                text="Log In" />
                        </Grid>
                    </Grid>
                </Grid>
            </Form>

            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Box style={{
                    fontFamily: 'RobotoSlab',
                    fontWeight: 900,
                    fontSize: '1.25em',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem',
                    color: '#ADADAD'
                }}>OR</Box>
            </Grid>

            <Form autoComplete="on" onSubmit={handleRegistrationSubmit} style={{ backgroundColor: '#FFFFFF' }}>
                <Grid container spacing={1}>
                    <Grid container item>
                        <Grid container item xs={4} >
                            <Controls.Input variant="outlined"
                                label="Team Name"
                                name="team_name"
                                value={finalFormValues.team_name}
                                error={errors.team_name}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid container item xs={4}>
                            <Controls.Input variant="outlined"
                                label="Club Name"
                                name="club_name"
                                value={finalFormValues.club_name}
                                error={errors.club_name}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid container item xs={4}>
                            <Controls.Input variant="outlined"
                                label="Coach Name"
                                name="coach_name"
                                value={finalFormValues.coach_name}
                                error={errors.coach_name}
                                onChange={handleInputChange} />
                        </Grid>
                    </Grid>
                    <Grid container item>
                        <Grid container item xs={4}>
                            <Controls.Input variant="outlined"
                                label="Age group"
                                name="age_group"
                                type="number"
                                value={finalFormValues.age_group}
                                error={errors.age_group}
                                minimum={8}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid container item xs={4}>
                            <Controls.RadioGroup
                                label="Gender"
                                name="gender"
                                value={finalFormValues.gender}
                                onChange={handleInputChange}
                                items={genderItems}
                                error={errors.gender}
                            />
                        </Grid>
                        <Grid container item xs={4}>
                            <Controls.Select
                                variant="outlined"
                                name="division"
                                label="Division"
                                value={finalFormValues.division}
                                onChange={handleInputChange}
                                options={division}
                                error={errors.division}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item>
                        <Grid container item xs={4}>
                            <Controls.Input variant="outlined"
                                label="Contact Number"
                                name="primary_contact"
                                value={finalFormValues.primary_contact}
                                error={errors.primary_contact}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid container item xs={4}>
                            <Controls.Input variant="outlined"
                                label="Team city"
                                name="team_city"
                                value={finalFormValues.team_city}
                                error={errors.team_city}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid container item xs={4}>
                            <Controls.Select
                                variant="outlined"
                                name="team_state"
                                label="State"
                                value={finalFormValues.team_state}
                                error={errors.team_state}
                                onChange={handleInputChange}
                                options={USAStateList}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item>
                        <Grid container item xs={12}>
                            <Controls.Input variant="outlined"
                                label=""
                                name="player_names"
                                value={finalFormValues.player_names}
                                error={errors.player_names}
                                onChange={handleInputChange}
                                type="file"
                                fileRef={fileRef}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container style={{ marginTop: '1rem', marginBottom: '0.5rem' }}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Controls.Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        text="register" />
                </Grid>
            </Form>
        </Box >
    )
}

export default CoachRegistrationForm
