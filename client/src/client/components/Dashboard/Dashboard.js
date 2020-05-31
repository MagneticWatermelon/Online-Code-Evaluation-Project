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
import { Avatar, List} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Switch, Route, useHistory } from 'react-router-dom';
import Sandbox from '../Sandbox/Sandbox';
import {BrowserRouter as Router} from 'react-router-dom';
import { Link as RouterLink} from 'react-router-dom';
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
import Assignment from '../Assignment/Assignment';
import axios from 'axios';
import Profile from '../Profile/Profile';


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
    backgroundColor: '#174572',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    backgroundColor: '#174572',
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
  const [submLoaded, setSubmLoaded] = React.useState(false);
  const [notifs, setNotifs] = React.useState([]);
  const [assignments, setAssignments] = React.useState([]);
  const [submissions, setSubmissions] = React.useState([]);
  const [user, setUser] = React.useState();

  useEffect(() => {
      axios.get(`http://localhost:8080/user/get/${props.userId}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
      then((response) => {
          setUser(response.data);
      })
  }, []);

  let history = useHistory();

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
    let data = response.data;
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
      resolve(setAssignments(temp));
      resolve(setSubmissions(subms));
    });
    promise.then(() => {
        setSubmLoaded(true);
    });
    
  }
  
  useEffect(getCourseIDs, []);

  useEffect(getNotifications, []);

  useEffect(getAllAssignments, []);

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

  const handleLogout = () => {
    setAnchorEl(null);
    history.push('/');
    window.location.reload();
  }

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
                        <Avatar />
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
                        <MenuItem 
                          onClick={handleClose} 
                          component={RouterLink}
                          to={`/profile/${props.userId}`}
                        >
                          My account
                        </MenuItem>
                        <MenuItem 
                          onClick={handleLogout}
                        >
                          Logout
                        </MenuItem>
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
                <ListItems onClick={handleTitle} id={props.userId}/>
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
                          {(() => {
                            if (submLoaded) {
                              if(props.role == 0) {
                                return (<RightBar todos={assignments} grades={submissions}/>);
                              }
                            }
                            else {
                              return (<div className={classes.progress}><CircularProgress /></div>)
                            }
                           })()
                          }
                          
                        </Route>

                        {courseList.map((course) => {
                          return(
                              <Route path={`/courses/${course.course_code}`}>
                                  <Course course={course} token={props.token} userId={props.userId} role={props.role}/>
                              </Route>
                        )})
                        }

                        <Route path={`/profile/${props.userId}`}>
                            <Profile user={user} />
                        </Route>

                        <Route path={`/courses/${props.userId}`}>
                            <CoursesAll  courses={courseList}/>
                        </Route>

                        <Route path={`/assignments/${props.userId}`}>
                          <AssignmentsAll assignments={assignments}/>
                        </Route>

                        <Route exact path="/submissions/:submId">
                            <Sandbox token={props.token} userId={props.userId} readOnly={true}/>
                        </Route>

                        <Route path="/submissions" >
                          <SubmissionsAll />
                        </Route>

                        <Route exact path="/question/:questionId">
                            <Sandbox token={props.token} userId={props.userId} readOnly={false}/>
                        </Route>

                    </Switch>
                </Container>
            </main>
        </div>
    </Router>
  );
}