import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

export default function CodeArea() {

    const[value, setValue] = React.useState(`class Example {
    public static main() {
        System.out.println("Hello World");
    }
}
`);

    const handleChange = (newValue) => {
        console.log(newValue);
        setValue(newValue);
    }

    return (
        <AceEditor 
            mode="java"
            theme="github"
            onChange={handleChange}
            name="UNIQUE_ID_OF_DIV"
            value={value}
            editorProps={{ $blockScrolling: true }}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            width='450px'
            height="600px"
            placeholder='Enter your code here'
            fontSize={16}
        />
    );
}