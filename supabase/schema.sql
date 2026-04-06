-- ─────────────────────────────────────────────────────────────────────────────
-- Wagi Homes – Supabase Database Schema
-- Run this in the Supabase SQL editor:
--   https://app.supabase.com → SQL Editor → New Query → paste → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- Houses table
-- One row per property. Each house gets its own /house/[id] tour URL.
create table if not exists houses (
  id              text primary key,           -- e.g. 'sandton-unit-14'
  name            text not null,              -- e.g. 'Sandton Estate – Unit 14'
  address         text not null,
  description     text,
  cover_image_url text,
  bedrooms        integer not null default 1,
  bathrooms       integer not null default 1,
  size_sqm        integer not null default 0,
  price           text,                       -- e.g. 'R 2 450 000'
  created_at      timestamptz default now()
);

-- Rooms table
-- One row per room per house (lounge, kitchen, bedroom, etc.)
create table if not exists rooms (
  id              text not null,              -- e.g. 'lounge'
  house_id        text not null references houses(id) on delete cascade,
  label           text not null,              -- e.g. 'Lounge'
  panorama_url    text not null,              -- full CDN URL to 360° image
  thumbnail_url   text,
  sort_order      integer not null default 0,
  primary key (id, house_id)
);

-- Hotspots table
-- One row per interactive point inside a room's panorama.
create table if not exists hotspots (
  id                text not null,
  room_id           text not null,
  house_id          text not null,
  pitch             real not null,            -- vertical angle
  yaw               real not null,            -- horizontal angle
  type              text not null             -- 'room_link' | 'product' | 'info'
                    check (type in ('room_link', 'product', 'info')),
  label             text not null,
  target_room_id    text,                     -- for room_link type
  product_url       text,                     -- for product type
  product_price     text,
  product_retailer  text,
  description       text,                     -- for info type
  primary key (id, room_id, house_id),
  foreign key (room_id, house_id) references rooms(id, house_id) on delete cascade
);

-- Enable Row Level Security (anyone can read, only authenticated users can write)
alter table houses   enable row level security;
alter table rooms    enable row level security;
alter table hotspots enable row level security;

-- Public read access
create policy "Public can read houses"   on houses   for select using (true);
create policy "Public can read rooms"    on rooms    for select using (true);
create policy "Public can read hotspots" on hotspots for select using (true);
