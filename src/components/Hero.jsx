import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { config } from '../config'

const inicio = new Date(`${config.fechaInicio}T00:00:00`)

function diferencia() {
  const s = Math.max(0, Math.floor((Date.now() - inicio.getTime()) / 1000))
  return {
    días: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    minutos: Math.floor((s % 3600) / 60),
    segundos: s % 60,
  }
}

export default function Hero({ portada }) {
  const [t, setT] = useState(diferencia)

  useEffect(() => {
    const id = setInterval(() => setT(diferencia()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero" style={portada ? { '--portada': `url("${portada}")` } : undefined}>
      <div className="hero-overlay" />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="hero-sub">{config.yo} &amp; {config.ella}</p>
        <h1 className="script hero-title">5 años juntos</h1>
        <p className="hero-date">
          Desde el {inicio.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <div className="contador">
          {Object.entries(t).map(([k, v]) => (
            <div key={k} className="contador-item">
              <span className="num">{v.toLocaleString('es')}</span>
              <span className="lbl">{k}</span>
            </div>
          ))}
        </div>
        <a href="#galeria" className="scroll-hint">Desliza hacia abajo ↓</a>
      </motion.div>
    </section>
  )
}
