import React, { useState, useEffect } from "react";
import { Box } from '@mui/system';
import { DataGrid } from "@material-ui/data-grid";
import { withRouter } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import Controls from './controls/Controls';

function TeamsAsPerDivision(props) {
    const [tableData, setTableData] = useState([]);
    const [thereIsAValue, setThereIsAValue] = useState(false);
    const handleClick = (event, params) => {
        props.history.push(`/schedule?team=${params.row.gender}${params.row.age_group}${params.row.division} - ${params.row.team_name} (${params.row.coach_name})`);
    };

    const renameKey = (obj, oldKey, newKey) => {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    };

    const columns = [
        {
            field: 'team_name', headerName: 'TEAM/LOCATION', minWidth: 200, flex: 3, headerClassName: 'super-app-theme--header', editable: false,
            renderCell: (params) => {
                return (
                    <Box style={{
                        width: '100%'
                    }}>
                        <Typography className="acceptedTeamsTable" variant="subtitle1">{params.value}</Typography>
                        <Typography className="acceptedTeamsTable" variant="overline" display="block" style={{
                            fontStyle: "italic",
                            marginTop: '0.25rem',
                            display: "flex"
                        }}>
                            {params.row.club_name}
                        </Typography>
                        <Typography className="acceptedTeamsTable" variant="overline" display="block" style={{
                            display: "flex",
                            marginTop: '0.1rem',
                        }}>
                            {params.row.address}
                        </Typography>
                    </Box>
                );
            }
        },
        { field: 'coach_name', headerName: 'COACH', minWidth: 200, flex: 3, headerClassName: 'super-app-theme--header', editable: false },
        {
            field: 'gender', headerName: 'GROUP', minWidth: 200, flex: 3, headerClassName: 'super-app-theme--header', editable: false,
            renderCell: (params) => {
                return (<Box>{params.value + params.row.age_group}</Box>);
            }
        },
        {
            field: 'field_id', headerName: 'SCHEDULE', minWidth: 200, flex: 3, headerClassName: 'super-app-theme--header', editable: false,
            renderCell: (params) => {
                return (
                    <Controls.Button
                        variant="contained"
                        color="primary"
                        text="See Schedule"
                        onClick={(event) => {
                            handleClick(event, params);
                        }}
                    />
                );
            }
        }
    ];

    useEffect(() => {
        let param = new URLSearchParams(props.location.search);
        let division = param.get('division');
        let data = {
            division: '',
            age_group: '',
            gender: '',
        };
        let isValuePresent = false;
        let location = {
            ...props.location,
        };

        let params = new URLSearchParams(location.search);
        delete location.key;

        if (division !== null && division !== '') {
            data.division = division;
            params.set("division", data.division);
            isValuePresent = true;
            setThereIsAValue(true);
        } else {
            params.delete("division");
        }

        if (isValuePresent) {
            setTableData([]);
            fetch("http://localhost:5000/api/v1/fetchTeamList/", {
                body: JSON.stringify(data),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Access-Control-Request-Headers": "Content-Type"
                },
            }).then((res) => res.json())
                .then((result) => {
                    const modifiedMatches = result.enrolled_teams;
                    modifiedMatches.forEach(obj => renameKey(obj, 'team_id', 'id'));
                    setTableData(modifiedMatches);
                })
                .catch((e) => {
                });
        }
    }, []);

    var noDataDisplay = {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        color: '#999999',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'RobotoSlab',
        fontWeight: 700,
    }

    if (thereIsAValue) {
        return (
            <Box className="sssAcceptedDiv">
                <DataGrid style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF'
                }} className='teamTable'
                    rows={tableData}
                    columns={columns}
                    pageSize={5}
                    disableSelectionOnClick
                    rowsPerPageOptions={[15, 30, 45, 60, 75, 90]}
                    isCellEditable="false"
                    rowHeight={90}
                ></DataGrid>
            </Box>
        )
    } else {
        return (
            <Box style={noDataDisplay}>
                THERE IS NO DATA TO BE DISPLAYED
            </Box>
        )
    }

}

export default withRouter(TeamsAsPerDivision);