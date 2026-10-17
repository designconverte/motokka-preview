/* ==========================================================================
   MOTOKKA PRIME · configuração da loja
   Único lugar onde dados de negócio moram. O HTML e o app.js leem daqui.
   Fonte: briefing preenchido pelo cliente em 08/09/2026
   (projeto/branding/informacoes_preenchidas_briefing.txt).
   ========================================================================== */

window.MOTOKKA_CONFIG = {
  marca: {
    nome: 'Motokka Prime',
    razaoSocial: 'Motokka Prime',
    cnpj: '61.563.072/0001-31',
  },

  /* WhatsApp: vendas e assistência usam o mesmo número.
     `numero` é só para exibição; `e164` é o que entra no link wa.me. */
  whatsapp: {
    numero: '(16) 98101-9689',
    e164: '5516981019689',
  },

  /* Locação tem time e número próprios. Todo link de WhatsApp vai para o
     número de vendas, menos os que usam uma das mensagens listadas aqui. */
  whatsappLocacao: {
    numero: '(16) 99767-0245',
    e164: '5516997670245',
    mensagens: ['locacao'],
  },

  /* O briefing não trouxe CEP. Se chegar, acrescente `cep` aqui e inclua-o em
     `completo` e `busca`: o mapa e o "traçar rota" ficam mais precisos. */
  endereco: {
    logradouro: 'R. Marechal Deodoro, 1258',
    bairro: 'Centro',
    cidade: 'Franca',
    uf: 'SP',
    get completo() {
      return `${this.logradouro} · ${this.bairro} · ${this.cidade}/${this.uf}`;
    },
    // Usado no link "traçar rota" e no iframe do mapa.
    get busca() {
      return `Rua Marechal Deodoro, 1258, ${this.bairro}, ${this.cidade} - ${this.uf}`;
    },
  },

  /* PENDENTE: o briefing não informou horário. Enquanto `confirmado` for false,
     a página mostra "consulte pelo WhatsApp" em vez de um horário que pode
     estar errado. Ao confirmar, preencha os dois campos e troque para true. */
  horarios: {
    confirmado: false,
    semana: '',
    sabado: '',
  },

  /* O briefing traz "motokkaprime", mas o perfil que existe (verificado, com a
     loja da Marechal Deodoro) é @motokka_prime. */
  redes: {
    instagram: 'https://www.instagram.com/motokka_prime/',
  },

  /* ── Chaves de liga/desliga ──────────────────────────────────────────────
     Funcionalidades pedidas pela loja em 16/10/2026. Para desligar uma, troque
     para false e publique: a página volta a ser como era antes dela. */
  recursos: {
    // Preço no card e na ficha do modelo. Modelo sem preço mostra "sob consulta".
    precos: true,
    // Formulário de qualificação antes do WhatsApp, nos botões de contato.
    capturaLead: true,
  },

  /* Formulário de qualificação (recursos.capturaLead). */
  captura: {
    /* Botões que vão direto ao WhatsApp, sem formulário, pelo data-origem.
       Assistência e locação ficam fora: as perguntas são de compra. Para
       incluir um deles, apague o nome da lista. */
    excecoes: ['flutuante', 'assistencia', 'rodape_assistencia', 'locacao', 'rodape_locacao'],
    prazos: ['Em 7 dias', 'Em 14 dias', 'Ainda este mês', 'Daqui a 3 meses'],
    orcamentos: ['De R$ 4.500 a R$ 5.500', 'De R$ 6.000 a R$ 7.500', 'De R$ 8.000 a R$ 9.500', 'Acima de R$ 10.000'],
    pagamentos: ['Cartão de crédito', 'PIX', 'Dinheiro', 'Entrada + cartão de crédito'],
  },

  /* Mensagens pré-preenchidas. `{modelo}` e `{cor}` são trocados em tempo de clique. */
  mensagens: {
    geral: 'Olá! Vim pelo site da Motokka e quero falar sobre mobilidade elétrica.',
    modelo: 'Olá! Vim pelo site da Motokka e tenho interesse no modelo {modelo}. Pode me passar ficha técnica e condições?',
    modeloCor: 'Olá! Vim pelo site da Motokka e tenho interesse no {modelo} na cor {cor}. Pode me passar ficha técnica e condições?',
    testRide: 'Olá! Quero agendar um test ride na Motokka.\n\nNome: {nome}\nInteresse: {interesse}',
    assistencia: 'Olá! Preciso de assistência técnica para o meu veículo elétrico.',
    categoria: 'Olá! Vim pelo site da Motokka e quero ver as opções de {categoria}.',
    usoDia: 'Olá! Vim pelo site da Motokka. Quero uma elétrica para o dia a dia. Qual modelo vocês indicam?',
    usoTrabalho: 'Olá! Vim pelo site da Motokka. Quero uma elétrica para trabalhar e fazer entregas. Qual modelo vocês indicam?',
    usoDiversao: 'Olá! Vim pelo site da Motokka e quero ver patinetes, e-bikes e a linha infantil.',
    locacao: 'Olá! Vim pelo site da Motokka e quero saber sobre locação de motos: modelos e condições.',
    // Depois do formulário de qualificação. Linhas sem resposta são omitidas.
    qualificado: 'Olá! Vim pelo site da Motokka.\n\nNome: {nome}\nInteresse: {interesse}\nPretendo comprar: {prazo}\nOrçamento: {orcamento}\nPagamento: {pagamento}',
  },
};
