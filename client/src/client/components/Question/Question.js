import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Button } from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';
import axios from 'axios';


export default function Question(props) {

    const [question, setQuestion] = React.useState({
        inputs: [],
        outputs: [],
        title: "",
        explanation: " ",
        submission_limit: '',
        points: '',
    });

    const [qid, setQId] = React.useState(() => {
        let url = window.location.pathname;
        let id = url.split('/').pop();
        return id;
    })

    useEffect(() => {
        let url = window.location.pathname;
        let id = url.split('/').pop();
        axios.get(`http://localhost:8080/question/get/${id}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then((response) => {
            setQuestion(response.data);
        })
    }, [])

    const handleDelete = (e) => {
        let url = window.location.pathname;
        let id = url.split('/').pop();
        axios.delete(`http://localhost:8080/question/delete/${id}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
        });
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        header: {
            display: 'inline-flex',
            alignItems: 'center'
        },
        header_title: {
            marginLeft: 10
        },
        content: {
            marginTop: 10
        }
      }));
    
    const styles = useStyles();

    return(
        <div className={styles.root}> 
            <div>
                <Button
                    variant='contained'
                    color='primary'
                    component={RouterLink}
                    to={`/question/update/${qid}`}
                >
                    Update
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    component={RouterLink}
                    to={`/dashboard`}
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div>
            <div className={styles.header}>
                <div className={styles.header_title}>
                    <Typography
                        variant='h5'
                        noWrap
                    >
                        {`Question Title: ${question.title}`}
                    </Typography>
                    <Typography
                        variant='body2'
                        noWrap
                        gutterBottom
                    >
                        {`Points: ${question.points}`}
                    </Typography>
                    <Typography
                        variant='body2'
                        noWrap
                        gutterBottom
                    >
                        {`Submission Limit: ${question.submission_limit}`}
                    </Typography>
                </div>

            </div>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: question.explanation}}>
                
            </div>
        </div>
    )
}