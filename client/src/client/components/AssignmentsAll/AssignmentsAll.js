import React from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';




export default function AssignmentsAll(props) {

    const columns = [
        {label :"Name", name: 'title', options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableData, updateValue) => {
                return (
                    <Link component={RouterLink} to={`courses/${tableData.rowData[5]}/assignments/${tableData.rowData[6]}`}>
                        {value}
                    </Link>
                )
            }
           }}, 
        {label :"Course", name: 'courseName'}, 
        {label :"Status", name: 'status'}, 
        {label :"Due Date", name: 'due_date', options: {
            filter: false,
            sort: true,
           }}, 
        {label :"Grade", name: 'grade', options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableData, updateValue) => {
                if(value) {
                    return {value}
                }
                else {
                    return '_'
                }
            }
           }},
        {name: 'courseID', options: {display: 'false',  filter: false, sort: false}},
        {name: 'assignID', options: {display: 'false',  filter: false, sort: false}},
    ];

    const data = [
        {assignName: 'LCS', courseName: 'Algorithmic Thinking', assignStatus: 'Open', assignDue: '15 May at 23:59', assignGrade : '7/10', courseID: 'COMP401-01',assignID: 148}, 
        {assignName: 'Knapsack', courseName: 'Algorithms and Data Structures', assignStatus: 'Closed', assignDue: '10 May at 23:59', assignGrade : '6/10',courseID: 'COMP203-02',assignID: 149}, 
        {assignName: 'Simple Array', courseName: 'Art of Computing', assignStatus: 'Open', assignDue: '12 May at 23:59', assignGrade : '9/10',courseID: 'COMP101-01', assignID: 150}, 
        {assignName: 'Inheritance', courseName: 'Object Oriented Programming', assignStatus: 'Closed', assignDue: '9 May at 23:59', assignGrade : '7/10',courseID: 'COMP112-02', assignID: 151},
        {assignName: 'Functions', courseName: 'Art of Computing', assignStatus: 'Open', assignDue: '10 May at 23:59', assignGrade : '5/10',courseID: 'COMP101-01', assignID: 152}, 
        {assignName: 'Encapsulation', courseName: 'Object Oriented Programming', assignStatus: 'Open', assignDue: '11 May at 23:59', assignGrade : '_/10',courseID: 'COMP112-02', assignID: 153}, 
        {assignName: 'Task Scheduling', courseName: 'Algorithmic Thinking', assignStatus: 'Open', assignDue: '18 May at 23:59', assignGrade : '_/10',courseID: 'COMP401-01', assignID: 154},
    ];

    const options = {
        filterType: 'checkbox',
        pagination: true,
        selectableRowsHeader: false,
        selectableRows: 'none',
        rowsPerPageOptions: [5,10,20],
        print: false,
        download: false,
        onRowClick: () => {console.log('clicked')}
    };

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
        }
      }));
    
    const styles = useStyles();

    return(
        <div className={styles.root}>
            <MUIDataTable
                title={"All Assignments"}
                data={props.assignments}
                columns={columns}
                options={options}
            />
        </div>
    );
}