import { Button, Checkbox, FormControlLabel, Grid, SvgIcon, TextField, Typography } from '@material-ui/core'
import { Box } from '@mui/system'
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import config from '../Constants';

const AdminLogin = () => {
    const history = useHistory()
    const [payload, setPayload] = useState({ "username": "", "password": "" })

    function HomeIcon(props) {
        return (
            <SvgIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
        );
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(config.BASE_URL + "adminLogin/", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .catch(err => console.log(err))
        if (response && response["user_exist"]) {
            // navigate to match_schedule page
            if (response && response["user_role"]) {
                    if(response.user_role === "tournament_manager"){
                        history.push("/match_schedule")
                    }
            }
            
        }
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={5}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <HomeIcon color="primary" />
                        <Typography variant="h5">Login</Typography>
                        &nbsp;
                        <Box sx={{ mt: 2 }}>
                            <Grid container direction="row" >
                                <Grid item xs={12}>
                                    <Box p={1}>
                                        <TextField sm={5} style={{ width: '100%' }} variant="outlined" value={payload["username"]} required id="username" label="User name" margin="normal" autoFocus
                                            onChange={(event) => {
                                                const uname = event.target.value
                                                setPayload({
                                                    ...payload,
                                                    username: uname
                                                })
                                            }} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box p={1}>
                                        <TextField sm={5} style={{ width: '100%' }} type="password" variant="outlined" value={payload["password"]} required id="password" label="Password" margin="normal" autoFocus
                                            onChange={(event) => {
                                                const password = event.target.value
                                                setPayload({
                                                    ...payload,
                                                    password
                                                })
                                            }} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box p={1}>
                                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        &nbsp;
                        <Grid item xs={5}>
                            <Box p={1}>
                                <Button fullWidth type="submit" variant="contained" color="primary" >Login</Button>
                            </Box>
                        </Grid>
                    </Box>
                </form>
            </Grid>
        </Grid>
    )
}


export default AdminLogin