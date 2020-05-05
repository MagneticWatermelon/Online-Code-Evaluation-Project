import React from 'react';
import { Card, CardContent, Typography} from '@material-ui/core';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'




export default function Course(props) {
    const [color, setColor] = React.useState(props.color);

    const HtmlTooltip = withStyles((theme) => ({
      tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(16),
        border: '1px solid #dadde9',
      },
    }))(Tooltip);

    const useStyles = makeStyles((theme) => ({
        root: {
          width: 250
        },
        content: {
          padding: 0,
        },
        divcolor: {
          padding: '80px 120px',
          backgroundColor: color
        },
        info: {
          paddingTop: 8,
          paddingLeft: 16,
          fontSize: 16,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          '&:hover': {
            textDecoration: 'underline'
          },
          '&:focus': {
            textDecoration: 'underline'
          },
        },
        detail:{
          paddingTop: 4,
          paddingLeft: 16,
          fontSize: 12,
        }
      }));

    const styles = useStyles();

    return (
        <Link component={RouterLink} to={`courses/${props.course.courseID}`}>
          <Card className={styles.root}>    
              <CardContent className={styles.content}>
                  <div className={styles.divcolor}>
                      
                  </div>

                  <HtmlTooltip title={props.course.courseName} placement='top-end'>
                    <Typography gutterBottom variant="h5" className={styles.info}>
                        {props.course.courseName}
                    </Typography>
                  </HtmlTooltip>


                  <Typography component="p" variant="body2" className={styles.detail}>
                      {props.course.courseID}
                  </Typography>


                  <Typography component="p" variant="body2" className={styles.detail}>
                      {props.course.courseSemestr}
                  </Typography>

              </CardContent>
          </Card>
        </Link>
    );
}