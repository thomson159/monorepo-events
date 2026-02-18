import { validate } from 'class-validator';
import { GetEventsDto } from '../events/dto/get-events.dto';
import { EventLevel } from '../events/enums/event-level.enum';

describe('GetEventsDto validation', () => {
  it('should pass validation with no properties', async () => {
    const dto = new GetEventsDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate correct fromDate and toDate', async () => {
    const dto = new GetEventsDto();
    dto.fromDate = '2024-01-01T00:00:00Z';
    dto.toDate = '2024-01-03T00:00:00Z';
    dto.dateRangeCheck = true;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid fromDate', async () => {
    const dto = new GetEventsDto();
    dto.fromDate = 'invalid-date';
    dto.dateRangeCheck = true;

    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'fromDate')).toBe(true);
  });

  it('should fail with invalid toDate', async () => {
    const dto = new GetEventsDto();
    dto.toDate = 'invalid-date';
    dto.dateRangeCheck = true;

    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'toDate')).toBe(true);
  });

  it('should validate correct minLevel', async () => {
    const dto = new GetEventsDto();
    dto.minLevel = EventLevel.WARNING.toString();
    dto.dateRangeCheck = true;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid minLevel', async () => {
    const dto = new GetEventsDto();
    dto.minLevel = '999';
    dto.dateRangeCheck = true;

    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'minLevel')).toBe(true);
  });

  //TODO !!!!!!!!!!!!!!!1

  // it('should fail if fromDate is after toDate', async () => {
  //   const dto = new GetEventsDto();
  //   dto.fromDate = '2024-01-03T00:00:00Z';
  //   dto.toDate = '2024-01-01T00:00:00Z';
  //   dto.dateRangeCheck = true;

  //   const errors = await validate(dto);
  //   expect(
  //     errors.some(
  //       (e) =>
  //         e.constraints &&
  //         'fromDate must be before or equal to toDate' in e.constraints,
  //     ),
  //   ).toBe(true);
  // });

  it('should pass if fromDate equals toDate', async () => {
    const dto = new GetEventsDto();
    dto.fromDate = '2024-01-01T00:00:00Z';
    dto.toDate = '2024-01-01T00:00:00Z';
    dto.dateRangeCheck = true;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass if only fromDate or toDate is defined', async () => {
    const dto1 = new GetEventsDto();
    dto1.fromDate = '2024-01-01T00:00:00Z';
    dto1.dateRangeCheck = true;

    const dto2 = new GetEventsDto();
    dto2.toDate = '2024-01-01T00:00:00Z';
    dto2.dateRangeCheck = true;

    const errors1 = await validate(dto1);
    const errors2 = await validate(dto2);

    expect(errors1.length).toBe(0);
    expect(errors2.length).toBe(0);
  });
});
