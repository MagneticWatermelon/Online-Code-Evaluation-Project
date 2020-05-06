import React from 'react';
import { List, ListItem, ListItemText, Typography, Container, Divider, Box } from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 'fit-content',
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      display: 'block',
    },
    header: {
        width: '100%',
        paddingBottom: 20,
    },
    divider: {
        marginBottom: 20,
    }
  }));

const theme = createMuiTheme({
overrides: {
    MuiListItem: {
    root: {
        width: 150,
        "&$selected": { 
            backgroundColor: "#64b5f6",
            borderRadius: 3,
        },
    },
    }
}
});


export default function Course(props) {

    const styles = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return(
        <div className={styles.root}>
            <ThemeProvider theme={theme}>
                <div className={styles.header}>
                    <Typography
                        variant='h4'
                        component='div'
                    >
                        {props.course.courseName}
                    </Typography>
                    
                </div>
                <Divider className={styles.divider}/>
                <Container>
                    <List component='nav'>

                        <ListItem 
                            button 
                            component={RouterLink} 
                            to={`courses/${props.course.courseID}/announcements`}
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemText primary='Announcements' />
                        </ListItem>

                        <ListItem 
                            button 
                            component={RouterLink} 
                            to={`courses/${props.course.courseID}/assignments`}
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemText primary='Assignments' />
                        </ListItem>

                        <ListItem 
                            button 
                            component={RouterLink} 
                            to={`courses/${props.course.courseID}/grades`}
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <ListItemText primary='Grades' />
                        </ListItem>

                        <ListItem 
                            button 
                            component={RouterLink} 
                            to={`courses/${props.course.courseID}/files`}
                            selected={selectedIndex === 3}
                            onClick={(event) => handleListItemClick(event, 3)}
                        >
                            <ListItemText primary='Resources' />
                        </ListItem>

                    </List>
                </Container>
            </ThemeProvider>
        </div>
    );
}