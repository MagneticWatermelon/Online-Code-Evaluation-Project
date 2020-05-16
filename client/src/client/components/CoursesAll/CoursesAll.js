import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';
import { Link } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';




export default function CoursesAll(props) {

    const [courses, setData] = React.useState(props.courses);

    const columns = [
        {label :"Name", name: 'courseName', options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableData, updateValue) => {
                return (
                    <Link component={RouterLink} to={`courses/${tableData.rowData[1]}`}>
                        {value}
                    </Link>
                )
            }
           }}, 
        {label :"Course ID", name: 'courseID', options: {
            filter: false,
            sort: false,
           }},  
        {label :"Semestr", name: 'courseSemestr', options: {
            filter: true,
            sort: false,
           }}, 
        {label :"Status", name: 'courseStatus', options: {
            filter: true,
            sort: false,
           }},
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
        },
      }));
    
    const styles = useStyles();

    return(
        <div className={styles.root}>
            <MUIDataTable
                title={"All Courses"}
                data={courses}
                columns={columns}
                options={options}
            />
        </div>
    );
}