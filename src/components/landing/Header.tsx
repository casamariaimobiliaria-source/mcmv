'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Home, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onOpenModal: () => void
}

export default function Header({ onOpenModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#beneficios', label: 'Benefícios' },
    { href: '#faixas', label: 'Faixas de Renda' },
    { href: '#depoimentos', label: 'Depoimentos' },
    { href: '#como-funciona', label: 'Como Funciona' },
    { href: '#faq', label: 'FAQ' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <div className="absolute inset-0 bg-[#005CA9] rounded-lg transform group-hover:scale-105 transition-transform" />
              <Home className="absolute inset-0 m-auto w-5 h-5 md:w-6 md:h-6 text-white" />
              <Heart className="absolute -bottom-1 -right-1 w-4 h-4 text-[#FFD100] fill-[#FFD100]" />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                'font-bold text-lg md:text-xl leading-tight transition-colors',
                isScrolled ? 'text-[#005CA9]' : 'text-white'
              )}>
                Minha Casa
              </span>
              <span className={cn(
                'font-bold text-lg md:text-xl leading-tight transition-colors',
                isScrolled ? 'text-[#005CA9]' : 'text-[#FFD100]'
              )}>
                Minha Vida
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  'font-medium transition-colors hover:text-[#FFD100] relative group',
                  isScrolled ? 'text-gray-700' : 'text-white'
                )}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD100] transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={onOpenModal}
              className="bg-[#FFD100] hover:bg-[#E6BC00] text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Simular Financiamento
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              isScrolled ? 'text-[#005CA9]' : 'text-white'
            )}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 mobile-menu-enter">
            <nav className="flex flex-col gap-2 bg-white rounded-xl shadow-lg p-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-[#005CA9] hover:text-white transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenModal()
                }}
                className="bg-[#FFD100] hover:bg-[#E6BC00] text-gray-900 font-bold px-6 py-3 rounded-full mt-2"
              >
                Simular Financiamento
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
