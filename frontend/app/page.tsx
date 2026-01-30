// Server Component: fetchEvents() executes on the server
// HTML returned already contains the initial event list (SSR)
import { fetchEventsAction } from "./api/eventsApi";
import EventsClient from "./EventsClient";
import { SystemEvent } from "./types/event";

export default async function Home() {
  let initialEvents = [] as SystemEvent[];

  try {
    initialEvents = await fetchEventsAction({});
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch events:", error.message);
    } else {
      console.error("Unknown error fetching events", error);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">System Events</h1>
      <EventsClient initialEvents={initialEvents} />
    </div>
  );
}
