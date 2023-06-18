import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { teamList } from '../demoJSONs/teamList';
import { DataGrid } from '@material-ui/data-grid';
import { Box } from '@mui/system';

function TournamentManager() {
    const [tableData, setTableData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 100, flex: 1, headerClassName: 'super-app-theme--header', },
        { field: 'teamName', headerName: 'Team', minWidth: 200, flex: 2, headerClassName: 'super-app-theme--header', },
        { field: 'ageGrp', headerName: 'Age Group', minWidth: 200, flex: 1.5, headerClassName: 'super-app-theme--header', },
        { field: 'teamMembersNums', headerName: 'No. of Members', minWidth: 200, flex: 1.5, headerClassName: 'super-app-theme--header', },
        { field: 'match', headerName: 'Match', minWidth: 200, flex: 2, headerClassName: 'super-app-theme--header', },
    ];

    useEffect(() => {
        // Update the document title using the browser API
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                setTableData(response.data);
                console.log(tableData);
                setTableData(teamList);
                console.log(tableData);
            })
            .catch((error) => {
                setErrorMsg(error);
                console.log(errorMsg);
            });
    }, []);

    var TournamentManager = {
        width: '100%',
        height: '100%',
        color: '#999999',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'RobotoSlab',
        fontWeight: 700,
    };

    if (tableData.length === 0) {
        return (
            <div className='TournamentManager' style={{
                ...TournamentManager,
                backgroundColor: '#EDF5FC'
            }}>
                LETS ENROLL SOME TEAMS NOW !
            </div>
        )
    } else if (tableData.length > 0) {
        return (
            <Box className='TournamentManager' style={{
                ...TournamentManager,
                backgroundColor: '#EDEDED'
            }}>
                <DataGrid style={{
                    width: '90%',
                    height: '90%',
                    backgroundColor: '#FFFFFF'
                }} className='teamTable'
                    rows={tableData}
                    columns={columns}
                    pageSize={15}
                    disableSelectionOnClick
                    rowsPerPageOptions={[15, 30, 45, 60, 75, 90]}
                ></DataGrid>
            </Box >
        )
    }
}

export default TournamentManager
