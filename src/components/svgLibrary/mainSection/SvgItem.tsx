import { useContext } from 'react'
import Button from '../../stralla/buttons/Button'
import { SvgOptionsContext, CopyOptions } from '../../../utils/providers/svgPage/SvgOptionsContextWrapper'

type Props = {
    svgCode: any
}

const SvgItem = ({ svgCode }: Props) => {
    const optionsContext = useContext(SvgOptionsContext)
    const handleClick = () => {
        switch (optionsContext!.copyOption) {
            case 'svg':
                navigator.clipboard.writeText(svgCode)
                break
            case 'jsx':
                const svgEditedCode = svgCode.replace(/class/gi, "className");
                navigator.clipboard.writeText(svgEditedCode)
                break
            case 'react-native':
                const svgEditedReactNativeCode = svgCode.replace(/class/gi, "className").replace(/svg/gi, "Svg")
                .replace(/path/gi, "Path").replace(/xmlns="[^"]*"/g, '');
                navigator.clipboard.writeText(svgEditedReactNativeCode)
                
                break
        }
    }
    return (
        <div className="aspect-square hover:bg-gray-300/30 flex items-center justify-center">
            <div dangerouslySetInnerHTML={{ __html: svgCode }} onClick={() => handleClick()}></div>
            {/* <Button className='h-full w-full p-0 bg-transparent'> </Button> */}
        </div>
    )
}

export default SvgItem