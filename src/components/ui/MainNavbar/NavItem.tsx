import { NavLink, useNavigate } from "react-router-dom";
import viewTransition from "../../../utils/viewTransitions";
import { RootRouteLocations, notesPageRouteLoaction } from "../../../types/types";

const NavItem = ({ children, to }: { children: React.ReactNode, to: RootRouteLocations | notesPageRouteLoaction }) => {
    const navigate = useNavigate()
    const handleLinkHover = (path: RootRouteLocations) => {
        document.querySelector('main')?.classList.add('mainPageTransition')
        viewTransition(() => navigate(path), () => document.querySelector('main')?.classList.remove('mainPageTransition'))

    }
    return (
        <li className="w-full px-4 flex justify-center relative">
            <NavLink to={to} unstable_viewTransition
                className={({ isActive, isPending, isTransitioning }) =>
                (isTransitioning || isActive) ? "active group  fish" :  isActive ? "active group" : "group" }>
                {children}
                <div className={`absolute bottom-[-6px] left-1/2 translate-x-[-50%] bg-blue-500 w-[50%] h-[16px] rounded-[50%] blur-sm transition-opacity duration-500
                        group-[.active]:opacity-50 opacity-30`}></div>
            </NavLink>
        </li>
    )
}

export default NavItem