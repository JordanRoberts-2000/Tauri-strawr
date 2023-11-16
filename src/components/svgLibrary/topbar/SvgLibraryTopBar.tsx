import React from 'react'
import SvgSearchbar from './searchbar/SvgSearchbar'
import SvgCopyOptions from './copyOptions/SvgCopyOptions'
import SvgCopySettings from './copySettings/SvgCopySettings'
import AddSvgButton from './addSvgButton/AddSvgButton'

const SvgLibraryTopBar = () => {
    return (
        <div className="flex-col flex gap-4 p-4 relative">
            <div className='flex gap-16'>
                <SvgSearchbar />
                <SvgCopyOptions />
            </div>
            <SvgCopySettings />
            <AddSvgButton/>
        </div>
    )
}

export default SvgLibraryTopBar