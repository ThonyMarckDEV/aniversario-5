import { useState } from 'react'
import { motion } from 'framer-motion'
import { config } from '../config'

const soloNumeros = (s) => String(s ?? '').replace(/\D/g, '')

function passwordsValidas() {
  if (config.password) return [soloNumeros(config.password)]
  const [a, m, d] = config.fechaInicio.split('-')
  return [`${d}${m}${a}`, `${d}${m}${a.slice(2)}`]
}

export default function LockScreen({ onUnlock }) {
  const [valor, setValor] = useState('')
  const [error, setError] = useState(false)

  const enviar = (e) => {
    e.preventDefault()
    if (passwordsValidas().includes(soloNumeros(valor))) {
      onUnlock()
    } else {
      setError(true)
      setTimeout(() => setError(false), 600)
    }
  }

  return (
    <motion.div
      className="lock"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.form
        className={`lock-card ${error ? 'shake' : ''}`}
        onSubmit={enviar}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="candado">🔒</div>
        <h1 className="script">Para ti, {config.ella}</h1>
        <p>Esta página es solo para ti. Escribe nuestra fecha especial:</p>
        <input
          type="text"
          inputMode="numeric"
          placeholder="DD/MM/AAAA"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          autoFocus
        />
        <button type="submit" className="btn">Entrar 💌</button>
        <small>{error ? 'Mmm… intenta otra vez 🙈' : config.pistaPassword}</small>
      </motion.form>
    </motion.div>
  )
}
