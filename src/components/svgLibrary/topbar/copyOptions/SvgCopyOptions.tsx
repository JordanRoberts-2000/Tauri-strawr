import { useContext, useState } from 'react'
import Button from '../../../stralla/buttons/Button'
import { SvgOptionsContext, CopyOptions } from '../../../../utils/providers/svgPage/SvgOptionsContextWrapper'

const SvgCopyOptions = () => {
    const svgContext = useContext(SvgOptionsContext)
    // if context is undefined then still checking local storage
    // flash to show loading
    const handleChangeOption = (option: CopyOptions) => {
        svgContext!.setCopyOption(option)
    }
    return (
        <div className='flex'>
            <Button onClick={() => handleChangeOption('svg')} className={`${ svgContext!.copyOption === 'svg' ? "bg-gray-300/30" : "bg-transparent"} 
                rounded-none text-xs px-4 h-fit rounded-s-md border-white border`}>Svg</Button>
            <Button onClick={() => handleChangeOption('jsx')} className={`${ svgContext!.copyOption === 'jsx' ? "bg-gray-300/30" : "bg-transparent"} 
                rounded-none text-xs px-4 h-fit border-white border`}>Jsx</Button>
            <Button onClick={() => handleChangeOption('react-native')} className={`${ svgContext!.copyOption === 'react-native' ? "bg-gray-300/30" : "bg-transparent"} 
                rounded-none text-xs px-4 h-fit rounded-e-md border-white border`}>React-native</Button>
        </div>
    )
}

export default SvgCopyOptions