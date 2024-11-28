import React from 'react';
import { useEvents } from '../components/EventContext';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function Dashboard() {
    const { events } = useEvents();

    // Calculate statistics
    const totalEvents = events.length;
    const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;
    const categories = [...new Set(events.map(event => event.category))];
    const totalAttendees = events.reduce((sum, event) => sum + parseInt(event.maxAttendees || 0), 0);

    // Get upcoming events sorted by date
    const sortedUpcomingEvents = events
        .filter(event => new Date(event.date) > new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome to Event Dashboard</h1>
                <p className="mt-2 text-gray-600">Manage and track your events in one place</p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Events Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-indigo-100">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-sm font-medium text-gray-600">Total Events</h2>
                            <p className="text-2xl font-bold text-gray-900">{totalEvents}</p>
                        </div>
                    </div>
                </div>

                {/* Upcoming Events Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-sm font-medium text-gray-600">Upcoming Events</h2>
                            <p className="text-2xl font-bold text-gray-900">{upcomingEvents}</p>
                        </div>
                    </div>
                </div>

                {/* Categories Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-sm font-medium text-gray-600">Categories</h2>
                            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                        </div>
                    </div>
                </div>

                {/* Total Attendees Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-sm font-medium text-gray-600">Total Capacity</h2>
                            <p className="text-2xl font-bold text-gray-900">{totalAttendees}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Events Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
                        <Link
                            to="/events"
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            View all
                        </Link>
                    </div>
                </div>
                <div className="divide-y divide-gray-100">
                    {sortedUpcomingEvents.map(event => (
                        <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    {event.imageUrl ? (
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                                        <div className="flex items-center space-x-4 mt-1">
                                            <span className="text-sm text-gray-500">
                                                {format(new Date(event.date), 'MMM dd, yyyy')} at {event.time}
                                            </span>
                                            <span className="text-sm text-gray-500">•</span>
                                            <span className="text-sm text-gray-500">{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${event.category === 'Technology' ? 'bg-blue-100 text-blue-800' :
                                            event.category === 'Business' ? 'bg-green-100 text-green-800' :
                                                event.category === 'Design' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                        {event.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {sortedUpcomingEvents.length === 0 && (
                        <div className="p-6 text-center text-gray-500">
                            <p>No upcoming events</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex justify-center">
                <Link
                    to="/events/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Create New Event
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;