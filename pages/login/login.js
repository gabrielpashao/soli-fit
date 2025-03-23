// Função para Captcha Matemático
function Captcha() {
    const operadores = ['+', '-', '*', '/'];
    const operador = operadores[Math.floor(Math.random() * operadores.length)]; // Escolhe um operador aleatório
    let num1 = Math.floor(Math.random() * 10) + 1; // Número entre 1 e 10
    let num2 = Math.floor(Math.random() * 10) + 1;

    // Evita divisão com resto (garante números inteiros)
    if (operador === '/') {
        num1 = num1 * num2; // Garante que num1 seja múltiplo de num2
    }

    const expressao = `${num1} ${operador} ${num2}`;
    const resultado = eval(expressao); // Calcula o resultado

    return { expressao, resultado };
}

// Validação do Captcha
let captchaAtual = Captcha();
document.getElementById("captchaPergunta").innerText = captchaAtual.expressao; // Captura a pergunta

function validarCaptcha() {
    const resposta = parseFloat(document.getElementById("captchaResposta").value); // Captura a resposta
    // Validação do resultado
    if (resposta === captchaAtual.resultado) {
        window.alert('✅ CAPTCHA correto!');
    } else {
        window.alert('❌ CAPTCHA incorreto, tente novamente!');
    }
}