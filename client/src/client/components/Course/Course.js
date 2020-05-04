import React from 'react';
import { Card, CardContent, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';




export default function Course(props) {
    const [color, setColor] = React.useState(props.color);

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
          textOverflow: 'ellipsis'
        },
        detail:{
          paddingTop: 4,
          paddingLeft: 16,
          fontSize: 12,
        }
      }));

    const styles = useStyles();

    return (
        <Card className={styles.root}>    
            <CardContent className={styles.content}>
                <div className={styles.divcolor}>
                    
                </div>
                <Typography gutterBottom variant="h5" className={styles.info}>
                    {props.course.courseName}
                </Typography>
                <Typography component="p" variant="body2" className={styles.detail}>
                    {props.course.courseID}
                </Typography>
                <Typography component="p" variant="body2" className={styles.detail}>
                    {props.course.courseSemestr}
                </Typography>
            </CardContent>
        </Card>
    );
}