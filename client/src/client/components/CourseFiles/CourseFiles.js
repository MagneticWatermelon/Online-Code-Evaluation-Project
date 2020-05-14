import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';





export default function CourseFiles(props) {

    const columns = [
        {label :"Name", name: 'assignName', options: {
            filter: false,
            sort: true,
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
        filter: false,
        filterType: 'checkbox',
        pagination: false,
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
          display: 'inline-flex',
        },
        tree: {
            width: 'fit-content',
            height: '100%',
            backgroundColor: theme.palette.background.paper,
            paddingTop: 10,
            paddingRight: 10,
        },
        treeroot: {
            flex: 1,
            minWidth: 150,
            maxWidth: 400,
        },
        folder: {
            width: '100%',
        },
      }));
    
    const styles = useStyles()

    return(
        <div className={styles.root}>
            <div className={styles.tree}>
                <TreeView
                    className={styles.treeroot}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    <TreeItem nodeId="1" label="files">
                        <TreeItem nodeId="2" label="main.java" />
                        <TreeItem nodeId="3" label="app">
                            <TreeItem nodeId="4" label="func.java" />
                            <TreeItem nodeId="5" label="bar.java" />
                            <TreeItem nodeId="6" label="foo.java" />
                        </TreeItem>
                    </TreeItem>
                </TreeView>
            </div>
            <div className={styles.folder}>
                <MUIDataTable
                    title={"Files"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>

        </div>
    );
}