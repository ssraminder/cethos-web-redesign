'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui'
import { MenuIcon, CloseIcon, ChevronDownIcon, GlobeNetworkIcon } from '@/components/icons'
import { MobileNav } from './MobileNav'

const navigation = [
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'Life Sciences Translation', href: '/services/lifesciences' },
      { name: 'Certified Translation', href: '/services/certified' },
      { name: 'Business Translation', href: '/services/business' },
      { name: 'Software Localization', href: '/services/software' },
      { name: 'Multimedia Translation', href: '/services/multimedia' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-soft' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className={`p-2 rounded-xl transition-colors ${isScrolled ? 'bg-teal-50' : 'bg-white/10'}`}>
                <GlobeNetworkIcon
                  size={28}
                  className={`transition-colors ${isScrolled ? 'text-teal-600' : 'text-white'}`}
                />
              </div>
              <span className={`text-2xl font-bold transition-colors ${isScrolled ? 'text-navy' : 'text-white'}`}>
                Cethos
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.children ? (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        isScrolled
                          ? 'text-navy hover:bg-slate-100'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                      <ChevronDownIcon
                        size={16}
                        className={`transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        pathname === item.href
                          ? isScrolled
                            ? 'text-teal-600 bg-teal-50'
                            : 'text-white bg-white/20'
                          : isScrolled
                          ? 'text-navy hover:bg-slate-100'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.children && openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-medium border border-slate-100 overflow-hidden"
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`block px-4 py-3 text-navy hover:bg-teal-50 hover:text-teal-600 transition-colors ${
                              pathname === child.href ? 'bg-teal-50 text-teal-600' : ''
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/get-quote"
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  isScrolled
                    ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-soft hover:shadow-medium'
                    : 'bg-white text-navy hover:bg-white/90'
                }`}
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-navy hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navigation={navigation} />
    </>
  )
}
