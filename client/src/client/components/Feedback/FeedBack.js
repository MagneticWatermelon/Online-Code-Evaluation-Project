import React from 'react';
import { Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import moment from 'moment';



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

    const transformDate =(date) => {
        let newDate = moment.utc(date).format('MMMM Do [At] HH[:]mm');
        return newDate;
    }
    
    return (
        <div className={styles.root}>
            <Typography gutterBottom variant='h6' align='left' className={styles.title}>
                Done
            </Typography>
            <Divider />
            <List>
                {props.grades.map((grade, index) => {
                return (
                    <div>
                        <Link component={RouterLink} to={`/submissions/${grade._id}`}>
                            <ListItem >
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
                                                {`Score: ${grade.grade}`}
                                            </Typography>
                                            <Typography
                                                component="p"
                                                variant="body2"
                                                color="textPrimary"
                                                noWrap='true'
                                            >
                                                {transformDate(grade.date)}
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