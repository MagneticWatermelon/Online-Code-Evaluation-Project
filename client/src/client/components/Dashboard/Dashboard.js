import React from 'react';
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
import {Switch, Route } from 'react-router';
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
    display: 'inline-flex',
    width: 'fit-content',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openNotif, setOpenNotif] = React.useState(false);
  const [anchorElNotif, setAnchorElNotif] = React.useState(null);
  const [title, setTitle] = React.useState('Dashboard');
  const [count, setCount] = React.useState(2);

  const [courseList, setCourses] = React.useState([
    {courseName: 'Art of Computing', courseID: 'COMP101-01', courseSemestr: '2019/2020 Spring'}, 
    {courseName: 'Algorithms and Data Structures', courseID: 'COMP203-02', courseSemestr: '2019/2020 Spring'},
    {courseName: 'Exploring Profession', courseID: 'COMP104-01', courseSemestr: '2019/2020 Spring'},
    {courseName: 'Object Oriented Programming', courseID: 'COMP112-02', courseSemestr: '2019/2020 Spring'},
    {courseName: 'Algorithmic Thinking', courseID: 'COMP401-01', courseSemestr: '2019/2020 Spring'},
  ]);
  const [notifs, setNotifs] = React.useState([
    {notifType: 'Assigment Graded', notifBody: 'Simple Array' , notifDetail: 'Art of Computing - COMP101-01'},
    {notifType: 'Assigment Graded', notifBody: 'LCS' , notifDetail: 'Algorithmic Thinking - COMP401-01'},
  ]);

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
                    
                    <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
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
                        <Route exact path="/dashboard">
                          <CourseGrid courses={courseList} />
                          <RightBar />
                        </Route>
                        <Route exact path="/example">
                            <Sandbox id="editor1"/>
                        </Route>
                        <Route exact path='/courses'>
                          <Course course={courseList[0]}/>
                        </Route>
                    </Switch>
                </Container>
            </main>
        </div>
    </Router>
  );
}