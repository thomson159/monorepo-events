import { DateRangeConstraint } from '../events/validators/date-range.validator';
import { GetEventsDto } from '../events/dto/get-events.dto';
import { ValidationArguments } from 'class-validator';

describe('DateRangeConstraint', () => {
  let constraint: DateRangeConstraint;

  beforeEach(() => {
    constraint = new DateRangeConstraint();
  });

  const buildArgs = (dto: Partial<GetEventsDto>): ValidationArguments => ({
    object: dto,
    value: null,
    property: '',
    targetName: '',
    constraints: [],
  });

  describe('validate', () => {
    it('should return true if fromDate is missing', () => {
      const dto = { toDate: '2023-01-01' };
      expect(constraint.validate(null, buildArgs(dto))).toBe(true);
    });

    it('should return true if toDate is missing', () => {
      const dto = { fromDate: '2023-01-01' };
      expect(constraint.validate(null, buildArgs(dto))).toBe(true);
    });

    it('should return false if fromDate is invalid', () => {
      const dto = { fromDate: 'invalid', toDate: '2023-01-01' };
      expect(constraint.validate(null, buildArgs(dto))).toBe(false);
    });

    it('should return false if toDate is invalid', () => {
      const dto = { fromDate: '2023-01-01', toDate: 'invalid' };
      expect(constraint.validate(null, buildArgs(dto))).toBe(false);
    });

    it('should return false if fromDate is after toDate', () => {
      const dto = { fromDate: '2023-01-02', toDate: '2023-01-01' };
      expect(constraint.validate(null, buildArgs(dto))).toBe(false);
    });

    it('should return true if fromDate is equal to toDate', () => {
      const dto = { fromDate: '2023-01-01', toDate: '2023-01-01' };
      expect(constraint.validate(null, buildArgs(dto))).toBe(true);
    });

    it('should return true if fromDate is before toDate', () => {
      const dto = { fromDate: '2023-01-01', toDate: '2023-01-02' };
      expect(constraint.validate(null, buildArgs(dto))).toBe(true);
    });
  });

  describe('defaultMessage', () => {
    it('should return the correct message', () => {
      expect(constraint.defaultMessage()).toBe(
        'fromDate must be before or equal to toDate',
      );
    });
  });
});
