-- ─────────────────────────────────────────────────────────────────────────────
-- Wagi Ochre – Seed Data
-- Mirrors the data in lib/mock-data.ts exactly.
-- Run AFTER schema.sql in the Supabase SQL editor.
-- Safe to re-run — uses ON CONFLICT DO NOTHING.
-- ─────────────────────────────────────────────────────────────────────────────


-- ══════════════════════════════════════════════════════════════════════════════
-- PROJECT 1: Ha Siwela
-- ══════════════════════════════════════════════════════════════════════════════

insert into houses (id, name, title, location, description, cover_image_url, date_designed, build_status, floor_area_sqm, typology)
values (
  'ha-siwela',
  'Ha Siwela',
  'Private Retreat · Koro Creek Golf & Nature Reserve',
  'Limpopo, South Africa',
  'Ha Siwela is a private retreat set within the Koro Creek estate — a golf resort, lodge and nature reserve. The design responds to the landscape through glazed gable windows, natural materials and a master suite that occupies the entire first floor. The walk-in-closet captures morning light through floor-to-ceiling glazing, creating a warm and welcoming atmosphere. The master suite houses a lounge, bedroom area, large balcony, walk-in-closet and bathroom — all oriented toward the surrounding bush.',
  'https://pub-ba20e8c941504eaeab9c231e16fadea0.r2.dev/wagi-panoramas/HaSiwela/cover_image_url.jpg',
  '2021',
  'Completed',
  420,
  'Private Residence'
)
on conflict (id) do nothing;

-- ── Ha Siwela · Rooms ────────────────────────────────────────────────────────

insert into rooms (id, house_id, label, panorama_url, sort_order)
values
  ('walk-in-closet',    'ha-siwela', 'Walk-In Closet',    'https://pub-ba20e8c941504eaeab9c231e16fadea0.r2.dev/wagi-panoramas/HaSiwela/closet.png', 0),
  ('first-floor-lounge','ha-siwela', 'First-Floor Lounge', 'https://pub-ba20e8c941504eaeab9c231e16fadea0.r2.dev/wagi-panoramas/HaSiwela/lounge.png', 1)
on conflict (id, house_id) do nothing;

-- ── Ha Siwela · Hotspots — Walk-In Closet ────────────────────────────────────

insert into hotspots (id, room_id, house_id, pitch, yaw, type, label, target_room_id, description)
values
  (
    'hs-closet-to-lounge', 'walk-in-closet', 'ha-siwela',
    -5, -90, 'room_link', 'First-Floor Lounge',
    'first-floor-lounge', null
  ),
  (
    'hs-closet-glazing', 'walk-in-closet', 'ha-siwela',
    15, 0, 'feature', 'Glazed Gable Windows',
    null,
    'Full-height gable glazing draws northern light deep into the closet, eliminating the need for artificial lighting during daylight hours.'
  ),
  (
    'hs-closet-joinery', 'walk-in-closet', 'ha-siwela',
    -10, 120, 'material', 'Custom Joinery',
    null,
    'Smoked oak veneer with brushed brass handles — all joinery designed and manufactured by local Limpopo craftsmen.'
  )
on conflict (id, room_id, house_id) do nothing;

-- ── Ha Siwela · Hotspots — First-Floor Lounge ────────────────────────────────

insert into hotspots (id, room_id, house_id, pitch, yaw, type, label, target_room_id, description)
values
  (
    'hs-lounge-to-closet', 'first-floor-lounge', 'ha-siwela',
    -5, 90, 'room_link', 'Walk-In Closet',
    'walk-in-closet', null
  ),
  (
    'hs-lounge-fireplace', 'first-floor-lounge', 'ha-siwela',
    -10, 0, 'feature', 'Double-Sided Fireplace',
    null,
    'Raw Zimbabwean granite cladding — serves both the lounge and the bedroom area beyond.'
  )
on conflict (id, room_id, house_id) do nothing;


-- ══════════════════════════════════════════════════════════════════════════════
-- PROJECT 2: Ha Majoe
-- ══════════════════════════════════════════════════════════════════════════════

insert into houses (id, name, title, location, description, cover_image_url, date_designed, build_status, floor_area_sqm, typology)
values (
  'ha-majoe',
  'Ha Majoe',
  'Contemporary Residence · Waterberg Biosphere',
  'Waterberg, Limpopo',
  'Ha Majoe sits lightly on a rocky ridge within the Waterberg Biosphere Reserve. The design is driven by passive climatic principles — deep overhangs, cross-ventilation and a rammed earth plinth that anchors the structure to the hillside. Living spaces open fully to a continuous wraparound terrace with uninterrupted views across the reserve.',
  'https://pub-ba20e8c941504eaeab9c231e16fadea0.r2.dev/wagi-panoramas/HaMajoe/cover_image_url.jpg',
  '2023',
  'Under Construction',
  310,
  'Private Residence'
)
on conflict (id) do nothing;

-- ── Ha Majoe · Rooms ─────────────────────────────────────────────────────────

insert into rooms (id, house_id, label, panorama_url, sort_order)
values
  ('open-plan', 'ha-majoe', 'Open-Plan Living', 'https://pannellum.org/images/cerro-toco-0.jpg', 0),
  ('terrace',   'ha-majoe', 'Terrace',          'https://pannellum.org/images/alma.jpg',          1)
on conflict (id, house_id) do nothing;

-- ── Ha Majoe · Hotspots — Open-Plan Living ───────────────────────────────────

insert into hotspots (id, room_id, house_id, pitch, yaw, type, label, target_room_id, description)
values
  (
    'hs-open-to-terrace', 'open-plan', 'ha-majoe',
    0, 45, 'room_link', 'Terrace',
    'terrace', null
  ),
  (
    'hs-open-rammed-earth', 'open-plan', 'ha-majoe',
    -15, 180, 'material', 'Rammed Earth Wall',
    null,
    'On-site soil compressed in 150mm lifts. Thermal mass stabilises interior temperature within 2°C year-round.'
  )
on conflict (id, room_id, house_id) do nothing;

-- ── Ha Majoe · Hotspots — Terrace ────────────────────────────────────────────

insert into hotspots (id, room_id, house_id, pitch, yaw, type, label, target_room_id, description)
values
  (
    'hs-terrace-to-open', 'terrace', 'ha-majoe',
    0, 180, 'room_link', 'Open-Plan Living',
    'open-plan', null
  ),
  (
    'hs-terrace-overhang', 'terrace', 'ha-majoe',
    20, 0, 'feature', 'Deep Overhang',
    null,
    '2.4m cantilever calculated to exclude summer sun entirely while admitting full winter sun — no mechanical cooling required.'
  )
on conflict (id, room_id, house_id) do nothing;
