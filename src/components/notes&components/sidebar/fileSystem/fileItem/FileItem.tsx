import { Dispatch, SetStateAction, useEffect, useRef, useState, useContext } from 'react'
import { useStore } from '../../../../../../store'
import { DatabaseContext } from '../../../../../utils/providers/DatabaseProvider'
import { useQuery } from '@tanstack/react-query'
import FirstFileHighlights from './FirstFileHighlights'
import ClickableFile from './ClickableFile'
import EmbeddedFiles from './EmbeddedFiles'

type Props = {
    title: string
    fileId: number,
    embedCounter: number,
    isFile: boolean,
    lastItem?: boolean,
    parentOpen: boolean,
    setEditFolderId: React.Dispatch<SetStateAction<number | null>>,
    editFolderId: number | null
}

type Folders = {
    folder_id: number,
    title: string,
    within_folder_id: number
    isFolder: boolean
}

const FileItem = ({ title, fileId, embedCounter, isFile, lastItem, setEditFolderId, editFolderId, parentOpen }: Props) => {
    const db = useContext(DatabaseContext)
    const getEmbeddedData = async () => {
        let folders: Folders[] = await db.select(`SELECT * FROM folders WHERE within_folder_id = ${fileId}`)
        folders.sort((a, b) => (+b.isFolder) - (+a.isFolder) || a.title.localeCompare(b.title))
        return folders
    }
    const [openFolder, setOpenFolder] = useState(false)
    useEffect(() => {
        if (!parentOpen) {
            setTimeout(() => {
                setOpenFolder(false)
            }, 500)
        }
    }, [parentOpen])
    const { data, isLoading, isError } = useQuery(["folders", location.pathname, fileId], getEmbeddedData)
    const closingAnimation = useRef(false)
    const handleClick = () => {
        if(data?.length === 0)console.log('folder is empty')
        if (closingAnimation.current) return
        closingAnimation.current = true
        setTimeout(() => {
            closingAnimation.current = false
        }, 500)
        setOpenFolder((prev) => !prev)
    }
    return (
        <li className={`flex flex-col relative ${embedCounter > 1 && "ml-[17px]"}`}>
            <FirstFileHighlights embedCounter={embedCounter} lastItem={lastItem} />
            <ClickableFile isLoading={isLoading} isError={isError} isFile={isFile} title={title} tempId={fileId}
                embedCounter={embedCounter} editFolderId={editFolderId} fileId={fileId} openFolder={openFolder} onClick={() => handleClick()} />
            {(data !== undefined && data.length !== 0 && !isFile) &&
                <div className={`${openFolder ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} grid transition-[grid-template-rows_cubic-bezier(0,.67,.89,-0.5)] duration-500`}>
                    <div className={`overflow-hidden row-span-2 ${openFolder ? "delay-200 duration-300 opacity-100 translate-x-[8px]" : "duration-300 opacity-0"}`}>
                        <EmbeddedFiles data={data!}
                            embedCounter={embedCounter} editFolderId={editFolderId}
                            setEditFolderId={setEditFolderId} parentOpen={openFolder} />
                    </div>
                </div>
            }
        </li>
    )
}

export default FileItem