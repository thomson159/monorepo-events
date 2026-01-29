import { IsEnum, IsOptional, IsISO8601 } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EventLevel } from '../enums/event-level.enum';

export class GetEventsDto {
  @ApiPropertyOptional({
    example: '2024-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsISO8601()
  fromDate?: string;

  @ApiPropertyOptional({
    example: '2024-01-03T00:00:00Z',
  })
  @IsOptional()
  @IsISO8601()
  toDate?: string;

  @ApiPropertyOptional({
    enum: EventLevel,
    description: 'Minimalny poziom zdarzenia',
    example: EventLevel.WARNING,
  })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(EventLevel)
  minLevel?: EventLevel;
}
