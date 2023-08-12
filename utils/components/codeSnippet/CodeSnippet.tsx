import { javascript } from "@codemirror/lang-javascript";
import { sql } from "@codemirror/lang-sql";
import { css } from "@codemirror/lang-css";
// import { Compartment, EditorState } from "@codemirror/state";
// import { EditorView, basicSetup } from "codemirror";
// import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { basicSetup, minimalSetup, EditorView } from 'codemirror'
import { useEffect, useRef } from "react";
import { oneDarkTheme } from "./CodeSnippetTheme";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    children?: never,
    codeSnippetText: string,
    codeSnippetLanguage: "javascript" | "sql" | "typescript" | "css",
    minimal?: boolean
}

const CodeSnippet = ({codeSnippetText, codeSnippetLanguage, minimal, ...rest}: Props) => {
    const editorRef = useRef<HTMLDivElement>(null)
    let selectedLanguage = javascript()
    switch(codeSnippetLanguage){
        case "sql":
            selectedLanguage = sql()
            break
        case "typescript":
            selectedLanguage = javascript({typescript: true})
            break
        case "css":
            selectedLanguage = css()
            break
    }
    // let language = new Compartment, tabSize = new Compartment
    // let state = EditorState.create({
    //     extensions: [
    //       basicSetup,
    //       sql(),
    //     //   tabSize.of(EditorState.tabSize.of(8)),
    //     //   oneDarkTheme
    //     ],
    //     doc: codeSnippetText
    //   })
    useEffect(() => {
        if(editorRef.current === null)return
        // const view = new EditorView({
        //     state,
        //     parent: editorRef.current
        // })
        const view = new EditorView({
            doc: codeSnippetText,
            extensions: [
                (minimal ? minimalSetup : basicSetup),
                selectedLanguage,
                oneDarkTheme
            ],
            parent: editorRef.current,
          })
        return () => view.destroy()
    },[editorRef.current])
    return (
        <div className="px-2" ref={editorRef} {...rest}/>
    )
}

export default CodeSnippet