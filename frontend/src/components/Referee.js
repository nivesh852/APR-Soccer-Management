import Calendar from 'react-calendar';
import { useEffect, React, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { teamList } from '../demoJSONs/teamList';
import { DataGrid } from '@material-ui/data-grid';


function Referee() {
    const [calDate, setCalDate] = useState(new Date())

    function onChange(calDate) {
        setCalDate(calDate)
    }
    var cal = {
        position: 'fixed',
        right: '5%',
    }
    const [tableData, setTableData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 100, flex: 1, headerClassName: 'super-app-theme--header', },
        { field: 'teamName', headerName: 'Referee Name', minWidth: 200, flex: 2, headerClassName: 'super-app-theme--header', },
        { field: 'date', headerName: 'DATE', minWidth: 200, flex: 1.5, headerClassName: 'super-app-theme--header', },
        { field: 'match', headerName: 'Match', minWidth: 200, flex: 2, headerClassName: 'super-app-theme--header', },
    ]
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

    var referee = {
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
    }

    if (tableData.length === 0) {
        return (
            <div className='referee' style={{
                ...referee,
                width: "80%",
                float: "left",
                backgroundColor: '#EDF5FC',
            }}>
                LETS ENROLL SOME MATECHES NOW !
            </div>
        )
    } else if (tableData.length > 0) {
        return (
            <div className='referee' style={{
                ...referee,
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
            </div >
        )
    }
}

export default Referee