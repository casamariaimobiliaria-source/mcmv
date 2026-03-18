'use client'

import { Home, Heart, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    programa: [
      { label: 'Como Funciona', href: '#como-funciona' },
      { label: 'Faixas de Renda', href: '#faixas' },
      { label: 'Benefícios', href: '#beneficios' },
      { label: 'FAQ', href: '#faq' },
    ],
    recursos: [
      { label: 'Simulador', href: '#' },
      { label: 'Documentação', href: '#' },
      { label: 'Imóveis Disponíveis', href: '#' },
      { label: 'Status do Financiamento', href: '#' },
    ],
    suporte: [
      { label: 'Central de Ajuda', href: '#' },
      { label: 'Fale Conosco', href: '#' },
      { label: 'Ouvidoria', href: '#' },
      { label: 'Canais de Atendimento', href: '#' },
    ],
  }

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'Youtube' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-[#005CA9] rounded-lg" />
                <Home className="absolute inset-0 m-auto w-5 h-5 text-white" />
                <Heart className="absolute -bottom-1 -right-1 w-4 h-4 text-[#FFD100] fill-[#FFD100]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-white">
                  Minha Casa
                </span>
                <span className="font-bold text-lg leading-tight text-[#FFD100]">
                  Minha Vida
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              O maior programa de habitação social do Brasil. Desde 2009, ajudando milhões de famílias a realizar o sonho da casa própria com condições especiais de financiamento.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-[#FFD100]" />
                <span>0800 726 0101 (CAIXA)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#FFD100]" />
                <span>atendimento@mcmv.gov.br</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#FFD100]" />
                <span>Atendimento em todo o Brasil</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-bold text-white mb-4">Programa</h4>
            <ul className="space-y-2">
              {links.programa.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#FFD100] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Recursos</h4>
            <ul className="space-y-2">
              {links.recursos.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#FFD100] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Suporte</h4>
            <ul className="space-y-2">
              {links.suporte.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#FFD100] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 bg-gray-800 hover:bg-[#005CA9] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          {/* Certifications */}
          <div className="flex items-center gap-4">
            <div className="bg-gray-800 rounded-lg px-4 py-2 text-center">
              <p className="text-xs text-gray-400">Site Seguro</p>
              <p className="text-sm font-bold text-white">SSL</p>
            </div>
            <div className="bg-gray-800 rounded-lg px-4 py-2 text-center">
              <p className="text-xs text-gray-400">Parceiro</p>
              <p className="text-sm font-bold text-[#FFD100]">CAIXA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © {currentYear} Programa Minha Casa Minha Vida. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-950 border-t border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            <strong>Disclaimer:</strong> Este site não representa o governo oficial nem a CAIXA Econômica Federal. 
            As informações apresentadas são baseadas nas regras oficiais do programa Minha Casa Minha Vida e 
            podem sofrer alterações. Para informações oficiais, acesse o portal da CAIXA (www.caixa.gov.br) ou 
            do Ministério das Cidades. Os valores de subsídio, taxas de juros e condições podem variar conforme 
            a faixa de renda e as regras vigentes. A simulação não constitui oferta de crédito. Imagens meramente 
            ilustrativas.
          </p>
        </div>
      </div>
    </footer>
  )
}
