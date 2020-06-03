import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import axios from "axios";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#fa5788",
    height: "100px",
    marginTop: "80px",
  },
  title: {
    marginLeft: theme.spacing(2),

    flex: 1,
  },
  table: {
    minWidth: 750,
  },
  progress: {
    width: "100%",
    height: "100%",
    padding: "15% 20%",
    marginLeft: "40em",
  },
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(2),
  },
  mainTitle: {
    height: 50,
    color: "red",
    marginTop: "80px"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateUser(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [state, setState] = React.useState({
    student: true,
    ta: false,
    instructure: false,
    admin: false,
  });

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.checked });
  };

  const { student, ta, instructure, admin } = state;

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = (event) => {
    console.log("creating user");
    console.log(props.token);
    console.log(name, mail, password);
    let role;
    if (student) role = 0;
    if (ta) role = 1;
    if (instructure) role = 2;
    if (admin) role = 3;
    event.preventDefault();
    let body = {
      name: name,
      mail: mail,
      role: role,
      password: password,
    };
    axios
      .post("http://localhost:8080/user/create", body, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then(function (response) {
        console.log(response);
        handleClose();
      })
      .catch(function (response) {
        console.log(response);
        handleClose();
      });
  };

  return (
    <div>
      <Dialog
        fullScreen="true"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.mainTitle} id="form-dialog-title">Create User</DialogTitle>
        <DialogContent>
        
          <TextField
            autoFocus
            id="name"
            label="User Name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Box m={2} />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            id="name"
            type="email"
            fullWidth
            value={mail}
            onChange={(event) => setMail(event.target.value)}
          />
          <Box m={2} />
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="User Password"
            type="email"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Box m={2} />

          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={student}
                    onChange={handleChange}
                    name="student"
                  />
                }
                label="Student"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={ta} onChange={handleChange} name="ta" />
                }
                label="Teaching Assistant"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={instructure}
                    onChange={handleChange}
                    name="instructure"
                  />
                }
                label="Instructure"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={admin}
                    onChange={handleChange}
                    name="admin"
                  />
                }
                label="Admin"
              />
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            component={Link}
            to="courses"
            color="primary"
            token={props.token}
          >
            Cancel
          </Button>
          <Button
            component={Link}
            to="/students"
            onClick={handleCreate}
            color="primary"
            token={props.token}
            // disabled={()=> {this.name === ""}}
          >
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
