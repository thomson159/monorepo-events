'use client';
// Client Component: handles dynamic filters and updates table (CSR)
import { useState } from 'react';
import { EventsTable } from './components/EventsTable';
import { Filters } from './components/Filters';
import { EventsFilters, SystemEvent } from './types/event';
import { fetchEventsAction } from './api/eventsApi';

interface Props {
  initialEvents: SystemEvent[];
}

export default function EventsClient({ initialEvents }: Props) {
  const [events, setEvents] = useState<SystemEvent[]>(initialEvents);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = async (filters: EventsFilters) => {
    if (loading) return;

    setLoading(true);
    try {
      const filtered = await fetchEventsAction(filters);
      setEvents(filtered);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Filters onChange={handleFilterChange} />
      <div className="relative">
        <EventsTable events={events} />
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
