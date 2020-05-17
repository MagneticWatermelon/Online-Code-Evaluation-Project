import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';



export default function Notification(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
          textAlign: 'center',
        },
        body: {
            marginTop: 5,
        }
      }));

    const styles = useStyles();
    return(
        <div>
            {props.index > 0 ? <Divider /> : <div></div>}
            <ListItem alignItems="flex-start">
                <ListItemText
                    className={styles.root}
                    primary={props.notification.explanation}
                    secondary={
                        <React.Fragment>
                        <Typography
                            className={styles.body}
                            component="p"
                            variant="body2"
                            color="textPrimary"
                        >
                            {props.notification.title}
                        </Typography>
                        {props.notification.course}
                        </React.Fragment>
                    }
                />
            </ListItem>
        </div>
    );
}