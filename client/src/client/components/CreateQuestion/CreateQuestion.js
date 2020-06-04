import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react'; 
import { Button, TextField, Typography, Slider, IconButton } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
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

export default function CreateQuestion(props) {

    const [question, setQuestion] = React.useState({title: '', explanation: '', submission_limit: 1, points: 10, languages: []});
    const [sliderValPoint, setValPoint] = React.useState(10);
    const [sliderValLimit, setValLimit] = React.useState(1);
    const [testInputs, setTestInputs] = React.useState([]);
    const [testOutputs, setTestOutputs] = React.useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [cases, setCases] = React.useState([]);
    const [changed, setChanged] = React.useState(false);
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

    const handleTestInputChange = (e) => {
        let index = e.target.id.split('_').pop();
        let val = e.target.value;
        let temp = testInputs;
        temp[index] = val;
        let promise = new Promise(resolve => {
            resolve(setTestInputs(temp));
        })
        promise.then(() => {
            setChanged(!changed);
        })
    }

    const handleTestOutputChange = (e) => {
        let index = e.target.id.split('_').pop();
        let val = e.target.value;
        let temp = testOutputs;
        temp[index] = val;
        let promise = new Promise(resolve => {
            resolve(setTestOutputs(temp));
        })
        promise.then(() => {
            setChanged(!changed);
        })
    }

    const handleCaseAdd = (e) => {
        let temp = cases;
        let index = temp.length + 1;
        temp.push(index);
        
        let promise = new Promise(resolve => {
            resolve(setCases(temp));
            resolve(testInputs.push(''));
            resolve(testOutputs.push(''));
        })

        promise.then(() => {
            setChanged(!changed);
        })
    }

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
        let tempInp = [];
        testInputs.map((val) => {
            tempInp.push(val.split(' '));
        })      
        obj.inputs = tempInp;
        let tempOut = [];
        testOutputs.map((val) => {
            tempOut.push(val.split(' '));
        })       
        obj.outputs = tempOut;        
        obj.submission_limit = question.submission_limit;        
        obj.points = question.points;
        if(languages < 1) {
            enqueueSnackbar('Choose allowed languages', {variant: 'warning'});
            e.preventDefault();
            return;
        }       
        obj.languages = languages;
        console.log(obj);
        let url = window.location.pathname;
        let id = url.split('/').pop();
        axios.post(`http://localhost:8080/question/create/${id}`, obj, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then(function (response) {
            enqueueSnackbar('Question added successfully!', {variant: 'success'});
            })
        .catch(function (error) {
            enqueueSnackbar('Something went wrong!', {variant: 'error'});
        });
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
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    className={classes.addButton}
                    onClick={handleCaseAdd}
                >
                    Add Test Case
                </Button>
                {cases.map((val, index) => {
                    return (
                        <div className={classes.testCase}>
                            <TextField
                            id={`input_${index}`}
                            label={`Test Input ${index}`}
                            multiline
                            rowsMax={4}
                            value={testInputs[index]}
                            onChange={handleTestInputChange}
                            variant="outlined"
                            className={classes.testInput}
                            />
                            <TextField
                            id={`output_${index}`}
                            label={`Test Output ${index}`}
                            multiline
                            rowsMax={4}
                            value={testOutputs[index]}
                            onChange={handleTestOutputChange}
                            variant="outlined"
                            />  
                        </div>
                    )
                })}
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