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

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(16),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  return (
    <List>

      <HtmlTooltip title='DashBoard' placement='right' arrow>
        <ListItem button component={RouterLink} to="/dashboard" onClick={props.onClick}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </HtmlTooltip>

      <HtmlTooltip title='Courses' placement='right' arrow>
        <ListItem button component={RouterLink} to="/courses" onClick={props.onClick}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
      </HtmlTooltip>

      <HtmlTooltip title='Assigments' placement='right' arrow>
        <ListItem button component={RouterLink} to="/assignments" onClick={props.onClick}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Assignments" />
        </ListItem>
      </HtmlTooltip>

      <HtmlTooltip title='Submissions' placement='right' arrow>
        <ListItem button component={RouterLink} to="/submissions" onClick={props.onClick}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Submissions" />
        </ListItem>
      </HtmlTooltip>

      <HtmlTooltip title='Example' placement='right' arrow>
        <ListItem button component={RouterLink} to="/example" onClick={props.onClick}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Example" />
        </ListItem>
      </HtmlTooltip>
    </List>
  );
}