'use client'
// This is the main client component for a house tour.
// It owns the "which room am I viewing" state and coordinates all child components.

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'
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
      // product or info — open the side panel
      setActiveHotspot(hotspot)
    }
  }

  function handleRoomSelect(room: Room) {
    setActiveHotspot(null)
    setActiveRoom(room)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950 overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 shrink-0 z-10">
        <Link
          href="/"
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Back to listings"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold truncate">{house.name}</h1>
          <p className="text-xs text-gray-400 flex items-center gap-1 truncate">
            <MapPin size={10} />
            {house.address}
          </p>
        </div>
        <span className="text-xs text-gray-500 hidden sm:block">
          {activeRoom.label}
        </span>
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
