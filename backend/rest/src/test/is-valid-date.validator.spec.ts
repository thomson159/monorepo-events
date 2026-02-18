import { IsValidDateConstraint } from '../events/validators/is-valid-date.validator';

describe('IsValidDateConstraint', () => {
  let validator: IsValidDateConstraint;

  beforeEach(() => {
    validator = new IsValidDateConstraint();
  });

  describe('validate', () => {
    it('should return true for a valid ISO date string', () => {
      expect(validator.validate('2023-01-29T12:34:56.789Z')).toBe(true);
    });

    it('should return false for an invalid date string', () => {
      expect(validator.validate('invalid-date')).toBe(false);
    });

    it('should return false for a number', () => {
      expect(validator.validate(123456)).toBe(false);
    });

    it('should return false for an object', () => {
      expect(validator.validate({})).toBe(false);
    });

    it('should return false for an array', () => {
      expect(validator.validate([])).toBe(false);
    });

    it('should return false for null', () => {
      expect(validator.validate(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(validator.validate(undefined)).toBe(false);
    });

    it('should return true for a valid date string without time', () => {
      expect(validator.validate('2023-01-29')).toBe(true);
    });

    it('should return false for an empty string', () => {
      expect(validator.validate('')).toBe(false);
    });
  });

  describe('defaultMessage', () => {
    it('should return the correct default message', () => {
      expect(validator.defaultMessage()).toBe('Invalid ISO date string');
    });
  });
});
