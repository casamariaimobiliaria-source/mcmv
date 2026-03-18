'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Testimonial {
  id: number
  name: string
  city: string
  state: string
  avatar: string
  rating: number
  text: string
  propertyType: string
  bracket: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Maria Aparecida Silva',
    city: 'São Paulo',
    state: 'SP',
    avatar: '',
    rating: 5,
    text: 'Eu nunca pensei que conseguiria comprar minha própria casa. Com o MCMV, consegui um subsídio de 90% e hoje minha família tem um lar digno. O processo foi mais simples do que eu imaginava!',
    propertyType: 'Apartamento 2 quartos',
    bracket: 'Faixa 1',
  },
  {
    id: 2,
    name: 'Carlos Eduardo Santos',
    city: 'Belo Horizonte',
    state: 'MG',
    avatar: '',
    rating: 5,
    text: 'Como servidor público, achei que nunca teria condições de comprar um imóvel. Com a nova Faixa 4, consegui financiar um apartamento de R$ 450 mil com juros muito menores que o mercado.',
    propertyType: 'Apartamento 3 quartos',
    bracket: 'Faixa 4',
  },
  {
    id: 3,
    name: 'Ana Beatriz Oliveira',
    city: 'Recife',
    state: 'PE',
    avatar: '',
    rating: 5,
    text: 'Usei meu FGTS como entrada e o subsídio cobriu grande parte do valor. Em menos de 6 meses já estava morando no meu apartamento novo. Recomendo a todos que têm o sonho da casa própria!',
    propertyType: 'Casa térrea',
    bracket: 'Faixa 2',
  },
  {
    id: 4,
    name: 'Roberto Carlos Lima',
    city: 'Curitiba',
    state: 'PR',
    avatar: '',
    rating: 5,
    text: 'O consultor me ajudou a entender todas as opções. Consegui um financiamento de 35 anos com parcelas que cabem no meu bolso. Minha esposa e eu estamos muito felizes!',
    propertyType: 'Casa em condomínio',
    bracket: 'Faixa 3',
  },
  {
    id: 5,
    name: 'Fernanda Cristina Souza',
    city: 'Salvador',
    state: 'BA',
    avatar: '',
    rating: 5,
    text: 'Mãe solo, achei que seria impossível. Mas com o programa, consegui realizar o sonho de dar um lar para minha filha. O subsídio foi fundamental para tornar isso possível.',
    propertyType: 'Apartamento 2 quartos',
    bracket: 'Faixa 1',
  },
]

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <Card className={cn(
      'min-w-[320px] md:min-w-[400px] mx-2 transition-all duration-500 border-0 shadow-xl',
      isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
    )}>
      <CardContent className="p-6">
        {/* Quote icon */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#005CA9] to-[#0078D4] rounded-full flex items-center justify-center">
            <Quote className="w-5 h-5 text-white" />
          </div>
          <div className="flex gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FFD100] text-[#FFD100]" />
            ))}
          </div>
        </div>

        {/* Testimonial text */}
        <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
          &quot;{testimonial.text}&quot;
        </p>

        {/* User info */}
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 border-2 border-[#005CA9]">
            <AvatarImage src={testimonial.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-[#005CA9] to-[#0078D4] text-white font-bold">
              {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.city}, {testimonial.state}</p>
          </div>
        </div>

        {/* Property info */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-500">{testimonial.propertyType}</span>
          <span className="text-xs font-medium px-2 py-1 bg-[#005CA9]/10 text-[#005CA9] rounded-full">
            {testimonial.bracket}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const scrollTo = (index: number) => {
    setActiveIndex(index)
    if (scrollContainerRef.current) {
      const cardWidth = 416 // min-w-[400px] + mx-2 * 2
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
    }
  }

  const nextSlide = () => {
    scrollTo((activeIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    scrollTo((activeIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section
      id="depoimentos"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={cn(
          'text-center max-w-3xl mx-auto mb-12 transition-all duration-700',
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <span className="inline-block text-[#005CA9] font-semibold text-sm uppercase tracking-wider mb-3">
            Histórias reais
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Mais de{' '}
            <span className="gradient-text">450 mil famílias</span>{' '}
            realizaram o sonho
          </h2>
          <p className="text-gray-600 text-lg">
            Veja o que dizem as famílias que já conquistaram sua casa própria através do programa.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border-gray-200 hover:bg-gray-50 hidden md:flex"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5 text-[#005CA9]" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border-gray-200 hover:bg-gray-50 hidden md:flex"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5 text-[#005CA9]" />
          </Button>

          {/* Cards container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="snap-center">
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={index === activeIndex}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === activeIndex
                  ? 'w-8 bg-[#005CA9]'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
            />
          ))}
        </div>

        {/* Social proof */}
        <div className={cn(
          'mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-300',
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="text-center p-4">
            <p className="text-3xl font-bold text-[#005CA9]">4.9/5</p>
            <p className="text-sm text-gray-500">Avaliação média</p>
          </div>
          <div className="text-center p-4 border-x border-gray-200">
            <p className="text-3xl font-bold text-[#005CA9]">98%</p>
            <p className="text-sm text-gray-500">Recomendam o programa</p>
          </div>
          <div className="text-center p-4">
            <p className="text-3xl font-bold text-[#005CA9]">453 mil+</p>
            <p className="text-sm text-gray-500">Famílias atendidas em 2026</p>
          </div>
        </div>
      </div>
    </section>
  )
}
