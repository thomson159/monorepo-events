import { IsOptional, Validate, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { EventLevel } from '../enums/event-level.enum';
import { IsValidDateConstraint } from '../validators/is-valid-date.validator';
import { IsValidEnumIntegerConstraint } from '../validators/is-valid-enum-integer.validator';
import { DateRangeConstraint } from '../validators/date-range.validator';

export class GetEventsDto {
  @ApiPropertyOptional({ example: '2024-01-01T00:00:00Z' })
  @IsOptional()
  @Validate(IsValidDateConstraint)
  fromDate?: string;

  @ApiPropertyOptional({ example: '2024-01-03T00:00:00Z' })
  @IsOptional()
  @Validate(IsValidDateConstraint)
  toDate?: string;

  @ApiPropertyOptional({ enum: EventLevel, example: EventLevel.WARNING })
  @IsOptional()
  @Validate(IsValidEnumIntegerConstraint, [EventLevel])
  minLevel?: string;

  @ValidateIf(
    (o: GetEventsDto) => o.fromDate !== undefined && o.toDate !== undefined,
  )
  @Validate(DateRangeConstraint)
  public dateRangeCheck?: true;
}
