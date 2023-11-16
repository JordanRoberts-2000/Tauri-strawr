// Animations
import { VariantProps, cva } from "class-variance-authority"
import { useRef, useLayoutEffect, cloneElement, useMemo, KeyboardEvent, MouseEvent } from "react"
import { twMerge } from "tailwind-merge"

type ModelAnimation = {
    scaleFrom: number,
    fadeIn: boolean,
    XY: [number | 'left' | 'right', number | 'top' | 'bottom'],
    time: number
}

type DialogProps = 
React.HTMLAttributes<HTMLDialogElement> &
VariantProps<typeof variants> & 
{
    children: React.ReactNode,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    intro?: ModelAnimation | 'fadeIn' | 'fromTop' | 'fromBottom',
    outro?: ModelAnimation
}

// const dialogIntroFunctionMap : { [key: string] : (modalRef: HTMLDialogElement) => void} = {
//     fadeIn: (modalRef) => {
//         requestAnimationFrame(() => {
//             modalRef.style.opacity = `1`
//         })
//     },
//     fromTop: (modalRef) => {
//         requestAnimationFrame(() => {
//             modalRef.style.transform = `translate(0, 0)`
//         })
//     },
//     fromBottom: (modalRef) => {
//         requestAnimationFrame(() => {
//             modalRef.style.transform = `translate(0, 0)`
//         })
//     }
// };

const getStartingPosY = (settings: ModelAnimation | 'fadeIn' | 'fromTop' | 'fromBottom') => {
    switch(settings){
        case "fadeIn":
            return '-50%';
        case "fromBottom":
            return '100vh';
        case "fromTop":
            return '-100vh';
        default:
            return settings.XY[1] === 0 ? "-50%" : `${settings.XY[1]}px`
    }
}

const variants = cva(
    // Base styles
    [
        'top-1/2 left-1/2 open:backdrop:duration-[.5s] dialog translate-x-[--XPosition] translate-y-[--YPosition]',
        'transition-all opacity-[--startingOpacity] scale-[--startingScale] block backdrop:transition-all open:backdrop:animate-[fadeIn_.5s_ease_normal]'
    ], {
    variants: {
        backdropBlur: {
            small: ['backdrop:backdrop-blur-[2px]'],
            default: ['backdrop:backdrop-blur-sm'],
            large: ['backdrop:backdrop-blur-md'],
            none: ''
        },
        backdropVariant: {
            blackFadedSmall: ['backdrop:bg-black/20'],
            blackFadedMedium: ['backdrop:bg-black/30'],
            blackFadedLarge: ['backdrop:bg-black/40'],
            whiteFadedSmall: ['backdrop:bg-white/20'],
            whiteFadedMedium: ['backdrop:bg-white/30'],
            whiteFadedLarge: ['backdrop:bg-white/40'],
            none: ''
        },
        open : {
            false: ['backdrop:opacity-0'],
            true: ['']
        }
    },
    defaultVariants: {
        backdropVariant: 'blackFadedSmall',
        backdropBlur: 'small'
    }
})

const DialogExperimental = ({children, open, setOpen, backdropBlur, backdropVariant, className,
        intro ={XY: [0, 0], scaleFrom: 0, fadeIn: false, time: .5}, 
        outro={XY: [0, -100], scaleFrom: 0, fadeIn: false, time: .5}}: DialogProps) => {
    const modalRef = useRef<HTMLDialogElement>(null) 
    const cssVariables = {
        '--introSpeed': `${typeof intro === 'string' ? .5 : intro.time}s`,
        '--YPosition': getStartingPosY(intro),
        '--XPosition': typeof intro === 'string' ? '-50%' : intro.XY[0] === 0 ? '-50%' : `${intro.XY[0]}px`,
        '--startingOpacity': 5,
        '--startingScale' : 1
    } as React.CSSProperties
    const closeModal = () => {
        modalRef.current!.close()
        modalRef.current!.removeEventListener('transitionend', closeModal)
        // reset position
        modalRef.current!.style.transform = ''
        modalRef.current!.style.opacity = ''
    }
    console.log(outro)
    const handleKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
        if(e.key === "Escape"){
            e.preventDefault()
            setOpen(false)
        }
    }
    const handleOnClick = (e: MouseEvent<HTMLDialogElement, globalThis.MouseEvent>) => {
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
            if(open && !modalRef.current!.open){
                modalRef.current.showModal()
                requestAnimationFrame(() => {
                    modalRef.current!.style.transform = `translate(-50%, -50%) scale(1)`
                    modalRef.current!.style.opacity = '100%'
                })
            }else if(!open && modalRef.current.open){
                modalRef.current!.addEventListener('transitionend', closeModal)
                requestAnimationFrame(() => {
                    modalRef.current!.style.transform = `translate(-50%, -50%) scale(0.75)`
                    modalRef.current!.style.opacity = '0%'
                })
            }
        }
    }, [open])
    const getMemodChildrenWithProps = useMemo(() => {
        return cloneElement(children as React.ReactElement<any>, { setOpen: setOpen })
    },[])
    return (
        <dialog style={cssVariables} ref={modalRef} onKeyDown={(e) => handleKeyDown(e)} onClick={(e) => handleOnClick(e)}
            className={twMerge(variants({backdropBlur, backdropVariant, open, className}))}>
            {getMemodChildrenWithProps}
        </dialog>
    )
}

export default DialogExperimental