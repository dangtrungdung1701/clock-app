import { produce } from "immer";
import { create } from "zustand";
import { generateUniqueId } from "../utils";

const useAppStore = create((set) => ({
  events: [],
  newEvent: {},
  editedEvent: {},
  clock: {
    status: "inactive",
    time: 0,
    laps: [],
  },
  actions: {
    createNewEvent: (newEvent) =>
      set(
        produce((state) => {
          const id = generateUniqueId();
          state.events = [...state.events, { closed: false, ...newEvent, id }];
          state.newEvent = {};
        })
      ),
    closeEvent: (eventId) =>
      set(
        produce((state) => {
          const newEvents = state.events.map((event) =>
            event.id === eventId ? { ...event, closed: true } : event
          );
          state.events = [...newEvents];
        })
      ),
    changePropertyNewEvent: (property, value) =>
      set(
        produce((state) => {
          state.newEvent = { ...state.newEvent, [property]: value };
        })
      ),
    changePropertyEditedEvent: (property, value) =>
      set(
        produce((state) => {
          state.editedEvent = { ...state.editedEvent, [property]: value };
        })
      ),
    saveEditedEvent: () =>
      set(
        produce((state) => {
          const newEvents = state.events.map((event) => {
            if (event.id === state.editedEvent.id) {
              return state.editedEvent;
            }
            return event;
          });
          state.events = newEvents;
        })
      ),
    deleteEvent: (eventId) =>
      set(
        produce((state) => {
          state.events = state.events.filter((event) => event.id !== eventId);
        })
      ),
    editEvent: (eventId) =>
      set(
        produce((state) => {
          state.editedEvent = state.events.find(
            (event) => event.id === eventId
          );
        })
      ),
    startClock: () =>
      set(
        produce((state) => {
          state.clock = { ...state.clock, status: "active" };
        })
      ),
    pauseClock: () =>
      set(
        produce((state) => {
          state.clock = { ...state.clock, status: "inactive" };
        })
      ),
    continueClock: () =>
      set(
        produce((state) => {
          state.clock = { ...state.clock, status: "active" };
        })
      ),
    resetClock: () =>
      set(
        produce((state) => {
          state.clock = { status: "inactive", time: 0, laps: [] };
        })
      ),
    addLapClock: () =>
      set(
        produce((state) => {
          const newLap = {
            count: state.clock.laps.length + 1,
            time: state.clock.time,
          };
          state.clock = { ...state.clock, laps: [newLap, ...state.clock.laps] };
        })
      ),
    setTimeClock: () =>
      set(
        produce((state) => {
          state.clock = { ...state.clock, time: state.clock.time + 10 };
        })
      ),
  },
}));

export default useAppStore;
