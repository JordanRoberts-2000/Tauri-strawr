import { appWindow } from '@tauri-apps/api/window'
import { useState } from 'react'

const TitleBar = () => {
    const [fullScreen, setFullScreen] = useState(false)
    const handleWindowToggle = async () => {
        const isMaximized = await appWindow.isMaximized()
        appWindow.toggleMaximize()
        setFullScreen(isMaximized)
    }
    return (
        <div data-tauri-drag-region className="bg-[--titlebar-color] flex border-b border-gray-800">
            <ul className='ml-auto flex items-center justify-center h-full'>
                <li className='hover:bg-gray-500 h-full transition-colors'>
                    <button onClick={() => appWindow.minimize()} className='flex justify-center items-center h-fit w-fit px-3 py-1'>
                        <div className='overflow-hidden w-6 h-6 flex items-center justify-center'>
                            <svg className="w-5 h-5 stroke-[--secondary-color]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                        </div>
                    </button>
                </li>
                <li className='hover:bg-gray-500 h-full transition-colors'>
                    <button onClick={() => handleWindowToggle()} className='flex justify-center items-center h-fit w-fit px-3 py-1'>
                        <div className='overflow-hidden w-6 h-6 flex items-center justify-center'>
                            {fullScreen ?
                                <svg className='h-3 w-3 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" /></svg>
                                :
                                <svg className='h-3 w-3 fill-[--secondary-color]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M432 48H208c-17.7 0-32 14.3-32 32V96H128V80c0-44.2 35.8-80 80-80H432c44.2 0 80 35.8 80 80V304c0 44.2-35.8 80-80 80H416V336h16c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32zM48 448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V256H48V448zM64 128H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64z" /></svg>
                            }
                        </div>
                    </button>
                </li>
                <li className='hover:bg-red-800 h-full transition-colors'>
                    <button onClick={() => appWindow.close()} className='flex justify-center items-center h-fit w-fit px-3 py-1'>
                        <div className='overflow-hidden w-6 h-6 flex items-center justify-center'>
                            <svg className="w-5 h-5 stroke-[--secondary-color]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default TitleBar