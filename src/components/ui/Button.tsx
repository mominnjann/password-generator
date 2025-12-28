import React from 'react'

export default function Button({children, className='', ...rest}: React.ButtonHTMLAttributes<HTMLButtonElement>){
  return (
    <button
      {...rest}
      className={`btn ${className} inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm`}
    >
      {children}
    </button>
  )
}
