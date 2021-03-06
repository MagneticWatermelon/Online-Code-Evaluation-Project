import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import { makeStyles } from '@material-ui/core/styles';
import Dashboard from '../Dashboard/Dashboard';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminPage from "../../../admin/components/App";

Object.defineProperty(String.prototype, 'hashCode', {
  value: function() {
    var hash = 0, i, chr;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
});


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
        <Dashboard userId={userID} role={userRole} token={token}/>
      </Route>
    </Router>
  );
}

export default App;
