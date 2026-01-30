'use server';

import { SystemEvent, EventsFilters } from '../types/event';

const BASE_URL = process.env.NEXT_PUBLIC_EVENTS_BASE_URL || 'http://localhost:3000/events';

/**
 * Server Action: fetch events from API with filters
 * @param filters EventsFilters object
 * @returns SystemEvent[]
 */
export async function fetchEventsAction(filters: EventsFilters = {}): Promise<SystemEvent[]> {
  try {
    const params = new URLSearchParams();

    if (filters.fromDate) params.append('fromDate', filters.fromDate);
    if (filters.toDate) params.append('toDate', filters.toDate);
    if (filters.minLevel !== undefined) params.append('minLevel', String(filters.minLevel));

    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch events: ${response.status} ${text}`);
    }

    const data: SystemEvent[] = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Server Action fetchEventsAction error:', error.message);
      throw error;
    } else {
      console.error('Server Action fetchEventsAction unknown error', error);
      throw new Error('Unknown error fetching events');
    }
  }
}
