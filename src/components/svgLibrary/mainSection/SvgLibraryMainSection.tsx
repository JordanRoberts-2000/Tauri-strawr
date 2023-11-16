import { useContext, useEffect, useState } from 'react'
import SvgItem from './SvgItem'
import { DatabaseContext } from '../../../utils/providers/DatabaseProvider'
import { useLoaderData } from 'react-router-dom'

type SvgData = {
    svg_id: number,
    svg_code: string
}

const SvgLibraryMainSection = () => {
    // const svgData  SvgData[]
    return (
        <div className="grid lg:grid-cols-[repeat(20,_minmax(0,_1fr))] grid-cols-12 border-t border-gray-800 flex-1 mt-6">
            {/* {svgData.map((el) => (
                  <SvgItem key={el.svg_id} svgCode={el.svg_code}/>
            ))} */}
        </div>
    )
}

export default SvgLibraryMainSection