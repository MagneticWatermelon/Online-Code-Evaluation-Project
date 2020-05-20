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
import Assignment from '../Assignment/Assignment';



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
    const [todos, setToDos] = React.useState([]);
    const [assignments, setAssignments] = React.useState([]);
    const [announcements, setAnnouncements] = React.useState([]);
    const [resources, setResources] = React.useState([]);
    const [submissions, setSubmissions] = React.useState([]);

    const styles = useStyles();

    useEffect(() => {
        axios.get(`http://localhost:8080/course/grades/${props.course._id}/${props.userId}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then((response) => {
            setAssignments(response.data);
            return response.data;
        }).then((response) => {
            axios.all(response.map((asg) => {
                return axios.get(`http://localhost:8080/assignment/check-submissions/${asg._id}/${props.userId}`, {headers: {"Authorization" : `Bearer ${props.token}`}});
            })).then((responseArr => {
                let subms =[];
                responseArr.map((obj) => {
                    obj.data.map((subm) => {
                      if(subm.isSubmitted){
                        let temp ={title: subm.title};
                        axios.all(subm.submissions.map((id) => {
                          temp._id = id;
                          return axios.get(`http://localhost:8080/submission/get/${id}`, {headers: {"Authorization" : `Bearer ${props.token}`}});
                        })).then(responseArr => {
                          responseArr.map(obj => {
                            temp.grade = obj.data.score;
                            temp.date = obj.data.date;
                            temp.lang = obj.data.language;
                            subms.push(temp);
                          })
                          setSubmissions(subms);
                        })
                      }
                    })
                })
            }))
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

                            <Route path={'/courses/:courseCode/announcements/:announcementID'}>
                                <Announcement course={props.course} announcements={announcements} />
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/announcements`}>
                                <CourseAnnouncements course={props.course} announcements={announcements}/>
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/submissions`}>
                                <CourseSubmissions course={props.course} subms={submissions}/>
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/assignments`}>
                                <CourseAssignments course={props.course} assignments={assignments} />
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/grades`}>
                                <CourseGrades course={props.course} grades={assignments}/>
                            </Route>

                            <Route path={`/courses/${props.course.course_code}/files`}>
                                <CourseFiles course={props.course} resources={resources} />
                            </Route>

                            <Route path={`/courses/${props.course.course_code}`}>
                                <CourseSummary announceList={announcements} assignments={assignments}/>
                                <RightBar todos={assignments} courseCode={props.course.course_code} grades={submissions}/>
                            </Route>
                        </Switch>
                    </div>
                    
                </ThemeProvider>
            </div>
    );
}