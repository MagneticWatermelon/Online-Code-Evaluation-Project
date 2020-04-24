import React from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SchoolIcon from '@material-ui/icons/School';
import { Link as RouterLink } from 'react-router-dom';

export default function ListItems() {
  return (
    <List>
      <ListItem button component={RouterLink} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={RouterLink} to="/courses">
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Courses" />
      </ListItem>
      <ListItem button component={RouterLink} to="/assignments">
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItem>
      <ListItem button component={RouterLink} to="/submissions">
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Submissions" />
      </ListItem>
      <ListItem button component={RouterLink} to="/example">
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Example" />
      </ListItem>
    </List>
  );
}