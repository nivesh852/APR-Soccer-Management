import { Typography } from '@material-ui/core'
import { Box } from '@mui/system'
import React from 'react'

function Home() {
    return (
        <>
            <Box className="homePage" style={{
                width: "100%", background: `url('/soccerImage.jpg')`, backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: "relative",
                opacity: "0.5"
            }}>
            </Box>
            <Box width="99%" height="70%"
                style={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Box>
                    <Typography variant="h2" style={{
                        fontFamily: "cursive",
                        // textDecorationLine: 'underline',
                        color: "#542f0e"
                    }}>APR SOCCER MANAGEMENT
                    </Typography>
                    &nbsp;
                    <Typography variant="h3" align="center" style={{fontFamily: "cursive"}}>
                        Get your soccer on folks!!!
                    </Typography>
                    &nbsp;
                    <Typography variant="body1">
                        <div style={{color: "#b81327"}}>
                            Covid-19 Warning
                        </div>
                        <div>
                        We have taken enhanced health and safety measures. Please wear MASKS.
                        </div>
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default Home
