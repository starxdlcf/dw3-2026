class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

const usuarios = [
  { id: 1, nome: 'Mário' },
  { id: 2, nome: 'Martha' },
  { id: 3, nome: 'Joana' }
];

function buscarUsuarioPorId(id) {
    if (typeof id !== 'number') {
        throw new ValidationError('O ID deve ser um número!');
    }

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        throw new NotFoundError(`Usuário com ID igual a ${id} não foi encontrado`);
    }

    return usuario;
}

const casosDeTeste = [
    { id: 1, descricao: 'ID válido' },
    { id: '1', descricao: 'ID string' },
    { id: 99, descricao: 'ID inexistente' }
];

casosDeTeste.forEach(({ id, descricao }) => {
    console.log(`Teste: ${descricao} (ID: ${id})`);
    try {
        const usuario = buscarUsuarioPorId(id);
        console.log('Sucesso:', usuario);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error(`Erro de Validação: ${error.message}`);
        } else if (error instanceof NotFoundError) {
            console.error(`Erro na Busca: ${error.message}`);
        } else {
            console.error(`Erro não esperado: ${error.message}`);
        }
    }
});