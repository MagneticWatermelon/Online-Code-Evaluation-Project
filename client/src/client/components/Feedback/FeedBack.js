import React from 'react';
import { Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';



export default function FeedBack() {

    const useStyles = makeStyles((theme) => ({
        root: {
          width: 250,
          display: 'block',
        },
        title: {
            paddingLeft: 10,
        }
      }));
    
    const styles = useStyles();
    
    return (
        <div className={styles.root}>
            <Typography gutterBottom variant='h6' align='left' className={styles.title}>
                Grades
            </Typography>
            <Divider />
            <List>
                <ListItem>
                    <ListItemIcon>
                        <DoneIcon style={{ color: green[500] }} />
                    </ListItemIcon>
                    <ListItemText 
                        primary='Assigment Name'
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="p"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    Course Name
                                </Typography>
                                <Typography
                                    component="p"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    5 out of 10
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );
}