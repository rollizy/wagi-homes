// ─── Hotspot ─────────────────────────────────────────────────────────────────
// A clickable point placed inside a 360° panorama image.
// pitch/yaw are angles that tell Pannellum where to place the dot in 3D space.

export type HotspotType = 'room_link' | 'product' | 'info'

export interface Hotspot {
  id: string
  pitch: number      // vertical angle  (-90 = floor, 90 = ceiling)
  yaw: number        // horizontal angle (0 = front, ±180 = back)
  type: HotspotType
  label: string

  // Only used when type === 'room_link'
  target_room_id?: string

  // Only used when type === 'product'
  product_url?: string
  product_price?: string       // e.g. "R 4 999"
  product_retailer?: string    // e.g. "Mr Price Home"

  // Only used when type === 'info'
  description?: string
}

// ─── Room ─────────────────────────────────────────────────────────────────────
// One room inside a house. Each room has its own 360° panorama image and
// a list of hotspots that appear inside that panorama.

export interface Room {
  id: string
  label: string               // e.g. "Main Bedroom"
  panorama_url: string        // full URL to the equirectangular .jpg/.webp image
  thumbnail_url?: string      // small preview image for the room nav bar
  hotspots: Hotspot[]
}

// ─── House ───────────────────────────────────────────────────────────────────
// One property. Each house gets its own /house/[id] URL.

export interface House {
  id: string
  name: string                // e.g. "Sandton Estate – Unit 14"
  address: string             // e.g. "14 Acacia Drive, Sandton, GP"
  description?: string
  cover_image_url?: string    // hero image shown on the listing card
  bedrooms: number
  bathrooms: number
  size_sqm: number
  price?: string              // e.g. "R 1 850 000"
  rooms: Room[]
}
