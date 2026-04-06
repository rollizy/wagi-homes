// Mock data for local development.
// Replace this with real Supabase queries once your DB is set up.
// Panorama URLs below point to free sample 360° images from Pannellum's demo.

import { supabase } from './supabase'
import type { House } from './types'


// export const MOCK_HOUSES: House[] = [
//   {
//     id: 'sandton-unit-14',
//     name: 'Sandton Estate – Unit 14',
//     address: '14 Acacia Drive, Sandton, Gauteng',
//     description: 'Modern 3-bedroom family home with open-plan living areas and a landscaped garden.',
//     cover_image_url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
//     bedrooms: 3,
//     bathrooms: 2,
//     size_sqm: 210,
//     price: 'R 2 450 000',
//     rooms: [
//       {
//         id: 'lounge',
//         label: 'Lounge',
//         // Free sample panorama from Pannellum docs
//         panorama_url: 'https://pannellum.org/images/alma.jpg',
//         hotspots: [
//           {
//             id: 'hs-lounge-to-kitchen',
//             pitch: -5,
//             yaw: 90,
//             type: 'room_link',
//             label: 'Go to Kitchen',
//             target_room_id: 'kitchen',
//           },
//           {
//             id: 'hs-lounge-couch',
//             pitch: -10,
//             yaw: -30,
//             type: 'product',
//             label: 'Grey L-Shape Couch',
//             product_price: 'R 8 999',
//             product_retailer: 'Mr Price Home',
//             product_url: 'https://www.mrpricehome.co.za',
//           },
//           {
//             id: 'hs-lounge-info',
//             pitch: 15,
//             yaw: 170,
//             type: 'info',
//             label: 'Ceiling Height',
//             description: 'Double-volume ceiling at 5.4m with exposed Oregon pine beams.',
//           },
//         ],
//       },
//       {
//         id: 'kitchen',
//         label: 'Kitchen',
//         panorama_url: 'https://pannellum.org/images/cerro-toco-0.jpg',
//         hotspots: [
//           {
//             id: 'hs-kitchen-to-lounge',
//             pitch: -5,
//             yaw: -90,
//             type: 'room_link',
//             label: 'Back to Lounge',
//             target_room_id: 'lounge',
//           },
//           {
//             id: 'hs-kitchen-island',
//             pitch: -15,
//             yaw: 10,
//             type: 'product',
//             label: 'Granite Island Countertop',
//             product_price: 'R 12 500',
//             product_retailer: 'Builders Warehouse',
//             product_url: 'https://www.builders.co.za',
//           },
//         ],
//       },
//       {
//         id: 'main-bedroom',
//         label: 'Main Bedroom',
//         panorama_url: 'https://pannellum.org/images/bma-0.jpg',
//         hotspots: [
//           {
//             id: 'hs-bed-to-lounge',
//             pitch: -5,
//             yaw: 180,
//             type: 'room_link',
//             label: 'Back to Lounge',
//             target_room_id: 'lounge',
//           },
//           {
//             id: 'hs-bed-frame',
//             pitch: -20,
//             yaw: 0,
//             type: 'product',
//             label: 'King Bed Frame – Walnut',
//             product_price: 'R 6 499',
//             product_retailer: '@home',
//             product_url: 'https://www.homechoice.co.za',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'cape-town-unit-3',
//     name: 'Atlantic Seaboard – Unit 3',
//     address: '3 Clifton Road, Cape Town, Western Cape',
//     description: 'Contemporary apartment with ocean views and sleek minimalist finishes.',
//     cover_image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
//     bedrooms: 2,
//     bathrooms: 1,
//     size_sqm: 120,
//     price: 'R 3 800 000',
//     rooms: [
//       {
//         id: 'open-plan',
//         label: 'Open Plan Living',
//         panorama_url: 'https://pannellum.org/images/cerro-toco-0.jpg',
//         hotspots: [
//           {
//             id: 'hs-open-to-balcony',
//             pitch: 0,
//             yaw: 45,
//             type: 'room_link',
//             label: 'Step onto Balcony',
//             target_room_id: 'balcony',
//           },
//         ],
//       },
//       {
//         id: 'balcony',
//         label: 'Balcony',
//         panorama_url: 'https://pannellum.org/images/alma.jpg',
//         hotspots: [
//           {
//             id: 'hs-balcony-to-open',
//             pitch: 0,
//             yaw: 180,
//             type: 'room_link',
//             label: 'Back Inside',
//             target_room_id: 'open-plan',
//           },
//           {
//             id: 'hs-balcony-chairs',
//             pitch: -15,
//             yaw: 20,
//             type: 'product',
//             label: 'Outdoor Chair Set',
//             product_price: 'R 3 299',
//             product_retailer: 'Woolworths Home',
//             product_url: 'https://www.woolworths.co.za',
//           },
//         ],
//       },
//     ],
//   },
// ]

// Create DB call — replace body with houses from suprtbase db
export async function getHouses(): Promise<House[]> {
  const { data, error } = await supabase
    .from('houses')
    .select(`*, rooms(*, hotspots(*))`)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as House[]
}

export async function getHouseById(id: string): Promise<House | null> {
  const { data, error } = await supabase
    .from('houses')
    .select(`*, rooms(*, hotspots(*))`)
    .eq('id', id)
    .single()

  if (error) return null
  return data as House
}