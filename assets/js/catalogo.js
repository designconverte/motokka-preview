/* ==========================================================================
   MOTOKKA PRIME · catálogo de modelos
   --------------------------------------------------------------------------
   FONTE DOS DADOS: fichas preenchidas pelo cliente no formulário de catálogo
   (projeto/modelos/briefing_modelo.md, outubro de 2026). Seis modelos, todos
   autopropelidos. Nada aqui é estimativa: o que a ficha não traz (peso, valor,
   dimensões) simplesmente não aparece.

   PENDÊNCIAS:
   · FOTOS. O formulário registra de 2 a 5 fotos anexadas por modelo, mas elas
     não chegaram junto com as fichas. ZS e Classic Retrô usam quadros dos
     vídeos gravados na loja; os outros quatro usam a imagem "foto em breve".
     Ao receber as fotos: salve em assets/img/models/, troque `foto`/`galeria`
     e, se forem recortes sem fundo, marque `recorte: true`.
   · "Harley" no nome de três modelos é como a loja os chama (é o estilo da
     scooter). É marca registrada de terceiro: vale confirmar com o cliente se
     quer mantê-la no site.
   · XM-14: a segunda cor veio como "Sem nome" (#ffffff). Entrou como Branco.

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

const SEM_FOTO = {
  foto: 'assets/img/models/foto-em-breve.webp',
  recorte: false,
  galeria: [{ src: 'assets/img/models/foto-em-breve.webp', alt: 'Foto do modelo em breve', inteira: true }],
};

/* Ordem da vitrine: primeiro os dois que já têm foto real da loja. */
window.MOTOKKA_ORDEM = ['zs', 'classic-retro', 'harley-x13', 'harley-x21', 'harley-xe14', 'xm-14'];

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
    alt: 'Três scooters elétricas ZS lado a lado na calçada da loja: preta, vermelha e verde',
    galeria: [
      { src: 'assets/img/models/zs-1.webp', alt: 'Scooters ZS preta, vermelha e verde em frente à Motokka' },
      { src: 'assets/img/models/zs-2.webp', alt: 'Frente da scooter ZS preta, com as luzes de LED', detalhe: true },
    ],
    specs: SPECS_COMUNS,
    equipamentos: [...ITENS_COMUNS, 'Marcha a ré'],
    cores: [
      { nome: 'Preto', hex: '#000000' },
      { nome: 'Vermelho', hex: '#E60000' },
      { nome: 'Verde', hex: '#3B8748' },
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
    alt: 'Scooter elétrica Classic Retrô off white, de perfil, na entrada da loja',
    galeria: [
      { src: 'assets/img/models/classic-retro-1.webp', alt: 'Classic Retrô off white de perfil, na entrada da Motokka' },
      { src: 'assets/img/models/classic-retro-2.webp', alt: 'Guidão, para-brisa e retrovisor redondo da Classic Retrô', detalhe: true },
    ],
    // A ficha deste modelo não marca bateria removível.
    specs: { ...SPECS_COMUNS, bateria: 'Lítio' },
    equipamentos: [...ITENS_COMUNS, 'Baú'],
    cores: [{ nome: 'Off White', hex: '#D1D1D1' }],
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
    ...SEM_FOTO,
    alt: 'Foto da Harley X13 Reino Unido em breve',
    specs: SPECS_COMUNS,
    equipamentos: [...ITENS_COMUNS, 'Marcha a ré', 'NFC', 'Bluetooth e app'],
    cores: [{ nome: 'Azul', hex: '#002AFF' }],
    preco: null,
  },
  {
    id: 'harley-x21',
    nome: 'Harley X21',
    fabricante: 'Motokka',
    descritivo: 'Scooter elétrica',
    categoria: 'autopropelido',
    classificacao: 'autopropelido',
    ...SEM_FOTO,
    alt: 'Foto da Harley X21 em breve',
    specs: SPECS_COMUNS,
    equipamentos: [...ITENS_COMUNS, 'Marcha a ré'],
    cores: [
      { nome: 'Azul', hex: '#001DFA' },
      { nome: 'Vermelho', hex: '#FF0000' },
      { nome: 'Preto', hex: '#000000' },
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
    ...SEM_FOTO,
    alt: 'Foto da Harley XE14 em breve',
    specs: SPECS_COMUNS,
    equipamentos: [...ITENS_COMUNS, 'Marcha a ré', 'NFC'],
    cores: [{ nome: 'Off White', hex: '#CCCCCC' }],
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
    ...SEM_FOTO,
    alt: 'Foto da XM-14 em breve',
    // Único modelo de 800 W e 150 kg de carga.
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
