// =============================================================
// active psuedo css class(when click/hold) vs animate on click??? maybe switch
// maybe primary/secondary button styles should be tailwind variable/ if none -> fallback
import { VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'
import React, { forwardRef, useMemo, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & 
    VariantProps<typeof variants> & {
    loading?: boolean,
    clickAnimation?: 'shrinkGrow'
}

const variants = cva(
    // Base styles
    [
        'rounded-sm tracking-wide relative shadow',
        'cursor-pointer inline-flex items-center',
        'transition outline-none disabled:shadow',
        'focus-visible:scale-[0.95] disabled:cursor-not-allowed',
        'ring-offset-2 focus-visible:ring-2 hover:shadow-md',
        'font-semibold cursor-pointer justify-center whitespace-nowrap',
    ], {
    variants: {
        variant: {
            primary: ['disabled:bg-indigo-500/50 ring-indigo-500/70 group-hover:bg-indigo-600 bg-indigo-500 text-white'],
            secondary: [],
        },
        size: {
            small: ['py-1 px-2 leading-4 text-sm'],
            default: ['py-2 px-8 leading-6'],
            large: [],
            square: ['aspect-square p-2 w-8']
        },
        hoverAnimation: {
            shrink: ['group-hover:scale-90'],
            grow: ['group-hover:scale-110']
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'default'
    }
})

const wrapperAnimate : { [key: string] : (ref: HTMLElement) => void} = {
    shrinkGrow: (ref) => {
        requestAnimationFrame(() => {
            ref.style.scale = '0.96'
            setTimeout(() => {
                ref.style.scale = '1'
            }, 150)
        })
    },
};

const seperateClasses = (className: string | undefined, prefixes: string[]) => {
    if(className === undefined)return {
        button: undefined,
        wrapper: undefined
    }
    let removed = ''
    let classNameArray = className.split(" ")
    let classNameArray2 = className.split(" ")
    for(let classItem of classNameArray){
        for(let prefix of prefixes){
            if(classItem.startsWith(prefix)){
                removed += classItem + ' ';
                classNameArray2.splice(classNameArray2.indexOf(classItem), 1) 
                break
            }
        }
    }
    return {
        wrapper: removed,
        button: classNameArray2.join(" ")

    }
}

const Loading = () => (
    <div className='absolute inline-flex items-center'>
        <div className='w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-[inherit]'/>
    </div>
)

const Button = forwardRef<HTMLButtonElement, Props>(
    ({className, variant, size, hoverAnimation, clickAnimation, children, loading, ...rest}, ref) => {
    let prefixes = ["mt-", "my-", "mx-", "ml-", "mr-", "mb-", "m-"];
    const buttonClass = useMemo(() => seperateClasses(className, prefixes), [])
    if(hoverAnimation || clickAnimation)className = buttonClass.button
    const buttonWrapperRef = useRef<HTMLDivElement>(null)
    const animateWrapper = () => {
        if(clickAnimation && wrapperAnimate[clickAnimation]){
            wrapperAnimate[clickAnimation](buttonWrapperRef.current!)
        }
    }
    if(hoverAnimation || clickAnimation)return (
        <div ref={buttonWrapperRef} className={`group w-min h-min duration-150 ${buttonClass.wrapper}`}>
            <button onMouseDown={() => animateWrapper()} onTouchStart={() => animateWrapper()}
                ref={ref}
                className={twMerge(variants({variant, size, hoverAnimation, className}))} {...rest}>
                {loading && <Loading/>}
                <span className={clsx('transition flex', {
                    'opacity-0' : loading,
                    'opacity-100' : !loading
                })}>
                    {children}
                </span>
            </button>
        </div>
    )
    return (
        <button
            ref={ref}
            className={twMerge(variants({variant, size, className}))} {...rest}>
            {loading && <Loading/>}
            <span className={clsx('transition flex', {
                'opacity-0' : loading,
                'opacity-100' : !loading
            })}>
                {children}
            </span>
        </button>
    )
})

export default Button



























// =======================================================================
// import { VariantProps, cva } from 'class-variance-authority'
// import clsx from 'clsx'
// import React, { forwardRef } from 'react'
// import { twMerge } from 'tailwind-merge'

// type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & 
//     VariantProps<typeof variants> & {
//     loading?: boolean
// }

// const variants = cva(
//     // Base styles
//     [
//         'rounded-sm tracking-wide relative shadow',
//         'cursor-pointer inline-flex items-center',
//         'transition outline-none disabled:shadow',
//         'focus:scale-[0.98] disabled:cursor-not-allowed',
//         'ring-offset-2 focus-visible:ring-2 hover:shadow-md',
//         'font-semibold cursor-pointer justify-center',
//     ], {
//     variants: {
//         variant: {
//             primary: ['disabled:bg-indigo-500/50 ring-indigo-500/70 hover:bg-indigo-600 bg-indigo-500 text-white'],
//             secondary: [],
//         },
//         size: {
//             small: ['py-1 px-2 leading-4 text-sm'],
//             default: ['py-2 px-8 leading-6'],
//             large: []
//         }
//     },
//     defaultVariants: {
//         variant: 'primary',
//         size: 'default'
//     }
// })

// const Loading = () => (
//     <div className='absolute inline-flex items-center'>
//         <div className='w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-[inherit]'/>
//     </div>
// )

// const Button = forwardRef<HTMLButtonElement, Props>(
//     ({className, variant, size, children, loading, ...rest}, ref) => {
//     return (
//         <button 
//             ref={ref}
//             className={twMerge(variants({variant, size, className}))} {...rest}>
//             {loading && <Loading/>}
//             <span className={clsx('transition', {
//                 'opacity-0' : loading,
//                 'opacity-100' : !loading
//             })}>
//                 {children}
//             </span>
//         </button>
//   )
// })

// export default Button