import React, {useEffect}from 'react';
import { Grid, Typography, Button, IconButton, Menu, MenuItem, Link } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import moment from 'moment';
import axios from 'axios';



export default function Assignment(props) {

    const [questions, setQuestions] = React.useState([]);
    const [assignment, setAssignment] = React.useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [id, setId] = React.useState(() => {
        let url = window.location.pathname;
        let id = url.split('/').pop();
        return id;
    })

    const transformDate =(date) => {
        let newDate = moment.utc(date).format('MMMM Do [At] HH[:]mm');
        return newDate;
    }

    const handleSettingsClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleSettingsClose = () => {
        setAnchorEl(null);
    };

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
        header: {
            display: 'inline-flex',
            alignItems: 'end',
        },
        assignTitle: {
            textAlign: 'left',
            marginLeft: 25,
        },
        qTitle: {
            textDecoration: 'none'
        }
      }));

    const styles = useStyles();

    return(
        <div className={styles.root}>
            
            <div className={styles.header}>
                <Typography 
                    align='center'
                    variant='h4'
                    gutterBottom={true}
                    className={styles.assignTitle}
                >
                    {assignment.title}
                </Typography>
                {props.role == 1 && 
                    (
                    <div>
                        <IconButton
                            aria-controls="simple-menu" 
                            aria-haspopup="true" 
                            onClick={handleSettingsClick}
                            color='secondary'
                        >
                            <SettingsIcon />
                        </IconButton>
                        <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleSettingsClose}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                                }}
                            >
                                <MenuItem
                                component={RouterLink}
                                to={`/courses/${props.course.course_code}/assignment/update/${id}`}
                                >
                                Update
                                </MenuItem>
                                <MenuItem 
                                component={RouterLink}
                                onClick={handleDelete}
                                to={`/courses/${props.course.course_code}/assignments`}
                                >
                                Delete
                                </MenuItem>
                                <MenuItem 
                                component={RouterLink}
                                to={`/courses/${props.course.course_code}/question/create/${id}`}
                                >
                                Add Question
                                </MenuItem>
                            </Menu>
                    </div>
                    )}
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
                                <Link
                                    component={RouterLink} 
                                    to={`/question/${q._id}`}
                                >
                                    <Typography
                                        variant='h5'
                                        gutterBottom={true}
                                        className={styles.qTitle}
                                    >
                                        {q.title}
                                    </Typography>
                                </Link>
                                
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