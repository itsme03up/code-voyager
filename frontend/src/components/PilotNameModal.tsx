// src/components/PilotNameModal.tsx
import { useState } from 'react'
import './PilotNameModal.css'

type Props = {
  onComplete: (name: string) => void
}

export const PilotNameModal = ({ onComplete }: Props) => {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    if (input.trim().length === 0) return
    onComplete(input.trim())
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-title">// CODE VOYAGER</div>
        <div className="modal-subtitle">PILOT REGISTRATION</div>
        <p className="modal-description">
          パイロット名を入力して<br />
          ミッションに出発しよう
        </p>
        <input
          className="modal-input"
          type="text"
          placeholder="PILOT NAME"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          maxLength={20}
          autoFocus
        />
        <button
          className="modal-button"
          onClick={handleSubmit}
          disabled={input.trim().length === 0}
        >
          LAUNCH →
        </button>
      </div>
    </div>
  )
}