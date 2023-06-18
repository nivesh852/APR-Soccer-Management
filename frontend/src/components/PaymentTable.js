import { Button, Box, Grid, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { tableCellClasses } from '@mui/material/TableCell';
import { useHistory } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


const PaymentTable = ({ header, rows, showPay}) => {
  
  const history = useHistory()

    return (
        <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              {Object.keys(header).map((prop,i) => <StyledTableCell key={i} align={i === 0 ? "left": "left"} >{header[prop]}</StyledTableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,i) => (
              <StyledTableRow key={i}>
                <StyledTableCell >
                  #{row.teamId}
                </StyledTableCell>
                <StyledTableCell align="left">#{row.tournamentId}</StyledTableCell>
                <StyledTableCell align="left">
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                  <Box mr={4}>
                  <Typography> {`${row.amount} (${row.currency})`} </Typography>
                  </Box>
                  {showPay && <Box >
                  <Button variant="contained"
                   onClick={() => history.push("/payment-gateway", {id: 2})} 
                   color="primary">PAY</Button>
                  </Box>}
                </Grid>
                  </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default PaymentTable
