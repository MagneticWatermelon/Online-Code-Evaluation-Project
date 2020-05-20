import React from 'react';
import './ProblemArea.css';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';





export default function ProblemArea(props) {
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

    const [question, setQuestion] = React.useState(props.question);
    const [isQuestionLoaded, loadedQuestion] = React.useState(props.loaded);

    return (
        <div className="pArea">
            {isQuestionLoaded ? 
                (<div>
                    <h1>{question.title}</h1>
                    <p>{question.explanation}</p>
                </div>)
                :
                (<div className={styles.progress}><CircularProgress/></div>)
            }
            
        </div>
    );
}