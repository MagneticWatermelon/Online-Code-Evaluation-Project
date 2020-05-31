import React, {useEffect}from 'react';
import { Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, Divider, ListItem, ListItemText } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles} from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import axios from 'axios';



export default function Assignment(props) {

    const [questions, setQuestions] = React.useState([]);
    const [assignment, setAssignment] = React.useState({});
    const [subms, setSubms] = React.useState([]);
    const [submsLoaded, setSubmsLoaded] = React.useState(false);


    const transformDate =(date) => {
        let newDate = moment.utc(date).format('MMMM Do [At] HH[:]mm');
        return newDate;
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
        let temp = [];
        axios.get(`http://localhost:8080/assignment/check-submissions/${id}/${props.userId}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then((response) => {
            response.data.map((q) => {
                axios.all(q.submissions.map((subm) => {
                        return axios.get(`http://localhost:8080/submission/get/${subm}`, {headers: {"Authorization" : `Bearer ${props.token}`}})
                })).then((responseArr) => {
                    responseArr.map((response) => {
                        temp.push(response.data);
                    })
                }) 
            });
            setSubms(temp);   
        })
    }, []);

    useEffect(() => {
        setSubmsLoaded(true);
    }, [])

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
            <div>
                <Typography 
                    align='center'
                    variant='h4'
                    gutterBottom={true}
                >
                    {assignment.title}
                </Typography>
            </div>
            {submsLoaded && <div>
                <Grid
                    alignItems='flex-start'
                    direction='column'
                    container={true}
                >
                    {questions.map(q => {
                        return(
                            <Grid item className={styles.content}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography
                                            variant='h5'
                                            gutterBottom={true}
                                            component={RouterLink} 
                                            to={`/question/${q._id}`}
                                        >
                                            {q.title}
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <List>
                                            {subms.map((sub, index) => {
                                                console.log(sub);
                                                return (
                                                    q._id == sub.question_id
                                                    ?
                                                    <div>
                                                        {index > 0 ? <div></div> : <Divider />}
                                                        <ListItem 
                                                            component={RouterLink} 
                                                            to={`/submission/${sub._id}`}
                                                        >
                                                            <ListItemText
                                                                primary={`Id: ${sub._id}`}
                                                                secondary={`Score: ${sub.score}`}
                                                            />
                                                        </ListItem>
                                                        <Divider />
                                                    </div>
                                                    :
                                                    <div></div>
                                                )
                                            })}
                                        </List>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>}
        </div>
    )
}