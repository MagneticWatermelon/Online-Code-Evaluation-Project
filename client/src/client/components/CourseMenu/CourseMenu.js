import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { List, ListItem, ListItemText, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



export default function CourseMenu(props) {

    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const useStyles = makeStyles((theme) => ({
        root: {
          width: 'fit-content'
        }
      }));
    
    const styles = useStyles();

    
    return(
        <Container className={styles.root}>
            <List component='nav'>

                <ListItem 
                    button 
                    component={RouterLink} 
                    to={`/courses/${props.course.courseID}/announcements`}
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemText primary='Announcements' />
                </ListItem>

                <ListItem 
                    button 
                    component={RouterLink} 
                    to={`/courses/${props.course.courseID}/assignments`}
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemText primary='Assignments' />
                </ListItem>

                <ListItem 
                    button 
                    component={RouterLink} 
                    to={`/courses/${props.course.courseID}/submissions`}
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemText primary='Submissions' />
                </ListItem>

                <ListItem 
                    button 
                    component={RouterLink} 
                    to={`/courses/${props.course.courseID}/grades`}
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemText primary='Grades' />
                </ListItem>

                <ListItem 
                    button 
                    component={RouterLink} 
                    to={`/courses/${props.course.courseID}/files`}
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                >
                    <ListItemText primary='Resources' />
                </ListItem>

            </List>
        </Container>
    );
}