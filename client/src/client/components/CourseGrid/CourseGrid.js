import React, { useEffect } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function CourseGrid(props) {

  const[courseColors, setCourseColors] = React.useState([ "#083D77", "#51A3A3", "#F4D35E", "#EE964B", "#F95738" ]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'inline-flex'
    }
  }));

  const styles = useStyles();
  
  return (
      <Grid container direction='row' spacing={5} className={styles.root}>
          {props.courses.map((course, index) => {
          return (
          <Grid item wrap='nowrap'>
            <CourseCard course={course} color={courseColors[index]} click={e => props.click(e)} index={index}/>
          </Grid>
          )
      })}
      </Grid>
  );
}