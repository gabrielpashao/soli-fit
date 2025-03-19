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
    </div>`