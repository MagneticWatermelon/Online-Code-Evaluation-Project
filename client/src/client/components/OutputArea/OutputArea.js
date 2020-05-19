import React from 'react';
import './OutputArea.css';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';



export default function OutputArea(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            height: '100%',
        },
        progress: {
            width: '100%',
            height: '100%',
            padding: '15% 20%',
        },
      }));

    const styles = useStyles();

    const [result, setResult] = React.useState(props.result);
    return (
        <div className="oArea">
            {result ? 
                (<div>
                    <h2>{result.score}</h2>
                </div>)
                :
                (<div className={styles.progress}><CircularProgress/></div>)
            }
        </div>
    );
}