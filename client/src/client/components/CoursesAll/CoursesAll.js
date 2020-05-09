import React from 'react';
import { TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, Switch, Route} from 'react-router-dom';
import Course from '../Course/Course';



export default function CoursesAll(props) {

    const [data, setData] = React.useState(props.courses);

    const useStyles = makeStyles((theme) => ({
        root: {
          marginTop: 25,
        },
        firstColumn: {
          width: 400,
        }
      }));
    
    const styles = useStyles();

    return(
        <TableContainer className={styles.root}>
            <Table>
                <TableBody>
                    {data.map((course) => (
                        <TableRow key={course.courseName}>
                            <TableCell component={RouterLink} to={`/courses/${course.courseID}`} scope="row" align='center' className={styles.firstColumn}>
                                {course.courseName}
                            </TableCell>
                            <TableCell align="left">{course.courseID}</TableCell>
                            <TableCell align="left">{course.courseSemestr}</TableCell>
                            <TableCell align="left">Active</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Switch>
                {data.map((course) => {
                    return(
                        <Route path={`/courses/${course.courseID}`}>
                            <Course course={course} />
                        </Route>
                    );
                })}
            </Switch>
        </TableContainer>
    );
}