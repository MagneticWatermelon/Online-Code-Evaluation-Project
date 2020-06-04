import React, {useEffect} from 'react';
import { Typography, Divider } from '@material-ui/core';
import { Switch, Route} from 'react-router-dom';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CourseMenu from '../CourseMenu/CourseMenu';
import CourseSummary from '../CourseSummary/CourseSummary';
import RightBar from '../RightBar/RightBar';
import CourseAnnouncements from '../CourseAnnouncements/CourseAnnouncements';
import CourseAssignments from '../CourseAssignments/CourseAssignments';
import CourseSubmissions from '../CourseSubmissions/CourseSubmissions';
import CourseGrades from '../CourseGrades/CourseGrades';
import CourseFiles from '../CourseFiles/CourseFiles';
import axios from 'axios';
import Announcement from '../Announcement/Announcement';
import CreateAnnouncement from '../CreateAnnouncement/CreateAnnouncement'
import CircularProgress from '@material-ui/core/CircularProgress';
import UpdateAnnouncement from '../UpdateAnnouncement/UpdateAnnouncement';
import CreateAssignment from '../CreateAssignment/CreateAssignment';
import Assignment from '../Assignment/Assignment'
import UpdateAssignment from '../UpdateAssignment/UpdateAssignment';
import CreateQuestion from '../CreateQuestion/CreateQuestion';



const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      flexGrow: 1,
      marginTop: 10,
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
        width: '100%',
    },
    progress: {
        width: '100%',
        height: '100%',
        padding: '15% 20%',
    },
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
    const [assignments, setAssignments] = React.useState([]);
    const [rightBarAssign, setRightBarAssign] = React.useState([]);
    const [announcements, setAnnouncements] = React.useState([]);
    const [resources, setResources] = React.useState([]);
    const [submissions, setSubmissions] = React.useState([]);
    const [submLoaded, setSubmLoaded] = React.useState(false);

    const styles = useStyles();

    useEffect(() => {
        axios.get(`http://localhost:8080/course/grades/${props.course._id}/${props.userId}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then((response) => {
            let data = response.data;
            setAssignments(response.data);
            let subms = [];
            let temp = [];
            data.map((val) => {
            if(!val.grade) {
                temp.push(val);
            }
            else {
                subms.push(val);
            }
            })
            let promise =  new Promise(resolve => {
            resolve(setRightBarAssign(temp));
            resolve(setSubmissions(subms));
            });
            promise.then(() => {
                setSubmLoaded(true);
            });
        })
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/course/announcements/${props.course._id}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then((response) => {
            setAnnouncements(response.data);
        })
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/course/resources/${props.course._id}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then((response) => {
            setResources(response.data);
        })
    }, []);

    return(
            <div className={styles.root}>
                <ThemeProvider theme={theme}>
                    <div className={styles.header}>
                        <Typography
                            variant='h4'
                            component='div'
                            className={styles.title}
                        >
                            {props.course.name}
                        </Typography>
                        
                    </div>
                    <Divider className={styles.divider}/>
                    <div className={styles.content}>
                        <CourseMenu course={props.course} />

                        <Switch>

                            <Route path={`/courses/${props.course.course_code}/question/create/:assignmentID`}>
                                <CreateQuestion course={props.course} token={props.token} />
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/assignments/:assignmentID`}>
                                <Assignment token={props.token} userId={props.userId} role={props.role} course={props.course}/>
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/assignment/update/:assignmentID`}>
                                <UpdateAssignment course={props.course} token={props.token} />
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/assignment/create`}>
                                <CreateAssignment course={props.course} token={props.token} id={props.userId}/>
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/announcement/update/:announcementID`}>
                                <UpdateAnnouncement course={props.course} token={props.token}/>
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/announcement/create`}>
                                <CreateAnnouncement course={props.course} token={props.token}/>
                            </Route>

                            <Route path={'/courses/:courseCode/announcements/:announcementID'}>
                                <Announcement course={props.course} token={props.token} role={props.role} announcements={announcements} />
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/announcements`}>
                                <CourseAnnouncements course={props.course} announcements={announcements} role={props.role}/>
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/submissions`}>
                                <CourseSubmissions course={props.course} subms={submissions}/>
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/assignments`}>
                                <CourseAssignments course={props.course} role={props.role} assignments={assignments} />
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/grades`}>
                                <CourseGrades course={props.course} grades={assignments}/>
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/files`}>
                                <CourseFiles course={props.course} resources={resources} token={props.token}/>
                            </Route>

                            <Route path={`/courses/${props.course.course_code}`}>
                                <CourseSummary announceList={announcements} course={props.course} assignments={assignments}/>
                                {(() => {
                                    if (submLoaded) {
                                    if(props.role == 0) {
                                        return (<RightBar todos={rightBarAssign} courseCode={props.course.course_code} grades={submissions}/>);
                                    }
                                    }
                                    else {
                                    return (<div className={styles.progress}><CircularProgress /></div>)
                                    }
                                })()
                                }
                            </Route>

                            
                        </Switch>
                    </div>
                    
                </ThemeProvider>
            </div>
    );
}