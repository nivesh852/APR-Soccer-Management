import { useEffect, React, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { teamList } from '../demoJSONs/teamList';
import { DataGrid } from '@material-ui/data-grid';
import config from '../Constants';

function TeamMatches() {
    // var errorMsg = '';
    // var data = [];
    const location = useLocation();
    const [tableData, setTableData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    // const [team_id, setTeamID] = useState([]);

    const columns = [
        { field: 'id', headerName: 'MatchID', flex: 1, headerClassName: 'super-app-theme--header', },
        { field: 'match_date', headerName: 'Match Date', minWidth: 160, flex: 1, headerClassName: 'super-app-theme--header', },
        { field: 'match_time', headerName: 'Match Time', minWidth: 160, flex: 1, headerClassName: 'super-app-theme--header', },
        { field: 'team_1_club_name', headerName: 'Team 1 Club Name', minWidth: 200, flex: 1, headerClassName: 'super-app-theme--header', },
        { field: 'team_1_name', headerName: 'Team 1 Name', minWidth: 170, flex: 1, headerClassName: 'super-app-theme--header', },
        { field: 'team_2_name', headerName: 'Team 2 Name', minWidth: 170, flex: 1, headerClassName: 'super-app-theme--header', },
        { field: 'team_2_club_name', headerName: 'Team 2 Club Name', minWidth: 200, flex: 1, headerClassName: 'super-app-theme--header', },
        { field: 'match_division', headerName: 'Match Division', minWidth: 180, flex: 1, headerClassName: 'super-app-theme--header', },
        { field: 'ground_number', headerName: 'Ground Number', minWidth: 180, flex: 1, headerClassName: 'super-app-theme--header', },
    ];

    const renameKey = (obj, oldKey, newKey) => {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    };


    useEffect(() => {
        let team_id = 1;
        if (location.state && "team_id" in location.state) {
            // setTeamID(location.state.team_id);
            team_id = location.state.team_id;
        }
        fetch(config.BASE_URL + "getMatchesByTeamID/" + team_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Request-Headers": "Content-Type"
            },
        }).then((res) => res.json())
            .then((result) => {
                const modifiedMatches = result.matches;
                modifiedMatches.forEach(obj => renameKey(obj, 'match_id', 'id'));
                setTableData(modifiedMatches);
            })
            .catch((error) => {
                setErrorMsg(error);
                console.log(errorMsg);
            });
    }, []);

    var teamMatches = {
        width: '100%',
        height: '100%',
        backgroundColor: '#EDF5FC',
        color: '#999999',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'RobotoSlab',
        fontWeight: 700,
        // padding: '2em'
    }

    if (tableData.length === 0) {
        return (
            <div className='teamMatches' style={{
                ...teamMatches,
                backgroundColor: '#EDF5FC'
            }}>
                LETS ENROLL SOME TEAMS NOW !
            </div>
        )
    } else if (tableData.length > 0) {
        return (
            <div className='teamMatches' style={{
                ...teamMatches,
                backgroundColor: '#EDEDED'
            }}>
                <DataGrid style={{
                    width: '90%',
                    height: '90%',
                    backgroundColor: '#FFFFFF'
                    /* display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center', */
                }} className='teamTable'
                    rows={tableData}
                    columns={columns}
                    pageSize={5}
                    disableSelectionOnClick
                    rowsPerPageOptions={[5, 15, 30, 45, 60, 75, 90]}
                ></DataGrid>
            </div >

        )
    }

    /* if (tableData.length === 0) {
        return (
            <div className='teamMatches' style={teamMatches} style={{
                backgroundColor: '#EDF5FC',
            }}>
                LETS ENROLL SOME TEAMS NOW !
            </div>
        )
    } else if (tableData.length === 0) {
        return (
            <div className='teamMatches' style={teamMatches} style={{
                backgroundColor: '#FFFFFF',
            }}>
                <DataGrid style={{
                    width: '100%',
                }} className='teamTable'
                    rows={tableData}
                    columns={columns}
                    pageSize={10}></DataGrid>
            </div>
        )
    } */
}

export default TeamMatches
