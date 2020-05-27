import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Avatar, Typography } from '@material-ui/core';

function determineRole(role) {
    switch(role) {
        case 0:
            return `Student`;
        case 1:
            return `Instructor`;
        case 2:
            return `Admin`;
        default:
            return `Student`;
    }
}


export default function Profile(props) {

    const [user, setUser] = React.useState(props.user);

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          display: 'inline-flex',
          marginTop: 50,
        },
        avatarDiv: {
            width: '100%',
            marginLeft: 50,
        },
        contentDiv: {
            width: '100%',
            marginLeft: 50,
            alignSelf: 'center',
        },
        avatar: {
            width: theme.spacing(22),
            height: theme.spacing(22),
        }
      }));
    
    const styles = useStyles();

    return (
        <div className={styles.root}>

            <div>
                {user.profile_photo ? 
                    <Avatar src={user.profile_photo} className={styles.avatar}/>
                    :
                    <Avatar className={styles.avatar}/>
                }
            </div>

            <div className={styles.contentDiv}>
                <Typography
                    variant='h6'
                    align='left'
                    gutterBottom={true}
                >
                    {`Name : ${user.name}`}
                </Typography>

                <Typography
                    variant='h6'
                    align='left'
                    gutterBottom={true}
                >
                    {`Email : ${user.mail}`}
                </Typography>

                <Typography
                    variant='h6'
                    align='left'
                    gutterBottom={true}
                >
                    {`User Role : ${determineRole(user.role)}`}
                </Typography>
            </div>

        </div>
    );
}