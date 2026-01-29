import { useEffect, useState, useRef } from 'react';
import { getEvents, type SystemEvent, EventLevel } from './api/events';

function App() {
  const [events, setEvents] = useState<SystemEvent[]>([]);
  const [minLevel, setMinLevel] = useState<EventLevel | undefined>(undefined);
  const [fromDate, setFromDate] = useState<string | undefined>(undefined);
  const [toDate, setToDate] = useState<string | undefined>(undefined);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getEvents({ minLevel, fromDate, toDate }).then(setEvents).catch(console.error);
  }, [minLevel, fromDate, toDate]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const levelOptions = [
    { value: undefined, label: 'Wszystkie' },
    { value: EventLevel.DEBUG, label: 'DEBUG' },
    { value: EventLevel.INFO, label: 'INFO' },
    { value: EventLevel.WARNING, label: 'WARNING' },
    { value: EventLevel.ERROR, label: 'ERROR' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">System Events</h1>
      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label htmlFor="fromDate" className="mb-1 text-gray-700 font-medium">
            Od
          </label>
          <input
            id="fromDate"
            type="date"
            className="p-2 rounded-md bg-gray-100 focus:outline-none"
            value={fromDate ?? ''}
            onChange={(e) => setFromDate(e.target.value || undefined)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="toDate" className="mb-1 text-gray-700 font-medium">
            Do
          </label>
          <input
            id="toDate"
            type="date"
            className="p-2 rounded-md bg-gray-100 focus:outline-none"
            value={toDate ?? ''}
            onChange={(e) => setToDate(e.target.value || undefined)}
          />
        </div>
        <div className="flex flex-col relative" ref={dropdownRef}>
          <label htmlFor="minLevelDropdown" className="mb-1 text-gray-700 font-medium">
            Minimalny poziom
          </label>
          <button
            id="minLevelDropdown"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            className="p-2 rounded-md bg-gray-100 cursor-pointer select-none text-left"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {levelOptions.find((opt) => opt.value === minLevel)?.label || 'Wszystkie'}
          </button>
          {dropdownOpen && (
            <div
              role="listbox"
              aria-labelledby="minLevelDropdown"
              className="absolute mt-1 w-full bg-white border border-gray-300 rounded-sm shadow-lg z-10"
            >
              {levelOptions.map((opt) => (
                <div
                  key={opt.label}
                  role="option"
                  aria-selected={opt.value === minLevel}
                  tabIndex={0}
                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setMinLevel(opt.value);
                    setDropdownOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setMinLevel(opt.value);
                      setDropdownOpen(false);
                    }
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {['ID', 'Level', 'Message', 'Timestamp'].map((title) => (
                <th
                  key={title}
                  className="p-3 border-b border-gray-300 font-semibold text-gray-700"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="p-3 border-b border-gray-200">{e.id}</td>
                <td className="p-3 border-b border-gray-200">{EventLevel[e.level]}</td>
                <td className="p-3 border-b border-gray-200">{e.message}</td>
                <td className="p-3 border-b border-gray-200">
                  {new Date(e.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Brak zdarzeń
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
