import React from 'react';
import { Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';



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
    
    return (
        <div className={styles.root}>
            <Typography gutterBottom variant='h6' align='left' className={styles.title}>
                Grades
            </Typography>
            <Divider />
            <List>
                {props.grades.map(grade => {
                return (
                    <ListItem>
                        <ListItemIcon>
                            <DoneIcon style={{ color: green[500] }} />
                        </ListItemIcon>
                        <ListItemText 
                            primary={grade.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="p"
                                        variant="body2"
                                        color="textPrimary"
                                        className={styles.content}
                                    >
                                        {grade.courseName}
                                    </Typography>
                                    <Typography
                                        component="p"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        {grade.gradeInfo}
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