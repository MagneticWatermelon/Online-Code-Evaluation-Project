import React , { useRef }from 'react';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane'
import ProblemArea from '../ProblemArea/ProblemArea';
import OutputArea from '../OutputArea/OutputArea';
import './SandBox.css';
import Editor from '@monaco-editor/react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, IconButton, Grow, Typography, Collapse} from '@material-ui/core';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import CloseIcon from '@material-ui/icons/Close';
import { blueGrey } from '@material-ui/core/colors';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';


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

    const [value, setValue] = React.useState(0);

    const editorRef = useRef();

    const handleChange = (event) => {
        sessionStorage.setItem('splitPos', event);
        debounce(editorRef.current.layout(), 300);
    };

    function handleEditorDidMount(_, editor) {
        editorRef.current = editor;
        listenEditorChanges();
        
    }

    function listenEditorChanges() {
        editorRef.current.onDidChangeModelContent(ev => {
            sessionStorage.setItem(props.sessionId, editorRef.current.getValue());
        });
    }

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
            color: blueGrey[100],
            paddingLeft: 10,
            paddingTop: 10,
            paddingRight: 10,
        },
        monacoDiv: {
            width: '100%',
            height: 'calc(100% - 100px)',
        },
        tabsTypo: {
            textTransform: 'lowercase',
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
        setValue(newValue);
    };

    const handleFolderOpen = () => {
        setChecked((prev) => !prev);
      };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

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
    
    const [checked, setChecked] = React.useState(false);
    
    const arr = ['main.java','test.java', 'example.js', 'index.java'];
    
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
                    >
                        <TreeItem nodeId="1" label="Applications">
                            <TreeItem nodeId="2" label="Calendar" />
                            <TreeItem nodeId="3" label="Chrome" />
                            <TreeItem nodeId="4" label="Webstorm" />
                        </TreeItem>
                        <TreeItem nodeId="5" label="Documents">
                            <TreeItem nodeId="10" label="OSS" />
                            <TreeItem nodeId="6" label="Material-UI">
                            <TreeItem nodeId="7" label="src">
                                <TreeItem nodeId="8" label="index.js" />
                                <TreeItem nodeId="9" label="tree-view.js" />
                            </TreeItem>
                            </TreeItem>
                        </TreeItem>
                    </TreeView>
                    </div>
                    }
                    <div className={styles.editor}>
                        <div className={styles.header}>
                            <IconButton onClick={handleFolderOpen} style={{paddingRight: 0 }}>
                                <FolderOutlinedIcon style={{ color: blueGrey[100]}} />
                            </IconButton>
                            <Tabs
                                value={value}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                                classes={{scrollButtons: styles.scrollButtons}}
                            >
                                {arr.map((name) => {
                                    return(
                                        <Tab
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
                            <TabPanel value={value} index={0} sessionId={props.sessionId + 0}/>
                            <TabPanel value={value} index={1} sessionId={props.sessionId + 1}/>
                            <TabPanel value={value} index={2} sessionId={props.sessionId + 2}/>
                            <TabPanel value={value} index={3} sessionId={props.sessionId + 3}/>
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