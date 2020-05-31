import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react'; 

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    instructor: {
        display: 'inline',
        marginBottom: 10,
    },
    date: {
        float: 'right',
        marginRight: 30,
    },
    body: {
        marginTop: 5,
        maxWidth: 600,
    },
  }));

export default function CreateAnnouncement(props) {

    const classes = useStyles();

    const handleEditorChange = (e) => {
        console.log(
          'Content was updated:',
          e.target.getContent()
        );
      }

    return (
        <div className={classes.root}>
            <Editor
                initialValue="<p>Initial content</p>"
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
        </div>
    );
}