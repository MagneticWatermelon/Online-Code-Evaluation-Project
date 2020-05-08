import React from 'react';
import { List, ListItem, ListItemText, Typography, Container, Divider, Box } from '@material-ui/core';
import { Switch, Route, Link, BrowserRouter as Router} from 'react-router-dom';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CourseMenu from '../CourseMenu/CourseMenu';
import CourseSummary from '../CourseSummary/CourseSummary';
import RightBar from '../RightBar/RightBar';



const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      flexGrow: 1,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      display: 'inline-block',
    },
    header: {
        width: '100%',
        paddingBottom: 20,
        display: 'flex',
        flexGrow: 1,
    },
    title: {
        marginLeft: '1em',
    },
    divider: {
        marginBottom: 20,
    },
    content: {
        display: 'inline-flex',
    }
  }));

const theme = createMuiTheme({
overrides: {
    MuiListItem: {
    root: {
        "$width": 150,
        "&$selected": { 
            backgroundColor: "#64b5f6",
            borderRadius: 3,
        },
    },
    }
}
});


export default function Course(props) {

    const styles = useStyles();

    return(
            <div className={styles.root}>
                <ThemeProvider theme={theme}>
                    <div className={styles.header}>
                        <Typography
                            variant='h4'
                            component='div'
                            className={styles.title}
                        >
                            {props.course.courseName}
                        </Typography>
                        
                    </div>
                    <Divider className={styles.divider}/>
                    <div className={styles.content}>
                        <CourseMenu course={props.course} />

                        <Switch>
                            <Route path={`/courses/${props.course.courseID}/announcements`}>
                                
                            </Route>

                            <Route path={`/courses/${props.course.courseID}/assignments`}>
                                
                            </Route>

                            <Route path={`/courses/${props.course.courseID}/grades`}>
                                
                            </Route>

                            <Route path={`/courses/${props.course.courseID}/files`}>
                                
                            </Route>

                            <Route path={`/courses/${props.course.courseID}`}>
                                <CourseSummary />
                                <RightBar todos={[]} grades={[]}/>
                            </Route>
                        </Switch>
                    </div>
                    
                </ThemeProvider>
            </div>
    );
}