function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('open');
}
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

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('display-first-name').textContent = sessionStorage.getItem('first-name') || 'N/A';
    document.getElementById('display-last-name').textContent = sessionStorage.getItem('last-name') || 'N/A';
    document.getElementById('display-email').textContent = sessionStorage.getItem('email') || 'N/A';
    document.getElementById('display-mobile-phone').textContent = sessionStorage.getItem('mobile-phone') || 'N/A';
    document.getElementById('display-organization').textContent = sessionStorage.getItem('organization') || 'N/A';
    document.getElementById('display-timestamp').textContent = sessionStorage.getItem('timestamp') || 'N/A';
});


function saveFormData(event) {
    event.preventDefault();
    const timestamp = new Date().toLocaleString();
    sessionStorage.setItem('first-name', document.getElementById('first-name').value);
    sessionStorage.setItem('last-name', document.getElementById('last-name').value);
    sessionStorage.setItem('email', document.getElementById('email').value);
    sessionStorage.setItem('mobile-phone', document.getElementById('mobile-phone').value);
    sessionStorage.setItem('organization', document.getElementById('org-name').value);
    sessionStorage.setItem('timestamp', timestamp);
    window.location.href = "thankyou.html";
}
