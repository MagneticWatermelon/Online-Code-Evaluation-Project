import React from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';
import moment from 'moment';

export default function CourseGrades(props) {

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
                    <Link component={RouterLink} to={`/assignments/${tableData.rowData[3]}`}>
                        {value}
                    </Link>
                )
            }
           }}, 
        {label :"Due Date", name: 'due_date', options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableData, updateValue) => {
                return transformDate(value);
            }
           }}, 
        {label :"Grade", name: 'grade', options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableData, updateValue) => {
                return value ? value : '_';
            }
           }},
        {name: '_id', options: {display: 'false',  filter: false, sort: false}},
    ];

    const options = {
        filterType: 'checkbox',
        pagination: false,
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
            <MUIDataTable
                title={"Grades"}
                data={props.grades}
                columns={columns}
                options={options}
            />
        </div>
    );
}