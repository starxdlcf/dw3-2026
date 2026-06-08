async function buscarPedido(id) {
    if (id === undefined || id === null) {
        throw new Error('ID do pedido é obrigatório');
    }

    // pra simular o atraso de 1 segundo
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (id !== 1) {
        throw new Error('Pedido não encontrado');
    }

    return { id: 1, total: 150 };
}

async function exe(id) {
    console.log(`Buscando pedido: ${id}...`);
    try {
        const pedido = await buscarPedido(id);
        console.log('Sucesso:', pedido);
    } catch (error) {
        console.error('Erro:', error.message);
    }
}

async function test() {
    await exe(1);
    await exe(99);
    await exe();
}

test();