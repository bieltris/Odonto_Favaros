import { trocarFormulario, fazerLogin } from "./login.js";
import { fazerCadastro } from './signUp.js';

export const path = 'http://localhost:8000/api';

document.addEventListener('DOMContentLoaded', (e) => {
    document.body.addEventListener('click', (e) => {
        const target = e.target;

        if(target.closest('.sign-up-js')) {
            trocarFormulario(target);
        }

        if(target.closest('.login')) {
            fazerLogin(target);
        }

        if(target.closest('.sign-up-api')) {
            fazerCadastro(target);
        }
    });
});

