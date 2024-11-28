import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext();

export function EventProvider({ children }) {
    const [events, setEvents] = useState([]);

    const addEvent = (newEvent) => {
        setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
    };

    const updateEvent = (updatedEvent) => {
        setEvents(prev => prev.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
        ));
    };

    const deleteEvent = (eventId) => {
        setEvents(prev => prev.filter(event => event.id !== eventId));
    };

    return (
        <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );
}

export function useEvents() {
    return useContext(EventContext);
}