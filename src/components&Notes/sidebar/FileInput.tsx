import React, { useContext, useRef } from 'react'
import { useStore } from '../../../store'
import { DatabaseContext } from '../../utils/providers/DatabaseProvider'
import { useLocation } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { v4 as uuidv4 } from "uuid";

const FileInput = () => {
    const db = useContext(DatabaseContext)
    let location = useLocation()
    const queryClient = useQueryClient()
    const { fileInputActive, fileInputFolder, selectedId } = useStore()
    let inputRef = useRef<HTMLInputElement>(null)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let addToId = selectedId
        if(selectedId === 0){
            switch(location.pathname){
                case "/root/storage/notes":
                    addToId = 1
                    break
                case "/root/storage/components":
                    addToId = 31
                    break
                case "/root/storage/templates":
                    addToId = 83
                    break
                case "/root/storage/bookmarks":
                    addToId = 84
                    break
            }
        }
        let success = await db.execute(`insert into folders(title, within_folder_id, isFolder)
            values("${inputRef.current!.value}", ${addToId}, ${fileInputFolder})`)
        console.log(success.lastInsertId)
        if(!fileInputFolder){
            let newData = await db.execute(`insert into notedata(fk_folder_id) values(${success.lastInsertId})`)
            console.log(newData)
        }
    }
    const mutateFolders = useMutation({
        onMutate: async (variables) => {
            console.log(selectedId)
            let addToId = selectedId
            if(selectedId === 0){
                switch(location.pathname){
                    case "/root/storage/notes":
                        addToId = 1
                        break
                    case "/root/storage/components":
                        addToId = 31
                        break
                    case "/root/storage/templates":
                        addToId = 83
                        break
                    case "/root/storage/bookmarks":
                        addToId = 84
                        break
                }
            }
            console.log(addToId, 'fgoo')
            await queryClient.cancelQueries(["folders", location.pathname, addToId])
            const previousState = queryClient.getQueryData(["folders", location.pathname, addToId])
            console.log('previousState', previousState)
            console.log('selectedID', selectedId)
            queryClient.setQueryData(["folders", location.pathname, addToId], (oldData: any) => [...oldData, {
                folder_id: uuidv4(),
                title: inputRef.current!.value,
                within_folder_id: addToId,
                isFolder: fileInputFolder }].sort((a,b) => (+b.isFolder) - (+a.isFolder) || a.title.localeCompare(b.title)))
            return [previousState, addToId]
        },
        mutationFn: (variables: any) => handleSubmit(variables),
        onError: (err, variables, context) => {
            console.log(err)
            queryClient.setQueryData(["folders", location.pathname, context![1]], context![0])
        },
        onSettled: (data, variables, context) => {
            console.log(variables)
            queryClient.invalidateQueries(["folders", location.pathname, context![1]])
        }
    })
    return (
        <form onSubmit={(e) => {e.preventDefault(); mutateFolders.mutate(e)}}>
            <input ref={inputRef} className={`${!fileInputActive && "hidden"} border border-gray-600 bg-transparent mt-2 text-white pl-2`}/>
        </form>
    )
}

export default FileInput