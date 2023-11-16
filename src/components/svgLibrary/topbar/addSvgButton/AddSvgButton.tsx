import { useContext, useRef, useState } from 'react'
import Button from '../../../stralla/buttons/Button'
import Modal from '../../../stralla/model/Modal'
import { DatabaseContext } from '../../../../utils/providers/DatabaseProvider'

const AddSvgButton = () => {
    const [open, setOpen] = useState(false)
    const svgCodeInputRef = useRef<HTMLTextAreaElement>(null)
    const db = useContext(DatabaseContext)
    const handleAddSvg = async () => {
        // console.log(db)
        const svgCode = svgCodeInputRef.current!.value
        const svgEditedCode = svgCode.replace(/className/gi, "class");
        const success = await db.execute(`insert into svgLibrary value(default, ?);`, [svgEditedCode])
        console.log(success)
    }
    return (
        <>
            <div className='absolute bottom-0 right-0 m-2 mr-4'>
                <Button className='h-fit w-fit bg-white text-black p-1 px-3 text-xs' onClick={() => setOpen(true)}>Add Svg</Button>
            </div>
            <Modal open={open} setOpen={setOpen} memoDependacyArr={[db]}>
                <div className='text-white border-white border bg-black w-[45vw] aspect-[3/2] flex flex-col'>
                    <textarea ref={svgCodeInputRef} className='bg-black w-full flex-1'/>
                    <Button onClick={() => handleAddSvg()}>Add</Button>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </div>
            </Modal>
        </>
    )
}

export default AddSvgButton