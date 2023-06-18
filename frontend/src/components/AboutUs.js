import React, { useEffect, useRef, useState } from 'react'
import { Box, Grid, Link, Paper, Typography, List, ListItem, SvgIcon  } from '@material-ui/core'
import { AboutUsContent, AboutUsTopicsList } from "../demoJSONs/aboutusdata";
import { style } from '@mui/system';
// import FAQHeader from './FAQHeader';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram'; 
import EmailIcon from '@material-ui/icons/Email'; 



const AboutUs = () => {
    const commonStyles = {
        border: 1,
        borderColor: 'black',
        borderStyle: 'solid'
      };
    
    return (
        
        <Grid container direction="row">
            <Grid item xs={12}>
                <Box style={{ ...commonStyles, borderRight: 0 , borderLeft: 0 , }}>
                    {AboutUsContent[0].headers.map((data, i) => <Box p={1} m={1} >
                        <Typography variant="span" >{data.question}</Typography>
                        <Typography variant="span" > : </Typography>
                        <Typography variant="span">{data.answer}</Typography>
                    </Box>)}
                    <Box  p={1} m={1}>
                        <a class="social_k" href="http://twitter.com/" title="Twitter" target="_blank">
                            <TwitterIcon  style={{color: "black", fontSize: 40 }} />
                        </a>
                       <a class="social_k" href="http://facebook.com/" title="Facebook" target="_blank">
                            <FacebookIcon style={{color: "black", fontSize: 40 }} />
                        </a>
                        <a class="social_k" href="http://instagram.com/" title="Instagram" target="_blank">
                            <InstagramIcon style={{color: "black", fontSize: 40 }} />
                        </a>
                        {/* <a class="social_k" href="/contact.html" title="Email the Tournament">
                            <EmailIcon style={{color: "black", fontSize: 40 }} />
                        </a> */}
                    </Box>
                </Box>
                
            </Grid>

            <Box mx={1} mb={2} mt={1}>
                {AboutUsContent[0].content.map((data, i) => <Box p={1} m={1} >
                    <Typography variant="h6" >{data.question}</Typography>
                    <Typography variant="body1">{data.answer}</Typography>
                </Box>)}
            </Box>
        </Grid>
    )
}

export default AboutUs
