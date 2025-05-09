// Sistema de Captcha
function gerarCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operadores = ['+', '-', '*'];
    const operador = operadores[Math.floor(Math.random() * operadores.length)];
    
    const expressao = `${num1} ${operador} ${num2}`;
    const resultado = eval(expressao);
    
    return { expressao, resultado };
}

// Validação do CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
    
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
        return false;
    }
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
    
    return digitoVerificador2 === parseInt(cpf.charAt(10));
}

// Formatação do CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length > 3 && cpf.length <= 6) {
        return cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (cpf.length > 6 && cpf.length <= 9) {
        return cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (cpf.length > 9) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
    
    return cpf;
}

// Validação de e-mail com domínios conhecidos
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
        return { valid: false, message: 'Formato de e-mail inválido. Deve conter @ e domínio (ex: exemplo@dominio.com)' };
    }

    const dominiosValidos = [
        'gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 
        'icloud.com', 'protonmail.com', 'mail.com', 'aol.com',
        'zoho.com', 'yandex.com', 'live.com', 'gmail.com.br',
        'hotmail.com.br', 'outlook.com.br', 'yahoo.com.br'
    ];

    const dominio = email.split('@')[1];
    if (!dominiosValidos.includes(dominio.toLowerCase())) {
        return { 
            valid: false, 
            message: 'Domínio não reconhecido. Use serviços como Gmail, Outlook, Yahoo, etc.' 
        };
    }
    
    return { valid: true, message: '' };
}

// Mostrar dicas de validação
function mostrarDica(elemento, mensagem) {
    let dica = elemento.nextElementSibling;
    if (!dica || !dica.classList.contains('dica-validacao')) {
        dica = document.createElement('div');
        dica.className = 'dica-validacao';
        elemento.parentNode.insertBefore(dica, elemento.nextSibling);
    }
    dica.textContent = mensagem;
    dica.style.display = mensagem ? 'block' : 'none';
}

// Formatar data para exibição
function formatarData(data) {
    if (!data) return '';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Configuração inicial
    const loginCard = document.getElementById('loginCard');
    const cadastroCard = document.getElementById('cadastroCard');
    const criarContaBtn = document.getElementById('criarConta');
    const voltarLoginBtn = document.getElementById('voltarLogin');
    
    // Gerar CAPTCHAs iniciais
    let loginCaptcha = gerarCaptcha();
    let cadastroCaptcha = gerarCaptcha();
    
    document.getElementById('loginCaptchaPergunta').textContent = loginCaptcha.expressao;
    document.getElementById('cadCaptchaPergunta').textContent = cadastroCaptcha.expressao;
    
    // Eventos de navegação
    criarContaBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginCard.classList.remove('ativo');
        cadastroCard.classList.add('ativo');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    voltarLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cadastroCard.classList.remove('ativo');
        loginCard.classList.add('ativo');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Validação do campo CPF
    const cpfInput = document.getElementById('cadCPF');
    
    cpfInput.addEventListener('input', function() {
        const cursorPosition = this.selectionStart;
        let cpfValue = this.value.replace(/\D/g, '');
        
        if (cpfValue.length > 11) {
            cpfValue = cpfValue.substring(0, 11);
        }
        
        this.value = formatarCPF(cpfValue);
        
        let newCursorPosition = cursorPosition;
        if (this.value.length > cursorPosition) {
            const charAdded = this.value.charAt(cursorPosition);
            if (charAdded === '.' || charAdded === '-') {
                newCursorPosition++;
            }
        }
        
        this.setSelectionRange(newCursorPosition, newCursorPosition);
        
        if (cpfValue.length === 11) {
            if (validarCPF(cpfValue)) {
                this.setCustomValidity('');
                this.style.borderColor = '#4CAF50';
                this.style.backgroundColor = '#f8fff8';
                mostrarDica(this, '');
            } else {
                this.setCustomValidity('CPF inválido');
                this.style.borderColor = '#F44336';
                this.style.backgroundColor = '#fff8f8';
                mostrarDica(this, 'CPF inválido. Verifique os dígitos e tente novamente.');
            }
        } else if (this.value) {
            this.setCustomValidity('CPF deve ter 11 dígitos');
            this.style.borderColor = '#F44336';
            this.style.backgroundColor = '#fff8f8';
            mostrarDica(this, 'Digite os 11 números do CPF. A formatação será automática.');
        } else {
            this.setCustomValidity('');
            this.style.borderColor = '#ddd';
            this.style.backgroundColor = 'white';
            mostrarDica(this, '');
        }
    });
    
    // Validação do campo de e-mail
    const emailInput = document.getElementById('cadEmail');
    
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        
        if (email === '') {
            this.setCustomValidity('');
            this.style.borderColor = '#ddd';
            this.style.backgroundColor = 'white';
            mostrarDica(this, '');
            return;
        }
        
        const validacao = validarEmail(email);
        if (validacao.valid) {
            this.setCustomValidity('');
            this.style.borderColor = '#4CAF50';
            this.style.backgroundColor = '#f8fff8';
            mostrarDica(this, '');
        } else {
            this.setCustomValidity(validacao.message);
            this.style.borderColor = '#F44336';
            this.style.backgroundColor = '#fff8f8';
            mostrarDica(this, validacao.message + ' Domínios aceitos: Gmail, Outlook, Yahoo, etc.');
        }
    });
    
    // Validação da senha
    const senhaInput = document.getElementById('cadPassword');
    const confirmaSenhaInput = document.getElementById('cadConfirmPassword');
    
    senhaInput.addEventListener('input', function() {
        const senha = this.value;
        
        if (senha.length < 6) {
            this.setCustomValidity('A senha deve ter pelo menos 6 caracteres');
            this.style.borderColor = '#F44336';
            this.style.backgroundColor = '#fff8f8';
            mostrarDica(this, 'A senha deve ter no mínimo 6 caracteres.');
        } else {
            this.setCustomValidity('');
            this.style.borderColor = '#4CAF50';
            this.style.backgroundColor = '#f8fff8';
            mostrarDica(this, '');
        }
        
        if (confirmaSenhaInput.value && confirmaSenhaInput.value !== senha) {
            confirmaSenhaInput.setCustomValidity('As senhas não coincidem');
            confirmaSenhaInput.style.borderColor = '#F44336';
            confirmaSenhaInput.style.backgroundColor = '#fff8f8';
            mostrarDica(confirmaSenhaInput, 'As senhas não coincidem. Digite a mesma senha nos dois campos.');
        } else {
            confirmaSenhaInput.setCustomValidity('');
            confirmaSenhaInput.style.borderColor = '#4CAF50';
            confirmaSenhaInput.style.backgroundColor = '#f8fff8';
            mostrarDica(confirmaSenhaInput, '');
        }
    });
    
    confirmaSenhaInput.addEventListener('input', function() {
        const senha = senhaInput.value;
        
        if (this.value !== senha) {
            this.setCustomValidity('As senhas não coincidem');
            this.style.borderColor = '#F44336';
            this.style.backgroundColor = '#fff8f8';
            mostrarDica(this, 'As senhas não coincidem. Digite a mesma senha nos dois campos.');
        } else {
            this.setCustomValidity('');
            this.style.borderColor = '#4CAF50';
            this.style.backgroundColor = '#f8fff8';
            mostrarDica(this, '');
        }
    });
    
    // Validação do CAPTCHA
    const captchaInput = document.getElementById('cadCaptchaResposta');
    const captchaPergunta = document.getElementById('cadCaptchaPergunta');
    
    captchaInput.addEventListener('input', function() {
        const resposta = parseFloat(this.value);
        
        if (isNaN(resposta)) {
            this.setCustomValidity('Digite um número válido');
            this.style.borderColor = '#F44336';
            this.style.backgroundColor = '#fff8f8';
            mostrarDica(this, 'Digite apenas números como resposta.');
        } else {
            this.setCustomValidity('');
            this.style.borderColor = '#4CAF50';
            this.style.backgroundColor = '#f8fff8';
            mostrarDica(this, '');
        }
    });
    
    // Configurar o formulário para enviar para o FormSubmit
    const cadastroForm = document.getElementById('cadastroForm');
    cadastroForm.action = 'https://formsubmit.co/soli-fit-cadastro@gmail.com';
    cadastroForm.method = 'POST';
    
    // Adicionar campo oculto para o assunto do e-mail
    const assuntoInput = document.createElement('input');
    assuntoInput.type = 'hidden';
    assuntoInput.name = '_subject';
    assuntoInput.value = 'Novo cadastro SoliFit';
    cadastroForm.appendChild(assuntoInput);
    
    // Adicionar campo para capturar o timestamp
    const timestampInput = document.createElement('input');
    timestampInput.type = 'hidden';
    timestampInput.name = 'data_hora_cadastro';
    cadastroForm.appendChild(timestampInput);
    
    // Atualizar timestamp antes do envio
    cadastroForm.addEventListener('submit', function(e) {
        // Validar e-mail
        const email = document.getElementById('cadEmail').value.trim();
        const validacaoEmail = validarEmail(email);
        if (!validacaoEmail.valid) {
            e.preventDefault();
            alert(validacaoEmail.message);
            document.getElementById('cadEmail').focus();
            return;
        }
        
        // Validar senha
        const senha = document.getElementById('cadPassword').value;
        const confirmacao = document.getElementById('cadConfirmPassword').value;
        
        if (senha !== confirmacao) {
            e.preventDefault();
            alert('As senhas não coincidem!');
            return;
        }
        
        if (senha.length < 6) {
            e.preventDefault();
            alert('A senha deve ter pelo menos 6 caracteres!');
            return;
        }
        
        // Validar CPF
        const cpf = document.getElementById('cadCPF').value.replace(/\D/g, '');
        if (cpf.length !== 11 || !validarCPF(cpf)) {
            e.preventDefault();
            alert('Por favor, insira um CPF válido!');
            document.getElementById('cadCPF').focus();
            return;
        }
        
        // Validar CAPTCHA
        const respostaCaptcha = parseFloat(document.getElementById('cadCaptchaResposta').value);
        if (isNaN(respostaCaptcha) || respostaCaptcha !== cadastroCaptcha.resultado) {
            e.preventDefault();
            alert('Resposta do CAPTCHA incorreta! Tente novamente.');
            cadastroCaptcha = gerarCaptcha();
            document.getElementById('cadCaptchaPergunta').textContent = cadastroCaptcha.expressao;
            document.getElementById('cadCaptchaResposta').value = '';
            document.getElementById('cadCaptchaResposta').focus();
            return;
        }
        
        // Atualizar timestamp
        const now = new Date();
        timestampInput.value = now.toLocaleString('pt-BR');
        
        // Adicionar formatação para os dados no corpo do e-mail
        const formData = new FormData(cadastroForm);
        const formattedData = {};
        
        formData.forEach((value, key) => {
            if (key.startsWith('_')) return;
            
            if (key === 'dataNascimento') {
                formattedData[key] = formatarData(value);
            } else if (key === 'CPF') {
                formattedData[key] = formatarCPF(value);
            } else {
                formattedData[key] = value;
            }
        });
        
        // Adicionar dados formatados como texto no e-mail
        const emailBodyInput = document.createElement('input');
        emailBodyInput.type = 'hidden';
        emailBodyInput.name = 'Dados do Cadastro';
        emailBodyInput.value = JSON.stringify(formattedData, null, 2);
        cadastroForm.appendChild(emailBodyInput);
        
        // Mostrar mensagem de sucesso e redirecionar
        e.preventDefault(); // Previne o envio padrão para podermos mostrar a mensagem
        
        // Simular envio (substitua por envio real se necessário)
        setTimeout(() => {
            // Mostrar mensagem de sucesso
            const sucesso = confirm('Cadastro Realizado com Sucesso!\n\nClique em OK para continuar.');
            
            if (sucesso) {
                // Redirecionar para o card de login
                cadastroCard.classList.remove('ativo');
                loginCard.classList.add('ativo');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Resetar o formulário
                cadastroForm.reset();
                
                // Gerar novo CAPTCHA
                cadastroCaptcha = gerarCaptcha();
                document.getElementById('cadCaptchaPergunta').textContent = cadastroCaptcha.expressao;
            }
        }, 1000);
    });

    // Validação em tempo real para outros campos
    const campos = document.querySelectorAll('input:not(#cadCPF, #cadEmail, #cadPassword, #cadConfirmPassword, #cadCaptchaResposta), select');
    campos.forEach(campo => {
        campo.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#4CAF50';
                this.style.backgroundColor = '#f8fff8';
                mostrarDica(this, '');
            } else if (this.value) {
                this.style.borderColor = '#F44336';
                this.style.backgroundColor = '#fff8f8';
                mostrarDica(this, 'Preencha este campo corretamente conforme solicitado.');
            } else {
                this.style.borderColor = '#ddd';
                this.style.backgroundColor = 'white';
                mostrarDica(this, '');
            }
        });
    });
});