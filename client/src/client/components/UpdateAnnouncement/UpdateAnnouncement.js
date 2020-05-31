import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react'; 
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
  }));

export default function UpdateAnnouncement(props) {

    const [announcement, setAnnouncement] = React.useState({title: '', explanation: ''});

    const classes = useStyles();

    const handleTitleChange = (e) => {
        announcement.title = e.target.value;
    }

    const handleEditorChange = (e) => {
        let str = e.target.getContent();
        announcement.explanation = str;
    }

    const handleSubmit = (e) => {
        axios.post(`http://localhost:8080/announcement/update/${props.course._id}`, announcement, {headers: {"Authorization" : `Bearer ${props.token}`}}).
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
                to={`/courses/${props.course.course_code}/announcements`}
                onClick={handleSubmit}
            >
                Update
            </Button>
        </div>
    );
}