import React from 'react'

const Activefilters = () => {
  return (
    <ul className='flex border-gray-600 border-b pb-2'>
        <li className='pl-4 pr-2 text-sm bg-white rounded-sm flex gap-2 items-center text-black'>
            React
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </li>
    </ul>
  )
}

export default Activefilters