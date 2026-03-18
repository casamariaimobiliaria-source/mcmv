'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, CheckCircle, Home, Heart, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EligibilityModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  nome: string
  email: string
  telefone: string
  renda: string
  tem_fgts: string
  saldo_fgts: string
  ano_nascimento: string
  regiao: string
  contato: string
  horario: string
  lgpd: boolean
}

interface FormErrors {
  nome?: string
  email?: string
  telefone?: string
  renda?: string
  tem_fgts?: string
  saldo_fgts?: string
  ano_nascimento?: string
  regiao?: string
  contato?: string
  horario?: string
  lgpd?: string
}

const faixasRenda = [
  { value: 'faixa1', label: 'Até R$ 2.850 (Faixa 1)' },
  { value: 'faixa2', label: 'R$ 2.850 a R$ 4.700 (Faixa 2)' },
  { value: 'faixa3', label: 'R$ 4.700 a R$ 8.000 (Faixa 3)' },
  { value: 'faixa4', label: 'R$ 8.000 a R$ 12.000 (Faixa 4)' },
]

export default function EligibilityModal({ isOpen, onClose }: EligibilityModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    renda: '',
    tem_fgts: '',
    saldo_fgts: '',
    ano_nascimento: '',
    regiao: '',
    contato: '',
    horario: '',
    lgpd: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (!numbers) return ''
    const amount = parseInt(numbers, 10) / 100
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    } else if (formData.nome.trim().split(' ').length < 2) {
      newErrors.nome = 'Digite seu nome completo'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório'
    } else if (formData.telefone.replace(/\D/g, '').length < 10) {
      newErrors.telefone = 'Telefone inválido'
    }

    if (!formData.renda) {
      newErrors.renda = 'Selecione sua faixa de renda'
    }

    if (!formData.tem_fgts) {
      newErrors.tem_fgts = 'Selecione uma opção'
    }

    if (formData.tem_fgts === 'Sim' && !formData.saldo_fgts.trim()) {
      newErrors.saldo_fgts = 'Informe o saldo aproximado'
    }

    if (!formData.ano_nascimento.trim()) {
      newErrors.ano_nascimento = 'Ano de nascimento é obrigatório'
    } else if (
      formData.ano_nascimento.length !== 4 || 
      isNaN(Number(formData.ano_nascimento)) ||
      Number(formData.ano_nascimento) < 1900 ||
      Number(formData.ano_nascimento) > new Date().getFullYear()
    ) {
      newErrors.ano_nascimento = 'Ano inválido'
    }

    if (!formData.regiao.trim()) {
      newErrors.regiao = 'Região é obrigatória'
    }

    if (!formData.contato) {
      newErrors.contato = 'Selecione uma opção'
    }

    if (!formData.horario) {
      newErrors.horario = 'Selecione um horário'
    }

    if (!formData.lgpd) {
      newErrors.lgpd = 'Você precisa aceitar os termos'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
      } else {
        setErrors({ nome: result.message || 'Erro ao enviar formulário. Tente novamente.' })
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setErrors({ nome: 'Erro de conexão. Verifique sua internet e tente novamente.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      renda: '',
      tem_fgts: '',
      saldo_fgts: '',
      ano_nascimento: '',
      regiao: '',
      contato: '',
      horario: '',
      lgpd: false,
    })
    setErrors({})
    setIsSuccess(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#005CA9] to-[#0078D4] rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-gray-900">
                    Simulação Gratuita
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-500">
                    Preencha os dados abaixo para sua análise gratuita
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 pr-2">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-gray-700 font-medium">Nome completo *</Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className={cn('border-gray-200 focus:border-[#005CA9] focus:ring-[#005CA9]', errors.nome && 'border-red-500 focus:border-red-500')}
                />
                {errors.nome && <p className="text-red-500 text-xs">{errors.nome}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={cn('border-gray-200 focus:border-[#005CA9] focus:ring-[#005CA9]', errors.email && 'border-red-500 focus:border-red-500')}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              {/* Telefone e Ano Nasc. */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-gray-700 font-medium">Telefone/WhatsApp *</Label>
                  <Input
                    id="telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                    maxLength={15}
                    className={cn('border-gray-200 focus:border-[#005CA9] focus:ring-[#005CA9]', errors.telefone && 'border-red-500 focus:border-red-500')}
                  />
                  {errors.telefone && <p className="text-red-500 text-xs">{errors.telefone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ano_nascimento" className="text-gray-700 font-medium">Ano Nasc. *</Label>
                  <Input
                    id="ano_nascimento"
                    type="text"
                    placeholder="Ex: 1990"
                    value={formData.ano_nascimento}
                    onChange={(e) => setFormData({ ...formData, ano_nascimento: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    className={cn('border-gray-200 focus:border-[#005CA9] focus:ring-[#005CA9]', errors.ano_nascimento && 'border-red-500 focus:border-red-500')}
                  />
                  {errors.ano_nascimento && <p className="text-red-500 text-xs">{errors.ano_nascimento}</p>}
                </div>
              </div>

              {/* Renda e FGTS */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="renda" className="text-gray-700 font-medium">Renda familiar *</Label>
                  <Select value={formData.renda} onValueChange={(value) => setFormData({ ...formData, renda: value })}>
                    <SelectTrigger className={cn('border-gray-200 focus:border-[#005CA9] focus:ring-[#005CA9]', errors.renda && 'border-red-500')}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {faixasRenda.map((faixa) => (
                        <SelectItem key={faixa.value} value={faixa.value}>
                          {faixa.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.renda && <p className="text-red-500 text-xs">{errors.renda}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tem_fgts" className="text-gray-700 font-medium">Tem FGTS? *</Label>
                  <Select value={formData.tem_fgts} onValueChange={(value) => {
                      setFormData({ ...formData, tem_fgts: value, saldo_fgts: value === 'Não' ? '' : formData.saldo_fgts });
                  }}>
                    <SelectTrigger className={cn('border-gray-200 focus:border-[#005CA9] focus:ring-[#005CA9]', errors.tem_fgts && 'border-red-500')}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sim">Sim</SelectItem>
                      <SelectItem value="Não">Não</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tem_fgts && <p className="text-red-500 text-xs">{errors.tem_fgts}</p>}
                </div>
              </div>

              {/* Saldo FGTS */}
              {formData.tem_fgts === 'Sim' && (
                <div className="space-y-2 animate-in fade-in zoom-in duration-300">
                  <Label htmlFor="saldo_fgts" className="text-gray-700 font-medium">Saldo FGTS Aproximado *</Label>
                  <Input
                    id="saldo_fgts"
                    type="text"
                    placeholder="R$ 0,00"
                    value={formData.saldo_fgts}
                    onChange={(e) => setFormData({ ...formData, saldo_fgts: formatCurrency(e.target.value) })}
                    className={cn('border-gray-200 focus:border-[#005CA9] focus:ring-[#005CA9]', errors.saldo_fgts && 'border-red-500 focus:border-red-500')}
                  />
                  {errors.saldo_fgts && <p className="text-red-500 text-xs">{errors.saldo_fgts}</p>}
                </div>
              )}

              {/* Região */}
              <div className="space-y-2">
                <Label htmlFor="regiao" className="text-gray-700 font-medium">Qual sua Região/Bairro de interesse? *</Label>
                <Input
                  id="regiao"
                  type="text"
                  placeholder="Ex: Zona Sul, Centro, Bairro X..."
                  value={formData.regiao}
                  onChange={(e) => setFormData({ ...formData, regiao: e.target.value })}
                  className={cn('border-gray-200 focus:border-[#005CA9] focus:ring-[#005CA9]', errors.regiao && 'border-red-500 focus:border-red-500')}
                />
                {errors.regiao && <p className="text-red-500 text-xs">{errors.regiao}</p>}
              </div>

              {/* Contato e Horário */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="contato" className="text-gray-700 font-medium">Prefere Contato por *</Label>
                  <Select value={formData.contato} onValueChange={(value) => setFormData({ ...formData, contato: value })}>
                    <SelectTrigger className={cn('border-gray-200 focus:border-[#005CA9] focus:ring-[#005CA9]', errors.contato && 'border-red-500')}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Ligação">Ligação Telefônica</SelectItem>
                      <SelectItem value="E-mail">E-mail</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.contato && <p className="text-red-500 text-xs">{errors.contato}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horario" className="text-gray-700 font-medium">Melhor Horário *</Label>
                  <Select value={formData.horario} onValueChange={(value) => setFormData({ ...formData, horario: value })}>
                    <SelectTrigger className={cn('border-gray-200 focus:border-[#005CA9] focus:ring-[#005CA9]', errors.horario && 'border-red-500')}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manhã">Manhã</SelectItem>
                      <SelectItem value="Tarde">Tarde</SelectItem>
                      <SelectItem value="Noite">Noite</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.horario && <p className="text-red-500 text-xs">{errors.horario}</p>}
                </div>
              </div>

              {/* LGPD */}
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="lgpd"
                    checked={formData.lgpd}
                    onCheckedChange={(checked) => setFormData({ ...formData, lgpd: checked as boolean })}
                    className={cn('mt-0.5 border-gray-300 data-[state=checked]:bg-[#005CA9] data-[state=checked]:border-[#005CA9]', errors.lgpd && 'border-red-500')}
                  />
                  <label htmlFor="lgpd" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                    Li e aceito a <a href="#" className="text-[#005CA9] hover:underline">Política de Privacidade</a> e autorizo o uso dos meus dados para análise.
                  </label>
                </div>
                {errors.lgpd && <p className="text-red-500 text-xs">{errors.lgpd}</p>}
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FFD100] hover:bg-[#E6BC00] text-gray-900 font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all mt-6"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analisando seus dados...</>
                ) : 'SIMULAR MEU FINANCIAMENTO'}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                🔒 Seus dados estão protegidos e não serão compartilhados.
              </p>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Solicitação Enviada!</h3>
            <p className="text-gray-600 mb-6">Recebemos seus dados e um especialista entrará em contato em breve.</p>
            <Button onClick={handleClose} variant="outline" className="w-full border-[#005CA9] text-[#005CA9] hover:bg-[#005CA9] hover:text-white">
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
