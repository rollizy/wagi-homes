export type HotspotType = 'room_link' | 'feature' | 'material' | 'info'

export type BuildStatus = 'Completed' | 'Under Construction' | 'Concept' | 'In Development'

export interface Hotspot {
  id: string
  pitch: number
  yaw: number
  type: HotspotType
  label: string

  // room_link
  target_room_id?: string

  // feature / material / info
  description?: string
  detail_url?: string       // optional link to spec sheet, material source, etc.
}

export interface Room {
  id: string
  label: string
  panorama_url: string
  thumbnail_url?: string
  hotspots: Hotspot[]
}

export interface House {
  id: string
  name: string                  // project name e.g. "Ha Siwela"
  title: string                 // subtitle e.g. "Private Retreat · Koro Creek"
  location: string              // e.g. "Limpopo, South Africa"
  description?: string
  cover_image_url?: string
  date_designed: string         // e.g. "2022" or "March 2023"
  build_status: BuildStatus
  floor_area_sqm: number
  typology: string              // e.g. "Private Residence", "Lodge", "Mixed-Use"
  rooms: Room[]
}
