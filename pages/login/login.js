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

// Animação para seção de criar conta
const main = document.querySelector('main');
const loginSection = document.getElementById('loginCard');
const cadastroSection = document.getElementById('cadastroCard');
const criarContaBtn = document.getElementById('criarConta');
const voltarLoginBtn = document.getElementById('voltarLogin');

// Mantém a seção de login ativa
loginSection.classList.add('ativo');
cadastroSection.classList.add('inativo');

// Exibe seção de cadastro ao clicar em 'Criar conta'
criarContaBtn.addEventListener('click', () => {
    loginSection.classList.remove('ativo');
    loginSection.classList.add('inativo');
    cadastroSection.classList.remove('inativo');

    cadastroSection.style.display = 'grid'; // Torna visível para transição funcionar
    setTimeout(() => {
        cadastroSection.classList.add('ativo');
        main.style.padding = '25vh';
    }, 10); // Pequeno atraso para permitir animação
});

// Volta a seção de login ao clicar em 'Já tem uma conta'
voltarLoginBtn.addEventListener('click', () => {
    cadastroSection.classList.remove('ativo');
    cadastroSection.classList.add('inativo');
    loginSection.classList.remove('inativo');

    setTimeout(() => {
        cadastroSection.style.display = 'none'; // Esconde após a animação
        loginSection.classList.add('ativo');
        main.style.padding = '11vh';
    }, 500); // Tempo igual ao da transição CSS
});