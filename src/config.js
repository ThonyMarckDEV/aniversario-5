// ============================================================
//  ✏️  EDITA ESTE ARCHIVO PARA PERSONALIZAR LA PÁGINA
// ============================================================

export const config = {
  // Nombres que aparecen en la portada
  yo: 'Thony',
  ella: 'Mi amor',

  // Fecha en que empezaron (AAAA-MM-DD). Se usa para el contador
  // y, por defecto, como contraseña de la pantalla de bloqueo.
  fechaInicio: '2021-11-24',

  // Contraseña de la pantalla de bloqueo (solo se comparan los números).
  // Si lo dejas en null, la contraseña es la fecha de inicio en formato DDMMAAAA
  // (ej: 24/11/2021 -> "24112021"). También acepta DDMMAA ("241121").
  password: null,
  pistaPassword: 'Pista: el día que todo empezó 💕 (DD/MM/AAAA)',

  // Canción de fondo: pon un .mp3 en public/musica/ y escribe su nombre aquí.
  // Déjalo en null si no quieres música.
  cancion: 'musica/cancion.mp3',

  // Línea del tiempo: un hito por año. Las fotos se asignan solas
  // (o pon "foto: 'nombre.jpg'" para elegir una de la carpeta fotos/).
  timeline: [
    { anio: '2021', titulo: 'El comienzo', texto: 'El día que te conocí, mi vida cambió para siempre.' },
    { anio: '2022', titulo: 'Nuestro primer año', texto: 'Aprendimos a querernos, a reírnos y a ser equipo.' },
    { anio: '2023', titulo: 'Creciendo juntos', texto: 'Cada aventura contigo se volvió mi recuerdo favorito.' },
    { anio: '2024', titulo: 'Más fuertes', texto: 'Superamos todo tomados de la mano.' },
    { anio: '2025', titulo: 'Nuestro hogar', texto: 'Descubrí que mi lugar favorito es a tu lado.' },
    { anio: '2026', titulo: '¡5 años!', texto: 'Y esto es solo el comienzo de todo lo que nos falta vivir.' },
  ],

  // Frases que aparecen detrás de las fotos al voltearlas (se repiten en ciclo).
  // Para una foto específica usa "leyendas" abajo.
  frases: [
    'Mi momento favorito 💖',
    'Contigo todo es mejor',
    'Te elegiría mil veces',
    'Mi persona favorita',
    'Aquí ya te amaba',
    'Gracias por existir',
    'Nuestra sonrisa favorita',
    'Para siempre tú y yo',
  ],

  // Leyendas específicas por nombre de archivo (opcional)
  // ej: { 'playa.jpg': 'Nuestro primer viaje a la playa 🌊' }
  leyendas: {},

  // Carta (cada elemento es un párrafo)
  carta: [
    'Mi amor:',
    'Hoy cumplimos 5 años juntos y todavía me sorprende lo afortunado que soy de tenerte. Gracias por cada risa, cada abrazo, cada momento difícil que enfrentamos juntos y cada sueño que compartimos.',
    'Eres mi mejor amiga, mi compañera y mi hogar. No hay un solo día en el que no agradezca haberte encontrado.',
    'Por muchos años más, por muchas fotos más y por toda una vida juntos.',
    'Te amo con todo mi corazón. ❤️',
  ],

  mensajeFinal: '¿Quieres seguir escribiendo nuestra historia conmigo?',
}
