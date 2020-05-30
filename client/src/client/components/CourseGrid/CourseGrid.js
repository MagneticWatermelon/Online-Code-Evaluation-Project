import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function CourseGrid(props) {

  const[courseColors, setCourseColors] = React.useState(["#366c9b","#035caa","#043d70","#072742","#428dce","#253949","#319cf9","#a0caef"]);

  function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

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
              <CourseCard course={course} color={courseColors[index % courseColors.length]} click={e => props.click(e)} index={index}/>
            </Grid>
            )
      })}
      </Grid>
  );
}