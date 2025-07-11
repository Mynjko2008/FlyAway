document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nome = document.getElementById('input-nome');
    const email = document.getElementById('input-email');
    const telefone = document.getElementById('input-telefone');
    const senha = document.getElementById('input-senha');
    const confirmarSenha = document.getElementById('input-confirmar-senha');

    // Mostrar/ocultar senha
    document.querySelectorAll('.toggle-password').forEach(function (icon) {
        icon.addEventListener('click', function () {
            const target = document.getElementById(this.dataset.target);
            target.type = target.type === 'password' ? 'text' : 'password';
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Máscara e validação do campo de telefone
    const telefoneMask = IMask(telefone, {
        mask: '+{55} (00) 00000-0000'
    });



    // Validação do formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (nome.value.trim() === '') {
            alert('Por favor, preencha o nome completo.');
            nome.focus();
            return;
        }

        if (!validarEmail(email.value)) {
            alert('Por favor, insira um e-mail válido.');
            email.focus();
            return;
        }

        if (!validarTelefone(telefone.value)) {
            alert('Telefone inválido. Use o formato: +55 (11) 91234-5678');
            telefone.focus();
            return;
        }

        const senhaValor = senha.value;

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

        if (senhaValor !== confirmarSenha.value) {
            alert('As senhas não coincidem.');
            confirmarSenha.focus();
            return;
        }

        // Envio com fetch
        const formData = new FormData(form);

        fetch('../Back-End/cadastro.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                const resposta = data.trim();

                if (resposta === 'success') {
                    alert('✅ Cadastro realizado com sucesso!');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1000);
                } else if (resposta === 'senha_invalida') {
                    alert('❌ A senha não atende aos critérios de segurança.');
                } else {
                    alert('Erro inesperado no cadastro: ' + resposta);
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
                alert('Erro de conexão com o servidor.');
            });
    });

    function validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validarTelefone(telefone) {
        const telefoneRegex = /^\+55 \(\d{2}\) 9\d{4}-\d{4}$/;
        return telefoneRegex.test(telefone);
    }
});
