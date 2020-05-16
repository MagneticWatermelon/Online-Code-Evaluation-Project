import React from 'react';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';


export default function CourseSummary(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
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
            <ExpansionPanel>
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
                                    <ListItem>
                                        <ListItemText
                                            primary={ann.title}
                                            secondary={ann.explanation}
                                        />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        })}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
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
                                    <ListItem>
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