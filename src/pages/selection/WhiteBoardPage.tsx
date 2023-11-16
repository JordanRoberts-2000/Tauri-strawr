import { useContext, useEffect, useRef, useState } from 'react'
import { DatabaseContext } from '../../utils/providers/DatabaseProvider'
import { writeBinaryFile, BaseDirectory, writeTextFile, readBinaryFile } from '@tauri-apps/api/fs';
import { resourceDir } from '@tauri-apps/api/path';

const WhiteBoardPage = () => {
    const canvas = useRef<HTMLCanvasElement>(null)
    let radius = useRef(4)
    let dragging = useRef(false)
    const db = useContext(DatabaseContext)
    const [color, setColor] = useState("white")
    const putPoint = (e: any) => {
        if(!canvas)return
        const ctx = canvas.current!.getContext("2d")
        const rect = canvas.current!.getBoundingClientRect()
        if(!ctx)return
        if(!dragging.current)return
        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.lineWidth = radius.current * 2
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top) // draws line 2/2
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(e.clientX - rect.left, e.clientY - rect.top, radius.current, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top) // set up 1/2
    }
    const handleMouseMove = (e: any) => {
        if(dragging)putPoint(e)
    }
    const handleMouseDown = (e:any) => {
        dragging.current = true
        putPoint(e)
    }
    const drawCancel = () => {
        dragging.current = false
        const ctx = canvas.current!.getContext("2d")
        if(!ctx)return
        ctx.beginPath()
    }
    const clear = () => {
        const ctx = canvas.current!.getContext("2d")
        if(!ctx)return
        ctx.beginPath()
        ctx.fillStyle = "black"
        ctx.rect(0, 0, canvas.current!.getBoundingClientRect().width, canvas.current!.getBoundingClientRect().height)
        ctx.fill()
        ctx.beginPath()
    }
    const saveWhiteboard = async () => {
        // let data = canvas.current!.toDataURL()
        // const resourceDirPath = await resourceDir();
        // console.log(resourceDirPath)
        // let rect = canvas.current?.getBoundingClientRect()
        // var imageData = canvas.current!.getContext("2d")!.getImageData(0, 0, rect!.width, rect!.height);
        // var buffer = imageData.data.buffer
        let filePath = "./Strawr/my-app/public/whiteboarded.png"
        // // let success = await writeTextFile(filePath, "example textcontent in json", {dir: BaseDirectory.Document, });
        // let success = await writeBinaryFile(filePath, buffer, { dir: BaseDirectory.Document });
        // console.log(success)
        // let hug = await fetch(data)
        // console.log(hug)
        canvas.current!.toBlob((blob) => {
            const fileReader:any = new FileReader();
            fileReader.readAsArrayBuffer(blob!);
            fileReader.onload = async () => {
              const fileContents = new Uint8Array(fileReader.result);
              await writeBinaryFile(filePath, fileContents, { dir: BaseDirectory.Document });
            };
          });
        // let success = await writeBinaryFile(filePath, hug, { dir: BaseDirectory.Document })
        // console.log(success)
    }
    const getData = async () => {
        const ctx = canvas.current!.getContext("2d")
        if(!ctx)return
        let img = new Image
        img.src = '/whiteboarded.png'
        // console.log(img)
        img.onload = () => {
            console.log('eggfart')
            ctx.drawImage(img, 0, 0);
        }
        // ctx.drawImage(img, 0, 0);
        // let filePath = "./Strawr/my-app/utils/whiteboard.png"
        // const contents:any = await readBinaryFile(filePath, { dir: BaseDirectory.Document });
        // let base64Data = btoa(String.fromCharCode.apply(null, contents))
        // console.log(base64Data)

    }
    useEffect(() => {
        if(!canvas)return
        const ctx = canvas.current!.getContext("2d")
        if(!ctx)return
        canvas.current!.height =  canvas.current!.getBoundingClientRect().height
        canvas.current!.width =  canvas.current!.getBoundingClientRect().width
        window.addEventListener("resize", () => {
            canvas.current!.height =  canvas.current!.getBoundingClientRect().height
            canvas.current!.width =  canvas.current!.getBoundingClientRect().width
        })
    },[])
    useEffect(() => {
        if(!db)return
        getData()
    },[db])
    return (
        <div className='h-full flex justify-center items-center relative'>
            <div className='absolute left-0 bottom-0 m-4 flex-col flex gap-12'>
                <button onClick={() => saveWhiteboard()}>
                    <svg className='fill-white h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                </button>
                <div className='flex flex-col gap-4'>
                    <button className='w-full aspect-square bg-blue-500 rounded-full' onClick={() => setColor("blue")}></button>
                    <button className='w-full aspect-square bg-green-500 rounded-full' onClick={() => setColor("green")}></button>
                    <button className='w-full aspect-square bg-yellow-500 rounded-full' onClick={() => setColor("yellow")}></button>
                    <button className='w-full aspect-square bg-purple-500 rounded-full' onClick={() => setColor("purple")}></button>
                    <button className='w-full aspect-square bg-red-500 rounded-full' onClick={() => setColor("red")}></button>
                    <button className='w-full aspect-square bg-black border-white border rounded-full' onClick={() => setColor("black")}></button>
                    <button className='w-full aspect-square bg-white rounded-full' onClick={() => setColor("white")}></button>
                </div>
                <svg className='h-4' xmlns="http://www.w3.org/2000/svg" fill={color === "black" ? "gray" : color} viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                <button onClick={() => clear()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
            <canvas ref={canvas} className='aspect-[16/9] w-[90%] border-white border-2'
                    onMouseDown={(e) => handleMouseDown(e)} onMouseUp={() => drawCancel()} 
                    onMouseMove={(e) => handleMouseMove(e)} onMouseLeave={() => drawCancel()}/>
        </div>
    )
}

export default WhiteBoardPage