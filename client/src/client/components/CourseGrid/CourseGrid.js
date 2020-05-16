import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function CourseGrid(props) {

  const[courseColors, setCourseColors] = React.useState([]);

  function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  } 

  function intToRGB(i){
      var c = (i & 0x00FFFFFF)
          .toString(16)
          .toUpperCase();

      return "00000".substring(0, 6 - c.length) + c;
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
            let color = intToRGB(hashCode(course._id))
            courseColors.push(`#${color}`);
            return (
            <Grid item wrap='nowrap'>
              <CourseCard course={course} color={courseColors[index]} click={e => props.click(e)} index={index}/>
            </Grid>
            )
      })}
      </Grid>
  );
}