import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/events', label: 'Events' },
        { path: '/calendar', label: 'Calendar' },
        { path: '/create', label: 'Create Event' },
    ];

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-indigo-600">EventFlow</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === link.path
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Search - Desktop */}
                        <div className="hidden md:flex items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-48 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center">
                            <button className="flex items-center space-x-2">
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://ui-avatars.com/api/?name=User"
                                    alt="User"
                                />
                                <span className="hidden md:block text-sm font-medium text-gray-700">
                                    User
                                </span>
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {/* Search - Mobile */}
                            <div className="px-3 py-2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Header;