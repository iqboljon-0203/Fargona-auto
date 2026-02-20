
// Server component — NO 'use client'
import { carsData, getCarById } from '@/data/carsData'
import { notFound } from 'next/navigation'
import CarDetailClient from './CarDetailClient'

export function generateStaticParams() {
  return carsData.map(car => ({ id: car.id }))
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const car = getCarById(id)
  if (!car) notFound()
  return <CarDetailClient car={car} />
}
