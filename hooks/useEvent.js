import useAppStore from "../store/appStore";
import { useShallow } from "zustand/react/shallow";

const useEvent = (id) => {
  const { events } = useAppStore(
    useShallow((state) => ({ events: state.events }))
  );

  const currentEvent = events.find((event) => event.id === id);
  const status = currentEvent.closed ? "closed" : "opened";
  const filteredEvents = events.filter((event) => {
    if (status === "opened" && !event.closed) return event;
    if (status === "closed" && event.closed) return event;
  });

  const currentEventIndex = filteredEvents.findIndex(
    (event) => event.id === id
  );

  const previousEvent =
    currentEventIndex > 0
      ? filteredEvents.find((event, index) => index === currentEventIndex - 1)
      : null;
  const nextEvent =
    currentEventIndex !== -1 && currentEventIndex < filteredEvents.length - 1
      ? filteredEvents.find((event, index) => index === currentEventIndex + 1)
      : null;

  return {
    previousEvent,
    currentEvent,
    nextEvent,
  };
};

export default useEvent;
