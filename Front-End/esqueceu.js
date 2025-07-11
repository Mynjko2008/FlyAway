document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nome = document.getElementById('input-nome');
    const email = document.getElementById('input-email');
    const senha = document.getElementById('input-senha');
    const confirmarSenha = document.getElementById('input-confirmar-senha');

    // Mostrar/ocultar senha
    document.querySelectorAll('.toggle-password').forEach(function (icon) {
        icon.addEventListener('click', function () {
            const target = document.getElementById(this.dataset.target);
            if (target.type === 'password') {
                target.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                target.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Envio e validação
    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Impede o envio padrão

        // Validações básicas
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

        // Envia via fetch
        const formData = new FormData(form);

        fetch('../Back-End/redefinir_senha.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                const resposta = data.trim();
                console.log("🔍 Resposta do PHP:", resposta);

                if (resposta === 'success') {
                    alert('Senha redefinida com sucesso!');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                } else if (resposta === 'usuario_nao_encontrado') {
                    alert('Usuário não encontrado com o nome e e-mail informados.');
                } else if (resposta === 'nenhuma_alteracao') {
                    alert('A nova senha é igual à anterior ou nenhum dado foi alterado.');
                } else {
                    alert('Erro ao redefinir a senha. Verifique os dados.');
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
});