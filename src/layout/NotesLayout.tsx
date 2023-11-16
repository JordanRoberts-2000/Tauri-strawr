import { Outlet } from 'react-router-dom'
import Sidebar from '../components/notes&components/sidebar/Sidebar';
import NoteDisplay from '../components&Notes/noteDisplay/NoteDisplay';

function NotesLayout() {
    return (
        <div className="flex text-white h-full">
            <Sidebar>
                <Outlet/>
            </Sidebar>
            <NoteDisplay />
        </div>
    );
}

export default NotesLayout;