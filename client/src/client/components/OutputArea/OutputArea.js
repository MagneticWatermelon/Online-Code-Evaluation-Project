import React from 'react';
import './OutputArea.css';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { green, red } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';


export default function OutputArea(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            height: '100%',
        },
        results: {

        },
        inputs: {

        },
        icon: {

        },
        inputU: {

        },
        inputEx: {

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
                    {result.results && result.results.map((testCase) => {
                        if(testCase.status == 'correct') {
                            return(
                                <div>
                                    <DoneIcon style={{ color: green[500] }} />
                                    <div>
                                        <Typography 
                                            component='span'
                                            variant='body2'
                                        >
                                            {`Your Output: ${testCase.output[0]}`}
                                        </Typography>
                                        <Typography
                                            component='span'
                                            variant='body2'
                                        >
                                            {`Expected Output: ${testCase.answer[0]}`}
                                        </Typography>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return(
                                <div>
                                    <ClearIcon style={{color: red[500]}} />
                                    <div>
                                        <Typography 
                                            component='span'
                                            variant='body2'
                                        >
                                            {`Your Output: ${testCase.output[0]}`}
                                        </Typography>
                                        <Typography
                                            component='span'
                                            variant='body2'
                                        >
                                            {`Expected Output: ${testCase.answer[0]}`}
                                        </Typography>
                                    </div>
                                </div>
                            )
                        }
                    })}
                    <Typography 
                        component='span'
                        variant='body2'
                    >
                        {`Score: ${result.score}`}
                    </Typography>
                </div>)
                :
                (<div className={styles.progress}><CircularProgress/></div>)
            }
        </div>
    );
}