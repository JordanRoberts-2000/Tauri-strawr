import React, { SetStateAction } from 'react'
import FileItem from './FileItem'

type Folders = {
    folder_id: number,
    title: string,
    within_folder_id: number
    isFolder: boolean,
}

type Props = {
    data: Folders[],
    embedCounter: number,
    editFolderId: number | null,
    setEditFolderId: React.Dispatch<SetStateAction<number | null>>,
    parentOpen: boolean
}

const EmbeddedFiles = ({ data, embedCounter, editFolderId, setEditFolderId, parentOpen }: Props) => {
    return (
        <>
            <ul className={`mt-2 flex-col gap-1 flex`}>
                {data.map((el, i) => (
                    <FileItem key={el.folder_id} title={el.title} fileId={el.folder_id} isFile={!el.isFolder} embedCounter={embedCounter + 1} editFolderId={editFolderId}
                        parentOpen={parentOpen} lastItem={i === data.length - 1} setEditFolderId={setEditFolderId} />
                ))}
            </ul>
        </>
    )
}

export default EmbeddedFiles