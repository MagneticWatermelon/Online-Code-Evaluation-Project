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
    },
  }));

export default function UpdateAssignment(props) {

    const [assignment, setAssignment] = React.useState({title: '', explanation: '', due_date: '', weight: '', release_date: ''});
    const [sliderVal, setVal] = React.useState(20);
    const classes = useStyles();

    const handleTitleChange = (e) => {
        assignment.title = e.target.value;
    }

    const handleTimeChange = (e) => {
        assignment.due_date = e.target.value;
    }

    const handleWeightChange = (e, val) => {
        setVal(val);
        assignment.weight = val;
    }

    const handleEditorChange = (e) => {
        let str = e.target.getContent();
        assignment.explanation = str;
    }

    const handleSubmit = (e) => {
        let url = window.location.pathname;
        let id = url.split('/').pop();
        let obj = assignment;
        obj.release_date = moment().format(moment.HTML5_FMT.DATETIME_LOCAL);
        console.log(obj);
        axios.post(`http://localhost:8080/assignment/update/${id}`, obj, {headers: {"Authorization" : `Bearer ${props.token}`}}).
        then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className={classes.root}>
            <TextField id="title" label="New Title" variant='outlined' onChange={handleTitleChange}/>
            <TextField
                id="datetime-local"
                label="Due Date"
                type="datetime-local"
                defaultValue={moment().format(moment.HTML5_FMT.DATETIME_LOCAL)}
                className={classes.textField}
                onChange={handleTimeChange}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <div className={classes.slider}>
                <Typography
                    id="discrete-slider" gutterBottom
                >
                    Weight
                </Typography>
                <Slider
                    value={sliderVal}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="on"
                    step={5}
                    marks
                    min={0}
                    max={100}
                    onChange={handleWeightChange}
                />
            </div>
            <Editor
                initialValue="<p>New content</p>"
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
                Update
            </Button>
        </div>
    );
}