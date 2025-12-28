import React from 'react'
import PasswordGenerator from './components/PasswordGenerator'

export default function App(){
  return (
    <div className="app-shell">
      <div className="card">
        <div className="header">
          <div className="title">Strong Password Generator</div>
          <div className="subtitle">Create secure passwords with customizable options</div>
        </div>

        <PasswordGenerator />

        <div className="footer">Powered by <strong>Momin Jan</strong></div>
      </div>
    </div>
  )
}
