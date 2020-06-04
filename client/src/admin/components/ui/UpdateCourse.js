import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { BrowserRouter, Route } from "react-router-dom";
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
import Switch from "@material-ui/core/Switch";

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

export default function UpdateCourse(props) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(true);
  const [allStudents, setAllStudents] = useState([]);
  const [allInstructors, setAllInstructors] = useState([]);
  const [initCourse, setInitCourse] = useState();
  const [initInstr, setInitInstr] = useState([]);
  const [initStudent, setInitStudent] = useState([]);
  const [initName, setInitName] = useState("");
  const [initCode, setInitCode] = useState("");
  const [initYear, setInitYear] = useState("");
  const [initTerm, setInitTerm] = useState(false);
  const [finalTerm, setFinalTerm] = useState(false);
  const [mySwitch, setMySwitch] = useState(false);
  const [finalName, setFinalName] = useState("");
  const [finalCode, setFinalCode] = useState("");
  const [finalYear, setFinalYear] = useState("");
  const [finalInst, setFinalInst] = useState([]);
  const [finalStudent, setFinalStudent] = useState([]);
  const [fall, setFall] = useState(false);
  const [spring, setSpring] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(!loaded);
  };

  useEffect(() => {
    console.log("weweewf");
    console.log(props.token);
    console.log(props.idOfCourse);
    axios
      .get(`http://localhost:8080/course/get/${props.idOfCourse}`, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then((res) => {
        setInitCourse(res.data);
        setInitName(res.data.name);
        setFinalName(res.data.name);
        setInitCode(res.data.course_code);
        setFinalCode(res.data.course_code);
        setInitYear(res.data.year);
        setFinalYear(res.data.year);
        if (res.data.term == "Fall") {
          setFall(true);
          setFinalTerm(false);
          setInitTerm(false);
        }
        if (res.data.term == "Spring") {
          setSpring(true);
          setInitTerm(true);
          setFinalTerm(true);
        }
        axios
          .get(`http://localhost:8080/course/instructors/${props.idOfCourse}`, {
            headers: { Authorization: `Bearer ${props.token}` },
          })
          .then((res) => {
            let resIns = res.data;
            resIns.map((ins) => {
              initInstr.push(ins.instructor_id);
              finalInst.push(ins.instructor_id);
            });
            console.log("Instructors");
            console.log(initInstr);

            axios
              .get(
                `http://localhost:8080/course/students/${props.idOfCourse}`,
                {
                  headers: { Authorization: `Bearer ${props.token}` },
                }
              )
              .then((res) => {
                let resIns = res.data;
                resIns.map((student) => {
                  initStudent.push(student.student_id);
                  finalStudent.push(student.student_id);
                });
                console.log("Students");
                console.log(initStudent);

                axios
                  .get("http://localhost:8080/user/get/all", {
                    headers: { Authorization: `Bearer ${props.token}` },
                  })
                  .then((res) => {
                    let resIns = res.data;
                    resIns.map((user) => {
                      if (user.user_role == 0) allStudents.push(user);
                      if (user.user_role == 1) allInstructors.push(user);
                    });
                    handleLoad();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTerm = () => {
    setFall(!fall);
    setFinalTerm(!finalTerm);
    setSpring(!spring);
  };

  const handleToggle = (value) => () => {
    const currentIndex = finalInst.indexOf(value);
    const newChecked = [...finalInst];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setFinalInst(newChecked);
  };

  const handleStdntToggle = (value) => () => {
    const currentIndex = finalStudent.indexOf(value);
    const newChecked = [...finalStudent];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setFinalStudent(newChecked);
  };

  const handleCourseUpdate = () => {
    let addStdnt = finalStudent.filter((x) => !initStudent.includes(x));
    let dropStudent = initStudent.filter((x) => !finalStudent.includes(x));
    let addInst = finalInst.filter((x) => !initInstr.includes(x));
    let dropInst = initInstr.filter((x) => !finalInst.includes(x));
    let added = addInst.concat(addStdnt);
    let dropped = dropInst.concat(dropStudent);
    let myBool = true;
    let secBool = false;
    if (added.length > 0) {
      let body = {
        people: added,
      };
      axios
        .post(
          `http://localhost:8080/course/register/${props.idOfCourse}`,
          body,
          {
            headers: { Authorization: `Bearer ${props.token}` },
          }
        )
        .then((res) => {
          secBool = true;
          console.log(res);
        })
        .catch((err) => {
          myBool = false;
          console.log(err);
        });
    }

    let dropBool = true;
    if (dropped.length > 0) {
      let body = {
        people: dropped,
      };
      axios
        .delete(`http://localhost:8080/course/deregister/${props.idOfCourse}`, {
          headers: { Authorization: `Bearer ${props.token}` },
          data: body,
        })
        .then((res) => {
          secBool = true;
          console.log(res);
        })
        .catch((err) => {
          myBool = false;
          dropBool = false;
          console.log(err);
        });
    }

    let finalTer = "";
    if (spring) finalTer = "Spring";
    if (fall) finalTer = "Fall";
    let updBody = {
      code: finalCode,
      name: finalName,
      year: finalYear,
      term: finalTer,
    };
    axios
      .post(
        `http://localhost:8080/course/update/${props.idOfCourse}`,
        updBody,
        {
          headers: { Authorization: `Bearer ${props.token}` },
        }
      )
      .then((res) => {
        secBool = true;
        console.log(res);
      })
      .catch((err) => {
        myBool = false;
        console.log(err);
      });
    if (!myBool) {
      enqueueSnackbar("An Error Eccured", { variant: "error" });
    }
    if (myBool)
      enqueueSnackbar("Course Updated Succesfully", { variant: "success" });
  };
  const handleSwitchChange = (event) => {
    setMySwitch(!mySwitch);
  };

  return !loaded ? (
    <CircularProgress></CircularProgress>
  ) : (
    <div>
      <Dialog fullScreen="true" open={open} aria-labelledby="form-dialog-title">
        <DialogTitle
          component="h3"
          variant="h5"
          className={classes.mainTitle}
          id="form-dialog-title"
        >
          Update Course
        </DialogTitle>
        <Typography align="right">
          <Switch
            checked={mySwitch}
            onChange={handleSwitchChange}
            name="Edit"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </Typography>
        <DialogContent>
          <TextField
            disabled={!mySwitch}
            autoFocus
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Course Name"
            type="email"
            value={finalName}
            onChange={(event) => setFinalName(event.target.value)}
          />
          <Box m={2} />
          <TextField
            disabled={!mySwitch}
            autoFocus
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Course Code"
            type="email"
            value={finalCode}
            onChange={(event) => setFinalCode(event.target.value)}
          />
          <Box m={2} />
          <TextField
            disabled={!mySwitch}
            autoFocus
            required
            variant="outlined"
            margin="normal"
            id="name"
            label="Year"
            type="number"
            fullWidth
            value={finalYear}
            onChange={(event) => setFinalYear(event.target.value)}
          />
          <Box m={2} />
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    disabled={!mySwitch}
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
                    disabled={!mySwitch}
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
              <Typography variant="h6">Instructors of the Course</Typography>
              <List dense className={classes.root}>
                {allInstructors.map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value._id}`;
                  return (
                    <ListItem key={value} button>
                      <FormControlLabel
                        id={value._id}
                        value={value}
                        control={
                          <Checkbox
                            disabled={!mySwitch}
                            id={value._id}
                            edge="end"
                            onChange={handleToggle(value._id)}
                            checked={finalInst.indexOf(value._id) !== -1}
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
              <Typography variant="h6">Students of the Course</Typography>
              <List dense className={classes.root}>
                {allStudents.map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value._id}`;
                  return (
                    <ListItem key={value} button>
                      <FormControlLabel
                        id={value._id}
                        value={value}
                        control={
                          <Checkbox
                            disabled={!mySwitch}
                            id={value._id}
                            edge="end"
                            onChange={handleStdntToggle(value._id)}
                            checked={finalStudent.indexOf(value._id) !== -1}
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
            color="primary"
            onClick={() =>
              enqueueSnackbar("Course Is Not Updated", { variant: "warning" })
            }
          >
            Cancel
          </Button>
          <Button
            component={Link}
            to="/courses"
            onClick={handleCourseUpdate}
            color="primary"
            disabled={!mySwitch}
          >
            Update Course
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
