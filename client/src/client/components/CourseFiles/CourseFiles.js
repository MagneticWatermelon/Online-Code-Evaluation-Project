import React, { useEffect } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import { Typography, IconButton, Button } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import moment from 'moment';




export default function CourseFiles(props) {

    const [files, setFiles] = React.useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const transformDate =(date) => {
        let newDate = moment.utc(date).format('MMMM Do [At] HH[:]mm');
        return newDate;
    }

    const onFileChange = (files) => {
        setFiles(files);
    }

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file',files[0]);
        axios.post(`http://localhost:8080/resource/upload/${props.course._id}`, formData, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then(function (response) {
            enqueueSnackbar('File uploaded successfully!', {variant: 'success'});
            })
        .catch(function (error) {
            enqueueSnackbar('Something went wrong!', {variant: 'error'});
        });
    }


    const handleFileDownload = (rowData) => {
        let id = rowData[4];
        console.log(id);
        let url = `localhost:8080/resource/get/${id}`
        var win = window.open(`//localhost:8080/resource/get/${id}`, '_blank');
        win.focus();

    }

    const columns = [
        {label :"Name", name: 'file_name', options: {
            filter: false,
            sort: true,
           }}, 
        {label :"Created At", name: 'createdAt',  options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableData, updateValue) => {
                return transformDate(value);
            }
           }}, 
        {label :"Modified At", name: 'updatedAt', options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableData, updateValue) => {
                return transformDate(value);
            }
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
        {name: '_id', options: {display: 'false', filter: false, sort: false,}
        },
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
        onRowClick: handleFileDownload,
    };

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          display: 'inline-flex',
        },
        tree: {
            width: 'fit-content',
            height: '100%',
            backgroundColor: '#1045473d',
            paddingTop: 10,
            paddingRight: 10,
            paddingLeft: 10,
            marginRight: 10,
            borderRadius: 7,
        },
        dragZone: {
            width: 250,
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
                    expanded={['1']}
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
                {props.role == 1 && (
                    <div className={styles.dragZone}>
                        <DropzoneArea
                            onChange={onFileChange}
                        />
                        <Button
                            onClick={handleUpload}
                            color='primary'
                            variant='contained'
                        >
                            Upload
                        </Button>
                    </div>
                )}
            </div>
            

        </div>
    );
}