'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@/components/icons'

interface NavItem {
  name: string
  href: string
  children?: { name: string; href: string }[]
}

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navigation: NavItem[]
}

export function MobileNav({ isOpen, onClose, navigation }: MobileNavProps) {
  const pathname = usePathname()
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white z-50 md:hidden shadow-hard"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <span className="text-xl font-bold text-navy">Menu</span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-navy hover:bg-slate-100 transition-colors"
                  aria-label="Close menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {item.children ? (
                        <div>
                          <button
                            onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)}
                            className="flex items-center justify-between w-full px-4 py-3 text-navy font-medium rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            {item.name}
                            <ChevronDownIcon
                              size={20}
                              className={`transition-transform ${expandedItem === item.name ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <AnimatePresence>
                            {expandedItem === item.name && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden ml-4"
                              >
                                {item.children.map((child) => (
                                  <li key={child.name}>
                                    <Link
                                      href={child.href}
                                      onClick={onClose}
                                      className={`block px-4 py-2.5 rounded-lg transition-colors ${
                                        pathname === child.href
                                          ? 'text-teal-600 bg-teal-50'
                                          : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                                      }`}
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={`block px-4 py-3 font-medium rounded-lg transition-colors ${
                            pathname === item.href
                              ? 'text-teal-600 bg-teal-50'
                              : 'text-navy hover:bg-slate-50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* CTA */}
              <div className="p-4 border-t border-slate-100">
                <a
                  href="https://portal.cethos.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="block w-full px-6 py-3 text-center bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Login
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
