import React from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';


export default function SubmissionsAll() {

    const columns = [
        {label :"Name", name: 'assignName', options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableData, updateValue) => {
                return (
                    <Link component={RouterLink} to={`courses/${tableData.rowData[5]}/assignments/${tableData.rowData[6]}/submissions/${tableData.rowData[7]}`}>
                        {value}
                    </Link>
                )
            }
           }}, 
        {label :"Course", name: 'courseName'}, 
        {label :"Result", name: 'submResult',  options: {
            filter: true,
            sort: false,
           }}, 
        {label :"Date", name: 'submDate', options: {
            filter: false,
            sort: true,
           }}, 
        {label :"Grade", name: 'submGrade', options: {
            filter: false,
            sort: false,
           }},
        {name: 'courseID', options: {display: 'false', filter: false, sort: false,}},
        {name: 'assignID', options: {display: 'false', filter: false, sort: false,}},
        {name: 'submID', options: {display: 'false', filter: false, sort: false,}},
    ];

    const data = [
        {assignName: 'LCS', courseName: 'Algorithmic Thinking', submResult: 'Accepted', submDate: '15 May at 23:59', submGrade : '7/10', courseID: 'COMP401-01',assignID: 148, submID: 14}, 
        {assignName: 'Knapsack', courseName: 'Algorithms and Data Structures', submResult: 'Accepted', submDate: '10 May at 23:59', submGrade : '6/10',courseID: 'COMP203-02',assignID: 149, submID: 15}, 
        {assignName: 'Simple Array', courseName: 'Art of Computing', submResult: 'Accepted', submDate: '12 May at 23:59', submGrade : '9/10',courseID: 'COMP101-01', assignID: 150, submID: 16}, 
        {assignName: 'Inheritance', courseName: 'Object Oriented Programming', submResult: 'Accepted', submDate: '9 May at 23:59', submGrade : '7/10',courseID: 'COMP112-02', assignID: 151, submID: 17},
        {assignName: 'Functions', courseName: 'Art of Computing', submResult: 'Accepted', submDate: '10 May at 23:59', submGrade : '5/10',courseID: 'COMP101-01', assignID: 152, submID: 18}, 
        {assignName: 'Encapsulation', courseName: 'Object Oriented Programming', submResult: 'Wrong Answer', submDate: '11 May at 23:59', submGrade : '_/10',courseID: 'COMP112-02', assignID: 153, submID: 19}, 
        {assignName: 'Task Scheduling', courseName: 'Algorithmic Thinking', submResult: 'Wrong Answer', submDate: '18 May at 23:59', submGrade : '_/10',courseID: 'COMP401-01', assignID: 154, submID: 20},
        {assignName: 'LCS', courseName: 'Algorithmic Thinking', submResult: 'Accepted', submDate: '15 May at 23:59', submGrade : '7/10', courseID: 'COMP401-01',assignID: 148, submID: 14}, 
        {assignName: 'Knapsack', courseName: 'Algorithms and Data Structures', submResult: 'Accepted', submDate: '10 May at 23:59', submGrade : '6/10',courseID: 'COMP203-02',assignID: 149, submID: 15}, 
        {assignName: 'Simple Array', courseName: 'Art of Computing', submResult: 'Accepted', submDate: '12 May at 23:59', submGrade : '9/10',courseID: 'COMP101-01', assignID: 150, submID: 16}, 
        {assignName: 'Inheritance', courseName: 'Object Oriented Programming', submResult: 'Accepted', submDate: '9 May at 23:59', submGrade : '7/10',courseID: 'COMP112-02', assignID: 151, submID: 17},
        {assignName: 'Functions', courseName: 'Art of Computing', submResult: 'Accepted', submDate: '10 May at 23:59', submGrade : '5/10',courseID: 'COMP101-01', assignID: 152, submID: 18}, 
        {assignName: 'Encapsulation', courseName: 'Object Oriented Programming', submResult: 'Wrong Answer', submDate: '11 May at 23:59', submGrade : '_/10',courseID: 'COMP112-02', assignID: 153, submID: 19}, 
        {assignName: 'Task Scheduling', courseName: 'Algorithmic Thinking', submResult: 'Wrong Answer', submDate: '18 May at 23:59', submGrade : '_/10',courseID: 'COMP401-01', assignID: 154, submID: 20},
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
                title={"All Submissions"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    );
}