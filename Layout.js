import React, { useState } from 'react';
import Link from 'next/link';
import InteractiveBackground from './InteractiveBackground';
import Head from 'next/head';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/publications', label: 'Publications' },
  { href: '/team', label: 'Team' },
  { href: '/join', label: 'Join us' },
  { href: '/funders', label: 'Funders' },
  { href: '/contact', label: 'Contact' }
];

const Layout = ({ children, showBackground = false }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseMove = (event) => {
    if (showBackground) {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  console.log('showBackground:', showBackground);

  return (
    <div className="min-h-screen bg-gray-100 font-sans" onMouseMove={handleMouseMove}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Codystar:wght@300;400&family=Quicksand:wght@300..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
      </Head>

     <InteractiveBackground setX={mouseX} setY={mouseY} hidden={!showBackground} />

      <header className="bg-white bg-opacity-90 shadow-md z-10 relative">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/">
            <h1 className="text-2xl text-gray-800 uppercase"
              style={{ fontFamily: 'Source Code Pro, monospace' }}>
              sandersonlab@lshtm
            </h1>
            </Link>

            <button className="md:hidden block focus:outline-none" onClick={toggleMobileMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>

            <ul className="hidden md:flex space-x-6">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-600 hover:text-gray-800">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {isMobileMenuOpen && (
            <ul className="md:hidden mt-4 space-y-4">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="block text-gray-600 hover:text-gray-800">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 z-10 relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;