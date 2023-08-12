import { useEffect, useState, useRef, useContext, FormEvent, MouseEvent } from "react"
import { DatabaseContext } from "../../../../utils/providers/DatabaseProvider"
import CodeSnippet from '../../../../utils/components/codeSnippet/CodeSnippet'
import { useQuery } from "@tanstack/react-query"
import TextSnippet from "./TextSnippet"
import TabContentSection from "./TabContentSection"
import TabTopBar from "./TabTopBar"

type NoteData = {
    noteData_id: number, 
    noteText: null | string,
    fk_folder_id: number,
    snippet: null | "javascript" | "sql" | "typescript"
}

type Props = {
    index: number,
    tabId: number,
    handleContextMenu: (e:any, noteId:number) => void
}

const Tab = ({index, tabId, handleContextMenu}: Props) => {
    console.log(tabId, "tabId")
    const db = useContext(DatabaseContext)
    const { data, isLoading, isError } = useQuery({
        queryKey: ["tabData", tabId],
        queryFn: async () => await db.select(`select * from notedata where fk_folder_id = ${tabId}`)
    })
    if(isLoading)return(
        <div>Loading</div>
    )
    if(isError)return(
        <div>Error finding content</div>
    )
    return (
        <div className={"flex-1 min-h-0 min-w-0 overflow-x-hidden border-l-2 border-gray-500 flex flex-col mt-2"}>
            <TabTopBar tabId={tabId}/>
            <div className="customScroll flex-1 min-h-0 overflow-y-auto pt-2 pb-20">
                {data.map((el:NoteData) => (
                    <TabContentSection key={el.noteData_id} el={el} handleContextMenu={handleContextMenu}/>
                ))}
                {data.length === 0 && <div>Couldnt find in database</div>}
            </div>
        </div>
    )
}

export default Tab