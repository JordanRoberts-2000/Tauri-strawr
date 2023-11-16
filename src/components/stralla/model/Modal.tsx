// Animations
// fix scale 0 not working
// left right up down [X,Y]
// esc key 
// tabable when hidden??
import { VariantProps, cva } from "class-variance-authority"
import { useRef, useLayoutEffect, cloneElement, useMemo, KeyboardEvent, MouseEvent } from "react"
import ReactDOM from "react-dom"
import { twMerge } from "tailwind-merge"

type ModelAnimation = {
    scale: number,
    opacity: number,
    XY: [number | 'left' | 'right', number | 'top' | 'bottom'],
    time: number
}

type DialogProps = 
React.HTMLAttributes<HTMLDivElement> &
VariantProps<typeof variants> & 
VariantProps<typeof backDropVariants> &
{
    children: React.ReactNode,
    memoDependacyArr?: any[],
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    intro?: ModelAnimation | 'fadeIn' | 'fromTop' | 'fromBottom' | 'grow',
    outro?: ModelAnimation | 'fadeOut' | 'toTop' | 'toBottom' | 'shrink'
}

const getStartingPosY = (settings: ModelAnimation | 'fadeIn' | 'fromTop' | 'fromBottom' | 'grow') => {
    switch(settings){
        case "fadeIn":
            return '-50%';
        case "grow":
            return '-50%'
        case "fromBottom":
            return '100vh';
        case "fromTop":
            return '-100vh';
        default:
            return settings.XY[1] === 0 ? "-50%" : `${settings.XY[1]}px`
    }
}

const getEndingPosY = (settings: ModelAnimation | 'fadeOut' | 'toTop' | 'toBottom' | 'shrink') => {
    switch(settings){
        case "fadeOut":
            return '-50%';
        case "shrink":
            return '-50%'
        case "toBottom":
            return '100vh';
        case "toTop":
            return '-100vh';
        default:
            return settings.XY[1] === 0 ? "-50%" : `${settings.XY[1]}px`
    }
}

const variants = cva(
    // Base styles
    [
        'scale-[--startingScale] z-[9999] bg-white',
        'fixed top-1/2 left-1/2 translate-x-[--XPosition] translate-y-[--YPosition]',
    ], {
    variants: {
        open : {
            false: ['pointer-events-none opacity-0'],
            true: ['opacity-[--startingOpacity]']
        }
    },
})

const backDropVariants = cva(
    // Base styles
    [
        'fixed top-0 left-0 w-full h-screen z-[9998] transition-opacity duration-300',
    ], {
    variants: {
        backdropBlur: {
            small: ['backdrop-blur-[2px]'],
            default: ['backdrop-blur-sm'],
            large: ['backdrop-blur-md'],
            none: ''
        },
        backdropVariant: {
            blackFadedSmall: ['bg-black/20'],
            blackFadedMedium: ['bg-black/30'],
            blackFadedLarge: ['bg-black/40'],
            whiteFadedSmall: ['bg-white/20'],
            whiteFadedMedium: ['bg-white/30'],
            whiteFadedLarge: ['bg-white/40'],
            none: ''
        },
        open : {
            false: ['pointer-events-none opacity-0'],
            true: ['']
        }
    },
    defaultVariants: {
        backdropVariant: 'blackFadedSmall',
        backdropBlur: 'small'
    }
})

const Modal = ({children, open, setOpen, backdropBlur, backdropVariant, className, memoDependacyArr=[],
        intro ={XY: [0, 16], scale: .75, opacity: 0, time: .3}, 
        outro={XY: [0, 0], scale: .75, opacity: 0, time: .3}}: DialogProps) => {
    const modalRef = useRef<HTMLDivElement>(null) 
    const cssVariables = {
        '--YPosition': getStartingPosY(intro),
        '--XPosition': (typeof intro === 'string' || intro.XY[0] === 0)  ? '-50%' : `${intro.XY[0]}px`,
        '--startingOpacity': intro === 'fadeIn' ? 0 : typeof intro === 'string' ? 1 : intro.opacity,
        '--startingScale' : intro === 'grow' ? 0.01 : typeof intro === 'string' ? 1 : intro.scale
    } as React.CSSProperties
    const closeModal = () => {
        const outroTime = typeof outro === 'string' ? .5 : outro.time
        const scaleTo = outro === 'shrink' ? 0 : typeof outro === 'string' ? 1 : outro.scale
        const outroOpacity = outro === 'fadeOut' ? 0 : typeof outro === 'string' ? 1 : outro.opacity
        const outroPositionX = (typeof outro === "string" || outro.XY[0] === 0) ? "-50%" : outro.XY[0] + 'px'
        modalRef.current!.style.transitionDuration = `${outroTime}s`
        const outroFinishedResetPosition = () => {
            modalRef.current!.style.transitionDuration = ''
            modalRef.current!.style.transform = ``
            modalRef.current!.style.opacity = ''
            modalRef.current!.removeEventListener('transitionend', outroFinishedResetPosition)
        }
        modalRef.current!.addEventListener('transitionend', outroFinishedResetPosition)
        requestAnimationFrame(() => {
            modalRef.current!.style.transform = 
                `translate(${outroPositionX}, ${getEndingPosY(outro)}) scale(${scaleTo})`
            modalRef.current!.style.opacity = `${outroOpacity}`
        })
        
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if(e.key === "Escape"){
            e.preventDefault()
            setOpen(false)
        }
    }
    const handleOnClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        const dialogPositions = modalRef.current!.getBoundingClientRect()
        if(
            e.clientX < dialogPositions.left ||
            e.clientX > dialogPositions.right ||
            e.clientY < dialogPositions.top ||
            e.clientY > dialogPositions.bottom
            ){
            setOpen(false)
        }
    }
    useLayoutEffect(() => {
        if(modalRef.current){
            if(open && !modalRef.current!.classList.contains('active')){
                modalRef.current!.style.transitionDuration = `${typeof intro === 'string' ? .5 : intro.time}s`
                requestAnimationFrame(() => {
                    modalRef.current!.style.transform = `translate(-50%, -50%) scale(1)`
                    modalRef.current!.style.opacity = '100%'
                })
            }else if(!open && modalRef.current!.style.transform === `translate(-50%, -50%) scale(1)`){
                closeModal()
                // reset Position
                // requestAnimationFrame(() => {
                //     modalRef.current!.style.transitionDuration = ''
                //     modalRef.current!.style.transform = ``
                //     modalRef.current!.style.opacity = ''
                // })
            }
        }
    }, [open])
    const getMemodChildrenWithProps = useMemo(() => {
        return cloneElement(children as React.ReactElement<any>)
    }, memoDependacyArr)
    return ReactDOM.createPortal(
        <>
            <div className={twMerge(backDropVariants({open, backdropBlur, backdropVariant}))} onClick={(e) => handleOnClick(e)}/>
            <div style={cssVariables} ref={modalRef} onKeyDown={(e) => handleKeyDown(e)} className={twMerge(variants({open, className}))}>
                {getMemodChildrenWithProps}
            </div>
        </>
    , document.body)
}

export default Modal