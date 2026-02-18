import { GetEventsDto } from '../events/dto/get-events.dto';
import { EventLevel } from '../events/enums/event-level.enum';
import { EventsService } from '../events/events.service';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(() => {
    service = new EventsService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all events when no filters are applied', () => {
    const result = service.getEvents({});
    expect(result.length).toBe(3);
  });

  it('should filter events by fromDate', () => {
    const filters: GetEventsDto = { fromDate: '2024-01-02T00:00:00Z' };
    const result = service.getEvents(filters);
    expect(result.map((e) => e.id)).toEqual(['2', '3']);
  });

  it('should filter events by toDate', () => {
    const filters: GetEventsDto = { toDate: '2024-01-02T12:00:00Z' };
    const result = service.getEvents(filters);
    expect(result.map((e) => e.id)).toEqual(['1', '2']);
  });

  it('should filter events by minLevel', () => {
    const filters: GetEventsDto = { minLevel: EventLevel.WARNING.toString() };
    const result = service.getEvents(filters);
    expect(result.map((e) => e.id)).toEqual(['2', '3']);
  });

  it('should filter events by fromDate and toDate', () => {
    const filters: GetEventsDto = {
      fromDate: '2024-01-02T00:00:00Z',
      toDate: '2024-01-02T23:59:59Z',
    };
    const result = service.getEvents(filters);
    expect(result.map((e) => e.id)).toEqual(['2']);
  });

  it('should filter events by fromDate and minLevel', () => {
    const filters: GetEventsDto = {
      fromDate: '2024-01-02T00:00:00Z',
      minLevel: EventLevel.ERROR.toString(),
    };
    const result = service.getEvents(filters);
    expect(result.map((e) => e.id)).toEqual(['3']);
  });

  it('should filter events by toDate and minLevel', () => {
    const filters: GetEventsDto = {
      toDate: '2024-01-02T23:59:59Z',
      minLevel: EventLevel.WARNING.toString(),
    };
    const result = service.getEvents(filters);
    expect(result.map((e) => e.id)).toEqual(['2']);
  });

  it('should return empty array if no events match filters', () => {
    const filters: GetEventsDto = {
      fromDate: '2025-01-01T00:00:00Z',
    };
    const result = service.getEvents(filters);
    expect(result.length).toBe(0);
  });

  it('should handle minLevel as string and convert to number', () => {
    const filters: GetEventsDto = {
      minLevel: '2',
    };
    const result = service.getEvents(filters);
    expect(result.map((e) => e.id)).toEqual(
      ['1', '2', '3'].filter((id) => ['1', '2', '3'].includes(id)),
    );
  });
});
