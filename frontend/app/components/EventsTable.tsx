import { SystemEvent, EventLevel } from '../types/event';

const levelLabel: Record<EventLevel, string> = {
  [EventLevel.DEBUG]: 'DEBUG',
  [EventLevel.INFO]: 'INFO',
  [EventLevel.WARNING]: 'WARNING',
  [EventLevel.ERROR]: 'ERROR',
};

const levelColor: Record<EventLevel, string> = {
  [EventLevel.DEBUG]: 'text-gray-500 bg-gray-100',
  [EventLevel.INFO]: 'text-blue-700 bg-blue-100',
  [EventLevel.WARNING]: 'text-yellow-800 bg-yellow-100',
  [EventLevel.ERROR]: 'text-red-700 bg-red-100',
};

export function EventsTable({ events }: { events: SystemEvent[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Level</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Message</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, idx) => (
            <tr
              key={event.id}
              className={`border-t ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
            >
              <td className="px-4 py-2 text-sm text-gray-600">{event.id}</td>
              <td className={`px-4 py-1 text-xs font-medium rounded-full text-center ${levelColor[event.level]}`}>
                {levelLabel[event.level]}
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
