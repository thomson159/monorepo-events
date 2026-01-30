'use server';

import axios from 'axios';
import { SystemEvent, EventsFilters } from '../types/event';

const BASE_URL = process.env.NEXT_PUBLIC_EVENTS_BASE_URL || 'http://localhost:3000/events';

/**
 * Server Action: fetch events from API with filters using Axios
 * @param filters EventsFilters object
 * @returns SystemEvent[]
 */
export async function fetchEventsAction(filters: EventsFilters = {}): Promise<SystemEvent[]> {
  try {
    const params = Object.fromEntries(
      Object.entries({
        fromDate: filters.fromDate,
        toDate: filters.toDate,
        minLevel: filters.minLevel,
      }).filter(([_, value]) => value !== undefined && value !== null)
    );

    const response = await axios.get<SystemEvent[]>(BASE_URL, {
      params,
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Server Action fetchEventsAction Axios error:', error.message);
      throw new Error(`Failed to fetch events: ${error.response?.status} ${error.response?.data || ''}`);
    } else if (error instanceof Error) {
      console.error('Server Action fetchEventsAction error:', error.message);
      throw error;
    } else {
      console.error('Server Action fetchEventsAction unknown error', error);
      throw new Error('Unknown error fetching events');
    }
  }
}
