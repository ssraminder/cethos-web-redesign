import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Life Sciences Translation', href: '/services/lifesciences' },
    { name: 'Certified Translation', href: '/services/certified' },
    { name: 'Business Translation', href: '/services/business' },
    { name: 'Software Localization', href: '/services/software' },
    { name: 'Multimedia Translation', href: '/services/multimedia' },
  ],
  industries: [
    { name: 'Pharmaceutical', href: '/industries/pharmaceutical' },
    { name: 'Legal', href: '/industries/legal' },
    { name: 'Technology', href: '/industries/technology' },
    { name: 'Finance', href: '/industries/finance' },
    { name: 'Gaming', href: '/industries/gaming' },
    { name: 'E-commerce', href: '/industries/ecommerce' },
    { name: 'Manufacturing', href: '/industries/manufacturing' },
    { name: 'Healthcare', href: '/industries/healthcare' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#0C2340] text-white">
      {/* Main Footer */}
      <div className="py-16 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <Link href="/" className="flex items-center mb-6">
                <img
                  src="https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/dark_bg_logo_cethos.svg"
                  alt="Cethos Solutions Inc."
                  className="h-10"
                />
              </Link>

              <p className="text-white/70 mb-6 max-w-sm">
                Professional translation services in 200+ languages. Precision, quality, and speed for global businesses.
              </p>

              <div className="space-y-3">
                <a href="mailto:info@cethos.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                  <span>info@cethos.com</span>
                </a>
                <a href="tel:+1-587-600-0786" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                  <span>587-600-0786</span>
                </a>
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-5 h-5" strokeWidth={1.5} />
                  <span>Calgary, Canada (HQ) • Dubai, UAE • Patiala, India</span>
                </div>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-lg text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/80 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-lg text-white mb-4">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/80 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="font-semibold text-lg text-white mb-4">Industries</h4>
              <ul className="space-y-3">
                {footerLinks.industries.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/80 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-6">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Cethos Solutions Inc. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              {/* Legal Links */}
              <div className="flex items-center gap-4">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
