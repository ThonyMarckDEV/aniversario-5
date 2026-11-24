// Corazones flotando en el fondo.
// Se generan una sola vez al cargar el módulo (fuera del render) para que
// sus posiciones no cambien en cada re-render.
const CORAZONES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 10 + Math.random() * 22,
  dur: 9 + Math.random() * 12,
  delay: -Math.random() * 20,
  emoji: ['❤', '💕', '💖', '✨'][i % 4],
}))

export default function Corazones() {
  return (
    <div className="corazones" aria-hidden="true">
      {CORAZONES.map((c) => (
        <span
          key={c.id}
          style={{
            left: `${c.left}%`,
            fontSize: c.size,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          {c.emoji}
        </span>
      ))}
    </div>
  )
}
