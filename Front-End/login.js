document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const email = document.getElementById('input-email');
    const senha = document.getElementById('input-password');
    const cadastroLink = document.querySelector('.cadastro-link');

    // Mostrar/ocultar senha
    document.querySelectorAll('.toggle-password').forEach(function (icon) {
        icon.addEventListener('click', function () {
            const targetInput = document.getElementById(this.getAttribute('data-target'));
            const isPassword = targetInput.getAttribute('type') === 'password';
            targetInput.setAttribute('type', isPassword ? 'text' : 'password');
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Validação e envio do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validação básica de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert('Por favor, insira um e-mail válido.');
            email.focus();
            return;
        }

        // Validação da senha
        const senhaValor = senha.value.trim();

        if (senhaValor === '') {
            alert('Por favor, insira sua senha.');
            senha.focus();
            return;
        }

        if (senhaValor.length < 8 || senhaValor.length > 15) {
            alert('A senha deve ter entre 8 e 15 caracteres.');
            senha.focus();
            return;
        }

        if (!/[A-Z]/.test(senhaValor)) {
            alert('A senha deve conter pelo menos uma letra MAIÚSCULA.');
            senha.focus();
            return;
        }

        if (!/[a-z]/.test(senhaValor)) {
            alert('A senha deve conter pelo menos uma letra minúscula.');
            senha.focus();
            return;
        }

        if (!/[0-9]/.test(senhaValor)) {
            alert('A senha deve conter pelo menos um número.');
            senha.focus();
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]]/.test(senhaValor)) {
            alert('A senha deve conter pelo menos um caractere especial.');
            senha.focus();
            return;
        }

        // Envio via fetch
        const formData = new FormData(form);

        fetch('../Back-End/login.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                const resposta = data.trim().replace(/\r/g, '').replace(/\n/g, '');

                console.log('🔁 Resposta do servidor:', resposta);

                if (resposta === 'success') {
                    alert('Login realizado com sucesso!');
                    setTimeout(() => {
                        window.location.href = 'FlyAway.html'; // redireciona para tela inicial após login
                    }, 500);
                } else if (resposta === 'senha_incorreta') {
                    alert('❌ Senha incorreta.');
                } else if (resposta === 'usuario_nao_encontrado') {
                    alert('❌ Usuário não encontrado.');
                } else {
                    alert('Erro inesperado: ' + resposta);
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
                alert('Erro de conexão com o servidor.');
            });
    });

    // Redirecionamento alternativo (caso queira usar como botão)
    cadastroLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'cadastro.html';
    });
});
