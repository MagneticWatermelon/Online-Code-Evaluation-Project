import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';


export default function CodeArea(props) {
    const editorRef = useRef();

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
        <Editor
            value={sessionStorage.getItem(props.sessionId)}
            theme='dark'
            language='java'
            editorDidMount={handleEditorDidMount}
        />
    );
}