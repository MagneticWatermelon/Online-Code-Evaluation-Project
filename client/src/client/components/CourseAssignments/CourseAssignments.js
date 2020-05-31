import React from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Button } from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';
import moment from 'moment';

export default function CourseAssignments(props) {
    const transformDate =(date) => {
        let newDate = moment.utc(date).format('MMMM Do [At] HH[:]mm');
        return newDate;
    }

    const columns = [
        {label :"Name", name: 'title', options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableData, updateValue) => {
                return (
                    <Link component={RouterLink} to={`/courses/${props.course.course_code}/assignments/${tableData.rowData[3]}`}>
                        {value}
                    </Link>
                )
            }
           }}, 
        {label :"Status", name: 'status'}, 
        {label :"Due Date", name: 'due_date', options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableData, updateValue) => {
                return transformDate(value);
            }
           }}, 
        {name: '_id', options: {display: 'false',  filter: false, sort: false}},
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
        filter: false,
    };

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
        }
      }));
    
    const styles = useStyles();

    return(
        <div className={styles.root}>
            {props.role == 1 && 
            (<Button
                variant='contained'
                color='primary'
                component={RouterLink}
                to={`/courses/${props.course.course_code}/assignment/create`}
            >
                Create Assignment
            </Button>)}
            <MUIDataTable
                title={"Assignments"}
                data={props.assignments}
                columns={columns}
                options={options}
            />
        </div>
    );
}