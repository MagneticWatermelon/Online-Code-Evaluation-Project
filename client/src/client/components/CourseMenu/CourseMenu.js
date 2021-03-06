import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { List, ListItem, ListItemText, Container} from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';



export default function CourseMenu(props) {

    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const useStyles = makeStyles((theme) => ({
        root: {
          width: 'fit-content',
        }
      }));
    const theme = createMuiTheme({
    overrides: {
        MuiListItem: {
        root: {
            "&$selected": { 
                backgroundColor: "#c2cfcf",
                borderRadius: 3,
            },
        },
        }
    }
    });
    
    const styles = useStyles();

    
    return(
        <Container className={styles.root}>
            <List component='nav'>
            <ThemeProvider theme={theme}>
                <ListItem 
                    button
                    component={RouterLink} 
                    to={`/courses/${props.course.course_code}`}
                    selected={selectedIndex === 0 || window.location.pathname === `/courses/${props.course.course_code}`}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemText primary='Home' primaryTypographyProps={{align: 'center'}}/>
                </ListItem>

                <ListItem 
                    button 
                    component={RouterLink} 
                    to={`/courses/${props.course.course_code}/announcements`}
                    selected={selectedIndex === 1 || window.location.pathname === `/courses/${props.course.course_code}/announcements`}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemText primary='Announcements' primaryTypographyProps={{align: 'center'}}/>
                </ListItem>

                <ListItem 
                    button 
                    component={RouterLink} 
                    to={`/courses/${props.course.course_code}/assignments`}
                    selected={selectedIndex === 2 || window.location.pathname === `/courses/${props.course.course_code}/assignments`}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemText primary='Assignments' primaryTypographyProps={{align: 'center'}}/>
                </ListItem>

                <ListItem 
                    button 
                    component={RouterLink} 
                    to={`/courses/${props.course.course_code}/submissions`}
                    selected={selectedIndex === 3  || window.location.pathname === `/courses/${props.course.course_code}/submissions`}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemText primary='Submissions' primaryTypographyProps={{align: 'center'}}/>
                </ListItem>

                <ListItem 
                    button 
                    component={RouterLink} 
                    to={`/courses/${props.course.course_code}/grades`}
                    selected={selectedIndex === 4  || window.location.pathname === `/courses/${props.course.course_code}/grades`}
                    onClick={(event) => handleListItemClick(event, 4)}
                >
                    <ListItemText primary='Grades' primaryTypographyProps={{align: 'center'}}/>
                </ListItem>

                <ListItem 
                    button 
                    component={RouterLink} 
                    to={`/courses/${props.course.course_code}/files`}
                    selected={selectedIndex === 5  || window.location.pathname === `/courses/${props.course.course_code}/files`}
                    onClick={(event) => handleListItemClick(event, 5)}
                >
                    <ListItemText primary='Resources' primaryTypographyProps={{align: 'center'}}/>
                </ListItem>
            </ThemeProvider>
            </List>
        </Container>
    );
}