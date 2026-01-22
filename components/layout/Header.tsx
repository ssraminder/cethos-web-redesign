'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
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
  { name: 'Industries', href: '/industries' },
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
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1440px] mx-auto px-8">
          <nav className="flex items-center justify-between h-20">
            {/* Logo - Figma matched */}
            <Link href="/" className="flex items-center gap-1">
              <span className="text-2xl font-bold text-[#0C2340] tracking-tight">
                CETHOS
              </span>
              <div className="w-1.5 h-1.5 bg-[#0891B2] rounded-full"></div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.children ? (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      className="flex items-center gap-1 px-4 py-2 text-base font-medium text-[#0C2340] hover:text-[#0891B2] transition-colors"
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 text-base font-medium transition-colors ${
                        pathname === item.href
                          ? 'text-[#0891B2]'
                          : 'text-[#0C2340] hover:text-[#0891B2]'
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
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-card-hover border border-[#E5E7EB] overflow-hidden"
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`block px-4 py-3 text-[#0C2340] hover:bg-[#F8FAFC] hover:text-[#0891B2] transition-colors ${
                              pathname === child.href ? 'bg-[#F8FAFC] text-[#0891B2]' : ''
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

            {/* CTA Button - Header style */}
            <div className="hidden md:block">
              <Link
                href="/get-quote"
                className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-medium hover:bg-[#06B6D4] transition-colors"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#0C2340] hover:bg-[#F8FAFC] rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navigation={navigation} />
    </>
  )
}
