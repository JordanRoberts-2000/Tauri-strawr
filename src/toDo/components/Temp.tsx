import { useContext, useEffect, useRef, useState } from 'react'
import { DatabaseContext } from '../../utils/providers/DatabaseProvider'

const Temp = () => {
    const db = useContext(DatabaseContext)
    let textAreaRef = useRef<HTMLDivElement>(null)
    const [data, setData] = useState("")
    const getData = async () => {
        let hmm = await db.select(`select * from toDo where toDo_id = ${1}`)
        // let dosh = await db.select(`select * from notedata where noteData_id = ${hmm[0].data_id}`)
        setData(hmm[0].toDo_data)
    }
    useEffect(() => {
        if(!db)return
        getData()
        
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key === 's') {
              // Prevent the Save dialog to open
              e.preventDefault();
              handleSubmit(e)
              // Place your code here
              console.log('CTRL + S');
            }
          });
    },[db])
   
    const handleSubmit = async (e: KeyboardEvent) => {
        e.preventDefault()
        // let hmm = await db.select(`select * from folders where folder_id = ${el}`)
        await db.execute(`UPDATE toDo SET toDo_data = (?) WHERE toDo_id = ${1};`,[textAreaRef.current!.innerText])
    }
    return (
        <li className='flex-1'>
            <div className='text-center text-xl'>Temperary</div>
            <div ref={textAreaRef} contentEditable className='flex-1 mt-8 border-white border break-all whitespace-pre-line'>
                {data}
            </div>
        </li>
    )
}

export default Temp