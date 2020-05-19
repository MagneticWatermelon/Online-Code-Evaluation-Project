import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';



export default function Announcement(props) {

    const [announcement, setAnnouncement] = React.useState({title: '', instructor: {name: ''}, explanation: ''});

    useEffect(() => {
        let arr = props.announcements;
        let url = window.location.pathname;
        let hash = url.split('/').pop();
        arr.map((ann) => {
            if(ann.createdAt.hashCode() == hash) {
                setAnnouncement(ann);
            }
        })
    }, [])

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

            </div>
            <div className={styles.content}>
                {announcement.explanation}
            </div>
        </div>
    )
}