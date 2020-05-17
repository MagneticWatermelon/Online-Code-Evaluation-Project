import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItems from '../ListItems/ListItems';
import { Avatar, List, ListItem } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Switch, Route } from 'react-router-dom';
import Sandbox from '../Sandbox/Sandbox';
import {BrowserRouter as Router} from 'react-router-dom';
import CourseGrid from '../CourseGrid/CourseGrid';
import RightBar from '../RightBar/RightBar';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Popover from '@material-ui/core/Popover';
import ListItemText from '@material-ui/core/ListItemText';
import Notification from '../Notification/Notification';
import Course from '../Course/Course';
import CoursesAll from '../CoursesAll/CoursesAll';
import AssignmentsAll from '../AssignmentsAll/AssignmentsAll';
import SubmissionsAll from '../SubmissionsAll/SubmissionsAll';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    scrollbarWidth: 'none',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    width: '100%',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  progress: {
    width: '100%',
    height: '100%',
    padding: '15% 20%',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openNotif, setOpenNotif] = React.useState(false);
  const [anchorElNotif, setAnchorElNotif] = React.useState(null);
  const [title, setTitle] = React.useState('Dashboard');
  const [count, setCount] = React.useState(0);
  const [clickedCourse, setIndex] = React.useState(1);
  const [courseList, setCourseList] = React.useState([]);
  const [dataLoaded, setLoaded] = React.useState(false);
  const [notifs, setNotifs] = React.useState([]);
  const [assignments, setAssignments] = React.useState([]);

  async function getCourseIDs() {
    let response = await axios.get(`http://localhost:8080/user/courses/${props.userId}`, {headers: {"Authorization" : `Bearer ${props.token}`}});
    let courseArr = await response.data.courses;

    axios.all(courseArr.map((obj) => {
      return axios.get(`http://localhost:8080/course/get/${obj.course_id}`, {headers: {"Authorization" : `Bearer ${props.token}`}});
    })).then((responseArr) => {
      responseArr.map((course) => {
        courseList.push(course.data);
      })
      setLoaded(true);
    })
  };

  async function getNotifications() {
    let response = await axios.get(`http://localhost:8080/user/notifications/${props.userId}`, {headers: {"Authorization" : `Bearer ${props.token}`}});
    let nots = await response.data;
    setNotifs(nots);
    setCount(nots.length);
  }

  async function getAllAssignments() {
    let response = await axios.get(`http://localhost:8080/user/assignments/${props.userId}/all`, {headers: {"Authorization" : `Bearer ${props.token}`}});
    setAssignments(response.data);
  }
  
  useEffect(getCourseIDs, []);

  useEffect(getNotifications, []);

  useEffect(getAllAssignments, []);

  const [gradeList, setGrades] = React.useState([
    {name: 'LCS', courseName: 'Algorithmic Thinking', gradeInfo: '7 out of 10', submID: 59, assignID: 148, courseID: 'COMP401-01'}, 
    {name: 'Knapsack', courseName: 'Algorithms and Data Structures', gradeInfo: '6 out of 10', submID: 60, assignID: 149, courseID: 'COMP203-02'}, 
    {name: 'Simple Array', courseName: 'Art of Computing', gradeInfo: '9 out of 10', submID: 61, assignID: 150, courseID: 'COMP101-01'}, 
    {name: 'Inheritance', courseName: 'Object Oriented Programming', gradeInfo: '7 out of 10', submID: 62, assignID: 151, courseID: 'COMP112-02'}]);
  const [toDoList, setTodos] = React.useState([
    {name: 'Task Scheduling', courseName: 'Algorithmic Thinking', dueDate: '15 May at 23:59', assignID: 152, courseID: 'COMP401-01'}, 
    {name: 'Functions', courseName: 'Art of Computing', dueDate: '10 May at 23:59', assignID: 153, courseID: 'COMP101-01'}, 
    {name: 'Encapsulation', courseName: 'Object Oriented Programming', dueDate: '11 May at 23:59', assignID: 154, courseID: 'COMP112-02'}]);

  const handleTitle = (event) => {
    setTitle(event.currentTarget.children[1].innerText);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNotif = (event) => {
    setAnchorElNotif(event.currentTarget);
    setCount(0);
  };

  const handleCloseNotif = () => {
    setAnchorElNotif(null);
  };
  

  return (
    <Router>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                      <MenuIcon />
                    </IconButton>

                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {title}
                    </Typography>

                    <IconButton
                        color="inherit"
                        aria-haspopup='true'
                        aria-describedby='notif'
                        onClick={handleClickNotif}
                      >
                        <Badge badgeContent={count} color="secondary">
                          <MailIcon />
                        </Badge> 
                    </IconButton>

                    <Popover
                      id='notif'
                      open={Boolean(anchorElNotif)}
                      anchorEl={anchorElNotif}
                      onClose={handleCloseNotif}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <List>
                        {notifs.map((notif, index) => {
                            return (
                            <Notification notification={notif} index={index}/>
                            )
                        })}
                      </List>
                    </Popover>
                    
                    <IconButton   
                      color="inherit" 
                      aria-controls="simple-menu" 
                      aria-haspopup="true" 
                      onClick={handleClick}
                    >
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </IconButton>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
                </div>
                <Divider />
                <ListItems onClick={handleTitle}/>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth={false} className={classes.container}>
                    <Switch>

                        <Route path="/dashboard">
                          {dataLoaded ? 
                            (<CourseGrid courses={courseList} click={index => {setIndex(index)}}/>)
                          :
                          (<div className={classes.progress}><CircularProgress /></div>)
                          }
                          <RightBar todos={toDoList} grades={gradeList}/>
                        </Route>

                        {courseList.map((course) => {
                          return(
                              <Route path={`/courses/${course.course_code}`}>
                                  <Course course={course} token={props.token} userId={props.userId}/>
                              </Route>
                        )})
                        }

                        <Route path="/courses">
                            <CoursesAll  courses={courseList}/>
                        </Route>

                        <Route path="/assignments" >
                          <AssignmentsAll assignments={assignments}/>
                        </Route>

                        <Route path="/submissions" >
                          <SubmissionsAll />
                        </Route>

                        <Route exact path="/example">
                            <Sandbox sessionId={10} token={props.token}/>
                        </Route>

                    </Switch>
                </Container>
            </main>
        </div>
    </Router>
  );
}