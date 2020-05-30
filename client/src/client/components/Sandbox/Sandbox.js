import React , { useRef, useEffect }from 'react';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane'
import ProblemArea from '../ProblemArea/ProblemArea';
import OutputArea from '../OutputArea/OutputArea';
import './SandBox.css';
import Editor from '@monaco-editor/react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, IconButton, Typography, Input, ButtonGroup, Button, CircularProgress} from '@material-ui/core';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import CloseIcon from '@material-ui/icons/Close';
import { blueGrey } from '@material-ui/core/colors';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { useSnackbar } from 'notistack';


function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
};

function determineLang(extension) {
    switch(extension) {
        case 'java':
            return 'java:8';
        case 'cpp' :
            return 'c++';
        case 'py' :
            return 'python:3';
        default:
            return 'java:8';      
    }
};

function determineEditorLang(extension) {
    switch(extension) {
        case 'java':
            return 'java';
        case 'cpp' :
            return 'cpp';
        case 'py' :
            return 'python';
        default:
            return 'javascript';      
    }
};

function createId(name) {
    let url = window.location.pathname;
    let id = url.split('/').pop();
    return `${id}_${name}`;
}



export default function Sandbox(props) {

    if(sessionStorage.getItem('splitPos') == null) {
        sessionStorage.setItem('splitPos', '25%,50%,25%');
    }
        
    const [value, setValue] = React.useState(0);
    const [treeFiles, setTreeFiles] = React.useState([]);
    const [fileTabs , setFileTabs] = React.useState([]);
    const [question, setQuestion] = React.useState({});
    const [isQuestionLoaded, loadedQuestion] = React.useState(false);
    const [results, setResults] = React.useState({});
    const [loadedResults, loadResults] = React.useState(true);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const editorRef = useRef();

    useEffect(() =>{
        let url = window.location.pathname;
        let id = url.split('/').pop();
        let type = url.split('/')[1];
        if (type == 'question') {
            axios.get(`http://localhost:8080/question/get/${id}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
            then((response) => {
                setQuestion(response.data);
                loadedQuestion(true);
            })
        }
        else {
            axios.get(`http://localhost:8080/submission/get/${id}`, {headers: {"Authorization" : `Bearer ${props.token}`}}).
            then((response) => {
                let qId = response.data.question_id;
                console.log(qId);
            })
        }
    }, []);
    
    const handleChange = (event) => {
        sessionStorage.setItem('splitPos', event);
        if(editorRef.current) {
            debounce(editorRef.current.layout(), 300);
        }
    };

    const handleAddClick = (event) => {
        treeFiles.push('');
        handleTabChange(event, 0);
    }

    const handleCloseClick = (event) => {
        let tab = event.currentTarget.parentElement.parentElement.parentElement.tabIndex;
        let temp = fileTabs;
        temp.splice(tab, 1);
        setFileTabs(temp);
        handleTabChange(event, tab);
    };

    const useStyles = makeStyles((theme) => ({
        root_root: {
            width: '100%',
            height: '100%',
        },
        root: {
            display: 'inline-flex',
            width: '100%',
            height: '100%',
            backgroundColor: '#202124'
        },
        button: {
            width: 250,
            backgroundColor: '#B9BAA3'
        },
        button_group: {
            width: '100%',
            height: 42,
            paddingLeft: 'calc(50% - 250px)',
            backgroundColor: '#033F63'
        },
        editor: {
          width: '100%',
          height: '100%',
        },
        header: {
            height: 48,
            width: '100%',
            display: 'inline-flex',
            backgroundColor: '#202124'
        },
        folder: {
            height: 240,
            flexGrow: 1,
            maxWidth: 400,
            minWidth: 200,
            color: blueGrey[100],
            paddingLeft: 10,
            paddingTop: 10,
            paddingRight: 10,
        },
        folderFile: {
            color: '#cfd8dc'
        },
        monacoDiv: {
            width: '100%',
            height: 'calc(100% - 100px)',
        },
        tabsTypo: {
            textTransform: 'lowercase',
        },
        treeItem: {
            display: 'inline-flex'
        },
        tabs: {
            display: 'inline'
        },
        tabpanel: {
            height: '100%',
            backgroundColor: '#202124',
        },
        scrollButtons: {
            color: blueGrey[100],
            width: 30,
        },
        progress: {
            width: '100%',
            height: '100%',
            padding: '15% 20%',
          },
      }));

    const styles = useStyles();

    const handleTabChange = (event, newValue) => {
        if(value == newValue) {
            setValue(-1);
            return;
        }
        setValue(newValue);
    };

    const handleFolderOpen = () => {
        setChecked((prev) => !prev);
      };

    const handleRunButton = (event) => {
        if (treeFiles.length > 0) {
            loadResults(false);
            let submitArr = [];
            let ext = treeFiles[0].split('.').pop();
            let lang = determineLang(ext);
            let url = window.location.pathname;
            let id = url.split('/').pop();
            treeFiles.map((file) => {
                let fileName = `${id}_${file}`;
                let fileContent = sessionStorage.getItem(fileName);
                submitArr.push({name: file, content: fileContent});
            })
            let postObj = {language: lang, files: submitArr};
            axios.post(`http://localhost:8080/question/execute/${id}`, postObj, {headers: {"Authorization" : `Bearer ${props.token}`}}).
            then((response => {
                enqueueSnackbar('Success!', {variant: 'success'});
                let promise =  new Promise(resolve => {
                    resolve(setResults(response.data));
                });
                promise.then(() => {
                    loadResults(true)
                });
            }))
        }
        else {
            enqueueSnackbar('No files to run!', {variant: 'error'});
        }
    }

    const handleSubmitButton = (event) => {
        if (treeFiles.length > 0) {
            loadResults(false);
            let submitArr = [];
            let ext = treeFiles[0].split('.').pop();
            let lang = determineLang(ext);
            let url = window.location.pathname;
            let id = url.split('/').pop();
            treeFiles.map((file) => {
                let fileName = `${id}_${file}`;
                let fileContent = sessionStorage.getItem(fileName);
                submitArr.push({name: file, content: fileContent});
            })
            let postObj = {language: lang, files: submitArr, comment: ''};
            axios.post(`http://localhost:8080/submission/create/${id}`, postObj, {headers: {"Authorization" : `Bearer ${props.token}`}}).
            then((response => {
                enqueueSnackbar('Success!', {variant: 'success'});
                let promise =  new Promise(resolve => {
                    resolve(setResults(response.data));
                });
                promise.then(() => {
                    loadResults(true)
                });
            }))
        }
        else {
            enqueueSnackbar('No files to submit!', {variant: 'error'});
        }
    }

    function TreeFile(props) {
        const {children, index, name,  ...other} = props;

        const [treeFileName, setTreeFileName] = React.useState(name);
        const [isDisabled, setDisabled] = React.useState(false);

        useEffect(() => {
            if(treeFileName) {
                setDisabled(true);
            }
        }, [])
        const handleFileDeleteClick = (event) => {
            event.preventDefault();
            let temp = treeFiles;
            temp.splice(index, 1);
            sessionStorage.setItem(index, '');
            setTreeFiles(temp);
            handleTabChange(event, 0);
        }

        const handleFolderClick = (event) => {
            event.preventDefault();
            if(treeFileName) {
                let index = fileTabs.indexOf(treeFileName);
                if(index < 0) {
                    fileTabs.push(treeFileName);
                }
                handleTabChange(event, index);
            }
        }

        const handleFileChange = (event) => {
            event.preventDefault();
            let newVal = event.currentTarget.value;
            setTreeFileName(newVal);
        }

        const handleFileNameChange = (event) => {
            treeFiles[index] = treeFileName;
            sessionStorage.setItem(index, treeFileName);
        }

        return (
            <TreeItem nodeId={index + 2} onLabelClick={handleFolderClick} onIconClick={handleFileDeleteClick} label={
                <div className={styles.treeItem}>
                    <Input 
                    placeholder='fileName.lang' 
                    disableUnderline
                    margin='dense'
                    required={true}
                    fullWidth={true}
                    onBlur={handleFileNameChange}
                    onChange={handleFileChange}
                    value={treeFileName}
                    classes={{root: styles.folderFile, disabled: styles.folderFile}}
                    disabled={isDisabled}
                    id={index}
                    inputProps={{
                        autoComplete: 'off',
                        }}
                    />
                </div>
                }
                icon={
                <IconButton
                    size='small'
                    edge='end'
                >
                    <CloseIcon  style={{ color: blueGrey[100] }}/>
                </IconButton>
                }
            />
        )
    }

    function TabPanel(props) {
        const { children, value, index, language, ...other } = props;

        function handleEditorDidMount(_, editor) {
            editorRef.current = editor;
            listenEditorChanges();
            
        }
    
        function listenEditorChanges() {
            editorRef.current.onDidChangeModelContent(ev => {
                sessionStorage.setItem(props.sessionId, editorRef.current.getValue());
            });
        }

        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
            className={styles.tabpanel}
          >
            {value === index && (
                <Editor
                    value={sessionStorage.getItem(props.sessionId)}
                    theme='dark'
                    language={language}
                    editorDidMount={handleEditorDidMount}
                    width='100%'
                    height='100%'
                    loading=''
                    options={{
                            "acceptSuggestionOnCommitCharacter": true,
                            "acceptSuggestionOnEnter": "on",
                            "accessibilitySupport": "auto",
                            "autoIndent": false,
                            "automaticLayout": true,
                            "codeLens": true,
                            "colorDecorators": true,
                            "contextmenu": true,
                            "cursorBlinking": "blink",
                            "cursorSmoothCaretAnimation": false,
                            "cursorStyle": "line",
                            "disableLayerHinting": false,
                            "disableMonospaceOptimizations": false,
                            "dragAndDrop": false,
                            "extraEditorClassName": "true",
                            "fixedOverflowWidgets": false,
                            "folding": true,
                            "foldingStrategy": "auto",
                            "fontLigatures": false,
                            "formatOnPaste": false,
                            "formatOnType": false,
                            "hideCursorInOverviewRuler": false,
                            "highlightActiveIndentGuide": true,
                            "links": true,
                            "mouseWheelZoom": false,
                            "multiCursorMergeOverlapping": true,
                            "multiCursorModifier": "alt",
                            "overviewRulerBorder": true,
                            "overviewRulerLanes": 2,
                            "quickSuggestions": true,
                            "quickSuggestionsDelay": 100,
                            "readOnly": props.readOnly,
                            "renderControlCharacters": false,
                            "renderFinalNewline": true,
                            "renderIndentGuides": true,
                            "renderLineHighlight": "all",
                            "renderWhitespace": "none",
                            "revealHorizontalRightPadding": 30,
                            "roundedSelection": true,
                            "rulers": [],
                            "scrollBeyondLastColumn": 5,
                            "scrollBeyondLastLine": true,
                            "selectOnLineNumbers": true,
                            "selectionClipboard": true,
                            "selectionHighlight": true,
                            "showFoldingControls": "mouseover",
                            "smoothScrolling": false,
                            "suggestOnTriggerCharacters": true,
                            "wordBasedSuggestions": true,
                            "wordSeparators": "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
                            "wordWrap": "off",
                            "wordWrapBreakAfterCharacters": "\t})]?|&,;",
                            "wordWrapBreakBeforeCharacters": "{([+",
                            "wordWrapBreakObtrusiveCharacters": ".",
                            "wordWrapColumn": 80,
                            "wordWrapMinified": true,
                            "wrappingIndent": "none"
                            }}
                />
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
      };
    
    const [checked, setChecked] = React.useState(true);
    
    return (
        <div className={styles.root_root}>
            <SplitPane split='vertical' onChange={handleChange}>

                <Pane initialSize={sessionStorage.getItem('splitPos').split(',')[0]}>
                    {isQuestionLoaded ? 
                        (<ProblemArea question={question} loaded={isQuestionLoaded}/>)
                        :
                        (<div className={styles.progress}><CircularProgress/></div>)
                    }
                </Pane>
                
                <Pane minSize="10%" initialSize={sessionStorage.getItem('splitPos').split(',')[1]}>
                    <div className={styles.root}>
                        {checked && 
                        <div>
                        <TreeView
                            className={styles.folder}
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            expanded={['1']}
                        >
                            <TreeItem nodeId="1" label="files">
                            {treeFiles.map((file, index) => {
                                return <TreeFile index={index} name={file} />
                            })}
                        </TreeItem>
                        </TreeView>
                        </div>
                        }
                        <div className={styles.editor}>
                            <div className={styles.header}>
                                {checked && 
                                <IconButton onClick={handleAddClick}>
                                    <AddIcon style={{ color: blueGrey[100]}}/>
                                </IconButton>}
                                <IconButton onClick={handleFolderOpen} style={{paddingRight: 0 }}>
                                    <FolderOutlinedIcon style={{ color: blueGrey[100]}} />
                                </IconButton>
                                <Tabs
                                    value={value}
                                    onChange={handleTabChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="scrollable"
                                    scrollButtons="on"
                                    classes={{scrollButtons: styles.scrollButtons}}
                                >
                                    {fileTabs.map((name, index) => {
                                        return(
                                            <Tab
                                                tabIndex={index}
                                                label={
                                                    <div className={styles.tabs}>
                                                        <Typography
                                                            component='span'
                                                            variant='body2'
                                                            className={styles.tabsTypo}
                                                            style={{ color: blueGrey[100] }}
                                                        >
                                                            {name}
                                                        </Typography>
                                                        <IconButton
                                                            size='small'
                                                            edge='end'
                                                            onClick={handleCloseClick}
                                                        >
                                                            <CloseIcon  style={{ color: blueGrey[100] }}/>
                                                        </IconButton>
                                                    </div>
                                                }
                                            />
                                        );
                                    })}
                                </Tabs>
                            </div>
                            <div className={styles.monacoDiv}>
                            {fileTabs.map((name, index) => {
                                    let ext = name.split('.').pop();
                                    return(
                                        <TabPanel 
                                            value={value} 
                                            index={index} 
                                            sessionId={createId(name)} 
                                            readOnly={props.readOnly} 
                                            language={determineEditorLang(ext)}
                                        />
                                    );
                                })}
                            </div>
                        </div> 
                    </div>               
                </Pane>

                <Pane initialSize={sessionStorage.getItem('splitPos').split(',')[2]}>
                    {loadedResults ? 
                        (<OutputArea result={results}/>)
                        :
                        (<div className={styles.progress}><CircularProgress/></div>)
                    }
                </Pane>
                
            </SplitPane>
            <div className={styles.button_group}>
                <ButtonGroup variant="contained" size="large">
                    <Button className={styles.button} onClick={handleRunButton}>Run</Button>
                    <Button className={styles.button} onClick={handleSubmitButton}>Submit</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}