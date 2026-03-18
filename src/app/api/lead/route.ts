import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface LeadData {
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
}

// Mapeamento das faixas de renda
const faixasRenda: Record<string, string> = {
  faixa1: 'Até R$ 2.850 (Faixa 1)',
  faixa2: 'R$ 2.850 a R$ 4.700 (Faixa 2)',
  faixa3: 'R$ 4.700 a R$ 8.000 (Faixa 3)',
  faixa4: 'R$ 8.000 a R$ 12.000 (Faixa 4)',
}

// Configuração do transportador de e-mail
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true para 465, false para outras portas
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  })
}

// Template do e-mail em HTML
function createEmailTemplate(data: LeadData): string {
  const faixaCompleta = faixasRenda[data.renda] || data.renda
  const dataAtual = new Date().toLocaleString('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'short',
  })

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nova Solicitação - Minha Casa Minha Vida</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(135deg, #005CA9 0%, #0078D4 100%); padding: 30px 40px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
              🏠 Nova Simulação Solicitada
            </h1>
            <p style="margin: 10px 0 0 0; color: #FFD100; font-size: 16px;">
              Minha Casa Minha Vida
            </p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding: 40px 40px 20px 40px;">
            <p style="margin: 0 0 20px 0; color: #333; font-size: 16px;">
              Uma nova pessoa realizou uma simulação de financiamento para o programa Minha Casa Minha Vida. Seguem os dados abaixo:
            </p>
          </td>
        </tr>

        <!-- Lead Data -->
        <tr>
          <td style="padding: 0 40px 40px 40px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; border-radius: 8px; overflow: hidden;">
              
              <tr>
                <td style="padding: 15px 20px; border-bottom: 1px solid #e9ecef;">
                  <span style="color: #666; font-size: 12px; text-transform: uppercase;">Nome Completo</span>
                  <br>
                  <span style="color: #005CA9; font-size: 16px; font-weight: bold;">${data.nome}</span>
                </td>
              </tr>

              <tr>
                <td style="padding: 15px 20px; border-bottom: 1px solid #e9ecef;">
                  <span style="color: #666; font-size: 12px; text-transform: uppercase;">E-mail</span>
                  <br>
                  <a href="mailto:${data.email}" style="color: #005CA9; font-size: 16px; font-weight: bold; text-decoration: none;">${data.email}</a>
                </td>
              </tr>

              <tr>
                <td style="padding: 15px 20px; border-bottom: 1px solid #e9ecef;">
                  <span style="color: #666; font-size: 12px; text-transform: uppercase;">Telefone/WhatsApp</span>
                  <br>
                  <a href="https://wa.me/55${data.telefone.replace(/\D/g, '')}" target="_blank" style="color: #005CA9; font-size: 16px; font-weight: bold; text-decoration: none;">
                    ${data.telefone} 📱
                  </a>
                </td>
              </tr>

              <tr>
                <td style="padding: 15px 20px; border-bottom: 1px solid #e9ecef;">
                  <span style="color: #666; font-size: 12px; text-transform: uppercase;">Ano de Nascimento</span>
                  <br>
                  <span style="color: #333; font-size: 16px; font-weight: bold;">${data.ano_nascimento}</span>
                </td>
              </tr>

              <tr>
                <td style="padding: 15px 20px; border-bottom: 1px solid #e9ecef;">
                  <span style="color: #666; font-size: 12px; text-transform: uppercase;">Faixa de Renda</span>
                  <br>
                  <span style="background: linear-gradient(135deg, #005CA9 0%, #0078D4 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: bold;">
                    ${faixaCompleta}
                  </span>
                </td>
              </tr>

              <tr>
                <td style="padding: 15px 20px; border-bottom: 1px solid #e9ecef;">
                  <span style="color: #666; font-size: 12px; text-transform: uppercase;">FGTS</span>
                  <br>
                  <span style="color: #333; font-size: 14px;"><strong>Possui:</strong> ${data.tem_fgts}</span>
                  ${data.tem_fgts === 'Sim' ? `<br><span style="color: #333; font-size: 14px;"><strong>Saldo:</strong> ${data.saldo_fgts}</span>` : ''}
                </td>
              </tr>

              <tr>
                <td style="padding: 15px 20px; border-bottom: 1px solid #e9ecef;">
                  <span style="color: #666; font-size: 12px; text-transform: uppercase;">Região / Bairro</span>
                  <br>
                  <span style="color: #005CA9; font-size: 16px; font-weight: bold;">📍 ${data.regiao}</span>
                </td>
              </tr>

              <tr>
                <td style="padding: 15px 20px;">
                  <span style="color: #666; font-size: 12px; text-transform: uppercase;">Preferência de Contato</span>
                  <br>
                  <span style="color: #333; font-size: 14px;"><strong>Via:</strong> ${data.contato} | <strong>Horário:</strong> ${data.horario}</span>
                </td>
              </tr>

            </table>
          </td>
        </tr>

        <!-- Timestamp -->
        <tr>
          <td style="padding: 0 40px 40px 40px;">
            <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
              Enviado em ${dataAtual}
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f8f9fa; padding: 20px 40px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="margin: 0 0 10px 0; color: #666; font-size: 12px;">
              Este e-mail foi enviado automaticamente pelo sistema de captação de leads.
            </p>
            <p style="margin: 0; color: #999; font-size: 11px;">
              © ${new Date().getFullYear()} Minha Casa Minha Vida - Landing Page
            </p>
          </td>
        </tr>

      </table>
    </body>
    </html>
  `
}

// Template de confirmação para o usuário
function createUserConfirmationTemplate(data: LeadData): string {
  const faixaCompleta = faixasRenda[data.renda] || data.renda

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Recebemos sua solicitação - Minha Casa Minha Vida</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(135deg, #005CA9 0%, #0078D4 100%); padding: 40px 40px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
              🏠 Recebemos sua Solicitação!
            </h1>
            <p style="margin: 15px 0 0 0; color: #FFD100; font-size: 18px;">
              Minha Casa Minha Vida
            </p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding: 40px 40px;">
            <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
              Olá <strong>${data.nome.split(' ')[0]}</strong>,
            </p>
            <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
              Agradecemos pelo seu interesse no programa <strong>Minha Casa Minha Vida</strong>. Recebemos seus dados e nossa equipe entrará em contato em até <strong style="color: #005CA9;">24 horas úteis</strong>.
            </p>
          </td>
        </tr>

        <!-- Summary -->
        <tr>
          <td style="padding: 0 40px 40px 40px;">
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; border-left: 4px solid #FFD100;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px; font-weight: bold;">Resumo da sua solicitação:</p>
              <p style="margin: 5px 0; color: #333; font-size: 14px;">
                📧 <strong>E-mail:</strong> ${data.email}
              </p>
              <p style="margin: 5px 0; color: #333; font-size: 14px;">
                📱 <strong>Telefone:</strong> ${data.telefone}
              </p>
              <p style="margin: 5px 0; color: #333; font-size: 14px;">
                💰 <strong>Faixa de Renda:</strong> ${faixaCompleta}
              </p>
              <p style="margin: 5px 0; color: #333; font-size: 14px;">
                📍 <strong>Local:</strong> ${data.regiao}
              </p>
            </div>
          </td>
        </tr>

        <!-- Next Steps -->
        <tr>
          <td style="padding: 0 40px 40px 40px;">
            <p style="margin: 0 0 15px 0; color: #333; font-size: 16px; font-weight: bold;">Próximos passos:</p>
            <ol style="margin: 0; padding-left: 20px; color: #333; font-size: 14px; line-height: 1.8;">
              <li>Nossa equipe irá analisar seus dados</li>
              <li>Entraremos em contato por ${data.contato} no turno da ${data.horario.toLowerCase()}</li>
              <li>Você receberá uma simulação personalizada</li>
            </ol>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f8f9fa; padding: 20px 40px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="margin: 0 0 10px 0; color: #005CA9; font-size: 14px; font-weight: bold;">
              Dúvidas? Entre em contato!
            </p>
            <p style="margin: 0; color: #999; font-size: 11px;">
              © ${new Date().getFullYear()} Minha Casa Minha Vida - Todos os direitos reservados
            </p>
          </td>
        </tr>

      </table>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json()

    // Validação básica
    if (!data.nome || !data.email || !data.telefone || !data.renda || !data.regiao) {
      return NextResponse.json(
        { success: false, message: 'Todos os campos principais são obrigatórios' },
        { status: 400 }
      )
    }

    const faixaCompleta = faixasRenda[data.renda] || data.renda

    // 1) Enviar para Webhook do Google Sheets (n8n/Make/Zapier/AppsScript) se existir
    const webhookUrl = process.env.GOOGLE_WEBHOOK_URL
    if (webhookUrl) {
      try {
        const payload = {
          ...data,
          renda: faixaCompleta, // Substituindo a chave pela versão por extenso
          dataHora: new Date().toISOString()
        }
        
        console.log('Enviando para o Webhook:', webhookUrl)
        console.log('Payload:', JSON.stringify(payload))
        
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        
        console.log('Resposta do Webhook Status:', webhookResponse.status)
        const responseText = await webhookResponse.text()
        console.log('Resposta do Webhook Body:', responseText)
        
      } catch (webhookError) {
        console.error('Erro ao enviar para webhook:', webhookError)
        // Ocultar erro pro usuário, mantemos o fluxo normal
      }
    }

    // 2) Envio de E-mails via SMTP
    // Verifica se as credenciais SMTP estão configuradas
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('SMTP não configurado. Dados recebidos:', data)

      // Em desenvolvimento, retorna sucesso mesmo sem enviar e-mail
      return NextResponse.json({
        success: true,
        message: 'Dados recebidos com sucesso! (Modo de demonstração - sem e-mail)',
        data,
      })
    }

    const transporter = createTransporter()

    // E-mail principal para o corretor/imobiliária
    const mailOptions = {
      from: `"Minha Casa Minha Vida" <${process.env.SMTP_USER}>`,
      to: 'casamariaimobiliaria@gmail.com',
      subject: `🏠 Novo Lead MCMV - ${data.nome}`,
      html: createEmailTemplate(data),
      replyTo: data.email,
    }

    // E-mail de confirmação para o usuário
    const userMailOptions = {
      from: `"Minha Casa Minha Vida" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Recebemos sua solicitação - Minha Casa Minha Vida',
      html: createUserConfirmationTemplate(data),
    }

    // Enviar ambos os e-mails
    try {
      await Promise.all([
        transporter.sendMail(mailOptions),
        transporter.sendMail(userMailOptions),
      ])
    } catch (smtpError) {
      console.error('Erro ao enviar e-mails via SMTP:', smtpError)
      // Não retorna erro 500 aqui para não impedir o usuário de ver a mensagem de sucesso
      // Já que os dados pelo menos foram pro Webhook
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitação enviada com sucesso! Em breve entraremos em contato.',
    })

  } catch (error) {
    console.error('Erro ao enviar e-mail / processar lead:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao processar solicitação. Tente novamente mais tarde.'
      },
      { status: 500 }
    )
  }
}
