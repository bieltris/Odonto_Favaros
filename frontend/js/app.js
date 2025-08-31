import { trocarFormulario } from "./login.js";


document.addEventListener('DOMContentLoaded', (e) => {
    document.body.addEventListener('click', (e) => {
        const target = e.target;

        if(target.closest('.sign-up-js')) {
            trocarFormulario(target);
        }
    });
});

