'use client'
// This is the main client component for a house tour.
// It owns the "which room am I viewing" state and coordinates all child components.

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { House, Room, Hotspot } from '@/lib/types'
import PanoramaViewer from './PanoramaViewer'
import RoomNav from './RoomNav'
import HotspotPanel from './HotspotPanel'

interface Props {
  house: House
}

export default function HouseTourClient({ house }: Props) {
  const [activeRoom, setActiveRoom] = useState<Room>(house.rooms[0])
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)

  function handleHotspotClick(hotspot: Hotspot) {
    if (hotspot.type === 'room_link' && hotspot.target_room_id) {
      const target = house.rooms.find((r) => r.id === hotspot.target_room_id)
      if (target) {
        setActiveHotspot(null)
        setActiveRoom(target)
      }
    } else {
      // Toggle: clicking the same hotspot again closes the panel
      setActiveHotspot((prev) => (prev?.id === hotspot.id ? null : hotspot))
    }
  }

  function handleRoomSelect(room: Room) {
    setActiveHotspot(null)
    setActiveRoom(room)
  }

  return (
    <div className="flex flex-col h-screen bg-navy-900 overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-5 py-3 border-b border-navy-600 bg-navy-800 shrink-0 z-10">
        <Link
          href="/"
          className="text-ochre-600 hover:text-ochre-400 transition-colors"
          aria-label="Back to listings"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="w-px h-5 bg-navy-600" />
        <div className="flex-1 min-w-0">
          <h1
            className="text-sm font-light text-cream truncate"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
          >
            {house.name}
          </h1>
          <p className="text-xs text-ochre-600 truncate tracking-wide italic">
            {house.title}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs">
          <span className="text-ochre-700 tracking-widest uppercase">{house.date_designed}</span>
          <span className="w-px h-3 bg-navy-500" />
          <span className="text-ochre-500 tracking-widest uppercase">{activeRoom.label}</span>
        </div>
      </header>

      {/* Main viewer area */}
      <div className="flex-1 relative overflow-hidden">
        <PanoramaViewer
          room={activeRoom}
          onHotspotClick={handleHotspotClick}
        />

        {/* Hotspot side panel (slides in from the right) */}
        <HotspotPanel
          hotspot={activeHotspot}
          onClose={() => setActiveHotspot(null)}
        />
      </div>

      {/* Room navigation bar at the bottom */}
      <RoomNav
        rooms={house.rooms}
        activeRoomId={activeRoom.id}
        onSelect={handleRoomSelect}
      />
    </div>
  )
}
