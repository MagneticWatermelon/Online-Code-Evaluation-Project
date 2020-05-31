import React, {useEffect}from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';



export default function Assignment(props) {

    const [questions, setQuestions] = React.useState([]);
    const [assignment, setAssignment] = React.useState({});
    const [subms, setSubms] = React.useState([]);


    const transformDate =(date) => {
        let newDate = moment.utc(date).format('MMMM Do [At] HH[:]mm');
        return newDate;
    }

    const handleDelete = (e) => {
        let url = window.location.pathname;
        let id = url.split('/').pop();
        axios.delete(`http://localhost:8080/assignment/delete/${id}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        let url = window.location.pathname;
        let id = url.split('/').pop();
        axios.get(`http://localhost:8080/assignment/get/${id}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then((response) => {
            setAssignment(response.data);
        })
    }, []);

    useEffect(() =>{
        let url = window.location.pathname;
        let id = url.split('/').pop();
        axios.get(`http://localhost:8080/assignment/questions/${id}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then((response) => {
            setQuestions(response.data);
        })
    }, []);

    useEffect(() => {
        let url = window.location.pathname;
        let id = url.split('/').pop();
        axios.get(`http://localhost:8080/assignment/check-submissions/${id}/${props.userId}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then((response) => {
            console.log(response.data);
        })
    }, []);

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            height: '100%',
        },
        content: {
            marginTop: 25,
            maxWidth: 800,
            marginLeft: 50,
        },
      }));

    const styles = useStyles();

    return(
        <div className={styles.root}>
            {props.role == 1 && 
            (
            <div>
                <Button
                variant='contained'
                color='primary'
                component={RouterLink}
                to={`/courses/${props.course.course_code}/assignment/update`}
                >
                    Update
                </Button>
                <Button
                variant='contained'
                color='secondary'
                component={RouterLink}
                onClick={handleDelete}
                to={`/courses/${props.course.course_code}/assignments`}
                >
                    Delete
                </Button>
            </div>
            )}
            <div>
                <Typography 
                    align='center'
                    variant='h4'
                    gutterBottom={true}
                >
                    {assignment.title}
                </Typography>
            </div>
            <div>
                <Grid
                    alignItems='flex-start'
                    direction='column'
                    container={true}
                >
                    {questions.map(q => {
                        return(
                            <Grid item className={styles.content}>
                                <Typography
                                    variant='h5'
                                    gutterBottom={true}
                                    component={RouterLink} 
                                    to={`/question/${q._id}`}
                                >
                                    {q.title}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    gutterBottom={true}
                                    noWrap={true}
                                >
                                    {q.explanation}
                                </Typography>
                            </Grid>
                        )
                    })}
                </Grid>
                <div>

                </div>
            </div>
        </div>
    )
}