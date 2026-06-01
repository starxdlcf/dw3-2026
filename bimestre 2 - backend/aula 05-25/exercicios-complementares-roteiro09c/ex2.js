function dividir(a,b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("Ambos os argumentos devem ser números.");
    }
    if (b === 0) {
        throw new Error("Não é possível dividir por zero.");
    }
    return a / b;
}

try {
    console.log(dividir(10, 2)); // Output: 5
    console.log(dividir(10, 0)); // Output: "Não é possível dividir por zero."
    console.log(dividir("10", 2)); // Output: "Ambos os argumentos devem ser números."
} catch (error) {
    console.error("Ocorreu um erro:", error);
}