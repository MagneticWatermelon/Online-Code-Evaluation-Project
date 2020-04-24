import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";


function onChange(newValue) {
    console.log("change", newValue);
  }

export default function CodeArea() {
    return (
        <AceEditor 
            mode="java"
            theme="github"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            width='450px'
            placeholder='Enter your code here'
            fontSize={16}
            defaultValue={`class Example {
    public static main() {
        System.out.println("Hello World");
    }
}
`}
        />
    );
}