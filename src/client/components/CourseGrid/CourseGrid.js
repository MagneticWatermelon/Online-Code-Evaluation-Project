import React from 'react';
import Course from '../Course/Course';
import { Grid } from '@material-ui/core';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export default function CourseGrid(props) {
    return (
        <Grid container direction='row' spacing={5}>
            {props.courses.map(course => {
           return (
            <Grid item>
              <Course course={course} color={getRandomColor()}/>
            </Grid>
           )
        })}
        </Grid>
    );
}