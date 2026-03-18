'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Clock, AlertTriangle, Users, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CTAFinalSectionProps {
  onOpenModal: () => void
}

export default function CTAFinalSection({ onOpenModal }: CTAFinalSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const benefits = [
    'Análise gratuita de elegibilidade',
    'Simulação personalizada',
    'Atendimento sem compromisso',
    'Resposta em até 24 horas',
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-[#005CA9] via-[#004A8A] to-[#003A6E] relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#FFD100]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#FFD100]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          'max-w-4xl mx-auto transition-all duration-700',
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          {/* Urgency banner */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#FFD100] text-gray-900 px-4 py-2 rounded-full font-bold text-sm animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              VAGAS LIMITADAS PARA 2025
            </div>
          </div>

          {/* Main content */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Não Perca a Oportunidade de{' '}
              <span className="text-[#FFD100]">Realizar seu Sonho</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Mais de <strong className="text-[#FFD100]">453 mil famílias</strong> já conquistaram sua casa própria em 2025.
              Agora é a sua vez!
            </p>
          </div>

          {/* Countdown timer */}
          <div className="flex justify-center gap-4 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[80px] text-center border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-white/60 text-sm">Dias</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[80px] text-center border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-white/60 text-sm">Horas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[80px] text-center border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-white/60 text-sm">Min</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[80px] text-center border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-white/60 text-sm">Seg</div>
            </div>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-2 text-white/80 mb-8">
            <Users className="w-5 h-5" />
            <span>
              <strong className="text-[#FFD100]">+1.250 pessoas</strong> fizeram sua simulação hoje
            </span>
          </div>

          {/* Main CTA */}
          <div className="text-center mb-10">
            <Button
              onClick={onOpenModal}
              size="lg"
              className="bg-[#FFD100] hover:bg-[#E6BC00] text-gray-900 font-bold text-xl px-12 py-7 rounded-full shadow-2xl animate-pulse-cta btn-glow"
            >
              SIMULAR MEU FINANCIAMENTO AGORA
            </Button>
            <p className="text-white/60 text-sm mt-3">
              <Clock className="w-4 h-4 inline mr-1" />
              Leva menos de 2 minutos • 100% gratuito
            </p>
          </div>

          {/* Benefits list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-white/90"
              >
                <CheckCircle className="w-5 h-5 text-[#FFD100]" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
              <p className="text-2xl font-bold text-[#FFD100]">4.9/5</p>
              <p className="text-white/60 text-xs">Avaliação</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
              <p className="text-2xl font-bold text-[#FFD100]">453 mil+</p>
              <p className="text-white/60 text-xs">Famílias atendidas</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
              <p className="text-2xl font-bold text-[#FFD100]">98%</p>
              <p className="text-white/60 text-xs">Taxa de aprovação</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
