import { useMemo } from 'react'

// Corazones flotando en el fondo
export default function Corazones({ cantidad = 18 }) {
  const items = useMemo(
    () =>
      Array.from({ length: cantidad }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 22,
        dur: 9 + Math.random() * 12,
        delay: -Math.random() * 20,
        emoji: ['❤', '💕', '💖', '✨'][i % 4],
      })),
    [cantidad],
  )
  return (
    <div className="corazones" aria-hidden="true">
      {items.map((c) => (
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
