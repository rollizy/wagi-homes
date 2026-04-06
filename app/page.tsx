import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, Maximize2, Tag } from 'lucide-react'
import { getHouses } from '@/lib/mock-data'
import type { House } from '@/lib/types'

export default async function HomePage() {
  const houses = await getHouses()

  return (
    <main className="min-h-screen bg-sand-50">
      {/* Header */}
      <header className="border-b border-sand-200 px-8 py-5 flex items-center justify-between bg-sand-50">
        <Image
          src="/panoramas/logo.png"
          alt="Wagi Ochre"
          width={72}
          height={72}
          className="object-contain"
          priority
        />
        <p className="text-xs tracking-[0.2em] uppercase text-ochre-600 font-light">
          Architecture & Interior Design Portfolio
        </p>
      </header>

      {/* Hero */}
      <section className="px-8 pt-20 pb-14 text-center relative overflow-hidden">
        {/* Decorative geometry */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <div className="w-[500px] h-[500px] border border-ochre-500 rotate-45" />
          <div className="absolute w-[340px] h-[340px] border border-ochre-500 rotate-12" />
        </div>

        <p className="text-xs tracking-[0.3em] uppercase text-ochre-500 mb-5 font-light">Selected Works</p>
        <h2
          className="text-5xl md:text-6xl font-light text-stone mb-5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Architecture that<br />
          <span className="text-ochre-500 italic">belongs to its place</span>
        </h2>
        <p className="text-sand-400 max-w-lg mx-auto text-sm leading-relaxed">
          Each project is a response to site, climate and the lives of those who inhabit it.
          Select a work below to explore it in immersive 360°.
        </p>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4 px-8 pb-12 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-sand-200" />
        <span className="text-ochre-500 text-xs tracking-[0.3em] uppercase">Projects</span>
        <div className="flex-1 h-px bg-sand-200" />
      </div>

      {/* Project grid */}
      <section className="px-8 pb-28 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {houses.map((house) => (
            <ProjectCard key={house.id} house={house} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sand-200 px-8 py-6 text-center">
        <p className="text-xs tracking-widest uppercase text-sand-400">
          Wagi Ochre · Architecture & Interiors · South Africa
        </p>
      </footer>
    </main>
  )
}

const statusColors: Record<string, string> = {
  'Completed':         'bg-ochre-100 text-ochre-700 border-ochre-300',
  'Under Construction':'bg-sand-100 text-stone border-sand-300',
  'Concept':           'bg-sand-50  text-sand-400 border-sand-200',
  'In Development':    'bg-sand-100 text-stone border-sand-300',
}

function ProjectCard({ house }: { house: House }) {
  return (
    <Link
      href={`/house/${house.id}`}
      className="group block bg-sand-100 border border-sand-200
                 hover:border-ochre-400 transition-all duration-300
                 hover:shadow-lg hover:shadow-ochre-500/10"
    >
      {/* Cover image */}
      <div className="relative w-full h-56 bg-sand-200 overflow-hidden">
        {house.cover_image_url && (
          <Image
            src={house.cover_image_url}
            alt={house.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
        {/* Subtle dark gradient at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone/30 to-transparent" />

        {/* Build status badge */}
        <span className={`absolute top-3 left-3 text-xs tracking-wider px-2.5 py-1 border
                          ${statusColors[house.build_status] ?? statusColors['Concept']}`}>
          {house.build_status}
        </span>

        {/* Space count */}
        <span className="absolute bottom-3 right-3 bg-sand-50/90 text-stone text-xs
                         tracking-widest uppercase px-3 py-1 backdrop-blur-sm">
          {house.rooms.length} space{house.rooms.length !== 1 ? 's' : ''} · 360°
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        {/* Project name */}
        <h3
          className="text-2xl font-light text-stone mb-0.5 group-hover:text-ochre-700 transition-colors"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {house.name}
        </h3>
        {/* Subtitle */}
        <p className="text-xs text-ochre-600 tracking-wide mb-3 italic">
          {house.title}
        </p>

        {/* Divider */}
        <div className="h-px bg-sand-200 mb-3" />

        {/* Tags row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-sand-400 tracking-wide">
          <span className="flex items-center gap-1.5">
            <MapPin size={10} className="text-ochre-500" />
            {house.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={10} className="text-ochre-500" />
            {house.date_designed}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize2 size={10} className="text-ochre-500" />
            {house.floor_area_sqm} m²
          </span>
          <span className="flex items-center gap-1.5">
            <Tag size={10} className="text-ochre-500" />
            {house.typology}
          </span>
        </div>
      </div>
    </Link>
  )
}
