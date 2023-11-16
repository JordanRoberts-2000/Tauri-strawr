import { Outlet } from "react-router-dom"
import MainNavbar from "../components/ui/MainNavbar/MainNavbar"

const MainLayout = () => {
    
    return (
        <div className="flex flex-1 min-h-0">
            <main className="flex-1 min-h-0 text-white">
                <Outlet />
            </main>
           <MainNavbar/>
        </div>
    )
}

export default MainLayout