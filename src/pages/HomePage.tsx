import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div className='bg-[--primary-color] text-[--primary-text-color] min-h-screen flex flex-1 justify-center items-center'>
            <ul className='flex gap-16'>
                <li><Link to="root/storage/notes">Notes</Link></li>
                <li><Link to="root/toDos">ToDo</Link></li>
                <li><Link to="root/imageManager">Images</Link></li>
                <li><Link to="root/svgLibrary">Svgs</Link></li>
                <li><Link to="root/fontLibrary">Fonts</Link></li>
                <li><Link to="root/whiteboard">Whiteboard</Link></li>
            </ul>
        </div>
    )
}

export default HomePage