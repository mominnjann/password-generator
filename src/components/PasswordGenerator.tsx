import React, { useEffect, useMemo, useState } from 'react'
import Button from './ui/Button'
import Toggle from './ui/Toggle'
import Slider from './ui/Slider'

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const NUM = '0123456789'
const SYM = "!@#$%^&*()_+-=[]{}|;:',.<>/?`~"

function getRandomFrom(str: string){
  return str[Math.floor(Math.random()*str.length)]
}

function generatePassword(length: number, options: {upper:boolean, lower:boolean, number:boolean, symbol:boolean}){
  const pool = [options.upper ? UPPER : '', options.lower ? LOWER : '', options.number ? NUM : '', options.symbol ? SYM : ''].join('')
  if (!pool) return ''
  let pw = ''
  for(let i=0;i<length;i++) pw += getRandomFrom(pool)
  return pw
}

function strengthOf(pw: string){
  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[a-z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  if (score <= 2) return {label: 'Weak', color: 'strength-weak', value: score}
  if (score <= 4) return {label: 'Medium', color: 'strength-medium', value: score}
  return {label: 'Strong', color: 'strength-strong', value: score}
}

export default function PasswordGenerator(){
  const [length, setLength] = useState<number>(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [number, setNumber] = useState(true)
  const [symbol, setSymbol] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(()=>{
    // Auto-generate on load
    setPassword(generatePassword(length,{upper,lower,number,symbol}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    // regenerate when options change
    setPassword(generatePassword(length,{upper,lower,number,symbol}))
  }, [length, upper, lower, number, symbol])

  const strength = useMemo(()=>strengthOf(password), [password])

  function regenerate(){
    setPassword(generatePassword(length,{upper,lower,number,symbol}))
  }

  async function copyToClipboard(){
    try{
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(()=>setCopied(false), 2000)
    }catch(e){
      // ignore
    }
  }

  return (
    <div>
      <div className="password-box flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="text-sm text-slate-400 mb-1">Password</div>
          <div className="text-lg truncate font-mono mt-1">{password || '—'}</div>
          <div className={`mt-2 text-sm ${strength.color}`}>Strength: {strength.label}</div>
        </div>

        <div className="flex gap-2 mt-3 sm:mt-0">
          <Button className="btn-primary" onClick={regenerate}>Regenerate</Button>
          <Button className="btn-ghost" onClick={copyToClipboard}>{copied ? 'Copied ✓' : 'Copy'}</Button>
        </div>
      </div>

      <div className="mt-4 grid gap-4">
        <div>
          <label className="text-sm text-slate-400">Length: <strong>{length}</strong></label>
          <div className="mt-2"><Slider value={length} min={8} max={32} onChange={setLength} /></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center justify-between gap-3 p-3 bg-slate-800/30 rounded-lg">
            <div>Uppercase</div>
            <Toggle checked={upper} onChange={setUpper} />
          </div>

          <div className="flex items-center justify-between gap-3 p-3 bg-slate-800/30 rounded-lg">
            <div>Lowercase</div>
            <Toggle checked={lower} onChange={setLower} />
          </div>

          <div className="flex items-center justify-between gap-3 p-3 bg-slate-800/30 rounded-lg">
            <div>Numbers</div>
            <Toggle checked={number} onChange={setNumber} />
          </div>

          <div className="flex items-center justify-between gap-3 p-3 bg-slate-800/30 rounded-lg">
            <div>Symbols</div>
            <Toggle checked={symbol} onChange={(v)=>setSymbol(v)} />
          </div>
        </div>
      </div>
    </div>
  )
}
