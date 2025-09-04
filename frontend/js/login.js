import { path } from './app.js';

export const trocarFormulario = (element) => {
    const formAtual = element.closest('#form-login') || element.closest('#form-sign-up');
    const formLogin = document.querySelector('#form-login');
    const formSignUp = document.querySelector('#form-sign-up');

    if (formAtual.id === 'form-login') {
        formLogin.style.display = 'none';
        formSignUp.style.display = 'flex';
    } else if (formAtual.id === 'form-sign-up') {
        formLogin.style.display = 'flex';
        formSignUp.style.display = 'none';
    }

}

export const fazerLogin = (target) => {
    const form = target.closest('form');
    const email = form.querySelector('#email');
    const senha = form.querySelector('#senha');
    console.log(email.value, senha.value, form);
    const dadosLogin = {
        email: email.value,
        senha: senha.value,
    }

    fetch(`${path}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosLogin),
    }).then(async (response) => {
        if (!response.ok) {
            throw await response.json().then(err => {
                return new Error(err.error);
            })
        }

        return response.json();
    })
    .then((data) => {
        redirectHomeScreen();
    })
    .catch((error) => {
        console.error('Error: ' + error);
    });
}

export const redirectHomeScreen = () => {
    console.log('Login com sucesso!');
}