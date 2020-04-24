import React from 'react';
import './App.css';
import {AppBar, Toolbar, Link, CssBaseline } from '@material-ui/core';
import { MemoryRouter as Router, Route } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SignIn from '../SignIn/SignIn';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Dashboard from '../Dashboard/Dashboard';
import CodeArea from '../CodeArea/CodeArea';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {
const classes = useStyles();

  return (
    <Router>
      <CssBaseline />
      <Dashboard />
    </Router>
  );
}

export default App;
