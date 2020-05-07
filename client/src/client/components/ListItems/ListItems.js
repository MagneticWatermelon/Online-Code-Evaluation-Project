import React from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SchoolIcon from '@material-ui/icons/School';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';


export default function ListItems(props) {

  return (
    <List>

        <ListItem button component={RouterLink} to="/dashboard" onClick={props.onClick}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button component={RouterLink} to="/courses/COMP101-01" onClick={props.onClick}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>

        <ListItem button component={RouterLink} to="/assignments" onClick={props.onClick}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Assignments" />
        </ListItem>

        <ListItem button component={RouterLink} to="/submissions" onClick={props.onClick}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Submissions" />
        </ListItem>

        <ListItem button component={RouterLink} to="/example" onClick={props.onClick}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Example" />
        </ListItem>
        
    </List>
  );
}