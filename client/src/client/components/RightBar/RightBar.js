import React from 'react';
import TodoList from '../TodoList/TodoList';
import { Container, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FeedBack from '../Feedback/FeedBack';



export default function RightBar(props) {
  
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'inline-flex',
          width: 'fit-content',
        }
      }));
    
    const styles = useStyles();

    return (
        <Container className={styles.root}>
            <TodoList todos={props.todos}/>
            <Divider orientation="vertical" flexItem />
            <FeedBack grades={props.grades}/>
        </Container>
    );
}