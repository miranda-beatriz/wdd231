function toggleMenu() {
    let menu = document.querySelector('.flex-nav ul');
    menu.classList.toggle('show');

    let hamburgerButton = document.querySelector('.hamburger');
    if (hamburgerButton) {
        if (menu.classList.contains('show')) {
            hamburgerButton.textContent = 'X';
        } else {
            hamburgerButton.textContent = '☰';
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    let links = document.querySelectorAll('.navigation ul');
    links.forEach(link => {
        if (window.location.href.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    let lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        const now = new Date();
        lastModifiedSpan.textContent = now.toLocaleString();
    }

    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('nav ul li a');

    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        }
    });
});
