import { Injectable } from '@nestjs/common';
import { SystemEvent } from './interfaces/event.interface';
import { EventLevel } from './enums/event-level.enum';
import { GetEventsDto } from './dto/get-events.dto';

@Injectable()
export class EventsService {
  private readonly events: SystemEvent[] = [
    {
      id: '1',
      level: EventLevel.INFO,
      message: 'System started',
      timestamp: new Date('2024-01-01T10:00:00Z'),
    },
    {
      id: '2',
      level: EventLevel.WARNING,
      message: 'High memory usage',
      timestamp: new Date('2024-01-02T12:00:00Z'),
    },
    {
      id: '3',
      level: EventLevel.ERROR,
      message: 'Database connection failed',
      timestamp: new Date('2024-01-03T15:30:00Z'),
    },
  ];

  getEvents(filters: GetEventsDto): SystemEvent[] {
    const fromDate = filters.fromDate ? new Date(filters.fromDate) : undefined;
    const toDate = filters.toDate ? new Date(filters.toDate) : undefined;
    const minLevel = filters.minLevel
      ? (Number(filters.minLevel) as EventLevel)
      : undefined;

    return this.events.filter((event) => {
      if (fromDate && event.timestamp < fromDate) return false;
      if (toDate && event.timestamp > toDate) return false;
      if (minLevel !== undefined && event.level < minLevel) return false;
      return true;
    });
  }
}
