import { SystemEvent } from "../types/event";

export interface EventsFilters {
  fromDate?: string;
  toDate?: string;
  minLevel?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_EVENTS_BASE_URL || 'http://localhost:3000/events';

export async function fetchEvents(filters: EventsFilters): Promise<SystemEvent[]> {
  try {
    const params = new URLSearchParams();

    if (filters.fromDate) params.append('fromDate', filters.fromDate);
    if (filters.toDate) params.append('toDate', filters.toDate);
    if (filters.minLevel !== undefined) params.append('minLevel', String(filters.minLevel));

    const response = await fetch(`${BASE_URL}?${params.toString()}`);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch events: ${response.status} ${text}`);
    }

    const data: SystemEvent[] = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching events:', error.message);
      throw error;
    } else {
      console.error('Unknown error fetching events', error);
      throw new Error('Unknown error fetching events');
    }
  }
}
