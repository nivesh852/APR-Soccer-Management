import React, { useEffect } from "react";
import { Container, Paper, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import SponsorsImage from "../images/sponsors.png";

function Sponsors() {
    return (
        <Container style={{ backgroundColor: "#black"}}>
            <Box p={1} >
                <Typography variant="h5" >MEET OUR SPONSORS</Typography>
            </Box>
            <Typography variant="h6">
                
            </Typography>
            <img src={SponsorsImage} alt="SponsorsImage" width="100%" ></img>
        </Container>
    )
}

export default Sponsors
