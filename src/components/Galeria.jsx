import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config } from '../config'

function leyenda(foto, i) {
  return config.leyendas[foto.nombre] ?? config.frases[i % config.frases.length]
}

function Polaroid({ foto, i, onAbrir }) {
  const [volteada, setVolteada] = useState(false)
  const rot = ((i * 37) % 9) - 4 // rotación pseudo-aleatoria estable
  const voltear = () => setVolteada((v) => !v)

  return (
    <motion.div
      className="polaroid-wrap"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
      style={{ '--rot': `${rot}deg` }}
    >
      <div
        className={`polaroid ${volteada ? 'volteada' : ''}`}
        onClick={voltear}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && voltear()}
      >
        <div className="cara frente">
          <img src={foto.src} alt={foto.nombre} loading="lazy" />
          <span className="script">#{i + 1}</span>
        </div>
        <div className="cara atras">
          <p className="script">{leyenda(foto, i)}</p>
          <button
            className="btn btn-sm"
            onClick={(e) => {
              e.stopPropagation()
              onAbrir(i)
            }}
          >
            Ver en grande 🔍
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function Lightbox({ fotos, indice, onCerrar, onCambiar }) {
  const foto = fotos[indice]
  const mover = useCallback(
    (d) => onCambiar((indice + d + fotos.length) % fotos.length),
    [indice, fotos.length, onCambiar],
  )

  useEffect(() => {
    const tecla = (e) => {
      if (e.key === 'Escape') onCerrar()
      if (e.key === 'ArrowRight') mover(1)
      if (e.key === 'ArrowLeft') mover(-1)
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [mover, onCerrar])

  const click = (fn) => (e) => {
    e.stopPropagation()
    fn()
  }

  return (
    <motion.div
      className="lightbox"
      onClick={onCerrar}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="lb-btn lb-prev" onClick={click(() => mover(-1))} aria-label="Anterior">‹</button>
      <AnimatePresence mode="wait">
        <motion.figure
          key={foto.src}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) mover(1)
            else if (info.offset.x > 60) mover(-1)
          }}
        >
          <img src={foto.src} alt={foto.nombre} draggable={false} />
          <figcaption className="script">
            {leyenda(foto, indice)} <small>({indice + 1}/{fotos.length})</small>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
      <button className="lb-btn lb-next" onClick={click(() => mover(1))} aria-label="Siguiente">›</button>
      <button className="lb-btn lb-close" onClick={click(onCerrar)} aria-label="Cerrar">✕</button>
    </motion.div>
  )
}

export default function Galeria({ fotos }) {
  const [abierta, setAbierta] = useState(null)

  return (
    <section id="galeria" className="seccion">
      <h2 className="script titulo">Nuestros recuerdos</h2>
      <p className="subtitulo">
        {fotos.length > 0
          ? `${fotos.length} momentos juntos · toca una foto para voltearla`
          : 'Agrega tus fotos en la carpeta "fotos" del proyecto 📸'}
      </p>
      <div className="galeria">
        {fotos.map((f, i) => (
          <Polaroid key={f.src} foto={f} i={i} onAbrir={setAbierta} />
        ))}
      </div>
      <AnimatePresence>
        {abierta !== null && (
          <Lightbox
            fotos={fotos}
            indice={abierta}
            onCerrar={() => setAbierta(null)}
            onCambiar={setAbierta}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
