/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { EventLevel } from '../src/events/enums/event-level.enum';

interface SystemEvent {
  id: string;
  level: EventLevel;
  message: string;
  timestamp: string;
}

describe('Events API (e2e) - Fully Typed', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        errorHttpStatusCode: 400,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /events returns all events', async () => {
    const res = await request(app.getHttpServer()).get('/events').expect(200);
    const events: SystemEvent[] = res.body;

    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);

    events.forEach((e: SystemEvent) => {
      expect(typeof e.id).toBe('string');
      expect(Object.values(EventLevel)).toContain(e.level);
      expect(typeof e.message).toBe('string');

      const t: number = Date.parse(e.timestamp);
      expect(!Number.isNaN(t)).toBe(true);
    });
  });

  it('GET /events filters by minLevel', async () => {
    const minLevel: EventLevel = EventLevel.WARNING;

    const res = await request(app.getHttpServer())
      .get('/events')
      .query({ minLevel })
      .expect(200);

    const events: SystemEvent[] = res.body;
    events.forEach((e: SystemEvent) => {
      expect(e.level).toBeGreaterThanOrEqual(minLevel);
    });
  });

  it('GET /events filters by date range', async () => {
    const from = '2024-01-02T00:00:00Z';
    const to = '2024-01-02T23:59:59Z';

    const res = await request(app.getHttpServer())
      .get('/events')
      .query({ fromDate: from, toDate: to })
      .expect(200);

    const events: SystemEvent[] = res.body;
    const fromTs: number = Date.parse(from);
    const toTs: number = Date.parse(to);

    events.forEach((e: SystemEvent) => {
      const t: number = Date.parse(e.timestamp);
      expect(t).toBeGreaterThanOrEqual(fromTs);
      expect(t).toBeLessThanOrEqual(toTs);
    });
  });

  it('GET /events filters by minLevel + date range', async () => {
    const minLevel: EventLevel = EventLevel.INFO;
    const from = '2024-01-01T00:00:00Z';
    const to = '2024-01-03T23:59:59Z';

    const res = await request(app.getHttpServer())
      .get('/events')
      .query({ minLevel, fromDate: from, toDate: to })
      .expect(200);

    const events: SystemEvent[] = res.body;
    const fromTs: number = Date.parse(from);
    const toTs: number = Date.parse(to);

    events.forEach((e: SystemEvent) => {
      expect(e.level).toBeGreaterThanOrEqual(minLevel);
      const t: number = Date.parse(e.timestamp);
      expect(t).toBeGreaterThanOrEqual(fromTs);
      expect(t).toBeLessThanOrEqual(toTs);
    });
  });

  it('GET /events returns empty array if no events match', async () => {
    const from = '2100-01-01T00:00:00Z';
    const to = '2100-01-02T00:00:00Z';

    const res = await request(app.getHttpServer())
      .get('/events')
      .query({ fromDate: from, toDate: to })
      .expect(200);

    const events: SystemEvent[] = res.body;
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBe(0);
  });

  it('GET /events returns 400 for invalid minLevel (too high)', async () => {
    await request(app.getHttpServer())
      .get('/events')
      .query({ minLevel: 10 })
      .expect(400);
  });

  it('GET /events returns 400 for negative minLevel', async () => {
    await request(app.getHttpServer())
      .get('/events')
      .query({ minLevel: -1 })
      .expect(400);
  });

  it('GET /events returns 400 for non-integer minLevel', async () => {
    await request(app.getHttpServer())
      .get('/events')
      .query({ minLevel: 2.5 })
      .expect(400);
  });

  it('GET /events returns 400 for minLevel as string', async () => {
    await request(app.getHttpServer())
      .get('/events')
      .query({ minLevel: 'WARNING' })
      .expect(400);
  });

  it('GET /events returns 400 for invalid fromDate', async () => {
    await request(app.getHttpServer())
      .get('/events')
      .query({ fromDate: 'invalid-date' })
      .expect(400);
  });

  it('GET /events returns 400 for invalid toDate', async () => {
    await request(app.getHttpServer())
      .get('/events')
      .query({ toDate: 'invalid-date' })
      .expect(400);
  });

  it('GET /events returns 400 if fromDate > toDate', async () => {
    await request(app.getHttpServer())
      .get('/events')
      .query({
        fromDate: '2024-01-03T00:00:00Z',
        toDate: '2024-01-01T00:00:00Z',
      })
      .expect(400);
  });

  it('GET /events rejects unknown parameters', async () => {
    await request(app.getHttpServer())
      .get('/events')
      .query({ unknownParam: 'test' })
      .expect(400);
  });

  it('GET /events with only fromDate is OK', async () => {
    const from = '2024-01-01T00:00:00Z';
    const res = await request(app.getHttpServer())
      .get('/events')
      .query({ fromDate: from })
      .expect(200);

    const events: SystemEvent[] = res.body;
    const fromTs: number = Date.parse(from);

    events.forEach((e: SystemEvent) => {
      const t: number = Date.parse(e.timestamp);
      expect(t).toBeGreaterThanOrEqual(fromTs);
    });
  });

  it('GET /events with only toDate is OK', async () => {
    const to = '2024-01-03T23:59:59Z';
    const res = await request(app.getHttpServer())
      .get('/events')
      .query({ toDate: to })
      .expect(200);

    const events: SystemEvent[] = res.body;
    const toTs: number = Date.parse(to);

    events.forEach((e: SystemEvent) => {
      const t: number = Date.parse(e.timestamp);
      expect(t).toBeLessThanOrEqual(toTs);
    });
  });

  it('GET /events with fromDate = toDate returns events on that day', async () => {
    const date = '2024-01-02T00:00:00Z';
    const res = await request(app.getHttpServer())
      .get('/events')
      .query({ fromDate: date, toDate: date })
      .expect(200);

    const events: SystemEvent[] = res.body;
    const dateTs: number = Date.parse(date);

    events.forEach((e: SystemEvent) => {
      const t: number = Date.parse(e.timestamp);
      expect(t).toBeGreaterThanOrEqual(dateTs);
      expect(t).toBeLessThanOrEqual(dateTs);
    });
  });

  it('GET /events with minLevel boundaries', async () => {
    const minLow: EventLevel = EventLevel.INFO;
    const minHigh: EventLevel = EventLevel.ERROR;

    const lowRes = await request(app.getHttpServer())
      .get('/events')
      .query({ minLevel: minLow })
      .expect(200);

    const highRes = await request(app.getHttpServer())
      .get('/events')
      .query({ minLevel: minHigh })
      .expect(200);

    (lowRes.body as SystemEvent[]).forEach((e: SystemEvent) => {
      expect(e.level).toBeGreaterThanOrEqual(minLow);
    });

    (highRes.body as SystemEvent[]).forEach((e: SystemEvent) => {
      expect(e.level).toBeGreaterThanOrEqual(minHigh);
    });
  });
});
