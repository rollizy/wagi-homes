'use client'
// Bottom navigation bar — shows all rooms in the house as clickable tabs.

import Image from 'next/image'
import clsx from 'clsx'
import type { Room } from '@/lib/types'

interface Props {
  rooms: Room[]
  activeRoomId: string
  onSelect: (room: Room) => void
}

export default function RoomNav({ rooms, activeRoomId, onSelect }: Props) {
  return (
    <nav
      className="shrink-0 border-t border-gray-800 bg-gray-900 px-4 py-2
                 flex items-center gap-3 overflow-x-auto scrollbar-none"
      aria-label="Room navigation"
    >
      {rooms.map((room) => {
        const isActive = room.id === activeRoomId
        return (
          <button
            key={room.id}
            onClick={() => onSelect(room)}
            className={clsx(
              'flex flex-col items-center gap-1 shrink-0 rounded-xl px-3 py-2',
              'transition-all duration-150 text-xs font-medium',
              isActive
                ? 'bg-brand-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
            )}
            aria-current={isActive ? 'true' : undefined}
          >
            {/* Thumbnail (optional) */}
            {room.thumbnail_url ? (
              <div className="relative w-14 h-10 rounded-lg overflow-hidden">
                <Image
                  src={room.thumbnail_url}
                  alt={room.label}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className={clsx(
                  'w-14 h-10 rounded-lg flex items-center justify-center text-lg',
                  isActive ? 'bg-brand-700' : 'bg-gray-800',
                )}
              >
                {roomEmoji(room.label)}
              </div>
            )}
            <span className="max-w-[60px] truncate">{room.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

// Simple emoji mapping — add more as needed
function roomEmoji(label: string): string {
  const l = label.toLowerCase()
  if (l.includes('kitchen'))   return '🍳'
  if (l.includes('bedroom'))   return '🛏'
  if (l.includes('bathroom'))  return '🚿'
  if (l.includes('lounge') || l.includes('living')) return '🛋'
  if (l.includes('garden') || l.includes('yard'))   return '🌿'
  if (l.includes('balcony') || l.includes('patio')) return '🏙'
  if (l.includes('garage'))    return '🚗'
  if (l.includes('study') || l.includes('office'))  return '📚'
  return '🏠'
}
