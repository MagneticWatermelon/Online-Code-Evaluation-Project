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
            display: 'flex',
            alignItems: 'center',
            marginTop: 20,
        },
        inputs: {
            marginLeft: 25,
        },
        icon: {

        },
        inputU: {
            marginTop: 10,
        },
        inputEx: {
            marginTop: 10,
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
                    <Typography 
                        component='p'
                        variant='h5'
                        className={styles.inputEx}

                    >
                        {`Message : ${result.message}`}
                    </Typography>
                    {result.error && 
                        <Typography 
                        component='p'
                        variant='h5'
                        className={styles.inputEx}

                    >
                        {`Error: ${result.error}`}
                    </Typography>
                    }
                    {result.results && result.results.map((testCase) => {
                        if(testCase.status == 'correct') {
                            return(
                                <div className={styles.results}>
                                    <DoneIcon fontSize='large' style={{ color: green[500] }} />
                                    <div className={styles.inputs}>
                                        <Typography 
                                            component='span'
                                            variant='body2'
                                        >
                                            {`Your Output:`}
                                            <br></br>
                                            {testCase.output.map(val => {
                                                return(
                                                    <span>{val}<br></br></span>
                                                )
                                            })}
                                        </Typography>
                                        <Typography
                                            component='span'
                                            variant='body2'
                                            className={styles.inputU}

                                        >
                                            {`Expected Output:`}
                                            <br></br>
                                            {testCase.answer.map(val => {
                                                return(
                                                    <span>{val}<br></br></span>
                                                )
                                            })}
                                        </Typography>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return(
                                <div className={styles.results}>
                                    <ClearIcon fontSize='large' style={{color: red[500]}} />
                                    <div className={styles.inputs}>
                                        <Typography 
                                            component='span'
                                            variant='body2'
                                        >
                                            {`Your Output:`}
                                            <br></br>
                                            {testCase.output.map(val => {
                                                return(
                                                    <span>{val}<br></br></span>
                                                )
                                            })}
                                        </Typography>
                                        <Typography
                                            component='span'
                                            variant='body2'
                                            className={styles.inputU}

                                        >
                                            {`Expected Output:`}
                                            <br></br>
                                            {testCase.answer.map(val => {
                                                return(
                                                    <span>{val}<br></br></span>
                                                )
                                            })}
                                        </Typography>
                                    </div>
                                </div>
                            )
                        }
                    })}
                    <Typography 
                        component='p'
                        variant='h5'
                        className={styles.inputEx}

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