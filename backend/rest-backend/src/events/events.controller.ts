import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { GetEventsDto } from './dto/get-events.dto';
import { EventLevel } from './enums/event-level.enum';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiQuery({ name: 'fromDate', required: false, type: String })
  @ApiQuery({ name: 'toDate', required: false, type: String })
  @ApiQuery({
    name: 'minLevel',
    required: false,
    enum: EventLevel,
    description: 'Minimal event level (1=DEBUG, 2=INFO, 3=WARNING, 4=ERROR)',
  })
  getEvents(@Query() filters: GetEventsDto) {
    return this.eventsService.getEvents(filters);
  }
}
