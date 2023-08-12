import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar/Sidebar';
import NoteDisplay from './noteDisplay/NoteDisplay';

function NotesLayout() {
    return (
        <div className="flex text-white h-full">
            <Sidebar>
                <Outlet/>
            </Sidebar>
            <NoteDisplay/>
        </div>
    );
}

export default NotesLayout;