import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { config } from '../config'

function lluviaDeCorazones() {
  const corazon = confetti.shapeFromText({ text: '❤', scalar: 2 })
  const fin = Date.now() + 3000
  const frame = () => {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, shapes: [corazon], scalar: 2 })
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, shapes: [corazon], scalar: 2 })
    if (Date.now() < fin) requestAnimationFrame(frame)
  }
  frame()
  confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#ff4d6d', '#ff8fa3', '#ffd6e0', '#ffffff'] })
}

export default function Final() {
  const [si, setSi] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  // el botón "No" se escapa 😜
  const escapar = () => setPos({ x: (Math.random() - 0.5) * 260, y: (Math.random() - 0.5) * 160 })

  return (
    <section className="seccion final">
      {!si ? (
        <>
          <h2 className="script titulo">{config.mensajeFinal}</h2>
          <div className="botones">
            <motion.button
              className="btn btn-grande"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSi(true)
                lluviaDeCorazones()
              }}
            >
              ¡Sí! 💖
            </motion.button>
            <motion.button className="btn btn-sec" animate={pos} onMouseEnter={escapar} onClick={escapar}>
              No
            </motion.button>
          </div>
        </>
      ) : (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <div className="latido">❤️</div>
          <h2 className="script titulo">¡Te amo, {config.ella}!</h2>
          <p className="subtitulo">Feliz 5.º aniversario. Por todos los que nos faltan. 🥂</p>
          <button className="btn" onClick={lluviaDeCorazones}>Más corazones ✨</button>
        </motion.div>
      )}
    </section>
  )
}
