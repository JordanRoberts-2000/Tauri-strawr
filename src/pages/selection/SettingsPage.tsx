import { setTheme } from '../../data/userSettings/userSettings'

type Themes = 'dark' | 'light'

const SettingsPage = () => {
    const changeColor = (theme: Themes) => {
        setTheme(theme)
        localStorage.setItem('user', theme)
    }
    return (
        <div className='text-[--primary-text-color] flex flex-col gap-8'>
            <div className='underline'>All</div>
            <button className='w-fit' onClick={() => changeColor('dark')}>Toggle dark mode</button>
            <button className='w-fit'>Nav on hover/click</button>
            <button className='w-fit'>Backup data</button>
            <div className='underline'>Notes</div>
            <button className='w-fit'>Notes auto save</button>
        </div>
    )
}

export default SettingsPage