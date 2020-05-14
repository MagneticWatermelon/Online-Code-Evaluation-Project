import React from 'react';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    instructor: {
        display: 'inline',
        marginBottom: 10,
    },
    date: {
        float: 'right',
        marginRight: 30,
    },
    body: {
        marginTop: 5,
    },
  }));


export default function CourseAnnouncements(props) {
    const classes = useStyles();
    const test = [1,2,3,4,5];

    return(
        <div className={classes.root}>
            <List className={classes.list}>
                {test.map((val) => {
                    return(
                        <div>
                            <ListItem alignItems="flex-start" component={RouterLink} to={`/courses/${props.course.courseID}/announcements/${150 + val}`}>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Link>{"Announcement Title"}</Link>}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.instructor}
                                                color="textPrimary"
                                            >
                                                Instructor Name
                                        </Typography>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.date}
                                                color="textSecondary"
                                            >
                                                Date
                                        </Typography>
                                            <Typography
                                                component="p"
                                                variant="body2"
                                                className={classes.body}
                                                color="textSecondary"
                                                noWrap={true}
                                            >
                                                Announcement body
                                        </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider component="li" />
                        </div>
                    );
                })}
            </List>
        </div>
    );
}