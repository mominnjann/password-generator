import React from 'react'

export default function Slider({value, min=8, max=32, onChange}:{value:number,min?:number,max?:number,onChange:(v:number)=>void}){
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e)=>onChange(Number(e.target.value))}
      className="w-full h-2 rounded-lg bg-slate-700 accent-accent"
    />
  )
}
