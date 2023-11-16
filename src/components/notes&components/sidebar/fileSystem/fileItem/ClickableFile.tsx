import { HTMLAttributes, useEffect } from 'react'
import { useStore } from '../../../../../../store'
import FileIcon from './FileIcon'
import FolderIcon from './FolderIcon'

type Props = HTMLAttributes<HTMLDivElement> & {
    fileId: number,
    isLoading: boolean,
    isError: boolean
    tempId: number,
    isFile: boolean,
    title: string,
    embedCounter: number,
    editFolderId: number | null,
    openFolder: boolean
}

const ClickableFile = ({ tempId, isFile, title, openFolder, embedCounter, editFolderId, fileId, ...rest }: Props) => {
    const { selectedId, tabs } = useStore()
    useEffect(() => {
        let homeId = 0
        if (!openFolder) {
            console.log(openFolder, title, tabs)
            useStore.setState(() => ({ selectedId: homeId }))
            if (isFile) {
                let temp = [...tabs]
                if (temp.includes(fileId!)) {
                    temp = temp.filter((item) => {
                        return item !== fileId
                    })
                    useStore.setState(() => ({ tabs: temp }))
                }
            }
        } else {
            useStore.setState(() => ({ selectedId: fileId }))
            if (isFile) {
                let temp = [...tabs]
                if (!temp.includes(fileId)) {
                    temp.push(fileId)
                }
                useStore.setState(() => ({ tabs: temp }))
            }
        }
    }, [openFolder])
    return (
        <div className={`flex items-center ml-2 gap-1 cursor-pointer group`} {...rest}>
            {embedCounter !== 0 &&
                <div className={`w-3 h-[1px] bg-[--secondary-color] relative`}></div>
            }
            <div className={`flex flex-1 gap-1 items-center`}>
                <div className='h-5 w-5 overflow-hidden flex items-center justify-center'>
                    {isFile ?
                        <FileIcon tabs={tabs} id={tempId} />
                        :
                        <FolderIcon selectedId={selectedId} id={tempId} open={false} />
                    }
                </div>
                <div className={`${(tabs.includes(tempId) && isFile) && "text-blue-500 select-none"} ${editFolderId === tempId && "text-blue-900"} text-xs whitespace-nowrap relative text-ellipsis max-w-[12ch]`}>
                    {title}
                </div>
            </div>
        </div>
    )
}

export default ClickableFile