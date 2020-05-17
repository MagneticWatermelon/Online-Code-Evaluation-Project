import React, { useEffect } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import { Typography } from '@material-ui/core';





export default function CourseFiles(props) {



    

    const columns = [
        {label :"Name", name: 'file_name', options: {
            filter: false,
            sort: true,
           }}, 
        {label :"Created At", name: 'createdAt'}, 
        {label :"Modified At", name: 'updatedAt', options: {
            filter: false,
            sort: true,
           }}, 
        {label :"Size", name: 'assignGrade', options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableData, updateValue) => {
                return (
                    <div>
                        {`142 kB`}
                    </div>
                )
            }
           }},
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
                        {props.resources.map((file, index) => {
                            return <TreeItem nodeId={index + 2} label={
                                <Typography
                                    variant='body2'
                                    noWrap={true}
                                    gutterBottom
                                >
                                    {file.file_name}
                                </Typography>
                                }
                                />
                        })}
                    </TreeItem>
                </TreeView>
            </div>
            <div className={styles.folder}>
                <MUIDataTable
                    title={"Files"}
                    data={props.resources}
                    columns={columns}
                    options={options}
                />
            </div>

        </div>
    );
}