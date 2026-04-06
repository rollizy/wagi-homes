import { supabase } from './supabase'
import type { House } from './types'

// ─── Live Supabase queries ────────────────────────────────────────────────────
// These run after schema.sql + seed.sql have been applied to Supabase.

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

// ─── Static fallback — local mock data ───────────────────────────────────────
// Uncomment MOCK_HOUSES + the sync getHouseById below, and comment the
// Supabase functions above, to run the app without a database connection.

// import type { House } from './types'

// export const MOCK_HOUSES: House[] = [
//   {
//     id: 'ha-siwela',
//     name: 'Ha Siwela',
//     title: 'Private Retreat · Koro Creek Golf & Nature Reserve',
//     location: 'Limpopo, South Africa',
//     description:
//       'Ha Siwela is a private retreat set within the Koro Creek estate — a golf resort, lodge and nature reserve. ' +
//       'The design responds to the landscape through glazed gable windows, natural materials and a master suite that ' +
//       'occupies the entire first floor. The walk-in-closet captures morning light through floor-to-ceiling glazing, ' +
//       'creating a warm and welcoming atmosphere. The master suite houses a lounge, bedroom area, large balcony, ' +
//       'walk-in-closet and bathroom — all oriented toward the surrounding bush.',
//     cover_image_url: 'https://pub-ba20e8c941504eaeab9c231e16fadea0.r2.dev/wagi-panoramas/HaSiwela/cover_image_url.jpg',
//     date_designed: '2021',
//     build_status: 'Completed',
//     floor_area_sqm: 420,
//     typology: 'Private Residence',
//     rooms: [
//       {
//         id: 'walk-in-closet',
//         label: 'Walk-In Closet',
//         panorama_url: 'https://pub-ba20e8c941504eaeab9c231e16fadea0.r2.dev/wagi-panoramas/HaSiwela/closet.png',
//         hotspots: [
//           { id: 'hs-closet-to-lounge', pitch: -5, yaw: -90, type: 'room_link', label: 'First-Floor Lounge', target_room_id: 'first-floor-lounge' },
//           { id: 'hs-closet-glazing',   pitch: 15,  yaw: 0,   type: 'feature',   label: 'Glazed Gable Windows', description: 'Full-height gable glazing draws northern light deep into the closet, eliminating the need for artificial lighting during daylight hours.' },
//           { id: 'hs-closet-joinery',   pitch: -10, yaw: 120, type: 'material',  label: 'Custom Joinery',       description: 'Smoked oak veneer with brushed brass handles — all joinery designed and manufactured by local Limpopo craftsmen.' },
//         ],
//       },
//       {
//         id: 'first-floor-lounge',
//         label: 'First-Floor Lounge',
//         panorama_url: 'https://pub-ba20e8c941504eaeab9c231e16fadea0.r2.dev/wagi-panoramas/HaSiwela/lounge.png',
//         hotspots: [
//           { id: 'hs-lounge-to-closet',  pitch: -5,  yaw: 90, type: 'room_link', label: 'Walk-In Closet',       target_room_id: 'walk-in-closet' },
//           { id: 'hs-lounge-fireplace',  pitch: -10, yaw: 0,  type: 'feature',   label: 'Double-Sided Fireplace', description: 'Raw Zimbabwean granite cladding — serves both the lounge and the bedroom area beyond.' },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'ha-majoe',
//     name: 'Ha Majoe',
//     title: 'Contemporary Residence · Waterberg Biosphere',
//     location: 'Waterberg, Limpopo',
//     description:
//       'Ha Majoe sits lightly on a rocky ridge within the Waterberg Biosphere Reserve. ' +
//       'The design is driven by passive climatic principles — deep overhangs, cross-ventilation and ' +
//       'a rammed earth plinth that anchors the structure to the hillside. Living spaces open fully ' +
//       'to a continuous wraparound terrace with uninterrupted views across the reserve.',
//     cover_image_url: 'https://pub-ba20e8c941504eaeab9c231e16fadea0.r2.dev/wagi-panoramas/HaMajoe/cover_image_url.jpg',
//     date_designed: '2023',
//     build_status: 'Under Construction',
//     floor_area_sqm: 310,
//     typology: 'Private Residence',
//     rooms: [
//       {
//         id: 'open-plan',
//         label: 'Open-Plan Living',
//         panorama_url: 'https://pannellum.org/images/cerro-toco-0.jpg',
//         hotspots: [
//           { id: 'hs-open-to-terrace',    pitch: 0,   yaw: 45,  type: 'room_link', label: 'Terrace',           target_room_id: 'terrace' },
//           { id: 'hs-open-rammed-earth',  pitch: -15, yaw: 180, type: 'material',  label: 'Rammed Earth Wall', description: 'On-site soil compressed in 150mm lifts. Thermal mass stabilises interior temperature within 2°C year-round.' },
//         ],
//       },
//       {
//         id: 'terrace',
//         label: 'Terrace',
//         panorama_url: 'https://pannellum.org/images/alma.jpg',
//         hotspots: [
//           { id: 'hs-terrace-to-open',   pitch: 0,  yaw: 180, type: 'room_link', label: 'Open-Plan Living', target_room_id: 'open-plan' },
//           { id: 'hs-terrace-overhang',  pitch: 20, yaw: 0,   type: 'feature',   label: 'Deep Overhang',    description: '2.4m cantilever calculated to exclude summer sun entirely while admitting full winter sun — no mechanical cooling required.' },
//         ],
//       },
//     ],
//   },
// ]

// export function getHouseById(id: string): House | null {
//   return MOCK_HOUSES.find((h) => h.id === id) ?? null
// }
