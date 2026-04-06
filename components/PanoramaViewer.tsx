'use client'
// Wraps the Pannellum panorama library.
// Pannellum is a pure-JS library so we load it via useEffect (client-side only).

import { useEffect, useRef } from 'react'
import type { Room, Hotspot } from '@/lib/types'

// Pannellum attaches to window — we declare a minimal type here
declare global {
  interface Window {
    pannellum: {
      viewer: (container: string | HTMLElement, config: object) => PannellumViewer
    }
  }
}

interface PannellumViewer {
  destroy: () => void
  lookAt: (pitch: number, yaw: number, hfov: number, animated?: boolean) => void
}

interface Props {
  room: Room
  onHotspotClick: (hotspot: Hotspot) => void
}

export default function PanoramaViewer({ room, onHotspotClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef    = useRef<PannellumViewer | null>(null)

  useEffect(() => {
    // Dynamically load Pannellum CSS + JS on first mount (avoids SSR issues)
    loadPannellum().then(() => {
      if (!containerRef.current || !window.pannellum) return

      // Destroy any previous viewer instance before creating a new one
      viewerRef.current?.destroy()

      viewerRef.current = window.pannellum.viewer(containerRef.current, {
        type: 'equirectangular',
        panorama: room.panorama_url,
        autoLoad: true,
        autoRotate: -1,        // slow auto-rotate until user interacts
        autoRotateInactivityDelay: 3000,
        compass: false,
        showFullscreenCtrl: false,
        showZoomCtrl: false,
        hotSpots: room.hotspots.map((h) => buildHotspot(h, onHotspotClick)),
      })
    })

    return () => {
      viewerRef.current?.destroy()
      viewerRef.current = null
    }
  // Re-initialize viewer every time the active room changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room.id, room.panorama_url])

  return (
    <div
      ref={containerRef}
      id="panorama-container"
      className="w-full h-full"
      style={{ background: '#111' }}
    />
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildHotspot(
  hotspot: Hotspot,
  onClick: (h: Hotspot) => void,
): object {
  const colorClass = {
    room_link: 'hotspot-room-link',
    product:   'hotspot-product',
    info:      'hotspot-info',
  }[hotspot.type]

  const icon = {
    room_link: '→',
    product:   '$',
    info:      'i',
  }[hotspot.type]

  return {
    pitch: hotspot.pitch,
    yaw:   hotspot.yaw,
    type:  'custom',
    text:  hotspot.label,
    cssClass: `custom-hotspot ${colorClass}`,
    createTooltipFunc: (container: HTMLElement) => {
      container.innerHTML = icon
      container.title = hotspot.label
    },
    clickHandlerFunc: () => onClick(hotspot),
  }
}

// Loads Pannellum script + stylesheet once (idempotent)
let pannellumLoaded = false
function loadPannellum(): Promise<void> {
  if (pannellumLoaded || typeof window === 'undefined') {
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    // Stylesheet
    const link = document.createElement('link')
    link.rel  = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
    document.head.appendChild(link)

    // Script
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
    script.onload = () => {
      pannellumLoaded = true
      resolve()
    }
    document.head.appendChild(script)
  })
}
