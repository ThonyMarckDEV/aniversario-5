import { motion } from 'framer-motion'
import { config } from '../config'

export default function Timeline({ fotos }) {
  const fotoPara = (hito, i) => {
    if (hito.foto) return fotos.find((f) => f.nombre === hito.foto)?.src
    if (!fotos.length) return null
    // reparte las fotos a lo largo de la línea del tiempo
    return fotos[Math.floor((i * fotos.length) / config.timeline.length)]?.src
  }

  return (
    <section className="seccion">
      <h2 className="script titulo">Nuestra historia</h2>
      <div className="timeline">
        {config.timeline.map((hito, i) => {
          const src = fotoPara(hito, i)
          return (
            <motion.div
              key={hito.anio}
              className={`hito ${i % 2 ? 'der' : 'izq'}`}
              initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="punto">❤</span>
              <div className="hito-card">
                {src && <img src={src} alt={hito.titulo} loading="lazy" />}
                <span className="anio">{hito.anio}</span>
                <h3>{hito.titulo}</h3>
                <p>{hito.texto}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
