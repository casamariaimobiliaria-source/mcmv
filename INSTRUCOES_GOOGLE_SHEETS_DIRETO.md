# Como Integrar o Formulário DIRETO com o Google Sheets (Sem Make/Zapier)

Para enviar os dados diretamente do seu site para o Google Sheets sem usar ferramentas de terceiros, vamos usar um recurso nativo do próprio Google chamado **Google Apps Script**. Ele cria um link direto para a sua planilha.

Siga este passo a passo:

## 1. Prepare sua Planilha
1. Crie uma nova planilha no Google Sheets.
2. Na primeira linha (Cabeçalho), coloque o nome das colunas nesta exata ordem:
   - A: Data/Hora
   - B: Nome
   - C: E-mail
   - D: Telefone
   - E: Ano Nasc.
   - F: Renda
   - G: Tem FGTS?
   - H: Saldo FGTS
   - I: Região
   - J: Contato
   - K: Horário

## 2. Crie o Script no Google
1. Na sua planilha, clique no menu superior em **Extensões** > **Apps Script**.
2. Vai abrir uma nova aba. Apague todo o código que estiver lá e cole o código abaixo:

```javascript
function doPost(e) {
  try {
    // Mude "MCMV" abaixo para o nome exato da aba onde os dados devem cair.
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MCMV");
    
    // Fallback: se não encontrar a aba "MCMV", salva na aba ativa para não perder o dado
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    }
    
    var data = JSON.parse(e.postData.contents);
    
    // Adiciona os dados na planilha na exata ordem das suas colunas:
    // A:Data, B:Nome, C:Telefone, D:E-mail, E:Renda Familiar, F:Tem FGTS
    // G:Saldo FGTS, H:Ano Nasc., I:Região, J:Contato, K:Horário
    sheet.appendRow([
      data.dataHora,
      data.nome,
      data.telefone,
      data.email,
      data.renda,
      data.tem_fgts,
      data.saldo_fgts || "-",
      data.ano_nascimento,
      data.regiao,
      data.contato,
      data.horario
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Clique no ícone de **Salvar** (disquete) ou aperte `Ctrl + S`.
4. Dê um nome para o projeto lá em cima (Ex: "API Landing Page").

## 3. Gere o seu Link Direto (URL Webhook do Google)
1. No canto superior direito, clique no botão azul **Implantar** (Deploy) > **Nova implantação** (New deployment).
2. Na engrenagem de "Selecione o tipo", escolha **App da Web** (Web app).
3. Preencha assim:
   - Descrição: `V1`
   - Executar como: `Eu (seu e-mail)`
   - Quem tem acesso: **Qualquer pessoa** (Isso é obrigatório para o site conseguir enviar).
4. Clique em **Implantar**.
5. *Nota: Na primeira vez, o Google vai pedir para você "Autorizar o acesso". Clique em Autorizar > Escolha sua conta > Avançado > Acessar projeto (inseguro) > Permitir.*
6. Na tela final, ele vai te dar uma **URL do app da Web**. Copie esse link longo!

## 4. Conecte no seu Site
1. Abra o arquivo `.env` do seu projeto (adicione um caso não exista, na raiz da pasta `c:\Antigravity\LP\MCMV\.env`).
2. Cole a URL que você copiou:

```env
GOOGLE_WEBHOOK_URL="COLE_AQUI_A_URL_DO_APPS_SCRIPT"
```

3. Reinicie seu servidor rodando `npm run dev` no terminal para que ele leia o novo link.
4. Faça um teste preenchendo o formulário no seu site. Os dados vão aparecer como mágica na mesma hora na sua planilha!
