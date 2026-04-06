-- ─────────────────────────────────────────────────────────────────────────────
-- Wagi Ochre – Supabase Database Schema
-- Run this in the Supabase SQL editor:
--   https://app.supabase.com → SQL Editor → New Query → paste → Run
--
-- To reset cleanly, run the DROP section first, then re-run the CREATE section.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── DROP (uncomment if you need to reset) ────────────────────────────────────
-- drop table if exists hotspots cascade;
-- drop table if exists rooms     cascade;
-- drop table if exists houses    cascade;
-- drop type  if exists build_status_enum;
-- drop type  if exists hotspot_type_enum;

-- ── ENUMS ────────────────────────────────────────────────────────────────────

create type build_status_enum as enum (
  'Completed',
  'Under Construction',
  'Concept',
  'In Development'
);

create type hotspot_type_enum as enum (
  'room_link',
  'feature',
  'material',
  'info'
);

-- ── HOUSES ───────────────────────────────────────────────────────────────────
-- One row per project. Each house gets its own /house/[id] tour URL.

create table if not exists houses (
  id              text               primary key,  -- e.g. 'ha-siwela'
  name            text               not null,     -- e.g. 'Ha Siwela'
  title           text               not null,     -- e.g. 'Private Retreat · Koro Creek'
  location        text               not null,     -- e.g. 'Limpopo, South Africa'
  description     text,
  cover_image_url text,
  date_designed   text               not null,     -- e.g. '2021'
  build_status    build_status_enum  not null default 'Completed',
  floor_area_sqm  integer            not null default 0,
  typology        text               not null default 'Private Residence',
  created_at      timestamptz        default now()
);

-- ── ROOMS ─────────────────────────────────────────────────────────────────────
-- One row per room per house.

create table if not exists rooms (
  id            text    not null,           -- e.g. 'walk-in-closet'
  house_id      text    not null references houses(id) on delete cascade,
  label         text    not null,           -- e.g. 'Walk-In Closet'
  panorama_url  text    not null,           -- full CDN URL to equirectangular image
  thumbnail_url text,
  sort_order    integer not null default 0,
  primary key (id, house_id)
);

-- ── HOTSPOTS ──────────────────────────────────────────────────────────────────
-- One row per interactive point inside a room's panorama.

create table if not exists hotspots (
  id              text               not null,
  room_id         text               not null,
  house_id        text               not null,
  pitch           real               not null,   -- vertical angle   (-90 floor → 90 ceiling)
  yaw             real               not null,   -- horizontal angle (0 front, ±180 back)
  type            hotspot_type_enum  not null,
  label           text               not null,
  -- room_link fields
  target_room_id  text,
  -- feature / material / info fields
  description     text,
  detail_url      text,                          -- optional spec sheet link
  primary key (id, room_id, house_id),
  foreign key (room_id, house_id) references rooms(id, house_id) on delete cascade
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────────────

alter table houses    enable row level security;
alter table rooms     enable row level security;
alter table hotspots  enable row level security;

-- Public read — anyone can browse projects
create policy "Public can read houses"    on houses    for select using (true);
create policy "Public can read rooms"     on rooms     for select using (true);
create policy "Public can read hotspots"  on hotspots  for select using (true);
