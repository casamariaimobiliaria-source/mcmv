'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { HelpCircle, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQ {
  question: string
  answer: string
  category?: string
}

const faqs: FAQ[] = [
  {
    question: 'Quem pode participar do Minha Casa Minha Vida?',
    answer: 'Podem participar famílias com renda mensal de até R$ 12.000,00, que não possuam financiamento habitacional ativo e não sejam proprietárias ou promitentes compradoras de imóvel residencial. O programa agora inclui a Faixa 4, permitindo que famílias com renda entre R$ 8.000 e R$ 12.000 também possam participar com condições especiais.',
    category: 'Elegibilidade',
  },
  {
    question: 'Preciso dar entrada? Qual o valor mínimo?',
    answer: 'Depende da sua faixa de renda. Na Faixa 1, é possível obter financiamento sem entrada em muitos casos. Nas demais faixas, a entrada pode variar de 10% a 20% do valor do imóvel. Em todos os casos, você pode usar o saldo do FGTS para compor a entrada ou amortizar o financiamento.',
    category: 'Financiamento',
  },
  {
    question: 'Posso usar o FGTS no Minha Casa Minha Vida?',
    answer: 'Sim! O FGTS pode ser utilizado de várias formas: como entrada, para amortizar parcelas, pagar parte das prestações ou quitar o financiamento. Não há limite de valor para uso do FGTS no MCMV, diferente de outros financiamentos. Você precisa ter pelo menos 3 anos de trabalho sob regime do FGTS.',
    category: 'FGTS',
  },
  {
    question: 'Qual documentação é necessária?',
    answer: 'A documentação básica inclui: RG e CPF, comprovante de renda (holerites ou declaração de IR), comprovante de residência, certidão de casamento (se casado), certidão de nascimento dos filhos (se houver), e comprovante deFGTS (extrato). Para trabalhadores informais, há documentos específicos que comprovam a renda.',
    category: 'Documentação',
  },
  {
    question: 'Quanto tempo demora a aprovação do financiamento?',
    answer: 'O prazo médio de análise é de 15 a 30 dias úteis, podendo ser mais rápido dependendo da documentação apresentada. Após a aprovação, a assinatura do contrato e liberação dos recursos geralmente ocorrem em até 15 dias adicionais. O processo todo, da escolha do imóvel à entrega das chaves, pode levar de 2 a 4 meses.',
    category: 'Processo',
  },
  {
    question: 'Quais tipos de imóveis posso comprar?',
    answer: 'Você pode comprar imóveis novos ou usados, casas ou apartamentos, desde que tenham no máximo 240m² de área útil, estejam em áreas urbanas, e não tenham sido financiados anteriormente pelo SFH. O valor máximo varia conforme a faixa: de R$ 190 mil (Faixa 1) até R$ 600 mil (Faixa 4).',
    category: 'Imóvel',
  },
  {
    question: 'Quais são as taxas de juros do programa?',
    answer: 'As taxas variam conforme a faixa de renda: Faixa 1 a partir de 5% a.a., Faixa 2 a partir de 5,5% a.a., Faixa 3 a partir de 7% a.a., e Faixa 4 com 10,5% a.a. Essas taxas são significativamente menores que as praticadas no mercado tradicional, que podem chegar a 13% ou mais ao ano.',
    category: 'Financiamento',
  },
  {
    question: 'A classe média pode participar do MCMV?',
    answer: 'Sim! A nova Faixa 4, criada em 2024 e ampliada em 2026, permite que famílias com renda de R$ 8.000 a R$ 12.000 participem do programa. Essas famílias contam com juros de 10,5% a.a. (menores que o mercado), prazo de até 420 meses, e podem financiar imóveis de até R$ 600.000,00.',
    category: 'Elegibilidade',
  },
  {
    question: 'O subsídio precisa ser devolvido?',
    answer: 'Não! O subsídio concedido pelo governo não precisa ser devolvido. Ele é um recurso não reembolsável que reduz o valor total do financiamento. Por exemplo, se você tem direito a um subsídio de R$ 100.000, esse valor é abatido diretamente do preço do imóvel.',
    category: 'Financiamento',
  },
  {
    question: 'Posso financiar um imóvel em outra cidade?',
    answer: 'Sim, você pode financiar um imóvel em qualquer cidade do Brasil, desde que o imóvel esteja aprovado no programa e você tenha condições de comprovar que morará no local. O ideal é que o imóvel esteja em uma cidade onde você já resida ou tenha vínculos (trabalho, família).',
    category: 'Imóvel',
  },
]

interface FAQSectionProps {
  onOpenModal: () => void
}

export default function FAQSection({ onOpenModal }: FAQSectionProps) {
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
      id="faq"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={cn(
          'text-center max-w-3xl mx-auto mb-12 transition-all duration-700',
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <span className="inline-block text-[#005CA9] font-semibold text-sm uppercase tracking-wider mb-3">
            Tire suas dúvidas
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Perguntas{' '}
            <span className="gradient-text">Frequentes</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Encontre respostas para as principais dúvidas sobre o programa Minha Casa Minha Vida.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  'bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-500',
                  isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3 text-left">
                    <HelpCircle className="w-5 h-5 text-[#005CA9] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                      {faq.category && (
                        <span className="ml-2 text-xs px-2 py-0.5 bg-[#005CA9]/10 text-[#005CA9] rounded-full">
                          {faq.category}
                        </span>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Help card */}
        <div className={cn(
          'mt-12 max-w-2xl mx-auto transition-all duration-700 delay-500',
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <Card className="bg-gradient-to-r from-[#005CA9] to-[#0078D4] border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-10 h-10 text-[#FFD100] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Ainda tem dúvidas?
              </h3>
              <p className="text-white/80 mb-4">
                Nossa equipe está pronta para ajudar você a entender todos os detalhes do programa.
              </p>
              <button
                onClick={onOpenModal}
                className="px-6 py-3 bg-[#FFD100] hover:bg-[#E6BC00] text-gray-900 font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Falar com Especialista
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
