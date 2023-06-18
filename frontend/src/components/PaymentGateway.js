import React, { useState, useEffect, useRef } from 'react';
import "date-fns";
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { alpha } from '@material-ui/core/styles'
import DateFnsUtils from "@date-io/date-fns";
import { useHistory, useLocation } from "react-router-dom";
import config from '../Constants';
import { useFormTeamReg, Form } from './useFormTeamReg';
import Controls from './controls/Controls';


const  PaymentGateway = () => {
    const location = useLocation();
    const history = useHistory();
    const [payment_amount, setPaymentAmount] = useState([]);

    useEffect(() => {
        fetch(config.BASE_URL + "generateTeamRegistrationAmount/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Request-Headers": "Content-Type"
            },
        }).then((res) => res.json())
            .then((result) => {
                if(result && result.registration_open == true){
                    setPaymentAmount(result.registration_fee);
                }
                else{
                    alert("Team Registration is closed now. Please visit next season.");
                    history.push("/")
                }
            })
            .catch((e) => {
            });
    }, []);
    
    

    const submitPaymentAmount = () => {
        const paymentData = finalFormValues;
        if(location.state && "team_id" in location.state) {
            paymentData.team_id = location.state.team_id;
            paymentData.payment_amount = payment_amount;
            fetch(config.BASE_URL + "teamFeePayment/", {
                
                body: JSON.stringify(paymentData),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Request-Headers": "Content-Type"
                },
            }).then((res) => res.json())
                .then((result) => {
                    if(result && result.payment_success == true){
                        if("transaction_id" in result){
                            alert("Your payment was scuccessfull. Your transaction ID is " + result.transaction_id + ". Please save if for future reference");
                        }
                        else{
                            alert("You have already paid registration fees for this team.");
                        }
                        
                    }
                    history.push("/teamregistration")
                })
                .catch((e) => {
                });
        }
        else {
            alert("Team_id is not available to pay the fee. Register a team first.");
            history.push("/teamregistration")
        }
        

    };
    const initialFValues = {
        first_name: '',
        last_name: '',
        card_number: '',
        expiry_month: '',
        expiry_year: '',
        expiry_date: '',
        cvv: ''
    };

    const validatePaymentForm = (fieldValues = finalFormValues) => {
        let temp = { ...errors };

        if ('first_name' in fieldValues)
            temp.first_name = fieldValues.first_name.trim() ? '' : 'This field is required.';
        if ('last_name' in fieldValues)
            temp.last_name = fieldValues.last_name.trim() ? '' : 'This field is required.';
        if ('card_number' in fieldValues)
            temp.card_number = fieldValues.card_number.trim() ? '' : 'This field is required.';
        if ('expiry_month' in fieldValues)
            temp.expiry_month = fieldValues.expiry_month.trim() ? '' : 'This field is required.';
        if ('expiry_year' in fieldValues)
            temp.expiry_year = fieldValues.expiry_year.trim() ? '' : 'This field is required.';
        if ('expiry_date' in fieldValues)
            temp.expiry_date = (fieldValues.expiry_date.trim().length > 0) ? '' : 'This field is required.';
        if ('cvv' in fieldValues)
            temp.cvv = (fieldValues.cvv.trim().length > 0) ? '' : 'This field is required.';

        setErrors({
            ...temp
        });

        if (fieldValues === finalFormValues) {
            return Object.values(temp).every(x => x === "");
        }
    }

    const {
        finalFormValues,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useFormTeamReg(initialFValues, false, true, validatePaymentForm);

    const boxStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex - start',
        alignItems: 'center',
    }

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        submitPaymentAmount();
        // if (validatePaymentForm()) {
        //     submitPaymentAmount();
        // }
    }


    return (
        <Grid container justifyContent="center">
            <Grid xs={5} item>
                <Box>
                    <Box py={6}>
                        <Typography variant="h5"> Payment Page</Typography>
                    </Box>
                    <Form autoComplete="on" onSubmit={handlePaymentSubmit} style={{ backgroundColor: '#FFFFFF' }}>
                        <Grid container direction="row" >
                            <Grid item xs={6}>
                                <Box p={1}>
                                    {/* <TextField fullWidth id="fname" 
                                    label="First Name" variant="outlined" /> */}
                                    <Controls.Input variant="outlined"
                                    label="First Name"
                                    name="first_name"
                                    value={finalFormValues.first_name}
                                    error={errors.first_name}
                                    onChange={handleInputChange} />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box p={1}>
                                    {/* <TextField fullWidth id="lname" label="Last Name" variant="outlined" /> */}
                                    <Controls.Input variant="outlined"
                                    label="Last Name"
                                    name="last_name"
                                    value={finalFormValues.last_name}
                                    error={errors.last_name}
                                    onChange={handleInputChange} />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box p={1}>
                                    {/* <TextField fullWidth id="card-details" label="Card Number" type="number" variant="outlined" /> */}
                                    <Controls.Input variant="outlined"
                                    label="Card Number"
                                    name="card_number"
                                    value={finalFormValues.card_number}
                                    error={errors.card_number}
                                    onChange={handleInputChange} />
                                </Box>
                            </Grid>

                            <Grid item xs={6}>
                                <Box p={1}>
                                    <Controls.Input variant="outlined"
                                    label="Expiry Month"
                                    name="expiry_month"
                                    value={finalFormValues.expiry_month}
                                    error={errors.expiry_month}
                                    onChange={handleInputChange} />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box p={1}>
                                    <Controls.Input variant="outlined"
                                    label="Expiry year"
                                    name="expiry_year"
                                    value={finalFormValues.expiry_year}
                                    error={errors.expiry_year}
                                    onChange={handleInputChange} />
                                </Box>
                            </Grid>

                            {/* <Grid item xs={6}>
                                <Box p={1}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justifyContent="space-around">
                                            <DatePicker fullWidth format="mm/yy"
                                                inputVariant="outlined"
                                                views={['year', 'month']}
                                                label="Expiry Date"
                                                // minDate={new Date('2012-03-01')}
                                                // maxDate={new Date('2023-06-01')}
                                                value={new Date()}
                                                onChange={() => { }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Box>
                            </Grid> */}
                            <Grid item xs={12}>
                                <Grid item xs={6}>
                                    <Box p={1}>
                                        <TextField fullWidth id="cvv" label="CVV" type="number" variant="outlined" />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid item xs={6}>
                                <Box p={1}>
                                    {/* <Button  fullWidth variant="contained" color="primary">Pay 100$</Button> */}
                                    <Controls.Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        text="Pay"
                                        onClick={handlePaymentSubmit}
                                        disabled="false"
                                        />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box p={1}>
                                    <Button 
                                    /*onClick={() =>  history.push("/payment_info")}*/ 
                                    fullWidth variant="contained" color="secondary">Cancel</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>    
                </Box>
            </Grid>
        </Grid>)
}

export default PaymentGateway
