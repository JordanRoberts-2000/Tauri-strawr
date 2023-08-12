import React, { useContext, useRef } from 'react'
import TextSnippet from './TextSnippet'
import CodeSnippet from '../../../../utils/components/codeSnippet/CodeSnippet'
import { DatabaseContext } from '../../../../utils/providers/DatabaseProvider'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getHighlightedText } from '../../../../utils/textEditing/textEditing'

type NoteData = {
    noteData_id: number, 
    noteText: null | string,
    fk_folder_id: number,
    snippet: null | "javascript" | "sql" | "typescript" | "css"
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
    el: NoteData,
    handleContextMenu: (e:any, noteId:number) => void
}

const TabContentSection = ({el, handleContextMenu}: Props) => {
    let caretpositon = useRef<any>(null)
    const queryClient = useQueryClient()
    queryClient.setQueryData(["snippetData", el.noteData_id], el.noteText)
    const {data, isLoading, isError} = useQuery({
        queryKey: ["snippetData", el.noteData_id],
        queryFn: async () => await db.select(`select * from notedata where noteData_id = ${el.noteData_id}`)
    })
    const db = useContext(DatabaseContext)
    const handleKeyDown = async (e: any, id:number, snippet?:string) => {
        if (e.ctrlKey && e.key === 's') {
            // Save
            e.preventDefault();
            if(snippet){
                let success = await db.execute(`UPDATE notedata SET noteText = (?) WHERE noteData_id = ${id};`,[e.target.innerText]);
                console.log(success)
            }else{
                let success = await db.execute(`UPDATE notedata SET noteText = (?) WHERE noteData_id = ${id};`,[e.target.innerHTML.replaceAll("&lt;","<",).replaceAll("&gt;",">",)]);
                console.log(success);
            }
        }else if(e.keyCode === 13){
            e.preventDefault()
            if (window.getSelection) {
                var selection = window.getSelection();
                var range = selection!.getRangeAt(0);
                var br = document.createElement("br");
                var zwsp = document.createTextNode("\u200B");
                var textNodeParent = document.getSelection()!.anchorNode!.parentNode;
                var inSpan = textNodeParent!.nodeName == "SPAN";
                var span = document.createElement("span");
                
                // if the carat is inside a <span>, move it out of the <span> tag
                if (inSpan) {
                  range.setStartAfter(textNodeParent!);
                  range.setEndAfter(textNodeParent!);
                }
          
                // insert the <br>
                range.deleteContents();
                range.insertNode(br);
                range.setStartAfter(br);
                range.setEndAfter(br);
                
                // create a new span on the next line
                if (inSpan) {
                  range.insertNode(span);
                  range.setStart(span, 0);
                  range.setEnd(span, 0);
                }
          
                // add a zero-width character
                range.insertNode(zwsp);
                range.setStartBefore(zwsp);
                range.setEndBefore(zwsp);
                
                // insert the new range
                selection!.removeAllRanges();
                selection!.addRange(range);
                return false;
              }
        }
    }
    return (
        (!el.snippet ? 
            <TextSnippet key={el.noteData_id} snippetText={data || ""} 
                onContextMenu={(e) => handleContextMenu(e, el.fk_folder_id)} 
                onKeyDown={(e) => handleKeyDown(e, el.noteData_id)}/>
        : 
            <CodeSnippet key={el.noteData_id} codeSnippetText={data || ""} codeSnippetLanguage={el.snippet} minimal={true}
                onContextMenu={(e) => handleContextMenu(e, el.fk_folder_id)} 
                onKeyDown={(e) => handleKeyDown(e, el.noteData_id, el.snippet!)}/>
        )
    )
    // return (
    //     (!el.snippet ? 
    //         <TextSnippet key={el.noteData_id} snippetText={el.noteText || ""} 
    //             onContextMenu={(e) => handleContextMenu(e, el.fk_folder_id)} 
    //             onKeyDown={(e) => handleSave(e, el.noteData_id)}/>
    //     : 
    //         <CodeSnippet key={el.noteData_id} codeSnippetText={el.noteText || ""} codeSnippetLanguage={el.snippet}
    //             onContextMenu={(e) => handleContextMenu(e, el.fk_folder_id)} 
    //             onKeyDown={(e) => handleSave(e, el.noteData_id)}/>
    //     )
    // )
}

export default TabContentSection
