'use client'

import { useEffect, useRef, useState } from 'react'
import { Percent, TrendingDown, Calendar, PiggyBank, Wallet, Shield, Award, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
  highlight?: string
}

const benefits: Benefit[] = [
  {
    icon: <Percent className="w-8 h-8" />,
    title: 'Subsídio de até 95%',
    description: 'Governo pode custear quase todo o valor do imóvel para famílias de menor renda.',
    highlight: 'Até R$ 250 mil em subsídio',
  },
  {
    icon: <TrendingDown className="w-8 h-8" />,
    title: 'Juros a partir de 5% a.a.',
    description: 'Taxas muito menores que o mercado, tornando a parcela mais acessível.',
    highlight: 'Economia de até 70%',
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Até 420 meses para pagar',
    description: '35 anos para quitar seu imóvel, com parcelas que cabem no seu bolso.',
    highlight: 'Até 35 anos',
  },
  {
    icon: <PiggyBank className="w-8 h-8" />,
    title: 'Use seu FGTS',
    description: 'Utilize o saldo do seu FGTS para dar entrada, amortizar ou pagar parte das parcelas.',
    highlight: '100% do saldo disponível',
  },
  {
    icon: <Wallet className="w-8 h-8" />,
    title: 'Sem entrada em alguns casos',
    description: 'Dependendo da sua faixa de renda, você não precisa dar entrada.',
    highlight: '0% de entrada',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Seguro obrigatório incluso',
    description: 'Seu imóvel já vem com seguro contra danos e cobertura por morte ou invalidez.',
    highlight: 'Proteção completa',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Qualidade CAIXA',
    description: 'Imóveis aprovados pela CAIXA com todas as exigências de habitabilidade.',
    highlight: 'Selo de qualidade',
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Análise simplificada',
    description: 'Processo de aprovação mais ágil e com menos burocracia.',
    highlight: 'Resposta em até 30 dias',
  },
]

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={cn(
        'group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-500 card-hover relative overflow-hidden',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#005CA9] to-[#FFD100] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#005CA9] to-[#0078D4] flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
        {benefit.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#005CA9] transition-colors">
        {benefit.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-3">
        {benefit.description}
      </p>

      {/* Highlight badge */}
      {benefit.highlight && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFD100]/20 text-[#005CA9] text-xs font-semibold">
          {benefit.highlight}
        </div>
      )}
    </div>
  )
}

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSectionVisible, setIsSectionVisible] = useState(false)

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

  return (
    <section
      id="beneficios"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={cn(
          'text-center max-w-3xl mx-auto mb-16 transition-all duration-700',
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <span className="inline-block text-[#005CA9] font-semibold text-sm uppercase tracking-wider mb-3">
            Por que escolher o MCMV?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Benefícios que Fazem a{' '}
            <span className="gradient-text">Diferença</span>
          </h2>
          <p className="text-gray-600 text-lg">
            O programa mais completo de habitação do Brasil, com condições exclusivas para você realizar o sonho da casa própria.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>

        {/* CTA Badge */}
        <div className={cn(
          'mt-16 text-center transition-all duration-700 delay-500',
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#005CA9] to-[#0078D4] text-white px-6 py-3 rounded-full shadow-lg">
            <span className="w-2 h-2 bg-[#FFD100] rounded-full animate-pulse" />
            <span className="font-medium">Mais de 450.000 famílias já foram beneficiadas em 2026</span>
          </div>
        </div>
      </div>
    </section>
  )
}
