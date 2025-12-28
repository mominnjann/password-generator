import React from 'react'

export default function Toggle({checked, onChange}:{checked:boolean,onChange:(v:boolean)=>void}){
  return (
    <button
      onClick={()=>onChange(!checked)}
      className={`w-12 h-7 rounded-full p-1 flex items-center transition-colors duration-200 ${checked ? 'bg-gradient-to-r from-accent-from to-accent-to' : 'bg-slate-700/60'}`}
    >
      <div className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}
