import { useLocation, useNavigate } from "react-router-dom"
import viewTransition from "../../../utils/viewTransitions"
import { useEffect, useState } from "react"
import NavItem from "./NavItem"
import NotesIcon from "./NavSvgIcons/NotesIcon"
import ImageManagerIcon from "./NavSvgIcons/ImageManagerIcon"
import TodosIcon from "./NavSvgIcons/TodosIcon"
import SvgLibraryIcon from "./NavSvgIcons/SvgLibraryIcon"
import FontLibraryIcon from "./NavSvgIcons/FontLibraryIcon"
import WhiteboardIcon from "./NavSvgIcons/WhiteboardIcon"
import BlueprintsIcon from "./NavSvgIcons/BlueprintsIcon"
import SettingsIcon from "./NavSvgIcons/SettingsIcon"

type Locations = "storage/notes" | "toDos" | "imageManager" | "svgLibrary"
    | "fontLibrary" | "whiteboard" | "settings"

const MainNavbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [locationPath, setLocationPath] = useState<null | Locations>(null)
    const handleLinkHover = (path: Locations) => {
        if (locationPath !== path) {
            setLocationPath(path)
            document.querySelector('main')?.classList.add('mainPageTransition')
            viewTransition(() => navigate(path), () => document.querySelector('main')?.classList.remove('mainPageTransition'))
        }
    }
    useEffect(() => {
        if (location.pathname.includes('/root/storage')) {
            setLocationPath('storage/notes')
        } else {
            setLocationPath(location.pathname as Locations)
        }
    }, [])
    return (
        <div className="first-line:h-full flex items-center border-gray-800 border-l navTransition">
            <ul className='flex justify-around h-full text-[--primary-text-color] flex-col items-center'>
                <NavItem to={"storage/notes"}>
                    <NotesIcon />
                </NavItem>
                <NavItem to={"toDos"}>
                    <TodosIcon />
                </NavItem>
                <NavItem to={"imageManager"}>
                    <ImageManagerIcon />
                </NavItem>
                <NavItem to={"svgLibrary"}>
                    <SvgLibraryIcon />
                </NavItem>
                <NavItem to={"fontLibrary"}>
                    <FontLibraryIcon/>
                </NavItem>
                <NavItem to={'whiteboard'} >
                    <WhiteboardIcon/>
                </NavItem>
                <NavItem to={"blueprints"} >
                    <BlueprintsIcon />
                </NavItem>
                <NavItem to={"settings"}>
                    <SettingsIcon/>
                </NavItem>
            </ul>
        </div>
    )
}

export default MainNavbar