import React from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';


export default function CourseAssignments(props) {

    const columns = [
        {label :"Name", name: 'assignName', options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableData, updateValue) => {
                console.log(tableData);
                return (
                    <Link component={RouterLink} to={`/courses/${props.course.courseID}/assignments/${tableData.rowData[4]}`}>
                        {value}
                    </Link>
                )
            }
           }}, 
        {label :"Status", name: 'assignStatus'}, 
        {label :"Due Date", name: 'assignDue', options: {
            filter: false,
            sort: true,
           }}, 
        {label :"Grade", name: 'assignGrade', options: {
            filter: false,
            sort: false,
           }},
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
        rowsPerPage: 5,
        rowsPerPageOptions: [5,10,20],
        print: false,
        download: false,
        viewColumns: false,
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
                title={"Assignments"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    );
}