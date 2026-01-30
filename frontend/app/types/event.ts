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

export interface EventsFilters {
  fromDate?: string;
  toDate?: string;
  minLevel?: number;
}
