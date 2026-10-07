# moves MVP product brief

## Goal
Help a Howard Homecoming attendee identify a viable event and reach its ticket or RSVP page in about 10 seconds.

## Homepage
1. Compact header: moves / Howard Homecoming 2026
2. 5–6 manually curated Featured events
3. Quick filters: Tonight, 18+, Free, Filters
4. Tonight
5. All Events

Main feed is chronological. Featured is the only curated ranking.

## Event card
Show only flyer, title, date/time, venue, price/access, age, and at most one useful context line.

## Detail
Show full event information, dynamic CTA, organizer/context, and quiet source information.

## Filters
Date, Age, Price, Type, Music.

Public type vocabulary: Party, Day Party, Brunch, Tailgate, Official.

Music: Hip-Hop / R&B, Afrobeats / Amapiano, Caribbean, House, Throwbacks.

## Data rules
- one physical event appears once
- bundle parents do not appear as ordinary feed events
- do not dedupe by title alone
- preserve multiple sources internally
- free access must retain cutoff conditions
- unknown information is omitted, never guessed

## Visual direction
Posh-inspired, dark and restrained. Quiet shell, loud content.

No gradients, glow, glassmorphism, giant hero, fake trending, pill spam, icon-per-field, excessive badges, or unnecessary marketing copy.

## Build order
Data/schema → static mobile shell → visual critique → real feed → filters → event detail → map → submission → QA → launch.
