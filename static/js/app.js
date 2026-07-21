document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    function aplicarTema(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
        }
    }

    aplicarTema(localStorage.getItem('theme') || 'light');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            aplicarTema(body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        });
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const aberto = navMenu.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', String(aberto));
            menuToggle.querySelector('i').className = aberto ? 'fas fa-times' : 'fas fa-bars';
        });
    }

    const perfil = document.getElementById('tipo_perfil');
    const tipoDoador = document.getElementById('tipo_doador_group');
    function atualizarTipoDoador() {
        if (perfil && tipoDoador) tipoDoador.hidden = perfil.value !== 'Doador';
    }
    if (perfil) {
        perfil.addEventListener('change', atualizarTipoDoador);
        atualizarTipoDoador();
    }

    document.querySelectorAll('input[type="tel"], input[name="telefone"], input[name="whatsapp"]').forEach((input) => {
        input.addEventListener('input', () => {
            const numeros = input.value.replace(/\D/g, '').slice(0, 11);
            input.value = numeros.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
        });
    });

    document.querySelectorAll('[data-confirm]').forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!window.confirm(form.dataset.confirm)) event.preventDefault();
        });
    });

    document.querySelectorAll('.alert').forEach((alert) => {
        window.setTimeout(() => {
            alert.classList.add('is-hiding');
            window.setTimeout(() => alert.remove(), 250);
        }, 4200);
    });
});
