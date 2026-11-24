// Convierte las fotos de /fotos a WebP liviano (máx. 1600 px) para que la página cargue rápido.
// Los originales se mueven a /fotos-originales como respaldo (no se suben a git).
// Uso: npm run fotos
import { mkdir, readdir, rename, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const DIR = path.resolve('fotos')
const RESPALDO = path.resolve('fotos-originales')
const MAX = 1600
const CALIDAD = 80
const EXT = /\.(jpe?g|png|gif|avif|tiff?|heic|webp)$/i

await mkdir(RESPALDO, { recursive: true })
const archivos = (await readdir(DIR)).filter((f) => EXT.test(f))

let antes = 0
let despues = 0
for (const f of archivos) {
  const origen = path.join(DIR, f)
  const base = path.parse(f).name
  const destino = path.join(DIR, `${base}.webp`)
  const esWebp = /\.webp$/i.test(f)
  const tamOrig = (await stat(origen)).size

  // si ya es un webp pequeño, se deja tal cual
  if (esWebp && tamOrig < 600_000) continue

  const respaldo = path.join(RESPALDO, f)
  await rename(origen, respaldo)
  await sharp(respaldo)
    .rotate() // respeta la orientación EXIF del celular
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: CALIDAD, effort: 5 })
    .toFile(destino)

  const tamNuevo = (await stat(destino)).size
  antes += tamOrig
  despues += tamNuevo
  console.log(`✓ ${f}  ${(tamOrig / 1e6).toFixed(1)} MB → ${(tamNuevo / 1e3).toFixed(0)} KB`)
}

const mb = (n) => (n / 1e6).toFixed(1)
console.log(`\nListo: ${mb(antes)} MB → ${mb(despues)} MB. Originales en fotos-originales/`)
