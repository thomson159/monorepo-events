import { SystemEvent, EventLevel } from '../types/event';
import clsx from 'clsx';

const LEVELS = {
  [EventLevel.DEBUG]: { label: 'DEBUG', classes: 'text-gray-500 bg-gray-100' },
  [EventLevel.INFO]: { label: 'INFO', classes: 'text-blue-700 bg-blue-100' },
  [EventLevel.WARNING]: { label: 'WARNING', classes: 'text-yellow-800 bg-yellow-100' },
  [EventLevel.ERROR]: { label: 'ERROR', classes: 'text-red-700 bg-red-100' },
};

type EventsTableProps = {
  events: SystemEvent[];
};

const EventLevelBadge = ({ level }: { level: EventLevel }) => {
  const { label, classes } = LEVELS[level];
  return (
    <span className={clsx('px-2 py-1 text-xs font-semibold rounded-full text-center', classes)}>
      {label}
    </span>
  );
};

export function EventsTable({ events }: EventsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            {['ID', 'Level', 'Message', 'Timestamp'].map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {events.map((event, idx) => (
            <tr
              key={event.id}
              className={clsx(
                'border-t hover:bg-gray-100 transition-colors duration-150',
                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              )}
            >
              <td className="px-4 py-2 text-sm text-gray-600">{event.id}</td>
              <td>
                <EventLevelBadge level={event.level} />
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{event.message}</td>
              <td className="px-4 py-2 text-sm text-gray-500">
                {new Date(event.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
