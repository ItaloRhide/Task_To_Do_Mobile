export const tarefasMock = [
  {
    id: 1,
    titulo: 'Revisar prova de mobile',
    descricao: 'Separar os pontos principais da aula de Expo.',
    dataVencimento: '2026-06-15',
    concluida: false,
    prioridade: 4,
    categoria: { id: 1, nome: 'Estudos' },
    fornecedores: [{ id: 1, nome: 'Biblioteca UEG' }],
  },
  {
    id: 2,
    titulo: 'Enviar documentacao do projeto',
    descricao: 'Organizar README e exemplos de API.',
    dataVencimento: '2026-06-20',
    concluida: true,
    prioridade: 3,
    categoria: { id: 2, nome: 'Projeto' },
    fornecedores: [],
  },
  {
    id: 3,
    titulo: 'Validar banco local',
    descricao: 'Conferir PostgreSQL e dados iniciais.',
    dataVencimento: '2026-06-25',
    concluida: false,
    prioridade: 5,
    categoria: { id: 3, nome: 'Backend' },
    fornecedores: [{ id: 2, nome: 'Suporte TI' }],
  },
];

export const categoriasMock = [
  { id: 1, nome: 'Estudos', descricao: 'Atividades de faculdade e cursos' },
  { id: 2, nome: 'Projeto', descricao: 'Entregas e documentacao do app' },
  { id: 3, nome: 'Backend', descricao: 'Infraestrutura, API e banco' },
];

export const fornecedoresMock = [
  { id: 1, nome: 'Biblioteca UEG', cnpj: '12345678000199', tasks: [{ id: 1, titulo: 'Revisar prova de mobile' }] },
  { id: 2, nome: 'Suporte TI', cnpj: '98765432000188', tasks: [{ id: 3, titulo: 'Validar banco local' }] },
];

export function prioridadeLabel(prioridade) {
  const labels = {
    1: 'Muito baixa',
    2: 'Baixa',
    3: 'Media',
    4: 'Alta',
    5: 'Critica',
  };

  return labels[prioridade] || 'Sem prioridade';
}
