import React, { useEffect } from 'react';
import './App.css';
import { MemoryRouter as Router, Route, Switch, Redirect } from 'react-router';
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

  useEffect(() => {
    if(token) {
      authorize(true);
      console.log(token);
    }
  }, [token]);

  return (
    <Router>
      <CssBaseline />
      <Route exact path="/">
        {authed ? <Redirect to="/dashboard" /> : <SignIn tokenize={(token) => {setToken(token)}} />}
      </Route>
      <Route exact path="/dashboard" component={Dashboard} />
    </Router>
  );
}

export default App;
