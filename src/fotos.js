// Carga AUTOMÁTICAMENTE todas las imágenes de la carpeta /fotos (raíz del proyecto).
// Solo agrega o quita archivos de esa carpeta: no hay que tocar código.
const modulos = import.meta.glob(
  '/fotos/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP,GIF,AVIF}',
  { eager: true, import: 'default' },
)

const collator = new Intl.Collator('es', { numeric: true, sensitivity: 'base' })

export const fotos = Object.entries(modulos)
  .map(([ruta, src]) => ({ nombre: ruta.split('/').pop(), src }))
  .sort((a, b) => collator.compare(a.nombre, b.nombre))
