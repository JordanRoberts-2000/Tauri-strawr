import { useRef, useState, useEffect, useContext } from 'react'
import Folder from './Folder'
import OptionsBar from '../OptionsBar'
import { DatabaseContext } from '../../../../utils/providers/DatabaseProvider'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import FolderContextMenu from './FolderContextMenu'

type Folders = {
    folder_id: number,
    title: string,
    within_folder_id: number
    isFolder: boolean 
}

const Notes = () => {
    let location = useLocation();
    const db = useContext(DatabaseContext)
    let listOfFoldersRef = useRef<HTMLUListElement>(null)
    let contextMenuRef = useRef<HTMLDivElement>(null)
    const [editFolderId, setEditFolderId] = useState<number | null>(null)
    const [activeList, setActiveList] = useState<boolean[]>([])
    const databaseSetup = async () => {
        let homeFolderId = 1
        let lastSegment = location.pathname.split('/').pop()
        switch(lastSegment){
            case "notes":
                homeFolderId = 1;
                break
            case "components":
                homeFolderId = 31
                break
            case "templates":
                homeFolderId = 83
                break
            case "bookmarks":
                homeFolderId = 84
                break
        }
        let folders:Folders[] = await db.select(`SELECT * FROM folders WHERE within_folder_id = ${homeFolderId}`)
        folders.sort((a,b) => (+b.isFolder) - (+a.isFolder) || a.title.localeCompare(b.title))
        setActiveList(folders.map(() => {return false}))
        return folders
    }
    const { data, isLoading, isError } = useQuery(["folders", location.pathname, 1], databaseSetup)
    if(isLoading)return(
        <></>
    )
    if(isError)return(
        <>error happened</>
    )
    return (
        <>
            <ul ref={listOfFoldersRef} className='text-white mt-2 flex flex-1 customScroll pr-8 overflow-y-auto min-h-0 flex-col gap-1 border-t border-gray-600 pt-2 relative'>
                <OptionsBar/>
                {data.map(({folder_id, title, isFolder}, i) => (
                    <Folder key={folder_id} title={title} file={!isFolder} id={folder_id} embedCounter={0} editFolderId={editFolderId}
                            activeList={activeList} index={i} setActiveList={setActiveList} setEditFolderId={setEditFolderId} contextMenuRef={contextMenuRef}/>
                ))}
            </ul>
            <FolderContextMenu editFolderId={editFolderId} ref={contextMenuRef}/>
        </>
    )
}

export default Notes