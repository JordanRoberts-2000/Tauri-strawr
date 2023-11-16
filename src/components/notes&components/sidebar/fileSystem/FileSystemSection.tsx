import { useRef, useState, useEffect, useContext } from 'react'
import FileItem from './fileItem/FileItem'
import OptionsBar from '../../../../components&Notes/sidebar/OptionsBar'
import { DatabaseContext } from '../../../../utils/providers/DatabaseProvider'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import FolderContextMenu from './contextMenu/FolderContextMenu'

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
    let homeFolderId = useRef(1)
    let contextMenuRef = useRef<HTMLDivElement>(null)
    const [editFolderId, setEditFolderId] = useState<number | null>(null)
    const [activeList, setActiveList] = useState<boolean[]>([])
    const databaseSetup = async () => {
        homeFolderId.current = 1
        let lastSegment = location.pathname.split('/').pop()
        switch(lastSegment){
            case "notes":
                homeFolderId.current = 1;
                break
            case "components":
                homeFolderId.current = 31
                break
            case "templates":
                homeFolderId.current = 83
                break
            case "bookmarks":
                homeFolderId.current = 84
                break
        }
        let folders:Folders[] = await db.select(`SELECT * FROM folders WHERE within_folder_id = ${homeFolderId.current}`)
        folders.sort((a,b) => (+b.isFolder) - (+a.isFolder) || a.title.localeCompare(b.title))
        setActiveList(folders.map(() => {return false}))
        return folders
    }
    const { data, isLoading, isError } = useQuery(["folders", location.pathname, homeFolderId.current], databaseSetup)
    if(isLoading)return(
        <>loading</>
    )
    if(isError)return(
        <>error happened</>
    )
    return (
        <>
            <ul ref={listOfFoldersRef} className='text-[--primary-text-color] flex flex-1 flex-col gap-1 relative'>
                {data.map(({folder_id, title, isFolder}) => (
                    <FileItem key={folder_id} title={title} isFile={!isFolder} fileId={folder_id} embedCounter={0} editFolderId={editFolderId}
                        setEditFolderId={setEditFolderId} parentOpen={true}/>
                ))}
            </ul>
            <FolderContextMenu editFolderId={editFolderId} ref={contextMenuRef}/>
        </>
    )
}

export default Notes