import React , { useRef}from 'react';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane'
import ProblemArea from '../ProblemArea/ProblemArea';
import OutputArea from '../OutputArea/OutputArea';
import './SandBox.css';
import Editor from '@monaco-editor/react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, IconButton} from '@material-ui/core';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import FolderIcon from '@material-ui/icons/Folder';
import Grow from '@material-ui/core/Grow';




export default function Sandbox(props) {

    const [value, setValue] = React.useState(0);

    

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          height: '100%',
        },
        header: {
            height: 54,
            width: '100%',
            display: 'inline-flex',
        },
        tabpanel: {
            height: '100%',
        },
      }));

    

    const styles = useStyles();
    
    const handleChange = (event) => {
        
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        const editorRef = useRef();

        function handleEditorDidMount(_, editor) {
            editorRef.current = editor;
            listenEditorChanges();
            
        }
    
        function listenEditorChanges() {
            editorRef.current.onDidChangeModelContent(ev => {
                console.log(children);
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

    return (
        <SplitPane split='vertical' onChange={handleChange}>
            <ProblemArea />
            <Pane minSize="10%">
                <div className={styles.root}>
                    <div className={styles.header}>
                        <IconButton>
                            <FolderIcon  />
                        </IconButton>
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons='auto'
                        >
                            <Tab
                                label="test1"
                            />
                            <Tab
                                label="test2"
                            />
                            <Tab
                                label="test3"
                            />
                            <Tab
                                label="test4"
                            />
                        </Tabs>
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <TabPanel value={value} index={0} sessionId={props.sessionId + 0}/>
                    <TabPanel value={value} index={1} sessionId={props.sessionId + 1}/>
                    <TabPanel value={value} index={2} sessionId={props.sessionId + 2}/>
                    <TabPanel value={value} index={3} sessionId={props.sessionId + 3}/>
                </div>                
            </Pane>
            <OutputArea />
        </SplitPane>
    );
}