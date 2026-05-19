import { useState } from 'react'

const labels = ['', 'Terrible', 'Poor', 'Okay', 'Great', 'Amazing']

function Star({ filled, hovered, size, onMouseEnter, onMouseLeave, onClick }) {
  const color = filled || hovered ? '#ff385c' : 'none'
  const stroke = filled || hovered ? '#ff385c' : '#cfcfcf'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer transition-transform duration-100"
      style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default function StarInput({ value = 0, onChange, size = 36 }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            filled={n <= value}
            hovered={n <= hovered && hovered > 0}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(n)}
          />
        ))}
      </div>
      <span className="text-sm font-semibold min-h-[1.25rem]" style={{ color: value > 0 ? '#ff385c' : '#6a6a6a' }}>
        {value > 0 ? `${value}.0 · ${labels[value]}` : 'Tap a star to rate'}
      </span>
    </div>
  )
}
