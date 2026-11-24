import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config } from '../config'

export default function Carta() {
  const [abierta, setAbierta] = useState(false)

  return (
    <section className="seccion">
      <h2 className="script titulo">Una carta para ti</h2>
      <AnimatePresence mode="wait">
        {!abierta ? (
          <motion.button
            key="sobre"
            className="sobre"
            onClick={() => setAbierta(true)}
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            exit={{ opacity: 0, y: -40 }}
          >
            <span className="sobre-icono">💌</span>
            <span>Toca para abrir</span>
          </motion.button>
        ) : (
          <motion.article
            key="carta"
            className="carta"
            initial={{ opacity: 0, y: 60, rotateX: -60 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8 }}
          >
            {config.carta.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.5 }}
              >
                {p}
              </motion.p>
            ))}
            <motion.p
              className="script firma"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + config.carta.length * 0.5 }}
            >
              — {config.yo}
            </motion.p>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  )
}
