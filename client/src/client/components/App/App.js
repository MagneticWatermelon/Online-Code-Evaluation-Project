import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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

  const [token, setToken] = React.useState('');
  const [authed, authorize] = React.useState(false);
  const [userID, setUserID] = React.useState('');
  const [userRole, setUserRole] = React.useState(null);

  useEffect(() => {
    if(userID) {
      authorize(true);
    }
  }, [userID]);

  useEffect(() => {
    if(userRole) {
      authorize(true);
    }
  }, [userRole]);

  useEffect(() => {
    if(token) {
      authorize(true);
    }
  }, [token]);

  return (
    <Router>
      <CssBaseline />
      <Route exact path="/">
        {authed ? <Redirect push to="/dashboard" /> : 
        <SignIn 
          tokenize={(token) => {setToken(token)}} 
          id={(id) => {setUserID(id)}}
          role={(role) => {setUserRole(role)}}
        />}
      </Route>
      <Route exact path="/dashboard">
        <Dashboard userId={userID} token={token}/>
      </Route>
    </Router>
  );
}

export default App;
