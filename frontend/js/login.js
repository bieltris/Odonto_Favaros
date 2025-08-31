

export const trocarFormulario = (element) => {
    const formAtual = element.closest('#form-login') || element.closest('#form-sign-up');
    const formLogin = document.querySelector('#form-login');
    const formSignUp = document.querySelector('#form-sign-up');

    if(formAtual.id === 'form-login') {
        formLogin.style.display = 'none';
        formSignUp.style.display = 'flex';
    } else if (formAtual.id === 'form-sign-up') {
        formLogin.style.display = 'flex';
        formSignUp.style.display = 'none';    
    }

}