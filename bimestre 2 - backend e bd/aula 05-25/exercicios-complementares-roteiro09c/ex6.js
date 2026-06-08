function processarPagamento(valor) {
    if (valor <= 0) {
        throw new Error('Valor inválido');
    }
    return 'Pagamento aprovado';
}

const teste = [100, 0, -50];

teste.forEach(valor => {
    console.log(`Processando pagamento de: ${valor}`);
    try {
        const resultado = processarPagamento(valor);
        console.log(`Sucesso: ${resultado}`);
    } catch (erro) {
        console.error(`Erro capturado no chamador: ${erro.message}`);
    }
});