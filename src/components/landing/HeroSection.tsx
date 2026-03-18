'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, Users, Home, TrendingUp } from 'lucide-react'
import Image from 'next/image'

interface HeroSectionProps {
  onOpenModal: () => void
}

interface CounterConfig {
  end: number
  label: string
  suffix: string
  icon: React.ReactNode
}

function AnimatedCounter({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, end, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString('pt-BR')}{suffix}
    </span>
  )
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const counters: CounterConfig[] = [
    { end: 453000, label: 'Famílias realizaram o sonho', suffix: '+', icon: <Users className="w-6 h-6" /> },
    { end: 95, label: 'Subsídio máximo', suffix: '%', icon: <Home className="w-6 h-6" /> },
    { end: 420, label: 'Meses para pagar', suffix: '', icon: <TrendingUp className="w-6 h-6" /> },
  ]

  const scrollToNext = () => {
    const element = document.querySelector('#beneficios')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <Image
          src="/hero-bg.png"
          alt="Casas modernas e famílias felizes"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-[#FFD100] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Nova Faixa 4 para Classe Média em 2026</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight animate-fade-in-up stagger-1">
            O Sonho da Casa Própria Está{' '}
            <span className="text-[#FFD100]">Mais Perto</span>{' '}
            do Que Você Imagina
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up stagger-2">
            Com o <strong>Minha Casa Minha Vida 2026</strong>, você pode ter subsídios de até{' '}
            <span className="text-[#FFD100] font-bold">95%</span>, juros a partir de{' '}
            <span className="text-[#FFD100] font-bold">5% a.a.</span> e até{' '}
            <span className="text-[#FFD100] font-bold">420 meses</span> para pagar.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up stagger-3">
            <Button
              onClick={onOpenModal}
              size="lg"
              className="bg-[#FFD100] hover:bg-[#E6BC00] text-gray-900 font-bold text-lg px-8 py-6 rounded-full shadow-2xl animate-pulse-cta btn-glow"
            >
              SIMULAR MEU FINANCIAMENTO
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8 py-6 rounded-full"
              onClick={() => document.querySelector('#faixas')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Faixas de Renda
            </Button>
          </div>

          {/* Counter Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-fade-in-up stagger-4">
            {counters.map((counter, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center gap-2 text-[#FFD100] mb-2 group-hover:scale-110 transition-transform">
                  {counter.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter end={counter.end} suffix={counter.suffix} />
                </div>
                <div className="text-white/80 text-sm">{counter.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </div>

      {/* Wave Divider */}
      <div className="wave-divider z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  )
}
