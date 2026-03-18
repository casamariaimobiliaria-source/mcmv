'use client'

import { useEffect, useRef, useState } from 'react'
import { ClipboardCheck, Search, FileSignature, Home, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  details: string[]
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Simulação Gratuita',
    description: 'Preencha o formulário e descubra em poucos minutos se você se enquadra no programa.',
    icon: <ClipboardCheck className="w-8 h-8" />,
    details: [
      'Renda familiar dentro das faixas',
      'Não possuir financiamento ativo',
      'Não ser proprietário de imóvel',
    ],
  },
  {
    number: 2,
    title: 'Escolha o Imóvel',
    description: 'Encontre o imóvel ideal entre as opções disponíveis no programa na sua região.',
    icon: <Search className="w-8 h-8" />,
    details: [
      'Imóveis novos e usados',
      'Diversas localidades',
      'Casas e apartamentos',
    ],
  },
  {
    number: 3,
    title: 'Solicite o Financiamento',
    description: 'Apresente a documentação e aguarde a análise da CAIXA para aprovação.',
    icon: <FileSignature className="w-8 h-8" />,
    details: [
      'Documentação simplificada',
      'Análise em até 30 dias',
      'Acompanhamento online',
    ],
  },
  {
    number: 4,
    title: 'Mude-se!',
    description: 'Com o financiamento aprovado, assine o contrato e receba as chaves do seu novo lar.',
    icon: <Home className="w-8 h-8" />,
    details: [
      'Contrato assinado',
      'Chaves entregues',
      'Realize seu sonho!',
    ],
  },
]

function TimelineStep({
  step,
  index,
  isLast,
  isVisible
}: {
  step: Step
  index: number
  isLast: boolean
  isVisible: boolean
}) {
  const [isStepVisible, setIsStepVisible] = useState(false)
  const stepRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsStepVisible(true), index * 200)
        }
      },
      { threshold: 0.3 }
    )

    if (stepRef.current) {
      observer.observe(stepRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={stepRef}
      className={cn(
        'relative flex flex-col md:flex-row items-start md:items-start gap-4 transition-all duration-700',
        isStepVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 md:left-6 top-16 md:top-16 w-0.5 h-full bg-gradient-to-b from-[#005CA9] to-[#FFD100] hidden md:block" />
      )}

      {/* Step number and icon */}
      <div className="relative z-10">
        <div className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500',
          isStepVisible
            ? 'bg-gradient-to-br from-[#005CA9] to-[#0078D4] text-white'
            : 'bg-gray-200 text-gray-400'
        )}>
          {step.icon}
        </div>
        <div className={cn(
          'absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all duration-500',
          isStepVisible
            ? 'bg-[#FFD100] text-gray-900'
            : 'bg-gray-200 text-gray-400'
        )}>
          {step.number}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-1 md:pl-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {step.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {step.description}
        </p>

        {/* Details checklist */}
        <div className="space-y-2">
          {step.details.map((detail, idx) => (
            <div
              key={idx}
              className={cn(
                'flex items-center gap-2 text-sm transition-all duration-300',
                isStepVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              )}
              style={{ transitionDelay: `${(index * 200) + (idx * 100)}ms` }}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-gray-600">{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface HowItWorksSectionProps {
  onOpenModal: () => void
}

export default function HowItWorksSection({ onOpenModal }: HowItWorksSectionProps) {
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
      id="como-funciona"
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#005CA9]/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={cn(
          'text-center max-w-3xl mx-auto mb-16 transition-all duration-700',
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <span className="inline-block text-[#005CA9] font-semibold text-sm uppercase tracking-wider mb-3">
            Passo a passo
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Como{' '}
            <span className="gradient-text">Funciona</span>?
          </h2>
          <p className="text-gray-600 text-lg">
            Em apenas 4 passos simples, você pode estar mais perto de realizar o sonho da casa própria.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          {steps.map((step, index) => (
            <TimelineStep
              key={step.number}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
              isVisible={isSectionVisible}
            />
          ))}
        </div>

        {/* CTA */}
        <div className={cn(
          'mt-16 text-center transition-all duration-700 delay-700',
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-[#005CA9]/10 to-[#FFD100]/10 rounded-2xl">
            <p className="text-gray-700 font-medium">
              Pronto para começar? Faça sua simulação agora mesmo!
            </p>
            <button
              onClick={onOpenModal}
              className="px-6 py-3 bg-[#FFD100] hover:bg-[#E6BC00] text-gray-900 font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
