import Searchbar from '../../../components&Notes/sidebar/Searchbar'
import Activefilters from '../../../components&Notes/sidebar/Activefilters'
import FileInput from '../../../components&Notes/sidebar/FileInput'
import { DatabaseContext } from '../../../utils/providers/DatabaseProvider'
import { useContext } from 'react'
import NotesNavbar from './NotesNavbar'
import OptionsBar from '../../../components&Notes/sidebar/OptionsBar'

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const db = useContext(DatabaseContext)
    return (
        <div className='px-4 flex flex-col lg:w-[20vw] w-[25vw]'>
            <h2 className='text-white mt-2'>Stralla v3</h2>
            <Searchbar />
            <NotesNavbar />
            <Activefilters />
            <FileInput />
            <div className='relative flex-1 flex min-h-0'>
                <OptionsBar />
                <div id='notesTransition' className='flex-1 customScroll overflow-y-auto min-h-0 pb-8 relative overflow-x-hidden 
                    pt-2'>
                    {db ? children : <>loading</>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar