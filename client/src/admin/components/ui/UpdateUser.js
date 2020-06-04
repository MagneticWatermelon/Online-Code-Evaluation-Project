import React, { useState, useEffect } from "react";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { BrowserRouter, Route } from "react-router-dom";
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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Grid, Divider } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import GridListTile from "@material-ui/core/GridListTile";

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
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(2),
  },
  mainTitle: {
    height: 50,
    color: "red",
    marginTop: "80px",
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateUser(props) {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [courseRole, setCourseRole] = useState("");
  const [user, setUser] = useState();
  const [userType, setUserType] = useState("");
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [courseIds, setCourseIds] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleClose = () => {};

  const handleToggle = (value) => () => {
    const currentIndex = selectedCourses.indexOf(value);
    const newChecked = [...selectedCourses];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelectedCourses(newChecked);
  };

  useEffect(() => {
    console.log(props.idOfUser);
    axios
      .get(`http://localhost:8080/user/get/${props.idOfUser}`, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then((response) => {
        console.log(response);
        setUser(response.data);
        setName(response.data.name);
        setMail(response.data.mail);
        if (props.roleOfUser == 0) {
          setUserType("Student");
          setCourseRole("Taken");
        }
        if (props.roleOfUser == 1) {
          setUserType("Instructor");
          setCourseRole("Given");
        }
        axios
          .get(`http://localhost:8080/user/courses/${props.idOfUser}`, {
            headers: { Authorization: `Bearer ${props.token}` },
          })
          .then((response) => {
            
            let resAr = response.data.courses;
            resAr.map((res) => {
              courseIds.push(res.course_id);
            });
            let deneme = [];
            
            (async function loop() {
              for (var i = 0; i < courseIds.length; i++) {
                let ress = await axios.get(`http://localhost:8080/course/get/${courseIds[i]}`, { headers: { Authorization: `Bearer ${props.token}` }, });
                deneme.push(ress.data);
              }
              setSelectedCourses(deneme);
            })();
            
          })
          .catch((error) => {
            console.log(error);
          });
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      (!loaded ? (
      <CircularProgress />) : (
      <div>
        <Dialog
          fullScreen="true"
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className={classes.mainTitle} id="form-dialog-title">
            View {userType}
          </DialogTitle>
          <DialogContent>
            <TextField
              disabled={true}
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
              disabled={true}
              autoFocus
              id="name"
              label="User E-mail"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              value={mail}
              onChange={(event) => setName(event.target.value)}
            />

            <Typography variant="h6">
              {} Courses {courseRole}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <List dense="true" className={classes.root}>
                  {selectedCourses.map((course) => {
                    const labelId = `checkbox-list-secondary-label-${course._id}`;
                    return (
                      <ListItem key={course} button>
                        <Typography>{course.name}</Typography>
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
              to={props.roleOfUser == 0 ? "/students" : "/instructors"}
              color="primary"
              token={props.token}
            >
              Back
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      ))
    </div>
  );
}
