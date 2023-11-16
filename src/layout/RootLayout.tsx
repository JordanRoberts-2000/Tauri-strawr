import { Outlet } from 'react-router-dom'
import TitleBar from '../components/ui/titlebar/TitleBar'

const RootLayout = () => {
    return (
        <div className="h-screen w-screen flex bg-[--primary-color] flex-col overflow-hidden border-b border-gray-800">
            <TitleBar />
            <Outlet />
        </div>
    )
}

export default RootLayout