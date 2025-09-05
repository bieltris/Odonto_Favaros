import { path } from './app.js';
import { trocarFormulario } from './login.js';

export const fazerCadastro = (target) => {
    const form = target.closest('form');
    const nome = form.querySelector('#nome-completo');
    const email = form.querySelector('#email');
    const senha = form.querySelector('#senha');
    const senhaConfirmacao = form.querySelector('#senha-confirmacao');

    console.log(email.value, senha.value, form);
    const dadosSignUp = {
        nome: nome.value,
        email: email.value,
        senha: senha.value,
        senhaConfirmacao: senhaConfirmacao.value,
    }

    fetch(`${path}/auth/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosSignUp),
    }).then(async (response) => {
        if (!response.ok) {
            throw await response.json().then(err => {
                return new Error(err.error);
            })
        }

        return response.json();
    })
        .then((data) => {
            console.log('Usuario cadastrado com Sucesso!');
            const linkFazerLogin = document.getElementById('fazer-login');
            trocarFormulario(linkFazerLogin);
        })
        .catch((error) => {
            console.error(error);
        });
}