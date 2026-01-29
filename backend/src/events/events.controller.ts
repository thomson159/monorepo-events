import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { GetEventsDto } from './dto/get-events.dto';

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
    enum: [1, 2, 3, 4],
    description: '1=DEBUG, 2=INFO, 3=WARNING, 4=ERROR',
  })
  getEvents(@Query() query: GetEventsDto) {
    return this.eventsService.getEvents(query);
  }
}
