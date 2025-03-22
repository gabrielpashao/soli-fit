/* Criação dinâmica dos elementos de NavBar e Footer */
let navBar = document.querySelector('nav');
let footer = document.querySelector('footer');

navBar.innerHTML = `
    <section id="navEsquerda">
        <a href="../../index.html">
            <div class="logoNav">
                <img src="/src/img/logo-colorido.png" alt="SoliFit" class="logo">
            </div>
        </a>
        <h1>Academia do seu jeito!</h1>
    </section>
    <section id="navDireita">
        <div class="botoes">
            <a href="/pages/planos/planos.html"><button>Planos</button></a>
            <a href="/pages/blog/blog.html"><button>Blog Saúde</button></a>
            <a href="/pages/login/login.html"><button>Login</button></a>
        </div>
    </section>`;

footer.innerHTML = `
    <div id="footerEsquerdo">
        <img src="/src/img/logo-colorido.png" alt="SoliFit" class="logoFooter">
        <div id="textoFooter">
            <h2 class="solifitFooter">Solifit Academias</h2>
            <h3 class="infoFooter">+55 81 3495-7289</h3>
            <h3 class="infoFooter">solifit@solifit.com.br</h3>
        </div>
    </div>`;

/* Eventos dos botões */
let botoes = document.querySelectorAll('button');

botoes.forEach(botoes => {
    /* Altera a cor ao passar o mouse por cima */
    botoes.addEventListener('mouseover', () => {
        botoes.style.backgroundColor = '#FFFCF2';
        botoes.style.color = '#EB5E28';
    });
    /* Altera a cor ao retirar o mouse */
    botoes.addEventListener('mouseleave', () => {
        botoes.style.backgroundColor = '#EB5E28'; 
        botoes.style.color = '#FFFCF2';
    });
    /* Altera a cor ao clicar */
    botoes.addEventListener('click', () => {
        botoes.style.backgroundColor = '#CCC5B9';
    });
});

/* Eventos dos inputs */
let inputs = document.querySelectorAll('input');

inputs.forEach(inputs => {
    /* Altera a cor do input ao passar o mouse por cima */
    inputs.addEventListener('mouseover', () => {
        inputs.style.backgroundColor = '#CCC5B9';
    });
    /* Altera a cor do input ao retirar o mouse */
    inputs.addEventListener('mouseleave', () => {
        inputs.style.backgroundColor = 'white'
    });
});

/* Eventos dos links */
let links = document.querySelectorAll('a');

links.forEach(links => {
    /* Adiciona sublinhado ao passar o mouse por cima */
    links.addEventListener('mouseover', () => {
        links.style.textDecoration = 'underline';
    });
    /* Retira o sublinhado ao retirar o mouse de cima */
    links.addEventListener('mouseleave', () => {
        links.style.textDecoration = 'none';
    });
})