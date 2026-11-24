// ============================================================
//  ✏️  EDITA ESTE ARCHIVO PARA PERSONALIZAR LA PÁGINA
// ============================================================

export const config = {
  // Nombres que aparecen en la portada
  yo: 'Anthony',
  ella: 'Melany',

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
    'Sé que no soy muy expresivo por chat, y perdóname por eso. Pero quiero que sepas que estoy tratando de mejorar cada día, y lo hago por ti, porque te lo mereces todo.',
    'Quiero que nunca lo olvides: siempre vas a contar conmigo, para lo que sea, en los días buenos y en los difíciles.',
    'Espero que todos nuestros sueños juntos se hagan realidad. Por muchos años más, por muchas fotos más y por toda una vida juntos.',
    'Te amo con todo mi corazón. ❤️',
  ],

  mensajeFinal: '¿Quieres seguir escribiendo nuestra historia conmigo?',
}
