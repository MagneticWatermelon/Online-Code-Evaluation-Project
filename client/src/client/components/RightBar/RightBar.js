import React from 'react';
import TodoList from '../TodoList/TodoList';
import { Container, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FeedBack from '../Feedback/FeedBack';



export default function RightBar() {
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'inline-flex',
          width: 'fit-content',
        }
      }));
    const [gradeList, setGrades] = React.useState([{name: 'LCS', courseName: 'Algorithmic Thinking', gradeInfo: '7 out of 10'}, 
    {name: 'Knapsack', courseName: 'Algorithms and Data Structures', gradeInfo: '6 out of 10'}, 
    {name: 'Simple Array', courseName: 'Art of Computing', gradeInfo: '9 out of 10'}, 
    {name: 'Inheritance', courseName: 'Object Oriented Programming', gradeInfo: '7 out of 10'}]);
    const [toDoList, setTodos] = React.useState([{name: 'Task Scheduling', courseName: 'Algorithmic Thinking', dueDate: '15 May 2020'}, 
    {name: 'Functions', courseName: 'Art of Computing', dueDate: '10 May 2020'}, 
    {name: 'Encapsulation', courseName: 'Object Oriented Programming', dueDate: '11 May 2020'}]);
    const styles = useStyles();
    return (
        <Container className={styles.root}>
            <TodoList todos={toDoList}/>
            <Divider orientation="vertical" flexItem />
            <FeedBack grades={gradeList}/>
        </Container>
    );
}