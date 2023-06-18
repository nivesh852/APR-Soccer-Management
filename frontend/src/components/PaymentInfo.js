import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { UnpaidTeamHeader, UnpaidTeams, PaidTeams } from './../demoJSONs/payment_data';
import PaymentTable from './PaymentTable';

function PaymentInfo() {
  
    return (
      <Grid container  justifyContent="center">
        <Grid   xs={8} item>
            <Box my={2}>
              <Box my={1}><Typography variant="h5"> Unpaid Teams</Typography></Box>
              <PaymentTable rows={UnpaidTeams} header ={UnpaidTeamHeader} showPay={true}  />
            </Box>
            <Box my={2}>
            <Box my={1}><Typography variant="h5"> Paid Teams</Typography></Box>
              <PaymentTable rows={PaidTeams} header ={UnpaidTeamHeader} showPay={false} /> 
            </Box>
          </Grid>
      </Grid>
    )
}

export default PaymentInfo
