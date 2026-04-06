// Home page — lists all available properties
import Link from 'next/link'
import Image from 'next/image'
import { BedDouble, Bath, Maximize2, MapPin } from 'lucide-react'
import { getHouses } from '@/lib/mock-data'
import type { House } from '@/lib/types'

export default async function HomePage() {
  const houses = await getHouses()

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-brand-500">
          Wagi Homes
        </h1>
        <p className="text-sm text-gray-400">Virtual Property Tours · South Africa</p>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-4xl font-extrabold mb-3">
          Explore Homes in <span className="text-brand-500">360°</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Walk through every room before you visit. Click any property below to start
          your immersive tour.
        </p>
      </section>

      {/* Property grid */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>
      </section>
    </main>
  )
}

function HouseCard({ house }: { house: House }) {
  return (
    <Link
      href={`/house/${house.id}`}
      className="group block rounded-2xl overflow-hidden bg-gray-900 border border-gray-800
                 hover:border-brand-500 transition-all duration-200 hover:shadow-lg
                 hover:shadow-brand-500/10"
    >
      {/* Cover image */}
      <div className="relative w-full h-48 bg-gray-800">
        {house.cover_image_url && (
          <Image
            src={house.cover_image_url}
            alt={house.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {/* Price badge */}
        {house.price && (
          <span className="absolute top-3 right-3 bg-brand-600 text-white text-xs
                           font-semibold px-2 py-1 rounded-full">
            {house.price}
          </span>
        )}
        {/* Tour count badge */}
        <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs
                         px-2 py-1 rounded-full backdrop-blur-sm">
          {house.rooms.length} room{house.rooms.length !== 1 ? 's' : ''} · 360° tour
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-white truncate">{house.name}</h3>
        <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
          <MapPin size={12} />
          {house.address}
        </p>

        <div className="flex items-center gap-4 mt-3 text-gray-400 text-sm">
          <span className="flex items-center gap-1">
            <BedDouble size={14} /> {house.bedrooms} bed
          </span>
          <span className="flex items-center gap-1">
            <Bath size={14} /> {house.bathrooms} bath
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={14} /> {house.size_sqm} m²
          </span>
        </div>
      </div>
    </Link>
  )
}
