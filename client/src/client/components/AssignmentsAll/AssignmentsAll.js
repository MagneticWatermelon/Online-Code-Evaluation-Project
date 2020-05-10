import React from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';



export default function AssignmentsAll() {

    const columns = [
        {label :"Name", name: 'assignName', options: {
            filter: false,
            sort: true,
           }}, 
        {label :"Course", name: 'courseName'}, 
        {label :"Status", name: 'assignStatus'}, 
        {label :"Due Date", name: 'assignDue', options: {
            filter: false,
            sort: true,
           }}, 
        {label :"Grade", name: 'assignGrade', options: {
            filter: false,
            sort: false,
           }}
    ];

    const data = [
        {assignName: 'LCS', courseName: 'Algorithmic Thinking', assignStatus: 'Open', assignDue: '15 May at 23:59', assignGrade : '7/10',}, 
        {assignName: 'Knapsack', courseName: 'Algorithms and Data Structures', assignStatus: 'Closed', assignDue: '10 May at 23:59', assignGrade : '6/10',}, 
        {assignName: 'Simple Array', courseName: 'Art of Computing', assignStatus: 'Open', assignDue: '12 May at 23:59', assignGrade : '9/10',}, 
        {assignName: 'Inheritance', courseName: 'Object Oriented Programming', assignStatus: 'Closed', assignDue: '9 May at 23:59', assignGrade : '7/10',},
        {assignName: 'Functions', courseName: 'Algorithmic Thinking', assignStatus: 'Open', assignDue: '10 May at 23:59', assignGrade : '5/10',}, 
        {assignName: 'Encapsulation', courseName: 'Object Oriented Programming', assignStatus: 'Open', assignDue: '11 May at 23:59', assignGrade : '_/10',}, 
        {assignName: 'Task Scheduling', courseName: 'Algorithmic Thinking', assignStatus: 'Open', assignDue: '18 May at 23:59', assignGrade : '_/10',},
    ];

    const options = {
    filterType: 'checkbox',
    pagination: false,
    selectableRowsHeader: false,
    selectableRows: 'none',
    
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
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    );
}