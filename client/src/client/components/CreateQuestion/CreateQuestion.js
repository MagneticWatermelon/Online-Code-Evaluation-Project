import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react'; 
import { Button, TextField, Typography, Slider } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    slider: {
        marginTop: 10,
        width: 500,
    },
  }));

export default function CreateQuestion(props) {

    const [question, setQuestion] = React.useState({title: '', explanation: '', submission_limit: 1, points: 10, languages: []});
    const [sliderValPoint, setValPoint] = React.useState(20);
    const [sliderValLimit, setValLimit] = React.useState(5);
    const classes = useStyles();

    const handleTitleChange = (e) => {
        question.title = e.target.value;
    }

    const handlePointChange = (e, val) => {
        setValPoint(val);
        question.points = val;
    }

    const handleLimitChange = (e, val) => {
        setValLimit(val);
        question.submission_limit = val;
    }

    const handleEditorChange = (e) => {
        let str = e.target.getContent();
        question.explanation = str;
    }

    const handleSubmit = (e) => {
        
    }

    return (
        <div className={classes.root}>
            <TextField id="title" label="Title" variant='outlined' onChange={handleTitleChange}/>
            <div className={classes.slider}>
                <Typography
                    id="discrete-slider" gutterBottom
                >
                    Submission Limit
                </Typography>
                <Slider
                    value={sliderValLimit}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="on"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    onChange={handleLimitChange}
                />
            </div>
            <div className={classes.slider}>
                <Typography
                    id="discrete-slider" gutterBottom
                >
                    Points
                </Typography>
                <Slider
                    value={sliderValPoint}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="on"
                    step={5}
                    marks
                    min={0}
                    max={100}
                    onChange={handlePointChange}
                />
            </div>
            <Editor
                initialValue="<p>Problem Definition</p>"
                init={{
                height: 500,
                apiKey:"gi18zjjrosyk60q3hkidkjbxg84ejt4s81wrhoarci6vom6k",
                menubar: 'file edit view insert format tools table help',
                plugins: [
                    'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
                ],
                toolbar:
                    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor codesample | ltr rtl'
                }}
                onChange={handleEditorChange}
            />
            <Button 
                variant='contained' 
                color='primary'
                component={RouterLink}
                to={`/courses/${props.course.course_code}/assignments`}
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </div>
    );
}