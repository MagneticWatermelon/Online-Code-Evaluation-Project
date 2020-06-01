import React from 'react';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';

export default function CourseSummary(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        panel: {
            maxWidth: 500,
        },
        header: {
          marginBottom: 10,
        }
      }));
    
    const styles = useStyles();

    return(
        <div className={styles.root}>
            <Typography
                variant='h5'
                component='div'
                className={styles.header}
            >
                Recent Activity
            </Typography>
            <ExpansionPanel className={styles.panel}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}

                >
                    <Typography>
                        {`Recent Announcements`}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {props.announceList.map((ann, index) => {
                            return(
                                <div>
                                    {index > 0 ? <div></div> : <Divider />}
                                    <ListItem 
                                        component={RouterLink} 
                                        to={`/courses/${props.course.course_code}/announcements/${ann._id}`}
                                    >
                                        <ListItemText
                                            primary={ann.title}
                                        />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        })}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className={styles.panel}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}

                >
                    <Typography>
                        {`Recent Assignments`}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {props.assignments.map((assign, index) => {
                            return(
                                <div>
                                    {index > 0 ? <div></div> : <Divider />}
                                    <ListItem
                                        component={RouterLink} 
                                        to={`/courses/${props.course.course_code}/assignments/${assign._id}`}
                                    >
                                        <ListItemText
                                            primary={assign.title}
                                            secondary={assign.explanation}
                                        />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        })}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}