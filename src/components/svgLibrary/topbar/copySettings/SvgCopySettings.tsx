import { useState } from 'react'
import Button from '../../../stralla/buttons/Button'
import OptionsMenu from './OptionsMenu'

const SvgCopySettings = () => {
    const [copyOption, setCopyOption] = useState('jsx')
    const handleChangeOption = (option: string) => {
        setCopyOption(option)
    }
    return (
            <div className='flex relative pl-2'>
                <Button onClick={() => handleChangeOption('svg')} className={`${copyOption === 'svg' ? "bg-gray-300/30" : "bg-transparent"} 
                rounded-none text-xs px-4 rounded-s-md border-white border`}>Border</Button>
                <Button onClick={() => handleChangeOption('jsx')} className={`${copyOption === 'jsx' ? "bg-gray-300/30" : "bg-transparent"} 
                rounded-none text-xs px-4 border-white border`}>Rounded</Button>
                <Button onClick={() => handleChangeOption('jsx')} className={`${copyOption === 'jsx' ? "bg-gray-300/30" : "bg-transparent"} 
                rounded-none text-xs px-4 border-white border`}>Button</Button>
                <Button onClick={() => handleChangeOption('jsx')} className={`${copyOption === 'jsx' ? "bg-gray-300/30" : "bg-transparent"} 
                rounded-none text-xs px-4 border-white border`}>Color</Button>
                <Button onClick={() => handleChangeOption('jsx')} className={`${copyOption === 'jsx' ? "bg-gray-300/30" : "bg-transparent"} 
                rounded-none text-xs px-4 border-white border`}>Hover</Button>
                <Button onClick={() => handleChangeOption('react-native')} className={`${copyOption === 'react-native' ? "bg-gray-300/30" : "bg-transparent"} 
                rounded-none text-xs px-4 rounded-e-md border-white border`}>Shadow</Button>
                <OptionsMenu/>
            </div>
    )
}

export default SvgCopySettings