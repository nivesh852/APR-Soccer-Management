import React, { useEffect, useRef, useState } from 'react'
import { Box, Grid, Link, Paper, Typography } from '@material-ui/core'
import { FAQContent } from "./../demoJSONs/faq"
import FAQHeader from './FAQHeader';

const RulesandRegulationsTM = () => {
    const topicsRef = useRef([]);
    const [change, setChanged] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [change])
    const handleOnClick = (index) => {
        if (topicsRef.current[index]) {
            topicsRef.current[index].scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }

    return (
        <Grid container direction="row">
            <Grid item >
                <FAQHeader onTopicClick={(topic, index) => handleOnClick(index)} />
            </Grid>
            {FAQContent.map((topic, i) => <Grid item ref={el => topicsRef.current[i] = (el)}>
                <Box  mx={1} mb={2} mt={9}>
                    <Paper >
                        <Box p={1}>
                            <Box p={1} m={1} style={{ backgroundColor: "#757ce8", color: "white" }} >
                                <Typography variant="h5" >{topic.title}</Typography>
                            </Box>
                            {topic.content.map((data, i) => <Box p={1} m={1} style={{ backgroundColor: i % 2 == 0 ? "#e5e5e5" : "" }}>
                                <Typography variant="h6" >{data.question}</Typography>
                                <Typography variant="body1">{data.answer}</Typography>
                            </Box>)}
                            <Box px={2}>
                                <Link href="" onClick={() => setChanged(!change)} variant="body2">Return to the FAQ Menu</Link>
                            </Box>
                        </Box>

                    </Paper>
                </Box>
            </Grid>)}
        </Grid>
    )
}

export default RulesandRegulationsTM
