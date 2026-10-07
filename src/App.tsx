import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  events,
  featuredEvents,
  musicOptions,
  typeOptions,
  type EventRecord,
  type EventType,
} from './data/events';

type AgeFilter = 'all' | '18' | '21';
type PriceFilter = 'all' | 'free' | 'under25' | '25to50' | '50plus';

type FilterState = {
  date: string;
  age: AgeFilter;
  price: PriceFilter;
  type: EventType | '';
  music: string;
};

const emptyFilters: FilterState = {
  date: '',
  age: 'all',
  price: 'all',
  type: '',
  music: '',
};

function Poster({
  event,
  compact = false,
}: {
  event: EventRecord;
  compact?: boolean;
}) {
  const darkText = event.posterTone === '#E6E0D6';
  return (
    <div
      className={compact ? 'poster poster--compact' : 'poster'}
      style={{
        backgroundColor: event.posterTone,
        color: darkText ? '#171717' : '#f3f0e9',
      }}
    >
      <span className="poster__eyebrow">HUHC 26</span>
      <span className="poster__title">{event.title}</span>
      {!compact && <span className="poster__venue">{event.venue}</span>}
    </div>
  );
}

function FeaturedCard({
  event,
  onOpen,
}: {
  event: EventRecord;
  onOpen: (event: EventRecord) => void;
}) {
  return (
    <button className="featured-card" onClick={() => onOpen(event)}>
      <Poster event={event} />
      <span className="featured-card__title">{event.title}</span>
      <span className="featured-card__meta">
        {event.dayLabel} · {event.startTime}
      </span>
      <span className="featured-card__meta featured-card__meta--muted">
        {event.priceLabel} · {event.ageLabel}
      </span>
    </button>
  );
}

function EventRow({
  event,
  onOpen,
}: {
  event: EventRecord;
  onOpen: (event: EventRecord) => void;
}) {
  return (
    <button className="event-row" onClick={() => onOpen(event)}>
      <Poster event={event} compact />
      <span className="event-row__copy">
        <span className="event-row__title">{event.title}</span>
        <span className="event-row__meta">
          {event.startTime}–{event.endTime} · {event.venue}
        </span>
        <span className="event-row__meta event-row__meta--strong">
          {event.priceLabel} · {event.ageLabel}
        </span>
        {event.contextLine && (
          <span className="event-row__context">{event.contextLine}</span>
        )}
      </span>
    </button>
  );
}

function Detail({
  event,
  onClose,
}: {
  event: EventRecord;
  onClose: () => void;
}) {
  return (
    <div
      className="detail-shell"
      role="dialog"
      aria-modal="true"
      aria-label={event.title}
    >
      <div className="detail">
        <button
          className="icon-button detail__close"
          onClick={onClose}
          aria-label="Close event"
        >
          <X size={21} />
        </button>
        <Poster event={event} />
        <div className="detail__body">
          <p className="detail__eyebrow">{event.dayLabel}</p>
          <h1>{event.title}</h1>
          <p className="detail__lead">
            {event.startTime}–{event.endTime}
          </p>
          <div className="detail__facts">
            <div>
              <span>Venue</span>
              <strong>{event.venue}</strong>
            </div>
            <div>
              <span>Access</span>
              <strong>{event.priceLabel}</strong>
            </div>
            <div>
              <span>Age</span>
              <strong>{event.ageLabel}</strong>
            </div>
            <div>
              <span>Type</span>
              <strong>{event.eventType}</strong>
            </div>
          </div>
          {event.contextLine && (
            <p className="detail__context">{event.contextLine}</p>
          )}
          <p className="detail__music">{event.musicGroups.join(' · ')}</p>
          <a
            className="primary-cta"
            href={event.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            {event.ctaLabel} <ArrowUpRight size={18} />
          </a>
          <p className="detail__source">
            Source: Posh · research snapshot Oct 5
          </p>
        </div>
      </div>
    </div>
  );
}

function FilterSheet({
  filters,
  onChange,
  onClose,
  onClear,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onClose: () => void;
  onClear: () => void;
}) {
  const dates = [
    ['2026-10-13', 'Tue 13'],
    ['2026-10-15', 'Thu 15'],
    ['2026-10-16', 'Fri 16'],
    ['2026-10-17', 'Sat 17'],
    ['2026-10-18', 'Sun 18'],
  ];
  const button = (active: boolean) =>
    active ? 'filter-option filter-option--active' : 'filter-option';

  return (
    <div className="sheet-backdrop" onMouseDown={onClose}>
      <section
        className="filter-sheet"
        onMouseDown={event => event.stopPropagation()}
      >
        <div className="sheet-head">
          <h2>Filters</h2>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className="filter-block">
          <h3>Date</h3>
          <div className="filter-grid">
            <button
              className={button(filters.date === '')}
              onClick={() => onChange({ ...filters, date: '' })}
            >
              All
            </button>
            {dates.map(([value, label]) => (
              <button
                key={value}
                className={button(filters.date === value)}
                onClick={() => onChange({ ...filters, date: value })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-block">
          <h3>Age</h3>
          <div className="filter-grid">
            <button
              className={button(filters.age === 'all')}
              onClick={() => onChange({ ...filters, age: 'all' })}
            >
              All
            </button>
            <button
              className={button(filters.age === '18')}
              onClick={() => onChange({ ...filters, age: '18' })}
            >
              18+
            </button>
            <button
              className={button(filters.age === '21')}
              onClick={() => onChange({ ...filters, age: '21' })}
            >
              21+
            </button>
          </div>
        </div>

        <div className="filter-block">
          <h3>Price</h3>
          <div className="filter-grid">
            <button
              className={button(filters.price === 'all')}
              onClick={() => onChange({ ...filters, price: 'all' })}
            >
              All
            </button>
            <button
              className={button(filters.price === 'free')}
              onClick={() => onChange({ ...filters, price: 'free' })}
            >
              Free
            </button>
            <button
              className={button(filters.price === 'under25')}
              onClick={() => onChange({ ...filters, price: 'under25' })}
            >
              Under $25
            </button>
            <button
              className={button(filters.price === '25to50')}
              onClick={() => onChange({ ...filters, price: '25to50' })}
            >
              $25–50
            </button>
            <button
              className={button(filters.price === '50plus')}
              onClick={() => onChange({ ...filters, price: '50plus' })}
            >
              $50+
            </button>
          </div>
        </div>

        <div className="filter-block">
          <h3>Type</h3>
          <div className="filter-grid">
            <button
              className={button(filters.type === '')}
              onClick={() => onChange({ ...filters, type: '' })}
            >
              All
            </button>
            {typeOptions.map(type => (
              <button
                key={type}
                className={button(filters.type === type)}
                onClick={() => onChange({ ...filters, type })}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-block">
          <h3>Music</h3>
          <div className="filter-grid">
            <button
              className={button(filters.music === '')}
              onClick={() => onChange({ ...filters, music: '' })}
            >
              All
            </button>
            {musicOptions.map(music => (
              <button
                key={music}
                className={button(filters.music === music)}
                onClick={() => onChange({ ...filters, music })}
              >
                {music}
              </button>
            ))}
          </div>
        </div>

        <div className="sheet-actions">
          <button className="secondary-button" onClick={onClear}>
            Clear
          </button>
          <button className="primary-button" onClick={onClose}>
            Show events
          </button>
        </div>
      </section>
    </div>
  );
}

function formatToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function eventSortKey(event: EventRecord): string {
  return event.date + ' ' + event.startTime.padStart(8, '0');
}

function App() {
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [tonightOnly, setTonightOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [eighteenOnly, setEighteenOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventRecord | null>(null);

  const today = formatToday();

  useEffect(() => {
    const readHash = () => {
      const slug = window.location.hash.replace('#event/', '');
      if (!window.location.hash.startsWith('#event/')) {
        setSelectedEvent(null);
        return;
      }
      setSelectedEvent(events.find(event => event.slug === slug) ?? null);
    };
    readHash();
    window.addEventListener('hashchange', readHash);
    return () => window.removeEventListener('hashchange', readHash);
  }, []);

  const openEvent = (event: EventRecord) => {
    window.location.hash = 'event/' + event.slug;
    setSelectedEvent(event);
  };

  const closeEvent = () => {
    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search
    );
    setSelectedEvent(null);
  };

  const hasDrawerFilters =
    filters.date !== '' ||
    filters.age !== 'all' ||
    filters.price !== 'all' ||
    filters.type !== '' ||
    filters.music !== '';
  const hasAnyFilter =
    tonightOnly ||
    freeOnly ||
    eighteenOnly ||
    hasDrawerFilters ||
    query.trim() !== '';

  const visibleEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...events]
      .filter(event => {
        if (
          normalizedQuery &&
          !(
            event.title +
            ' ' +
            event.venue +
            ' ' +
            event.musicGroups.join(' ') +
            ' ' +
            (event.contextLine ?? '')
          )
            .toLowerCase()
            .includes(normalizedQuery)
        )
          return false;
        if (tonightOnly && event.date !== today) return false;
        if (freeOnly && !event.freeAccess) return false;
        if (eighteenOnly && event.minAge !== 18) return false;
        if (filters.date && event.date !== filters.date) return false;
        if (filters.age === '18' && event.minAge !== 18) return false;
        if (filters.age === '21' && event.minAge !== 21) return false;
        if (filters.price === 'free' && !event.freeAccess) return false;
        if (
          filters.price === 'under25' &&
          !(event.minPrice !== null && event.minPrice < 25)
        )
          return false;
        if (
          filters.price === '25to50' &&
          !(
            event.minPrice !== null &&
            event.minPrice >= 25 &&
            event.minPrice < 50
          )
        )
          return false;
        if (
          filters.price === '50plus' &&
          !(event.minPrice !== null && event.minPrice >= 50)
        )
          return false;
        if (filters.type && event.eventType !== filters.type) return false;
        if (filters.music && !event.musicGroups.includes(filters.music))
          return false;
        return true;
      })
      .sort((a, b) => eventSortKey(a).localeCompare(eventSortKey(b)));
  }, [eighteenOnly, filters, freeOnly, query, today, tonightOnly]);

  const tonightEvents = useMemo(
    () =>
      events
        .filter(event => event.date === today)
        .sort((a, b) => eventSortKey(a).localeCompare(eventSortKey(b))),
    [today]
  );

  const grouped = useMemo(() => {
    const groups = new Map<string, EventRecord[]>();
    visibleEvents.forEach(event => {
      const existing = groups.get(event.dayLabel) ?? [];
      existing.push(event);
      groups.set(event.dayLabel, existing);
    });
    return [...groups.entries()];
  }, [visibleEvents]);

  const clearAll = () => {
    setFilters(emptyFilters);
    setTonightOnly(false);
    setFreeOnly(false);
    setEighteenOnly(false);
    setQuery('');
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand__name">moves</span>
          <span className="brand__context">Howard Homecoming 2026</span>
        </div>
        <div className="topbar__actions">
          <button
            className="text-action text-action--muted"
            onClick={() =>
              alert(
                'Event submissions are the next build. This first deployment is the discovery MVP preview.'
              )
            }
          >
            <Plus size={15} /> Add event
          </button>
          <button
            className="icon-button"
            onClick={() => setSearchOpen(value => !value)}
            aria-label="Search events"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-wrap">
          <Search size={18} />
          <input
            autoFocus
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search events or venues"
            aria-label="Search events or venues"
          />
        </div>
      )}

      <main>
        {!hasAnyFilter && (
          <section className="section section--featured">
            <div className="section-head">
              <h1>Featured</h1>
              <span>Curated for the week</span>
            </div>
            <div className="featured-strip">
              {featuredEvents.map(event => (
                <FeaturedCard key={event.id} event={event} onOpen={openEvent} />
              ))}
            </div>
          </section>
        )}

        <div className="quickbar" aria-label="Quick filters">
          <button
            className={
              tonightOnly ? 'quick-filter quick-filter--active' : 'quick-filter'
            }
            onClick={() => setTonightOnly(value => !value)}
          >
            Tonight
          </button>
          <button
            className={
              eighteenOnly
                ? 'quick-filter quick-filter--active'
                : 'quick-filter'
            }
            onClick={() => setEighteenOnly(value => !value)}
          >
            18+
          </button>
          <button
            className={
              freeOnly ? 'quick-filter quick-filter--active' : 'quick-filter'
            }
            onClick={() => setFreeOnly(value => !value)}
          >
            Free
          </button>
          <button
            className={
              hasDrawerFilters
                ? 'quick-filter quick-filter--active'
                : 'quick-filter'
            }
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>

        {!hasAnyFilter && tonightEvents.length > 0 && (
          <section className="section">
            <div className="section-head">
              <h2>Tonight</h2>
              <span>
                {tonightEvents.length} event
                {tonightEvents.length === 1 ? '' : 's'}
              </span>
            </div>
            <div className="event-list">
              {tonightEvents.slice(0, 6).map(event => (
                <EventRow key={event.id} event={event} onOpen={openEvent} />
              ))}
            </div>
          </section>
        )}

        <section className="section section--all">
          <div className="section-head">
            <h2>{hasAnyFilter ? 'Results' : 'All events'}</h2>
            <span>{visibleEvents.length} shown</span>
          </div>

          {visibleEvents.length === 0 ? (
            <div className="empty-state">
              <p>No matching events.</p>
              <button className="secondary-button" onClick={clearAll}>
                Clear filters
              </button>
            </div>
          ) : (
            grouped.map(([day, dayEvents]) => (
              <div className="day-group" key={day}>
                <div className="day-group__head">
                  <h3>{day}</h3>
                  <span>{dayEvents.length}</span>
                </div>
                <div className="event-list">
                  {dayEvents.map(event => (
                    <EventRow key={event.id} event={event} onOpen={openEvent} />
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      <footer>
        <span>moves · Howard Homecoming</span>
        <span>Source data checked Oct 5</span>
      </footer>

      {filterOpen && (
        <FilterSheet
          filters={filters}
          onChange={setFilters}
          onClose={() => setFilterOpen(false)}
          onClear={() => setFilters(emptyFilters)}
        />
      )}
      {selectedEvent && <Detail event={selectedEvent} onClose={closeEvent} />}
    </div>
  );
}

export default App;
