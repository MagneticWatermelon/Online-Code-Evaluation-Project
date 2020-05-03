import React from 'react';
import { Card, CardContent, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';




export default function Course(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
          width: 250
        },
        content: {
          padding: 0,
        },
        divcolor: {
          padding: '80px 120px',
          backgroundColor: props.color
        },
        info: {
          padding: 16,
          fontSize: 14,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        },
      }));

    const styles = useStyles();

    return (
        <Card className={styles.root}>    
            <CardContent className={styles.content}>
                <div className={styles.divcolor}>
                    
                </div>
                <Typography gutterBottom variant="h5" className={styles.info}>
                    {props.course}
                </Typography>
            </CardContent>
        </Card>
    );
}