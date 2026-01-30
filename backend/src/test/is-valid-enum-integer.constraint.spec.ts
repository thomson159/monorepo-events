import { IsValidEnumIntegerConstraint } from '../events/validators/is-valid-enum-integer.validator';
import { ValidationArguments } from 'class-validator';

enum TestEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

describe('IsValidEnumIntegerConstraint', () => {
  let constraint: IsValidEnumIntegerConstraint;

  beforeEach(() => {
    constraint = new IsValidEnumIntegerConstraint();
  });

  const buildArgs = (enumObj: object): ValidationArguments => ({
    object: {},
    value: null,
    property: '',
    targetName: '',
    constraints: [enumObj],
  });

  describe('validate', () => {
    it('should return false if args is undefined', () => {
      expect(constraint.validate(1)).toBe(false);
    });

    it('should return false if value is not string or number', () => {
      expect(constraint.validate({}, buildArgs(TestEnum))).toBe(false);
      expect(constraint.validate([], buildArgs(TestEnum))).toBe(false);
      expect(constraint.validate(null, buildArgs(TestEnum))).toBe(false);
      expect(constraint.validate(undefined, buildArgs(TestEnum))).toBe(false);
    });

    it('should return false if value is a number but not in enum', () => {
      expect(constraint.validate(5, buildArgs(TestEnum))).toBe(false);
    });

    it('should return false if value is a string but not in enum', () => {
      expect(constraint.validate('5', buildArgs(TestEnum))).toBe(false);
    });

    it('should return false if value is a float number in enum', () => {
      const enumFloat = { A: 1.5, B: 2.5 };
      expect(constraint.validate(1.5, buildArgs(enumFloat))).toBe(false);
    });

    it('should return true if value is a number in enum', () => {
      expect(constraint.validate(1, buildArgs(TestEnum))).toBe(true);
      expect(constraint.validate(2, buildArgs(TestEnum))).toBe(true);
    });

    it('should return true if value is a string representing a number in enum', () => {
      expect(constraint.validate('1', buildArgs(TestEnum))).toBe(true);
      expect(constraint.validate('3', buildArgs(TestEnum))).toBe(true);
    });
  });

  describe('defaultMessage', () => {
    it('should return the correct message', () => {
      expect(constraint.defaultMessage()).toBe(
        'Value must be an integer from enum',
      );
    });
  });
});
