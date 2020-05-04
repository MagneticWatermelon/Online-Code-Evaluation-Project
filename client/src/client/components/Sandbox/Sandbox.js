import React from 'react';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane'
import ProblemArea from '../ProblemArea/ProblemArea';
import CodeArea from '../CodeArea/CodeArea';
import OutputArea from '../OutputArea/OutputArea';
import './SandBox.css'


export default function Sandbox(props) {
    return (
        <SplitPane split='vertical'>
            <ProblemArea />
            <Pane minSize="10%" maxSize="33%">
                <CodeArea sessionId={props.id}/>
            </Pane>
            <OutputArea />
        </SplitPane>
    );
}