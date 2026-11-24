import { useEffect, useRef, useState } from 'react'
import { config } from '../config'

// Botón flotante de música. Intenta reproducir al desbloquear la página.
export default function Musica({ autoplay }) {
  const audio = useRef(null)
  const [sonando, setSonando] = useState(false)
  const [disponible, setDisponible] = useState(Boolean(config.cancion))

  useEffect(() => {
    if (autoplay && audio.current) {
      audio.current.play().then(() => setSonando(true)).catch(() => {})
    }
  }, [autoplay])

  if (!disponible) return null

  const toggle = () => {
    const a = audio.current
    if (a.paused) {
      a.play().then(() => setSonando(true)).catch(() => {})
    } else {
      a.pause()
      setSonando(false)
    }
  }

  return (
    <>
      <audio
        ref={audio}
        src={`${import.meta.env.BASE_URL}${config.cancion}`}
        loop
        onError={() => setDisponible(false)}
      />
      <button className={`musica ${sonando ? 'on' : ''}`} onClick={toggle} aria-label="Música">
        {sonando ? '🎵' : '🔇'}
      </button>
    </>
  )
}
