import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { config } from '../config'

// Curva clásica del corazón (t en [0, 2π])
const curva = (t) => ({
  x: 16 * Math.sin(t) ** 3,
  y: 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t),
})
const ESCALA = 0.2
const OFFSET_Y = 0.9

function leyenda(foto, i) {
  return config.leyendas[foto.nombre] ?? config.frases[i % config.frases.length]
}

// Reparte las fotos en "anillos" con forma de corazón a distintas profundidades,
// formando un corazón 3D abombado.
function posiciones(n) {
  if (!n) return []
  const porAnillo = Math.max(10, Math.min(18, Math.ceil(n / 3)))
  const anillos = Math.ceil(n / porAnillo)
  const res = []
  for (let a = 0; a < anillos; a++) {
    const enEste = Math.min(porAnillo, n - a * porAnillo)
    // z en (-1, 1): el anillo central es el más grande
    const zNorm = anillos === 1 ? 0 : ((a / (anillos - 1)) * 2 - 1) * 0.8
    const s = Math.sqrt(1 - zNorm * zNorm)
    const desfase = a * 0.37
    for (let k = 0; k < enEste; k++) {
      const t = ((k + desfase) / enEste) * Math.PI * 2
      const p = curva(t)
      res.push(new THREE.Vector3(p.x * ESCALA * s, p.y * ESCALA * s + OFFSET_Y, zNorm * 2.2))
    }
  }
  return res
}

// Partículas que rellenan el volumen del corazón
function particulas(cantidad) {
  const pos = new Float32Array(cantidad * 3)
  for (let i = 0; i < cantidad; i++) {
    const t = Math.random() * Math.PI * 2
    const r = Math.sqrt(Math.random()) // más densidad hacia el borde
    const zNorm = (Math.random() * 2 - 1) * Math.sqrt(1 - r * r * 0.9)
    const p = curva(t)
    const s = r * 0.98 + 0.02
    pos[i * 3] = p.x * ESCALA * s
    pos[i * 3 + 1] = p.y * ESCALA * s + OFFSET_Y
    pos[i * 3 + 2] = zNorm * 2
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return geo
}

function texturaPunto() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.3, 'rgba(255,143,163,0.8)')
  g.addColorStop(1, 'rgba(255,77,109,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

const VISTA_INICIAL = new THREE.Vector3(0, 0, 13)

export default function Corazon3D({ fotos }) {
  const contRef = useRef(null)
  const apiRef = useRef(null)
  const [sel, setSel] = useState(null)

  useEffect(() => {
    const cont = contRef.current
    const ancho = () => cont.clientWidth
    const alto = () => cont.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(ancho(), alto())
    renderer.outputColorSpace = THREE.SRGBColorSpace
    cont.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, ancho() / alto(), 0.1, 100)
    const distanciaBase = () => (camera.aspect < 0.8 ? 17 : 13)
    camera.position.set(0, 0, distanciaBase())

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.minDistance = 2
    controls.maxDistance = 25
    controls.enableZoom = false // no secuestrar el scroll de la página
    controls.target.set(0, 0, 0)

    const corazon = new THREE.Group()
    scene.add(corazon)

    // Partículas brillantes
    const geoP = particulas(2600)
    const texP = texturaPunto()
    const matP = new THREE.PointsMaterial({
      size: 0.14,
      map: texP,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const puntos = new THREE.Points(geoP, matP)
    corazon.add(puntos)

    // Tarjetas con las fotos (marco tipo polaroid + foto)
    const loader = new THREE.TextureLoader()
    const geoPlano = new THREE.PlaneGeometry(1, 1)
    const matMarco = new THREE.MeshBasicMaterial({ color: 0xfff8f3 })
    const tarjetas = []
    const recursos = []

    posiciones(fotos.length).forEach((pos, i) => {
      const g = new THREE.Group()
      g.position.copy(pos)
      g.userData = { indice: i, escala: 1 }

      const marco = new THREE.Mesh(geoPlano, matMarco)
      marco.position.z = -0.01
      const matFoto = new THREE.MeshBasicMaterial({ color: 0xffffff })
      const foto = new THREE.Mesh(geoPlano, matFoto)
      foto.userData.indice = i
      marco.userData.indice = i

      const tam = 1.05
      const ajustar = (aspecto) => {
        const w = aspecto >= 1 ? tam : tam * aspecto
        const h = aspecto >= 1 ? tam / aspecto : tam
        foto.scale.set(w, h, 1)
        marco.scale.set(w + 0.1, h + 0.22, 1)
        foto.position.y = 0.05
      }
      ajustar(1)
      recursos.push(matFoto)
      loader.load(fotos[i].src, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
        matFoto.map = tex
        matFoto.needsUpdate = true
        ajustar(tex.image.width / tex.image.height)
        recursos.push(tex)
      })

      g.add(marco, foto)
      corazon.add(g)
      tarjetas.push(g)
    })

    // Animación de cámara
    const camDestino = new THREE.Vector3().copy(camera.position)
    const targetDestino = new THREE.Vector3()
    let volando = false
    let enfocada = null

    const enfocar = (i) => {
      const g = tarjetas[i]
      if (!g) return
      enfocada = i
      const mundo = g.getWorldPosition(new THREE.Vector3())
      // la cámara llega desde el lado en que ya está mirando, a corta distancia
      const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize()
      targetDestino.copy(mundo)
      camDestino.copy(mundo).addScaledVector(dir, camera.aspect < 0.8 ? 2.6 : 2)
      volando = true
      controls.enabled = false
      setSel(i)
    }

    const volver = () => {
      enfocada = null
      targetDestino.set(0, 0, 0)
      const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize()
      camDestino.copy(dir).multiplyScalar(distanciaBase())
      if (camDestino.length() < 1) camDestino.copy(VISTA_INICIAL)
      volando = true
      setSel(null)
    }

    apiRef.current = { enfocar, volver }

    // Interacción: hover y click (distinguiendo click de arrastre)
    const raycaster = new THREE.Raycaster()
    const puntero = new THREE.Vector2()
    let hover = null
    let inicio = null

    const tocar = (e) => {
      const r = renderer.domElement.getBoundingClientRect()
      puntero.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
      raycaster.setFromCamera(puntero, camera)
      const hit = raycaster.intersectObjects(tarjetas, true)[0]
      return hit ? hit.object.userData.indice : null
    }

    const onMove = (e) => {
      hover = tocar(e)
      renderer.domElement.style.cursor = hover !== null ? 'pointer' : 'grab'
    }
    const onDown = (e) => {
      inicio = { x: e.clientX, y: e.clientY }
    }
    const onUp = (e) => {
      if (!inicio) return
      const movido = Math.hypot(e.clientX - inicio.x, e.clientY - inicio.y)
      inicio = null
      if (movido > 6) return
      const i = tocar(e)
      if (i !== null) enfocar(i)
      else if (enfocada !== null) volver()
    }
    const el = renderer.domElement
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointerup', onUp)

    const onResize = () => {
      camera.aspect = ancho() / alto()
      camera.updateProjectionMatrix()
      renderer.setSize(ancho(), alto())
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(cont)

    // Solo renderizar cuando la sección está visible
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(cont)

    const reloj = new THREE.Clock()
    let raf
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      const dt = Math.min(reloj.getDelta(), 0.05)
      const t = reloj.elapsedTime

      // giro lento y latido cuando no hay foto enfocada
      if (enfocada === null) corazon.rotation.y += dt * 0.25
      const latido = 1 + Math.max(0, Math.sin(t * 2.4)) ** 8 * 0.04
      puntos.scale.setScalar(latido)

      if (volando) {
        const k = 1 - Math.pow(0.0025, dt)
        camera.position.lerp(camDestino, k)
        controls.target.lerp(targetDestino, k)
        if (camera.position.distanceTo(camDestino) < 0.01) {
          volando = false
          controls.enabled = true
        }
      }

      // las tarjetas siempre miran a la cámara
      tarjetas.forEach((g, i) => {
        g.quaternion.copy(corazon.quaternion).invert().multiply(camera.quaternion)
        const objetivo = i === enfocada ? 1.15 : i === hover ? 1.2 : 1
        g.userData.escala += (objetivo - g.userData.escala) * 0.15
        g.scale.setScalar(g.userData.escala)
        g.position.y += Math.sin(t * 1.3 + i) * 0.0008
      })

      controls.update()
      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onUp)
      controls.dispose()
      geoP.dispose()
      texP.dispose()
      matP.dispose()
      geoPlano.dispose()
      matMarco.dispose()
      recursos.forEach((r) => r.dispose())
      renderer.dispose()
      el.remove()
      apiRef.current = null
    }
  }, [fotos])

  // Teclado: Esc para volver, flechas para cambiar de foto
  useEffect(() => {
    if (sel === null) return
    const tecla = (e) => {
      if (e.key === 'Escape') apiRef.current?.volver()
      if (e.key === 'ArrowRight') apiRef.current?.enfocar((sel + 1) % fotos.length)
      if (e.key === 'ArrowLeft') apiRef.current?.enfocar((sel - 1 + fotos.length) % fotos.length)
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [sel, fotos.length])

  const mover = (d) => apiRef.current?.enfocar((sel + d + fotos.length) % fotos.length)

  return (
    <section className="seccion">
      <h2 className="script titulo">Nuestro corazón</h2>
      <p className="subtitulo">
        {fotos.length > 0
          ? 'Arrastra para girarlo · toca una foto para acercarte 💞'
          : 'Agrega tus fotos en la carpeta "fotos" para llenar este corazón 📸'}
      </p>
      <div className="corazon3d" ref={contRef}>
        <AnimatePresence>
          {sel !== null && fotos[sel] && (
            <motion.div
              className="c3d-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button className="lb-btn" onClick={() => mover(-1)} aria-label="Anterior">‹</button>
              <p className="script">
                {leyenda(fotos[sel], sel)} <small>({sel + 1}/{fotos.length})</small>
              </p>
              <button className="lb-btn" onClick={() => mover(1)} aria-label="Siguiente">›</button>
              <button className="btn btn-sm" onClick={() => apiRef.current?.volver()}>
                Alejar ↩
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
