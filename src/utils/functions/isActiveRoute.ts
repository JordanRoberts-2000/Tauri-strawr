import { RootRouteLocations } from "../../types/types";
import { Location } from 'react-router-dom'

const isActiveRoute = (location: Location<any>, match: RootRouteLocations) => {
    console.log(location.pathname, match)
    return location.pathname === `/root/${match}` || location.pathname.startsWith(`/root/${match}/`);
};

export default isActiveRoute