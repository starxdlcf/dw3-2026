class ValidationError extends Error {
    constructor(message, details = []) {
        super(message);
        this.name = 'ValidationError';
        this.details = details;
    }
}

function validarAluno(aluno) {
    const erros = [];

    if (!aluno.nome) {
        erros.push('O nome é obrigatório');
    }

    if (!aluno.email || !aluno.email.includes('@')) {
        erros.push('O e-mail deve conter @');
    }

    if (typeof aluno.idade !== 'number' || aluno.idade < 16) {
        erros.push('A idade deve ser um número maior ou igual a 16');
    }

    if (erros.length > 0) {
        throw new ValidationError('Erro na validação do aluno', erros);
    }

    return true;
}

const alunosParaTestar = [
    {
        descricao: 'Aluno válido',
        dados: { nome: 'Anna', email: 'annaluisa@alunos.utfpr.edu.br', idade: 18 }
    },
    {
        descricao: 'Aluno com múltiplos erros',
        dados: { nome: '', email: 'emaildoaluno.com', idade: 26 }
    },
    {
        descricao: 'Aluno com um erro',
        dados: { nome: 'João', email: 'joao@email.com', idade: 10 }
    }
];

alunosParaTestar.forEach(({ descricao, dados }) => {
    console.log(`Teste: ${descricao}`);
    try {
        const resultado = validarAluno(dados);
        console.log(`Resultado: ${resultado}`);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error(`${error.message}:`);
            error.details.forEach(detalhe => console.error(` - ${detalhe}`));
        } else {
            console.error(`Erro: ${error.message}`);
        }
    }
});