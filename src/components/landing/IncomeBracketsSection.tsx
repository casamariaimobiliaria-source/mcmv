'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Users, Building, Crown, CheckCircle2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IncomeBracket {
  id: number
  name: string
  incomeRange: string
  incomeValue: string
  subsidy: string
  interest: string
  maxProperty: string
  features: string[]
  color: string
  icon: React.ReactNode
  highlight?: boolean
  badge?: string
}

const brackets: IncomeBracket[] = [
  {
    id: 1,
    name: 'Faixa 1',
    incomeRange: 'Até R$ 2.640 - R$ 2.850',
    incomeValue: 'R$ 2.850',
    subsidy: 'Até 95%',
    interest: 'A partir de 5% a.a.',
    maxProperty: 'Até R$ 190.000,00',
    features: [
      'Maior subsídio do programa',
      'Possibilidade de entrada zero',
      'Quitamento em até 420 meses',
      'Uso do FGTS permitido',
      'Isenção de tarifas',
    ],
    color: 'from-emerald-500 to-emerald-600',
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    id: 2,
    name: 'Faixa 2',
    incomeRange: 'R$ 2.640 a R$ 4.700',
    incomeValue: 'R$ 4.700',
    subsidy: 'Até 80%',
    interest: 'A partir de 5,5% a.a.',
    maxProperty: 'Até R$ 240.000,00',
    features: [
      'Subsídio parcial significativo',
      'Parcelas mais acessíveis',
      'Até 420 meses para pagar',
      'FGTS como entrada',
      'Seguro habitacional incluso',
    ],
    color: 'from-blue-500 to-blue-600',
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 3,
    name: 'Faixa 3',
    incomeRange: 'R$ 4.700 a R$ 8.000',
    incomeValue: 'R$ 8.000',
    subsidy: 'Variável',
    interest: 'A partir de 7% a.a.',
    maxProperty: 'Até R$ 350.000,00',
    features: [
      'Juros reduzidos',
      'Maior poder de compra',
      'Imóveis melhores localizados',
      'Condições especiais de financiamento',
      'FGTS disponível',
    ],
    color: 'from-purple-500 to-purple-600',
    icon: <Building className="w-6 h-6" />,
  },
  {
    id: 4,
    name: 'Faixa 4',
    incomeRange: 'R$ 8.000 a R$ 12.000',
    incomeValue: 'R$ 12.000',
    subsidy: 'Juros reduzidos',
    interest: '10,5% a.a.',
    maxProperty: 'Até R$ 600.000,00',
    features: [
      'NOVA! Classe média pode participar',
      'Juros abaixo do mercado',
      'Imóveis de até R$ 600 mil',
      '420 meses para pagar',
      'Entrada reduzida',
    ],
    color: 'from-[#005CA9] to-[#0078D4]',
    icon: <Crown className="w-6 h-6" />,
    highlight: true,
    badge: 'NOVO!',
  },
]

function BracketCard({
  bracket,
  index,
  onOpenModal
}: {
  bracket: IncomeBracket
  index: number
  onOpenModal: () => void
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150)
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
        'relative group transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        bracket.highlight && 'lg:-mt-4 lg:mb-4'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Highlight glow */}
      {bracket.highlight && (
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD100] to-[#FFA500] rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
      )}

      <div className={cn(
        'relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 h-full flex flex-col',
        bracket.highlight ? 'border-[#FFD100]' : 'border-gray-100',
        'hover:shadow-2xl hover:-translate-y-2'
      )}>
        {/* Header */}
        <div className={cn(
          'bg-gradient-to-r p-6 text-white',
          bracket.color
        )}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              {bracket.icon}
            </div>
            {bracket.badge && (
              <Badge className="bg-[#FFD100] text-gray-900 font-bold animate-pulse">
                {bracket.badge}
              </Badge>
            )}
          </div>
          <h3 className="text-2xl font-bold mb-1">{bracket.name}</h3>
          <p className="text-white/80 text-sm">{bracket.incomeRange}</p>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow">
          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Subsídio/Juros</p>
              <p className="text-lg font-bold text-[#005CA9]">{bracket.subsidy}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Taxa de Juros</p>
              <p className="text-lg font-bold text-[#005CA9]">{bracket.interest.split(' ')[0]}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#005CA9]/5 to-[#FFD100]/5 rounded-xl p-3 mb-6">
            <p className="text-xs text-gray-500 mb-1">Valor máximo do imóvel</p>
            <p className="text-xl font-bold gradient-text">{bracket.maxProperty}</p>
          </div>

          {/* Features */}
          <div className="space-y-2 mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Benefícios inclusos:</p>
            {bracket.features.map((feature, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex items-start gap-2 text-sm transition-all duration-300',
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-90'
                )}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 pt-0">
          <Button
            onClick={onOpenModal}
            className={cn(
              'w-full font-semibold rounded-xl group/btn transition-all',
              bracket.highlight
                ? 'bg-[#FFD100] hover:bg-[#E6BC00] text-gray-900'
                : 'bg-[#005CA9] hover:bg-[#004A8A] text-white'
            )}
          >
            Simular para esta faixa
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface IncomeBracketsSectionProps {
  onOpenModal: () => void
}

export default function IncomeBracketsSection({ onOpenModal }: IncomeBracketsSectionProps) {
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
      id="faixas"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#005CA9] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD100] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={cn(
          'text-center max-w-3xl mx-auto mb-16 transition-all duration-700',
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <span className="inline-block text-[#005CA9] font-semibold text-sm uppercase tracking-wider mb-3">
            Qual é a sua faixa?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Faixas de Renda do{' '}
            <span className="gradient-text">MCMV 2026</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Encontre a faixa que melhor se adapta à sua renda familiar e descubra os benefícios exclusivos para você.
          </p>
        </div>

        {/* Brackets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brackets.map((bracket, index) => (
            <BracketCard
              key={bracket.id}
              bracket={bracket}
              index={index}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>

        {/* Help text */}
        <div className={cn(
          'mt-12 text-center transition-all duration-700 delay-700',
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <p className="text-gray-500 text-sm">
            * Os valores de subsídio e taxas podem variar conforme as regras vigentes do programa.
            <span className="text-[#005CA9] font-medium cursor-pointer hover:underline ml-1" onClick={onOpenModal}>
              Consulte um especialista para mais detalhes.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
