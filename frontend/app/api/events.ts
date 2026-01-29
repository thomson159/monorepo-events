export enum EventLevel {
  DEBUG = 1,
  INFO = 2,
  WARNING = 3,
  ERROR = 4,
}

export interface SystemEvent {
  id: string;
  level: EventLevel;
  message: string;
  timestamp: string;
}

interface GetEventsParams {
  fromDate?: string;
  toDate?: string;
  minLevel?: EventLevel;
}

export async function getEvents(params?: GetEventsParams): Promise<SystemEvent[]> {
  const query = new URLSearchParams();

  if (params?.fromDate) query.append('fromDate', params.fromDate);
  if (params?.toDate) query.append('toDate', params.toDate);
  if (params?.minLevel) query.append('minLevel', params.minLevel.toString());

  const res = await fetch(`http://localhost:3000/events?${query.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }

  return res.json();
}
