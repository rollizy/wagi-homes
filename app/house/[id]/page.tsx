// Individual house tour page — /house/[id]
// Each house has its own URL and its own set of rooms + hotspots.

import { notFound } from 'next/navigation'
import { getHouseById } from '@/lib/mock-data'
import HouseTourClient from '@/components/HouseTourClient'

interface Props {
  params: { id: string }
}

// Next.js will call this at request time (no static generation needed for dynamic data)
export default async function HouseTourPage({ params }: Props) {
  const house = await getHouseById(params.id)

  if (!house) notFound()

  return <HouseTourClient house={house} />
}

// Generate page title dynamically
export async function generateMetadata({ params }: Props) {
  const house = await getHouseById(params.id)
  return {
    title: house ? `${house.name} · Wagi Homes` : 'Tour · Wagi Homes',
  }
}
