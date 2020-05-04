import React from 'react';
import { Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';



export default function TodoList(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
          width: 250,
          display: 'block',
        },
        content: {
            marginTop: 5,
            marginBottom: 5,
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
                {props.todos.map(todo => {
                    return (
                        <ListItem>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary={todo.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="p"
                                            variant="body2"
                                            color="textPrimary"
                                            className={styles.content}
                                        >
                                            {todo.courseName}
                                        </Typography>
                                        <Typography
                                            component="p"
                                            variant="body2"
                                            color="textPrimary"
                                            
                                        >
                                            {todo.dueDate}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );
}