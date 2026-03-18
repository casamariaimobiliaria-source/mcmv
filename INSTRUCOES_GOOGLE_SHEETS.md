# Como Integrar o Formulário com o Google Sheets

Para que os dados caiam automaticamente na sua planilha do Google, você pode usar uma ferramenta de automação gratuita como o **Make.com** (antigo Integromat), **Zapier** ou **n8n**.
Recomendamos o **Make.com** por ser mais simples e possuir um plano grátis generoso.

## Passo a passo no Make.com:

1. Acesse [make.com](https://www.make.com/) e crie uma conta (ou faça login).
2. Clique em **"Create a new scenario"** (Criar novo cenário).
3. Clique no botão de `+` e pesquise por **"Webhooks"**.
4. Selecione a opção **"Custom Webhook"**.
5. Clique em **"Create a webhook"**, dê um nome (Ex: *Lead MCMV Landing Page*) e clique em **Save**.
6. O Make vai gerar uma URL (Exemplo: `https://hook.us1.make.com/abc123xyz`). **Copie essa URL!**
7. No seu projeto da Landing Page, abra o arquivo `.env` (ou crie um na raiz do projeto `c:\Antigravity\LP\MCMV\.env`) e adicione a URL que você copiou:
   ```env
   GOOGLE_WEBHOOK_URL="https://hook.us1.make.com/abc123xyz..."
   ```
8. Inicie (ou reinicie) o servidor se estiver rodando localmente (`npm run dev`).
9. **Importante:** Vá no formulário da sua Landing Page e faça um **ENVIO DE TESTE** para que o Make reconheça os dados.
10. Volte no Make, e você verá que ele detectou os dados com sucesso (Aparecerá "Successfully determined"). Clique em OK.
11. Clique em "Add another module" (adicionar outro módulo) e pesquise por **Google Sheets**.
12. Selecione a opção **"Add a Row"** (Adicionar uma linha).
13. Conecte sua conta do Google e selecione a planilha onde você deseja salvar os leads.
14. Mapeie os campos capturados no passo 1 (Nome, Email, Telefone, Renda, Tem FGTS, Saldo FGTS, Ano de Nasc, Região, Contato, Horário) para as colunas relativas na sua planilha do Google.
15. Clique em OK e depois não esqueça de ativar o cenário (botão "ON" no canto inferior esquerdo).

Pronto! Agora todos os envios irão aparecer automaticamente na sua planilha.

---

### Campos enviados pelo formulário:
O formulário agora envia exatamente este JSON para a sua URL Webhook:
- `nome` (Nome completo)
- `email` (E-mail)
- `telefone` (Telefone/WhatsApp formatado)
- `ano_nascimento` (Ex: 1990)
- `renda` (Faixa de renda descritiva)
- `tem_fgts` ("Sim" ou "Não")
- `saldo_fgts` (Saldo formatado, ex: R$ 5.000,00)
- `regiao` (Região/Bairro de interesse)
- `contato` (Preferencia de contato: WhatsApp, Ligação ou E-mail)
- `horario` (Melhor horário: Manhã, Tarde ou Noite)
- `dataHora` (Data e Hora do envio)
