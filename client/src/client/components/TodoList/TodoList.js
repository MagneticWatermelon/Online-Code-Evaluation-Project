import React from 'react';
import { Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';



export default function TodoList() {

    const useStyles = makeStyles((theme) => ({
        root: {
          width: 250,
          display: 'block',
        }
      }));
    
    const styles = useStyles();
    
    return (
        <div className={styles.root}>
            <Typography gutterBottom variant='h6' align='left'>
                To Do
            </Typography>
            <Divider />
            <List>
                <ListItem>
                    <ListItemIcon>
                        <AssignmentIcon />
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
                                    Due Date
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );
}