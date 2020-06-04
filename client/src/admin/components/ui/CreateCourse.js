import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Courses from "./Courses";
import { useSnackbar } from "notistack";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#fa5788",
    height: "100px",
    marginTop: "130px",
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
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    height: 140,
    width: 200,
  },
  mainTitle: {
    height: 50,
    color: "red",
    marginTop: "80px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateCourse(props) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(true);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [courseCreateClicked, setCourseCreateClicked] = useState(false);
  const [checked, setChecked] = React.useState([]);
  const [checkedStdnt, setCheckedStdnt] = React.useState([]);
  const [fall, setFall] = useState(true);
  const [spring, setSpring] = useState(false);

  const handleTerm = () => {
    setFall(!fall);
    setSpring(!spring);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleStdntToggle = (value) => () => {
    const currentIndex = checkedStdnt.indexOf(value);
    const newChecked = [...checkedStdnt];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedStdnt(newChecked);
  };
  console.log(checked);
  const handleClose = () => {};

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/get/all`, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then((responseArr) => {
        let myArr = responseArr.data;
        let instArray = [];
        let stdAr = [];
        myArr.map((user) => {
          if (user.user_role === 1) instArray.push(user);
          if (user.user_role === 0) stdAr.push(user);

        });
        setInstructors(instArray);
        setStudents(stdAr);
      });
  }, []);

  const handleCourseCreate = (event) => {
    let myBol = false;
    let courseTerm;
    if (fall && !spring) courseTerm = "Fall";
    if (!fall && spring) courseTerm = "Spring";
    let body = {
      course_code: courseCode,
      course_name: courseName,
      year: courseYear,
      term: courseTerm,
      instructor_id: checked[0],
    };
    axios
      .post("http://localhost:8080/course/create", body, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then(function (response) {
        console.log(response);
        checked.splice(0, 1);
        let allUsers = [];
        checked.map((user) => {
          allUsers.push(user);
        })
        checkedStdnt.map((user) => {
          allUsers.push(user);
        })
        if (allUsers.length > 0) {
          console.log("eklemem");
          let course_id = response.data.course_id;          
          let body = {
            people: allUsers,
          };
          axios
            .post(`http://localhost:8080/course/register/${course_id}`, body, {
              headers: { Authorization: `Bearer ${props.token}` },
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (response) {
              myBol = true;
              console.log(response);
            });
        }
        handleClose();
      })
      .catch(function (response) {
        myBol = true;
        console.log(response);
        handleClose();
      });

    if (myBol) {
      enqueueSnackbar("An Error Occured", { variant: "error" });
    } else {
      enqueueSnackbar("Course is Created Successfully", { variant: "success" });
    }
    setCourseCreateClicked(!courseCreateClicked);
    //handleClose();
  };

  return (
    <div>
      <Dialog
        fullScreen="true"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          component="h3"
          variant="h5"
          className={classes.mainTitle}
          id="form-dialog-title"
        >
          Create Course
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Course Name"
            type="email"
            value={courseName}
            onChange={(event) => setCourseName(event.target.value)}
          />
          <Box m={2} />
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Course Code"
            type="email"
            value={courseCode}
            onChange={(event) => setCourseCode(event.target.value)}
          />
          <Box m={2} />
          <TextField
            autoFocus
            required
            variant="outlined"
            margin="normal"
            id="name"
            label="Year"
            type="number"
            fullWidth
            value={courseYear}
            onChange={(event) => setCourseYear(event.target.value)}
          />
          <Box m={2} />
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    onChange={handleTerm}
                    checked={fall}
                    defaultChecked
                    color="primary"
                  />
                }
                label="Fall"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    onChange={handleTerm}
                    checked={spring}
                    color="primary"
                  />
                }
                label="Spring"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
          <Box m={2} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Select Instructors</Typography>
              <List dense className={classes.root}>
                {instructors.map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value._id}`;
                  return (
                    <ListItem key={value} button>
                      <FormControlLabel
                        id={value._id}
                        value={value}
                        control={
                          <Checkbox
                            id={value._id}
                            edge="end"
                            onChange={handleToggle(value._id)}
                            checked={checked.indexOf(value._id) !== -1}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        }
                        label={value.name}
                        labelPlacement="end"
                        id={labelId}
                      />
                      <Typography>{value.mail}</Typography>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={15} sm={6}>
              <Typography variant="h6">Select Students</Typography>
              <List dense className={classes.root}>
                {students.map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value._id}`;
                  return (
                    <ListItem key={value} button>
                      <FormControlLabel
                        id={value._id}
                        value={value}
                        control={
                          <Checkbox
                            id={value._id}
                            edge="end"
                            onChange={handleStdntToggle(value._id)}
                            checked={checkedStdnt.indexOf(value._id) !== -1}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        }
                        label={value.name}
                        labelPlacement="end"
                        id={labelId}
                      />
                      <Typography>{value.mail}</Typography>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            component={Link}
            to="/courses"
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            component={Link}
            to="/courses"
            onClick={handleCourseCreate}
            color="primary"
            disabled={(courseName == "" || courseCode == "" || courseYear == "" ) || (!fall && !spring) || checked.length==0 }
          >
            Create Course
          </Button>
          <Route
            exact
            path="/courses"
            component={() => (
              <div style={{ height: "600px" }}>
                <Courses
                  token={props.token}
                  userID={props.userID}
                  style={{ height: "600px" }}
                />
              </div>
            )}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
