import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { fotos } from './fotos'
import Corazones from './components/Corazones'
import LockScreen from './components/LockScreen'
import Hero from './components/Hero'
import Galeria from './components/Galeria'
import Timeline from './components/Timeline'
import Carta from './components/Carta'
import Final from './components/Final'
import Musica from './components/Musica'

export default function App() {
  const [desbloqueado, setDesbloqueado] = useState(false)

  return (
    <>
      <Corazones />
      <AnimatePresence>
        {!desbloqueado && <LockScreen key="lock" onUnlock={() => setDesbloqueado(true)} />}
      </AnimatePresence>

      {desbloqueado && (
        <main>
          <Hero portada={fotos[0]?.src} />
          <Galeria fotos={fotos} />
          <Timeline fotos={fotos} />
          <Carta />
          <Final />
          <footer>Hecho con ❤️ para ti · 5 años</footer>
        </main>
      )}
      <Musica autoplay={desbloqueado} />
    </>
  )
}
