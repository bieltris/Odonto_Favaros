

export const snackMessage = (msg, error = 'error') => {
    const snack = document.createElement('div');
    snack.classList = 'snack-msg';
    
    if(error = 'error') {
        snack.style.background = 'red';
    } else {
        snack.style.background = 'green';
    }
    
    snack.classList.add('show-msg');

    snack.addEventListener('animationend', function deleteSnack() {
        snack.remove();
        snack.removeEventListener('animationend', deleteSnack);
    });
};