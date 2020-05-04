import React from 'react';
import Editor from '@monaco-editor/react';


export default function CodeArea() {

    return (
        <Editor 
            theme='dark'
            language='java'
        />
    );
}