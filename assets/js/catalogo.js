/* ==========================================================================
   MOTOKKA PRIME · catálogo de modelos
   --------------------------------------------------------------------------
   FONTE DOS DADOS: fichas e fotos enviadas pelo cliente no formulário de
   catálogo (outubro de 2026): sete modelos, todos declarados autopropelidos.
   Nada aqui é estimativa: o que a ficha não traz (peso, valor, dimensões)
   simplesmente não aparece. As fotos saem de projeto/build-modelos.py.

   PENDÊNCIAS:
   · XM-14: a ficha lista as cores Vermelho e "Sem nome" (#ffffff, entrou como
     Branco), mas as duas fotos enviadas mostram uma azul. Confirmar as cores.
   · Triciclo Foxscoo: o cliente declarou autopropelido, sem CNH, e "3 lugares".
     O limite de autopropelido é por potência e velocidade, mas vale confirmar
     o enquadramento de um veículo de três lugares antes de publicar.
   · "Harley" no nome de três modelos é como a loja os chama (é o estilo da
     scooter). É marca registrada de terceiro: confirmar se fica no site.

   COMO COMPLETAR: preencha `classificacao`, `categoria` e `specs`. O card monta
   os números e a etiqueta legal sozinho, e campo sem dado some da ficha.
   ========================================================================== */

/* Ordem canônica da ficha técnica. Campo ausente não é renderizado. */
window.MOTOKKA_FICHA_ORDEM = [
  ['classificacao', 'Classificação legal'],
  ['velocidade', 'Velocidade máxima'],
  ['potencia', 'Potência do motor'],
  ['autonomia', 'Autonomia'],
  ['bateria', 'Bateria'],
  ['recarga', 'Tempo de recarga'],
  ['freios', 'Freios'],
  ['ocupantes', 'Carga máxima'],
];

/* Hoje todos os modelos são autopropelidos, então a vitrine não mostra a barra
   de filtro (ver `barraFiltro` no app.js). Ao entrar um ciclomotor ou outra
   categoria, acrescente-a aqui e a barra volta sozinha. */
window.MOTOKKA_CATEGORIAS = [
  {
    id: 'todos',
    nome: 'Todos',
    nota: 'Todos são autopropelidos: até 32 km/h e 1000 W de fábrica. Sem CNH, sem placa, sem IPVA.',
  },
  {
    id: 'autopropelido',
    nome: 'Autopropelidos',
    nota: 'Autopropelidos: até 32 km/h e 1000 W de fábrica. Sem CNH, sem placa, sem IPVA.',
  },
];

/* Rótulo e cor da etiqueta por classificação. Verde = liberdade legal,
   âmbar = obrigação. Nunca o contrário. */
window.MOTOKKA_CLASSIFICACOES = {
  autopropelido: { rotulo: 'Sem CNH', tom: 'livre', extenso: 'Autopropelido' },
  ciclomotor: { rotulo: 'Exige emplacamento', tom: 'exige', extenso: 'Ciclomotor' },
};

/* ── Partes comuns ────────────────────────────────────────────────────────
   O que as seis fichas têm igual. Cada modelo declara só o que muda. */

const SPECS_COMUNS = {
  classificacao: 'Autopropelido · CONTRAN 996/2023',
  velocidade: { valor: 32, unidade: 'km/h' },
  potencia: { valor: 1000, unidade: 'W' },
  autonomia: { valor: 40, unidade: 'km' },
  bateria: 'Lítio, removível',
  recarga: '5 a 8 h',
  freios: 'A disco',
  ocupantes: '200 kg',
};

const ITENS_COMUNS = ['Painel em LED', 'Farol em LED', 'Setas', 'Buzina', 'Alarme', 'Carregador bivolt', 'Chave reserva'];

/* A ficha traz esta observação em quatro modelos. */
const NOTA_LOTE = 'As cores variam por lote: consulte as disponíveis.';

/* Ordem da vitrine. */
window.MOTOKKA_ORDEM = ['zs', 'classic-retro', 'harley-x13', 'harley-x21', 'harley-xe14', 'triciclo-foxscoo', 'xm-14'];

window.MOTOKKA_MODELOS = [
  {
    id: 'zs',
    nome: 'ZS',
    fabricante: 'Motokka',
    descritivo: 'Scooter elétrica',
    categoria: 'autopropelido',
    classificacao: 'autopropelido',
    foto: 'assets/img/models/zs-card.webp',
    recorte: false,
    alt: 'Scooter elétrica ZS vermelha, com uma verde e uma preta ao fundo',
    galeria: [
      { src: 'assets/img/models/zs-1.webp', alt: 'ZS vermelha na loja', inteira: true },
      { src: 'assets/img/models/zs-5.webp', alt: 'Painel digital da ZS', inteira: true, detalhe: true },
    ],
    specs: SPECS_COMUNS,
    equipamentos: [...ITENS_COMUNS, 'Marcha a ré'],
    cores: [
      {
        nome: 'Vermelho',
        hex: '#E60000',
        galeria: [
          { src: 'assets/img/models/zs-1.webp', alt: 'ZS vermelha na loja', inteira: true },
          { src: 'assets/img/models/zs-2.webp', alt: 'ZS vermelha de frente, com os faróis de LED acesos', inteira: true },
        ],
      },
      {
        nome: 'Verde',
        hex: '#3B8748',
        galeria: [
          { src: 'assets/img/models/zs-3.webp', alt: 'ZS verde na loja', inteira: true },
        ],
      },
      {
        nome: 'Preto',
        hex: '#000000',
        galeria: [
          { src: 'assets/img/models/zs-4.webp', alt: 'ZS preta na loja', inteira: true },
        ],
      },
    ],
    preco: null,
  },
  {
    id: 'classic-retro',
    nome: 'Classic Retrô',
    fabricante: 'Motokka',
    descritivo: 'Scooter elétrica',
    categoria: 'autopropelido',
    classificacao: 'autopropelido',
    chamada: NOTA_LOTE,
    foto: 'assets/img/models/classic-retro-card.webp',
    recorte: false,
    alt: 'Scooter elétrica Classic Retrô off white, de frente em três quartos',
    galeria: [
      { src: 'assets/img/models/classic-retro-1.webp', alt: 'Classic Retrô off white, de frente em três quartos', inteira: true },
      { src: 'assets/img/models/classic-retro-2.webp', alt: 'Classic Retrô off white, de perfil', inteira: true },
      { src: 'assets/img/models/classic-retro-3.webp', alt: 'Traseira da Classic Retrô, com a lanterna de LED acesa', inteira: true },
    ],
    specs: { ...SPECS_COMUNS, bateria: 'Lítio' },
    equipamentos: [...ITENS_COMUNS, 'Baú'],
    cores: [
      { nome: 'Off White', hex: '#D1D1D1' },
    ],
    preco: null,
  },
  {
    id: 'harley-x13',
    nome: 'Harley X13 Reino Unido',
    fabricante: 'Motokka',
    descritivo: 'Scooter elétrica',
    categoria: 'autopropelido',
    classificacao: 'autopropelido',
    chamada: NOTA_LOTE,
    foto: 'assets/img/models/harley-x13-card.webp',
    recorte: false,
    alt: 'Scooter elétrica Harley X13 azul, com a bandeira do Reino Unido no para-lama',
    galeria: [
      { src: 'assets/img/models/harley-x13-1.webp', alt: 'Harley X13 Reino Unido de frente', inteira: true },
      { src: 'assets/img/models/harley-x13-2.webp', alt: 'Harley X13 Reino Unido de perfil', inteira: true },
      { src: 'assets/img/models/harley-x13-3.webp', alt: 'Traseira da Harley X13, com a bandeira do Reino Unido no para-lama', inteira: true },
    ],
    specs: SPECS_COMUNS,
    equipamentos: [...ITENS_COMUNS, 'Marcha a ré', 'NFC', 'Bluetooth e app'],
    cores: [
      { nome: 'Azul', hex: '#002AFF' },
    ],
    preco: null,
  },
  {
    id: 'harley-x21',
    nome: 'Harley X21',
    fabricante: 'Motokka',
    descritivo: 'Scooter elétrica',
    categoria: 'autopropelido',
    classificacao: 'autopropelido',
    foto: 'assets/img/models/harley-x21-card.webp',
    recorte: false,
    alt: 'Scooter elétrica Harley X21 preta, de frente em três quartos',
    galeria: [
      { src: 'assets/img/models/harley-x21-1.webp', alt: 'Harley X21 preta de frente', inteira: true },
    ],
    specs: SPECS_COMUNS,
    equipamentos: [...ITENS_COMUNS, 'Marcha a ré'],
    cores: [
      {
        nome: 'Preto',
        hex: '#000000',
        galeria: [
          { src: 'assets/img/models/harley-x21-1.webp', alt: 'Harley X21 preta de frente', inteira: true },
          { src: 'assets/img/models/harley-x21-2.webp', alt: 'Harley X21 preta de trás, com a lanterna acesa', inteira: true },
        ],
      },
      {
        nome: 'Vermelho',
        hex: '#FF0000',
        galeria: [
          { src: 'assets/img/models/harley-x21-3.webp', alt: 'Harley X21 vermelha em frente à loja', inteira: true },
        ],
      },
      {
        nome: 'Azul',
        hex: '#001DFA',
        galeria: [
          { src: 'assets/img/models/harley-x21-4.webp', alt: 'Harley X21 azul na rua', inteira: true },
        ],
      },
    ],
    preco: null,
  },
  {
    id: 'harley-xe14',
    nome: 'Harley XE14',
    fabricante: 'Motokka',
    descritivo: 'Scooter elétrica',
    categoria: 'autopropelido',
    classificacao: 'autopropelido',
    chamada: NOTA_LOTE,
    foto: 'assets/img/models/harley-xe14-card.webp',
    recorte: false,
    alt: 'Scooter elétrica Harley XE14 off white, em estúdio',
    galeria: [
      { src: 'assets/img/models/harley-xe14-1.webp', alt: 'Harley XE14 off white, de frente em três quartos', inteira: true },
      { src: 'assets/img/models/harley-xe14-2.webp', alt: 'Harley XE14 off white, de perfil', inteira: true },
      { src: 'assets/img/models/harley-xe14-3.webp', alt: 'Harley XE14 off white, de trás em três quartos', inteira: true },
      { src: 'assets/img/models/harley-xe14-4.webp', alt: 'Harley XE14 off white, de frente', inteira: true },
    ],
    specs: SPECS_COMUNS,
    equipamentos: [...ITENS_COMUNS, 'Marcha a ré', 'NFC'],
    cores: [
      { nome: 'Off White', hex: '#CCCCCC' },
    ],
    preco: null,
  },
  {
    id: 'triciclo-foxscoo',
    nome: 'Triciclo Foxscoo',
    fabricante: 'Motokka',
    descritivo: 'Triciclo elétrico',
    categoria: 'autopropelido',
    classificacao: 'autopropelido',
    chamada: 'Três lugares. As cores variam por lote: consulte as disponíveis.',
    foto: 'assets/img/models/triciclo-foxscoo-card.webp',
    recorte: false,
    alt: 'Triciclo elétrico Foxscoo preto, com cesto dianteiro e banco traseiro',
    galeria: [
      { src: 'assets/img/models/triciclo-foxscoo-1.webp', alt: 'Triciclo Foxscoo preto, de frente em três quartos', inteira: true },
      { src: 'assets/img/models/triciclo-foxscoo-2.webp', alt: 'Triciclo Foxscoo com o cesto dianteiro e o farol aceso', inteira: true },
      { src: 'assets/img/models/triciclo-foxscoo-3.webp', alt: 'Triciclo Foxscoo de perfil, com os bancos', inteira: true },
      { src: 'assets/img/models/triciclo-foxscoo-4.webp', alt: 'Triciclo Foxscoo de frente', inteira: true },
      { src: 'assets/img/models/triciclo-foxscoo-5.webp', alt: 'Traseira do Triciclo Foxscoo, com o baú', inteira: true },
    ],
    specs: { ...SPECS_COMUNS, bateria: 'Lítio', freios: undefined },
    equipamentos: [...ITENS_COMUNS, 'Baú', 'Marcha a ré'],
    cores: [
      { nome: 'Preto', hex: '#000000' },
    ],
    preco: null,
  },
  {
    id: 'xm-14',
    nome: 'XM-14',
    fabricante: 'Motokka',
    descritivo: 'Scooter elétrica',
    categoria: 'autopropelido',
    classificacao: 'autopropelido',
    chamada: NOTA_LOTE,
    foto: 'assets/img/models/xm-14-card.webp',
    recorte: false,
    alt: 'Scooter elétrica XM-14 azul, com cesto dianteiro',
    galeria: [
      { src: 'assets/img/models/xm-14-1.webp', alt: 'XM-14 azul, de frente em três quartos', inteira: true },
      { src: 'assets/img/models/xm-14-2.webp', alt: 'XM-14 azul de frente, com o cesto e o farol de LED', inteira: true },
    ],
    specs: { ...SPECS_COMUNS, potencia: { valor: 800, unidade: 'W' }, ocupantes: '150 kg' },
    equipamentos: ITENS_COMUNS,
    cores: [
      { nome: 'Vermelho', hex: '#A30000' },
      { nome: 'Branco', hex: '#FFFFFF' },
    ],
    preco: null,
  },
];

/* ── FAQ ────────────────────────────────────────────────────────────────── */

window.MOTOKKA_FAQ = [
  {
    q: 'Preciso de CNH?',
    a: 'Depende da classificação. Modelos enquadrados como autopropelidos, até 32 km/h e 1000 W de fábrica, não exigem CNH, registro ou emplacamento. Ciclomotores e motos elétricas exigem ACC ou CNH categoria A, além de placa e licenciamento. Na loja a gente confere o enquadramento do modelo antes de você fechar.',
  },
  {
    q: 'Onde carrego e quanto custa?',
    a: 'Na tomada comum de casa. O tempo de recarga varia por modelo e está na ficha técnica. O custo depende da sua rota e da tarifa de energia: o simulador desta página dá a estimativa, e na loja a gente refaz a conta com você.',
  },
  {
    q: 'A moto elétrica sobe ladeira?',
    a: 'Sim, a performance de subida pode variar de acordo com a potência do motor e o peso suportado pelo modelo.',
  },
  {
    q: 'A bateria é removível?',
    a: 'Sim, o que permite carregar em apartamento ou no trabalho. A ficha técnica de cada modelo traz a especificação da bateria.',
  },
  {
    q: 'Tem assistência técnica?',
    a: 'Sim, própria, no mesmo endereço da loja: R. Marechal Deodoro, 1258, Centro de Franca. O atendimento é pelo WhatsApp (16) 98101-9689.',
  },
  {
    q: 'Dá para andar com garupa?',
    a: 'Pode levar até 1 passageiro desde que o modelo tenha estrutura para isso. A ficha técnica traz a carga máxima suportada, e é um dos campos que conferimos junto com você.',
  },
  {
    q: 'Posso testar antes de decidir?',
    a: 'Pode. Agende o test ride pelo WhatsApp e venha à Marechal Deodoro, 1258. Na loja a gente confere com você o enquadramento legal do modelo e faz a conta de custo por km da sua rota.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'As formas de pagamento e as condições de parcelamento do mês são passadas pelo WhatsApp ou na loja, sempre por escrito antes de qualquer pagamento.',
  },
  {
    q: 'A moto elétrica pega chuva?',
    a: 'Os modelos têm índice de proteção à água informado na ficha técnica (IP65, IP67 e afins). Esse índice cobre uso normal na chuva. Nenhum deles é feito para submersão ou lavagem com jato de alta pressão.',
  },
];

window.MOTOKKA_DEPOIMENTOS = [
  /* PENDENTE: depoimentos reais de clientes, com nome, modelo comprado e
     categoria. Regra do styleguide: nome real, sem emoji, sem foto de banco
     de imagens, no máximo 4 linhas. Enquanto a lista estiver vazia, o bloco
     inteiro não é renderizado. Melhor sem prova social do que com prova
     social inventada. */
];
