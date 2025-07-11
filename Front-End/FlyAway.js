document.addEventListener('DOMContentLoaded', () => {
    const openButtons = document.querySelectorAll('.btn-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    openButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});

// Menu Hamburguer
document.addEventListener('DOMContentLoaded', function () {
    const hamburguer = document.querySelector('.hamburguer');
    const menuNav = document.querySelector('.menu-nav');

    if (hamburguer && menuNav) { // Verifica se os elementos existem
        hamburguer.addEventListener('click', function () {
            // Alterna classes
            this.classList.toggle('active');

            menuNav.classList.toggle('active');

            // Bloqueia scroll quando menu aberto
            document.body.style.overflow = menuNav.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Fecha menu ao clicar nos links (opcional)
        document.querySelectorAll('.menu-nav a').forEach(link => {
            link.addEventListener('click', () => {
                hamburguer.classList.remove('active');
                menuNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    } else {
        console.error("Elementos do menu não encontrados!");
    }
});