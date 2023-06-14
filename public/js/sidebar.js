let logoutForm = document.querySelector('#logoutForm');
let logoutBtn = document.querySelector('[logoutBtn]');

logoutBtn.addEventListener('click', event => {
    event.preventDefault();
    logoutForm.submit();
});