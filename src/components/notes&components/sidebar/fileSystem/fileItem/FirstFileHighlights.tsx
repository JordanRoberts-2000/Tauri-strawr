type Props = {
    embedCounter: number,
    lastItem?: boolean
}

const FirstFileHighlights = ({embedCounter, lastItem}: Props) => {
    return (
        <>
            {embedCounter === 0 ?
                <div className='bg-blue-500 h-5 w-[2px] absolute top-0 left-0'></div>
                :
                (!lastItem ?
                    <div className='bg-[--secondary-color] ml-2 h-[calc(100%+.25rem)] w-[2px] absolute top-0 left-0'></div>
                    :
                    <div className='bg-[--secondary-color] ml-2 h-[10px] w-[2px] absolute top-0 left-0'></div>
                )
            }
        </>
    )
}

export default FirstFileHighlights