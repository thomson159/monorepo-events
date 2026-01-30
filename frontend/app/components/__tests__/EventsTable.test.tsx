import { render, screen } from '@testing-library/react';
import { EventsTable } from '../EventsTable';
import { SystemEvent, EventLevel } from '../../types/event';

const events: SystemEvent[] = [
  { id: '1', level: EventLevel.INFO, message: 'Event 1', timestamp: new Date().toISOString() },
  { id: '2', level: EventLevel.ERROR, message: 'Event 2', timestamp: new Date().toISOString() },
];

describe('EventsTable', () => {
  it('renders all events', () => {
    render(<EventsTable events={events} />);
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
  });

  it('displays correct level labels', () => {
    render(<EventsTable events={events} />);
    expect(screen.getByText('INFO')).toBeInTheDocument();
    expect(screen.getByText('ERROR')).toBeInTheDocument();
  });
});
