'use client'
// Side panel that slides in when the user clicks a product or info hotspot.

import { X, ExternalLink, Tag, Store } from 'lucide-react'
import clsx from 'clsx'
import type { Hotspot } from '@/lib/types'

interface Props {
  hotspot: Hotspot | null
  onClose: () => void
}

export default function HotspotPanel({ hotspot, onClose }: Props) {
  return (
    <div
      className={clsx(
        'absolute top-0 right-0 h-full w-80 max-w-[90vw] bg-gray-900/95 backdrop-blur-sm',
        'border-l border-gray-800 shadow-2xl z-20 flex flex-col',
        'transition-transform duration-300 ease-in-out',
        hotspot ? 'translate-x-0' : 'translate-x-full',
      )}
      aria-hidden={!hotspot}
    >
      {hotspot && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <span
              className={clsx(
                'text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full',
                hotspot.type === 'product' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white',
              )}
            >
              {hotspot.type === 'product' ? 'Product' : 'Info'}
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close panel"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
            <h2 className="text-lg font-semibold leading-tight">{hotspot.label}</h2>

            {/* Product details */}
            {hotspot.type === 'product' && (
              <div className="space-y-3">
                {hotspot.product_price && (
                  <div className="flex items-center gap-2 text-brand-400 font-bold text-xl">
                    <Tag size={18} />
                    {hotspot.product_price}
                  </div>
                )}
                {hotspot.product_retailer && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Store size={14} />
                    {hotspot.product_retailer}
                  </div>
                )}
                {hotspot.product_url && (
                  <a
                    href={hotspot.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full justify-center
                               bg-brand-600 hover:bg-brand-700 text-white
                               rounded-xl px-4 py-2.5 text-sm font-medium
                               transition-colors duration-150"
                  >
                    View Product
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            )}

            {/* Info details */}
            {hotspot.type === 'info' && hotspot.description && (
              <p className="text-gray-300 text-sm leading-relaxed">
                {hotspot.description}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
