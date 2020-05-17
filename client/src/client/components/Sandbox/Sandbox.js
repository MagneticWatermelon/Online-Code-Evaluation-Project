import React , { useRef, useEffect }from 'react';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane'
import ProblemArea from '../ProblemArea/ProblemArea';
import OutputArea from '../OutputArea/OutputArea';
import './SandBox.css';
import Editor from '@monaco-editor/react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, IconButton, Typography, Input} from '@material-ui/core';
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



export default function Sandbox(props) {

    if(sessionStorage.getItem('splitPos') == null) {
        sessionStorage.setItem('splitPos', '25%,50%,25%');
    }
        
    const [value, setValue] = React.useState(0);
    const [treeFiles, setTreeFiles] = React.useState([]);
    const [fileTabs , setFileTabs] = React.useState([]);

    const editorRef = useRef();
    
    const handleChange = (event) => {
        sessionStorage.setItem('splitPos', event);
        debounce(editorRef.current.layout(), 300);
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
        root: {
            display: 'inline-flex',
            width: '100%',
            height: '100%',
            backgroundColor: '#202124'
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
        const { children, value, index, ...other } = props;

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
                    language='javascript'
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
                            "readOnly": false,
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
        <SplitPane split='vertical' onChange={handleChange}>

            <Pane initialSize={sessionStorage.getItem('splitPos').split(',')[0]}>
                <ProblemArea />
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
                                return(
                                    <TabPanel value={value} index={index} sessionId={name} />
                                );
                            })}
                        </div>
                    </div>
                </div>               
            </Pane>

            <Pane initialSize={sessionStorage.getItem('splitPos').split(',')[2]}>
                <OutputArea />
            </Pane>
            
        </SplitPane>
    );
}