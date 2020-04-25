import React from 'react';
import './App.css';
import { MemoryRouter as Router, Route } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SignIn from '../SignIn/SignIn';
import { makeStyles } from '@material-ui/core/styles';
import Dashboard from '../Dashboard/Dashboard';
import CssBaseline from '@material-ui/core/CssBaseline';




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
