import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import UpdateCourse from "./UpdateCourse";

export default function Courses(props) {
  const headCells = [
    { id: "name", numeric: false, disablePadding: true, label: "Course Name" },
    { id: "code", numeric: true, disablePadding: false, label: "Course Code" },
    { id: "year", numeric: true, disablePadding: false, label: "Year" },
    { id: "term", numeric: true, disablePadding: false, label: "Term" },

    { id: "_id", numeric: true, disablePadding: false },
  ];

  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all students" }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  }));

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Courses
          </Typography>
        )}

        {numSelected > 1 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : numSelected === 1 ? (
          <React.Fragment>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Button
              onClick={handleUpdate}
              className={classes.button}
              variant="contained"
              color="secondary"
              to="/updatecourse"
              component={Link}
            >
              Update
            </Button>
          </React.Fragment>
        ) : (
          <div></div>
        )}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    button: {
      borderRadius: "50px",
      marginLeft: "50px",
      marginRight: "25px",
      height: "35px",
    },
  }));

  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [loadPage, setLoadPage] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleUpdate = () => {};

  useEffect(() => {
    axios
      .get(`http://localhost:8080/course/get/all`, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then((responseArr) => {
        setRows(responseArr.data);
      });
  }, [loadPage]);

  const handleDelete = () => {
    console.log("in delete");
    console.log(props.token);
    console.log(selected);
    

    let courseInst = [];
    let courseStdnt = [];
    //get instructors of course
    axios
      .get(`http://localhost:8080/course/instructors/${selected[0]}`, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then((res) => {
        let resIns = res.data;
        resIns.map((ins) => {
          courseInst.push(ins.instructor_id);
        });
        console.log("Instructors");
        console.log(courseInst);

        axios
          .get(`http://localhost:8080/course/students/${selected[0]}`, {
            headers: { Authorization: `Bearer ${props.token}` },
          })
          .then((res) => {
            let resIns = res.data;
            resIns.map((student) => {
              courseStdnt.push(student.student_id);
            });
            console.log("Students");
            console.log(courseStdnt);
            let allUsers = courseStdnt.concat(courseInst);
            let body = {
              people: allUsers
            }
            axios
              .delete(
                `http://localhost:8080/course/deregister/${selected[0]}`,
                {
                  headers: { Authorization: `Bearer ${props.token}` },
                  data: body,
                }
              )
              .then((res) => {
                console.log(res);

                let body = {
                  courses: selected,
                };
                axios
                  .delete("http://localhost:8080/course/delete", {
                    headers: { Authorization: `Bearer ${props.token}` },
                    data: body,
                  })
                  .then(function (response) {
                    console.log(response);
                    setLoadPage(!loadPage);
                    setSelected([]);
                  })
                  .catch(function (response) {
                    console.log(response);
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
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected([]);
      let ar = [];
      ar = rows.map((n) => n._id);
      setSelected(ar);
      console.log(ar);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row._id)}
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.course_code}</TableCell>
                      <TableCell align="right">{row.year}</TableCell>
                      <TableCell align="right">{row.term}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <Container>
        <Switch>
          <Route
            exact
            path="/updatecourse"
            component={() => (
              <div style={{ height: "600px" }}>
                console.log(selected[0]);
                <UpdateCourse
                  idOfCourse={selected[0]}
                  roleOfUser={"0"}
                  token={props.token}
                  userID={props.userID}
                />
              </div>
            )}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
