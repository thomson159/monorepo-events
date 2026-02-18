import { EventLevel } from '../enums/event-level.enum';

export interface SystemEvent {
  id: string;
  level: EventLevel;
  message: string;
  timestamp: Date;
}
