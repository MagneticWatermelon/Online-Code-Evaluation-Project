import React from 'react';
import { Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';




export default function FeedBack(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
          width: 250,
          display: 'block',
        },
        title: {
            paddingLeft: 10,
        },
        content: {
            marginTop: 5,
            marginBottom: 5,
        }
      }));
    
    const styles = useStyles();

    // console.log(props.grades);
    
    return (
        <div className={styles.root}>
            <Typography gutterBottom variant='h6' align='left' className={styles.title}>
                Graded Assigments
            </Typography>
            <Divider />
            <List>
                {props.grades.map((grade, index) => {
                return (
                    <div>
                        <Link>
                            <ListItem component={RouterLink} to={`/courses/${props.code}/assignments/${grade.assignment_id}/submissions/${grade._id}`}>
                                <ListItemIcon>
                                    <DoneIcon style={{ color: green[500] }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={grade.title}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="p"
                                                variant="body2"
                                                color="textPrimary"
                                                className={styles.content}
                                                noWrap='true'
                                            >
                                                {grade.points}
                                            </Typography>
                                            <Typography
                                                component="p"
                                                variant="body2"
                                                color="textPrimary"
                                                noWrap='true'
                                            >
                                                {grade.createdAt}
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