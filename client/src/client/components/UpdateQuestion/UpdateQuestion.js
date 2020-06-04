import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react'; 
import { Button, TextField, Typography, Slider,} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    addButton: {
        marginBottom: 3,
    },
    testCase: {
        marginTop: 7,
        marginBottom: 3,
    },
    testInput: {
        marginRight: 10,
    },
    slider: {
        marginTop: 10,
        width: 500,
    },
  }));

export default function UpdateQuestion(props) {

    const [question, setQuestion] = React.useState({title: '', explanation: '', submission_limit: 1, points: 10, languages: []});
    const [sliderValPoint, setValPoint] = React.useState(10);
    const [sliderValLimit, setValLimit] = React.useState(1);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [langs, setLangs] = React.useState({
        'java:8': false,
        'c++': false,
        'python:3': false,
        'javascript': false,
      })

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

    const handleLangChange = (event) => {
        setLangs({ ...langs, [event.target.name]: event.target.checked });
    };    

    const handleSubmit = (e) => {
        let languages = [];
        for (const key in langs) {
            if (langs[key]) {
                languages.push(key);
            }
        }
        let obj = {};
        obj.title = question.title;
        if(obj.title == '') {
            enqueueSnackbar('Enter a title', {variant: 'warning'});
            e.preventDefault();
            return;
        }
        obj.explanation = question.explanation;               
        obj.submission_limit = question.submission_limit;        
        obj.points = question.points;        
        obj.languages = languages;
        if(languages < 1) {
            enqueueSnackbar('Choose allowed languages', {variant: 'warning'});
            e.preventDefault();
            return;
        }
        let url = window.location.pathname;
        let id = url.split('/').pop();
        axios.post(`http://localhost:8080/question/update/${id}`, obj, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then(function (response) {
            enqueueSnackbar('Question updated successfully!', {variant: 'success'});
            })
        .catch(function (error) {
            enqueueSnackbar('Something went wrong!', {variant: 'error'});
        });
    }

    return (
        <div className={classes.root}>
            <TextField id="title" label="New Title" variant='outlined' onChange={handleTitleChange}/>
            <div className={classes.slider}>
                <Typography
                    id="discrete-slider" gutterBottom
                >
                    New Submission Limit
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
                    New Points
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
            <div>
                Allowed Languages
            </div>
            <FormGroup row>
                <FormControlLabel
                    control={<Checkbox checked={langs['java:8']} onChange={handleLangChange} name="java:8" />}
                    label="Java 8"
                />
                <FormControlLabel
                    control={<Checkbox checked={langs['c++']} onChange={handleLangChange} name="c++" />}
                    label="C++"
                />
                <FormControlLabel
                    control={<Checkbox checked={langs['python:3']} onChange={handleLangChange} name="python:3" />}
                    label="Python 3"
                />
                <FormControlLabel
                    control={<Checkbox checked={langs['javascript']} onChange={handleLangChange} name="javascript" />}
                    label="JavaScript"
                />   
            </FormGroup>
            <Editor
                initialValue="<p>New Problem Definition</p>"
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
                to={`/dashboard`}
                onClick={handleSubmit}
            >
                Update
            </Button>
        </div>
    );
}