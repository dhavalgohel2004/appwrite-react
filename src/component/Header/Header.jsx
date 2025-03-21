import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'SignUp', slug: '/signup', active: !authStatus },
        { name: 'All Posts', slug: '/all-posts', active: authStatus },
        { name: 'Add Post', slug: '/add-post', active: authStatus },
    ];

    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <div>
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden sm:flex space-x-4">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name} className="content-center">
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li className="content-center">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>

                    {/* Hamburger Menu Button */}
                    <button
                        className="sm:hidden p-2 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        )}
                    </button>
                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="sm:hidden fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex flex-col items-center justify-center space-y-6">
                        {navItems.map((item) =>
                            item.active ? (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        navigate(item.slug);
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-white text-lg px-6 py-3 rounded-lg hover:bg-gray-700"
                                >
                                    {item.name}
                                </button>
                            ) : null
                        )}
                        {authStatus && <LogoutBtn />}
                        <button
                            className="text-white text-lg px-6 py-3 rounded-lg bg-red-500 hover:bg-red-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Close Menu
                        </button>
                    </div>
                )}
            </Container>
        </header>
    );
}

export default Header;
