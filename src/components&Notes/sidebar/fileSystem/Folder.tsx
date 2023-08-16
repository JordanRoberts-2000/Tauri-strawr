import { Dispatch, SetStateAction, useEffect, useRef, useState, useContext } from 'react'
import { useStore } from '../../../../store'
import { DatabaseContext } from '../../../../utils/providers/DatabaseProvider'
import { useQuery } from '@tanstack/react-query'
import FolderContextMenu from './FolderContextMenu'

type Props = {
    title: String
    id: number,
    embedCounter: number,
    setActiveList: any,
    file: boolean,
    activeList: boolean[],
    lastItem?: boolean,
    index: number,
    setEditFolderId: Dispatch<number | null>,
    contextMenuRef: any,
    editFolderId: number | null
}

type Folders = {
    folder_id: number,
    title: string,
    within_folder_id: number
    isFolder: boolean 
}

const Folder = ({ title, id, embedCounter, file, activeList, setActiveList, index, lastItem, setEditFolderId, contextMenuRef, editFolderId}: Props) => {
    const { selectedId, tabs } = useStore()
    const db = useContext(DatabaseContext)
    const [embeddedData, setEmbeddedData] = useState<null | any[]>(null)
    let [activeChildrenList, setActiveChildrenList] = useState<boolean[]>(embeddedData ? embeddedData.map(() => {return false}) : [])
    const customRC = (e: any) => {
        e.preventDefault()
        setEditFolderId(id)
        contextMenuRef.current!.style.left = `${e.clientX}px`
        contextMenuRef.current!.style.top = `${e.clientY}px`
        const cancelRC = () => {
            setEditFolderId(null)
            document.removeEventListener("click", cancelRC)
        }
        document.addEventListener("click", cancelRC)
    }
    const handleChangeState = () => {
        let homeId = 0
        if(activeList[index]){
            useStore.setState(() => ({selectedId: homeId}))
            if(file){
                let temp = [...tabs]
                if(temp.includes(id!)){
                    temp = temp.filter((item) => {
                        return item !== id
                    })
                    useStore.setState(() => ({tabs: temp}))
                }
            }
        }else{
            useStore.setState(() => ({selectedId: id}))
            if(file){
                let temp = [...tabs]
                if(!temp.includes(id)){
                    temp.push(id)
                }
                useStore.setState(() => ({tabs: temp}))
            }
        }
        let tempList = [...activeList]
        if(tempList[index])setActiveChildrenList(embeddedData ? embeddedData.map(() => {return false}) : [])
        tempList[index] = !tempList[index]
        setActiveList(tempList)
    }
    const getEmbedded = async () => {
        let folders: Folders[] = await db.select(`SELECT * FROM folders WHERE within_folder_id = ${id}`)
        if(folders.length !== 0)setEmbeddedData(folders)
        folders.sort((a,b) => (+b.isFolder) - (+a.isFolder) || a.title.localeCompare(b.title))
        return folders
    }
    const { data, isLoading, isError } = useQuery(["folders", location.pathname, id], getEmbedded)
    return (
        <li className={`flex flex-col relative ${embedCounter === 1 && "ml-2"} ${embedCounter > 1 && "ml-[2.25rem]"}`}>
            {/* Left Bar on first set of folders/files */}
             {embedCounter === 0 ?
                    <div className='bg-blue-500 h-5 w-[2px] absolute top-0 left-0'></div>
                :
                (!lastItem ?
                        <div className='bg-white ml-2 h-[calc(100%+.25rem)] w-[2px] absolute top-0 left-0'></div>
                    :
                        <div className='bg-white ml-2 h-[10px] w-[2px] absolute top-0 left-0'></div>
                )
            }
            <div className={`flex items-center gap-4 ml-2 cursor-pointer group`} onClick={() => handleChangeState()}>
                {embedCounter !== 0 &&
                    <div className={`w-3 h-[1px] bg-white relative`}></div>
                }
                <div className={`flex flex-1 gap-2 items-center`}>
                    <div className='h-5 w-5 overflow-hidden flex items-center justify-center'>
                        {file ? 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={`${tabs.includes(id) ? "fill-blue-500" : "fill-white"} w-4 h-4 stroke-black`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            
                            :
                                (activeList[index] ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className={`w-5 h-5 ${selectedId === id ? "fill-blue-500" : "fill-white"}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                                    </svg>
                                    :
                                    <svg className={`h-[.9rem] fill-white`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>
                                )
                        }
                    </div>
                    <div className={`${(tabs.includes(id) && file) && "text-blue-500 select-none"} ${editFolderId === id && "text-blue-900"} text-xs whitespace-nowrap relative text-ellipsis max-w-[12ch]`} onContextMenu={(e) => customRC(e)}>
                        {title}
                    </div>
                </div>
            </div>
            {((data) && activeList[index]) &&
                <ul className={`mt-2 flex-col gap-1 ${activeList[index] ? "flex" : "hidden"}`}>
                    {data.map((el, i) => (
                        <Folder key={el.folder_id} title={el.title} id={el.folder_id} file={!el.isFolder} embedCounter={embedCounter + 1} editFolderId={editFolderId}
                                activeList={activeChildrenList} setActiveList={setActiveChildrenList} index={i} lastItem={i === data.length - 1} setEditFolderId={setEditFolderId} contextMenuRef={contextMenuRef}/>
                    ))}
                </ul>
            }
        </li>
    )
}

export default Folder