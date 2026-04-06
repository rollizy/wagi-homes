'use client'

import { X, ExternalLink, Layers, Info, Sparkles } from 'lucide-react'
import clsx from 'clsx'
import type { Hotspot } from '@/lib/types'

interface Props {
  hotspot: Hotspot | null
  onClose: () => void
}

const typeConfig = {
  feature:  { label: 'Design Feature', icon: Sparkles },
  material: { label: 'Material',       icon: Layers   },
  info:     { label: 'Note',           icon: Info     },
  room_link:{ label: 'Navigate',       icon: Info     },
}

export default function HotspotPanel({ hotspot, onClose }: Props) {
  const config = hotspot ? (typeConfig[hotspot.type] ?? typeConfig.info) : null
  const Icon   = config?.icon ?? Info

  return (
    <div
      className={clsx(
        'absolute top-0 right-0 h-full w-80 max-w-[90vw]',
        'bg-white shadow-2xl shadow-stone/20 z-20 flex flex-col',
        'border-l border-sand-200',
        'transition-transform duration-300 ease-in-out',
        hotspot ? 'translate-x-0' : 'translate-x-full',
      )}
      aria-hidden={!hotspot}
    >
      {hotspot && config && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-sand-200 bg-sand-50">
            <span className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-ochre-600 font-medium">
              <Icon size={11} />
              {config.label}
            </span>
            <button
              onClick={onClose}
              className="text-stone/40 hover:text-stone transition-colors"
              aria-label="Close panel"
            >
              <X size={16} />
            </button>
          </div>

          {/* Gold accent line */}
          <div className="h-px bg-gradient-to-r from-ochre-300 via-ochre-500 to-transparent" />

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 bg-white">
            <h2
              className="text-2xl font-light text-stone leading-snug"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.03em' }}
            >
              {hotspot.label}
            </h2>

            {hotspot.description && (
              <p className="text-sm leading-relaxed text-stone/80">
                {hotspot.description}
              </p>
            )}

            {hotspot.detail_url && (
              <>
                <div className="h-px bg-sand-200" />
                <a
                  href={hotspot.detail_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full justify-center
                             border border-ochre-400 text-ochre-600
                             hover:bg-ochre-500 hover:text-white
                             px-4 py-2.5 text-xs tracking-[0.2em] uppercase
                             transition-all duration-200"
                >
                  Specification Sheet
                  <ExternalLink size={11} />
                </a>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
