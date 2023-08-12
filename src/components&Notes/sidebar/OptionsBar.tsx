import React from 'react'
import { useStore } from '../../../store'

const OptionsBar = () => {
    const { fileInputActive, fileInputFolder} = useStore()
    const addFile = (isFolder: boolean) => {
        if(isFolder){
            useStore.setState(() => ({fileInputFolder: true}))
        }else{
            useStore.setState(() => ({fileInputFolder: false}))
        }
        useStore.setState(() => ({fileInputActive: true}))
    }
    return (
        <div className='absolute top-0 right-0 mt-2 mr-1 flex gap-4 z-20'>
            <button onClick={() => addFile(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} 
                    className={`w-3 h-3 ${(!fileInputFolder && fileInputActive) ? "stroke-blue-500" : "stroke-white"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </button>
            <button onClick={() => addFile(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white"
                    className={`w-3 h-3 ${(fileInputFolder && fileInputActive) ? "stroke-blue-500" : "stroke-white"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
            </button>
        </div>
    )
}

export default OptionsBar