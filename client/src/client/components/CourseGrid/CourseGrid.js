import React, { useEffect } from 'react';
import Course from '../Course/Course';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export default function CourseGrid(props) {

  const[courseColors, setCourseColors] = React.useState([ "#390F9B", "#E73420", "#298939", "#AA7379", "#E0F936" ]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'inline-flex'
    }
  }));

  const styles = useStyles();
  
  return (
      <Grid container direction='row' spacing={5} className={styles.root}>
          {props.courses.map((course, index) => {
          console.log(courseColors[index]);
          return (
          <Grid item wrap='nowrap'>
            <Course course={course} color={courseColors[index]}/>
          </Grid>
          )
      })}
      </Grid>
  );
}