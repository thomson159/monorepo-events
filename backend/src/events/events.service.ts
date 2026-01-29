import { Injectable } from '@nestjs/common';
import { SystemEvent } from './interfaces/event.interface';
import { EventLevel } from './enums/event-level.enum';
import { GetEventsDto } from './dto/get-events.dto';

@Injectable()
export class EventsService {
  private events: SystemEvent[] = [
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
    return this.events.filter((event) => {
      if (filters.fromDate && event.timestamp < new Date(filters.fromDate)) {
        return false;
      }

      if (filters.toDate && event.timestamp > new Date(filters.toDate)) {
        return false;
      }

      if (filters.minLevel && event.level < filters.minLevel) {
        return false;
      }

      return true;
    });
  }
}
