import React, { SetStateAction, createContext, useEffect, useState } from 'react'

export type CopyOptions = "svg" | 'jsx' | 'react-native'

type SvgOptionsContextType = {
    copyOption: CopyOptions,
    setCopyOption: React.Dispatch<SetStateAction<CopyOptions>>
}

export const SvgOptionsContext = createContext<SvgOptionsContextType | undefined>(undefined)

const SvgOptionsContextWrapper = ({children}: {children: React.ReactNode}) => {
    const [copyOption, setCopyOption] = useState<CopyOptions>('jsx')
    useEffect(() => {
        //check local storage
    }, [])
    return (
        <SvgOptionsContext.Provider value={{copyOption, setCopyOption}}>
            {children}
        </SvgOptionsContext.Provider>
    )
}

export default SvgOptionsContextWrapper