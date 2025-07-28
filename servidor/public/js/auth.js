document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Erro ao fazer login.');
                }

            
                localStorage.setItem('authToken', data.token);
                alert('Login realizado com sucesso!');
                
                window.location.href = 'index.html'; 

            } catch (error) {
                alert(`Erro: ${error.message}`);
            }
        });
    }


    const registerForm = document.getElementById('registerFormStep1');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const cpf = document.getElementById('cpf').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/auth/registrar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullName, cpf, email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Erro ao registrar.');
                }

                alert('Cadastro realizado com sucesso! Faça seu login.');
                window.location.href = 'login.html'; 

            } catch (error) {
                alert(`Erro: ${error.message}`);
            }
        });
    }
});