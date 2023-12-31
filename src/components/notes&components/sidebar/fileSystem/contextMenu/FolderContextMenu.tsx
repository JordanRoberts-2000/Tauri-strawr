import { HTMLAttributes, forwardRef, useContext } from "react"
import { DatabaseContext } from "../../../../../utils/providers/DatabaseProvider"

type Props = HTMLAttributes<HTMLDivElement> & {
    editFolderId: number | null
}

const FolderContextMenu = forwardRef<HTMLDivElement, Props>(({editFolderId}, ref) => {
    const db = useContext(DatabaseContext)
    const deleteFolder = (folderId: number | null) => {
        // are you sure????
        // db.execute(`delete from folders where folder_id = ${folderId};`)
    }
    const customRC = (e: any) => {
        // e.preventDefault()
        // setEditFolderId(id)
        // contextMenuRef.current!.style.left = `${e.clientX}px`
        // contextMenuRef.current!.style.top = `${e.clientY}px`
        // const cancelRC = () => {
        //     setEditFolderId(null)
        //     document.removeEventListener("click", cancelRC)
        // }
        // document.addEventListener("click", cancelRC)
    }
    return (
        <div ref={ref} className={`fixed z-50 px-1 bg-blue-500 ${!editFolderId && "pointer-events-none opacity-0"}`}>
            <ul className="flex flex-col gap-1 text-sm">
                <li>Rename</li>
                <li><button onClick={() => deleteFolder(editFolderId)}>Delete</button></li>
            </ul>
        </div>
    )
})

export default FolderContextMenu