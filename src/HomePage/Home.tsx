import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='bg-black text-white min-h-screen flex flex-1 justify-center items-center'>
            <ul className='flex gap-16'>
                <li><Link to="root/storage/notes">Notes</Link></li>
                <li><Link to="root/ToDo">ToDo</Link></li>
                <li><Link to="storage/notes">Images</Link></li>
                <li><Link to="root/svgLibrary">Svgs</Link></li>
                <li><Link to="Fonts">Fonts</Link></li>
                <li><Link to="Whiteboard">Whiteboard</Link></li>
            </ul>
        </div>
    )
}

export default Home