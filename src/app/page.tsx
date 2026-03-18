'use client'

import { useState } from 'react'
import Script from 'next/script'
import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import BenefitsSection from '@/components/landing/BenefitsSection'
import IncomeBracketsSection from '@/components/landing/IncomeBracketsSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import FAQSection from '@/components/landing/FAQSection'
import CTAFinalSection from '@/components/landing/CTAFinalSection'
import Footer from '@/components/landing/Footer'
import EligibilityModal from '@/components/landing/EligibilityModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Minha Casa Minha Vida 2026",
    "url": "https://sua-landing-page.com.br", // Subistituir pela URL real
    "description": "Programa Minha Casa Minha Vida 2026: simulação de financiamento habitacional, subsídios de até 95%, juros a partir de 5% a.a.",
    "publisher": {
      "@type": "Organization",
      "name": "Minha Casa Minha Vida",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sua-landing-page.com.br/logo-mcmv.png"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o Programa Minha Casa Minha Vida?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É o programa habitacional do governo federal que facilita a aquisição da casa própria para famílias de baixa e média renda."
        }
      },
      {
        "@type": "Question",
        "name": "Quem pode participar do programa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Famílias com renda mensal bruta de até R$ 8.000 (ou até R$ 12.000 para a nova Faixa 4 em 2026) que não possuam imóvel próprio."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen">
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Header */}
      <Header onOpenModal={openModal} />

      {/* Hero Section */}
      <HeroSection onOpenModal={openModal} />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Income Brackets Section */}
      <IncomeBracketsSection onOpenModal={openModal} />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* How It Works Section */}
      <HowItWorksSection onOpenModal={openModal} />

      {/* FAQ Section */}
      <FAQSection onOpenModal={openModal} />

      {/* CTA Final Section */}
      <CTAFinalSection onOpenModal={openModal} />

      {/* Footer */}
      <Footer />

      {/* Eligibility Modal */}
      <EligibilityModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  )
}
