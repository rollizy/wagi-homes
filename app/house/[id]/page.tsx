import { notFound } from 'next/navigation'
import { getHouseById } from '@/lib/mock-data'
import HouseTourClient from '@/components/HouseTourClient'

interface Props {
  params: { id: string }
}

export default async function HouseTourPage({ params }: Props) {
  const house = await getHouseById(params.id)

  if (!house) notFound()

  return <HouseTourClient house={house} />
}

export async function generateMetadata({ params }: Props) {
  const house = await getHouseById(params.id)
  return {
    title: house ? `${house.name} · Wagi Ochre` : 'Tour · Wagi Ochre',
  }
}
