import { EventLevel } from '../types/event';

interface Props {
  onChange: (filters: { fromDate?: string; toDate?: string; minLevel?: number }) => void;
}

export function Filters({ onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-6 mb-6 items-end">
      <div className="flex flex-col">
        <label htmlFor="fromDate" className="text-sm font-semibold text-gray-700 mb-1">
          From
        </label>
        <input
          id="fromDate"
          type="datetime-local"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => onChange({ fromDate: e.target.value || undefined })}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="toDate" className="text-sm font-semibold text-gray-700 mb-1">
          To
        </label>
        <input
          id="toDate"
          type="datetime-local"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => onChange({ toDate: e.target.value || undefined })}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="minLevel" className="text-sm font-semibold text-gray-700 mb-1">
          Min Level
        </label>
        <select
          id="minLevel"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            onChange({
              minLevel: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        >
          <option value="">All</option>
          <option value={EventLevel.DEBUG}>DEBUG</option>
          <option value={EventLevel.INFO}>INFO</option>
          <option value={EventLevel.WARNING}>WARNING</option>
          <option value={EventLevel.ERROR}>ERROR</option>
        </select>
      </div>
    </div>
  );
}
