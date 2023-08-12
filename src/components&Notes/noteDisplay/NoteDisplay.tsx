import { useContext, useRef, useState } from 'react'
import { useStore } from '../../../store'
import Tab from './Tabs/Tab'
import { DatabaseContext } from '../../../utils/providers/DatabaseProvider'
import HighlightedRcMenu from './HighlightedRcMenu'

const NoteDisplay = () => {
    const db = useContext(DatabaseContext)
    const { tabs } = useStore()
    const [rcActive, setRcActive] = useState(false)
    const [highlighted, setHighlighted] = useState(false)
    let tabId = useRef(0)
    let tabSection = useRef(null)
    let customRC = useRef<HTMLDivElement>(null)
    const handleContextMenu = (e: any, noteId: number) => {
        e.preventDefault()
        tabId.current = noteId
        tabSection.current = e.target
        if(!rcActive)setRcActive(true)
        customRC.current!.style.left = `${e.clientX}px`
        customRC.current!.style.top = `${e.clientY}px`
        console.log(e.clientX, e.clientY)
        const cancelRC = () => {
            setRcActive(false)
            setHighlighted(false)
            document.removeEventListener("click", cancelRC)
        }
        document.addEventListener("click", cancelRC)
        if (window.getSelection && window.getSelection()!.toString() !== "") {
            if(!highlighted)setHighlighted(true)
        }else{
            if(highlighted)setHighlighted(false)
        }
    }
    const addSection = async (isCode:boolean) => {
        console.log(tabId.current, "here")
        if(isCode){
            let success = await db.execute(`insert into notedata(fk_folder_id, snippet)
            values(${tabId.current}, "sql")`)
            console.log(success)
        }else{
            let success = await db.execute(`insert into notedata(fk_folder_id)
            values(${tabId.current})`)
            console.log(success)
        }
        // use id ref to add notedata with that id as forein key
        // need to add feild for order
    }
    return (
        <>
            <div className="flex flex-1">
                {tabs.map((el, index) => (
                    <Tab key={index} index={index} tabId={el} handleContextMenu={handleContextMenu}/>
                ))}
            </div>
             <div ref={customRC} className={`${!rcActive && "pointer-events-none opacity-0"} bg-blue-700 fixed left-[50%] top-[50%]`}>
                <ul className="flex flex-col gap-4">
                    {!highlighted ? 
                        <>
                            <li>Move up</li>
                            <li>Move down</li>
                            <li><button onClick={() => addSection(false)}>Add text section</button></li>
                            <li><button onClick={() => addSection(true)}>Add code section</button></li>
                            <li>Add image</li>
                            <li>Add whiteboard</li>
                        </>
                    :
                        <HighlightedRcMenu tabId={tabId.current} tabSection={tabSection.current}/>
                    }
                </ul>
            </div>
        </>
    )
}

export default NoteDisplay