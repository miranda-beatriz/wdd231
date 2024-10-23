function toggleMenu() {
    let menu = document.querySelector('#hamburguer');
    menu.classList.toggle('open');

    let hamburgerButton = document.querySelector('.mobile-menu-icon');
    if (hamburgerButton) {
        if (menu.classList.contains('open')) {
            hamburgerButton.textContent = 'X';
        } else {
            hamburgerButton.textContent = '☰';
        }
    }
}

let hamburgerButton = document.querySelector('.mobile-menu-icon');
if (hamburgerButton) {
    hamburgerButton.addEventListener('click', toggleMenu);
}
