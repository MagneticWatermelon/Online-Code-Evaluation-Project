import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Button, IconButton, Menu, MenuItem, Link } from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';

import { useSnackbar } from 'notistack';

import axios from 'axios';


export default function Announcement(props) {

    const [announcement, setAnnouncement] = React.useState({title: '', instructor: {name: ''}, explanation: ''});
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [anchorEl, setAnchorEl] = React.useState(null);


    const [id, setId] = React.useState(() => {
        let url = window.location.pathname;
        let id = url.split('/').pop();
        return id;
    })

    const handleSettingsClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleSettingsClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        let arr = props.announcements;
        let url = window.location.pathname;
        let hash = url.split('/').pop();
        arr.map((ann) => {
            if(ann._id == hash) {
                setAnnouncement(ann);
            }
        })
    }, [])

    const handleDelete = (e) => {
        axios.delete(`http://localhost:8080/announcement/delete/${id}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then(function (response) {
            enqueueSnackbar('Announcement deleted successfully!', {variant: 'success'});
            })
        .catch(function (error) {
            enqueueSnackbar('Something went wrong!', {variant: 'error'});
        });
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        header: {
            display: 'inline-flex',
            alignItems: 'center'
        },
        header_title: {
            marginLeft: 10
        },
        content: {
            marginTop: 10
        }
      }));
    
    const styles = useStyles();

    return(
        <div className={styles.root}>
            
            <div className={styles.header}>
                <Avatar />
                <div className={styles.header_title}>
                    <Typography
                        variant='h5'
                        noWrap
                    >
                        {announcement.title}
                    </Typography>
                    <Typography
                        variant='body2'
                        noWrap
                        gutterBottom
                    >
                        {announcement.instructor.name}
                    </Typography>
                </div>
                {props.role == 1 && 
            (
            <div>
                <IconButton
                    aria-controls="simple-menu" 
                    aria-haspopup="true" 
                    onClick={handleSettingsClick}
                    color='secondary'
                >
                    <SettingsIcon />
                </IconButton>
                <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleSettingsClose}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                    >
                        <MenuItem
                        component={RouterLink}
                        to={`/courses/${props.course.course_code}/announcement/update/${id}`}
                        >
                        Update
                        </MenuItem>
                        <MenuItem 
                        component={RouterLink}
                        onClick={handleDelete}
                        to={`/courses/${props.course.course_code}/announcements`}
                        >
                        Delete
                        </MenuItem>
                    </Menu>
            </div>
            )}
            </div>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: announcement.explanation}}>
                
            </div>
        </div>
    )
}