import React from 'react';
import { Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';


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
                    <div>
                        <Link component={RouterLink} to={`/assignments/${todo._id}`}>
                            <ListItem>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={todo.title}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="p"
                                                variant="body2"
                                                color="textPrimary"
                                                noWrap='true'
                                                
                                            >
                                                {todo.due_date}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </Link>
                        <Divider />
                    </div>
                    )
                })}
            </List>
        </div>
    );
}