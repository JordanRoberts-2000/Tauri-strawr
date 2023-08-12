import Searchbar from './Searchbar'
import FilterIcons from './FilterIcons'
import Activefilters from './Activefilters'
import FileInput from './FileInput'
import { DatabaseContext } from '../../../utils/providers/DatabaseProvider'
import { useContext } from 'react'

const Sidebar = ({children}:{children:React.ReactNode}) => {
    const db = useContext(DatabaseContext)
    return (
        <div className='min-h-0 px-4 flex flex-col'>
            <h2 className='text-white mt-2'>Stralla v3</h2>
            <Searchbar/>
            <FilterIcons/>
            <Activefilters/>
            <FileInput/>
            {db ? children : <>loading</>}
        </div>
    )
}

export default Sidebar