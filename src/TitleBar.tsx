import { Outlet } from 'react-router-dom'
import { appWindow } from '@tauri-apps/api/window'

const TitleBar = () => {
  return (
    <div className="h-screen w-screen flex bg-black flex-col overflow-hidden">
        <div data-tauri-drag-region className="bg-zinc-900 flex">
            <div className='ml-auto flex'>
                <ul className='flex gap-8 items-center justify-center my-1 mr-2'>
                    <li>
                        <button onClick={() => appWindow.minimize()} className='flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => appWindow.toggleMaximize()} className='flex justify-center items-center'>
                            <svg className='h-3 w-3 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M432 48H208c-17.7 0-32 14.3-32 32V96H128V80c0-44.2 35.8-80 80-80H432c44.2 0 80 35.8 80 80V304c0 44.2-35.8 80-80 80H416V336h16c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32zM48 448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V256H48V448zM64 128H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64z"/></svg>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => appWindow.close()} className='flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <Outlet/>
    </div>
  )
}

export default TitleBar