class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

function criarProduto(dados) {
    if (!dados.nome) {
        throw new ValidationError('O nome do produto é obrigatório');
    }

    if (typeof dados.preco !== 'number' || dados.preco <= 0) {
        throw new ValidationError('O preço deve ser um número maior que zero');
    }

    if (typeof dados.estoque !== 'number' || !Number.isInteger(dados.estoque) || dados.estoque < 0) {
        throw new ValidationError('O estoque deve ser um número inteiro maior ou igual a zero');
    }

    return {
        nome: dados.nome,
        preco: dados.preco,
        estoque: dados.estoque
    };
}

const dadospteste = [
    {
        descricao: 'Produto válido',
        dados: { nome: 'Monitor', preco: 1450.00, estoque: 90 }
    },
    {
        descricao: 'Produto sem nome',
        dados: { preco: 75.00, estoque: 20 }
    },
    {
        descricao: 'Erro Inesperado',
        dados: null
    }
];

dadospteste.forEach(({ descricao, dados }) => {
    console.log(`Teste: ${descricao}`);
    try {
        const produto = criarProduto(dados);
        console.log('Sucesso:', produto);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error(`Erro de validação: ${error.message}`);
        } else {
            console.error(`Erro inesperado: ${error.message}`);
        }
    }
});