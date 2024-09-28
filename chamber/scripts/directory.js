function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('open');
}
// Adiciona a classe 'active' no item de menu da página atual
document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('nav ul li a');

    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        }
    });
});
async function fetchMembers() {
    try {
        const response = await fetch('chamber\data\members.json'); // Certifique-se de que o caminho está correto
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function displayMembers(members) {
    const container = document.getElementById('businesses-container');
    container.innerHTML = ''; // Limpa o container antes de adicionar novos membros

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('business-card');
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" class="business-logo" />
            <h3>${member.name}</h3>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Industry: ${member.additional_info.industry}</p>
            <p>Founded: ${member.additional_info.founded}</p>
            <p>Employees: ${member.additional_info.employees}</p>
        `;
        container.appendChild(card);
    });
}

// Chama a função para buscar membros ao carregar a página
document.addEventListener("DOMContentLoaded", fetchMembers);


function toggleView(viewType) {
    const container = document.getElementById('businesses-container');
    if (viewType === 'grid') {
        container.classList.add('grid');
        container.classList.remove('list');
    } else {
        container.classList.add('list');
        container.classList.remove('grid');
    }
}

document.getElementById('grid-view').addEventListener('click', () => toggleView('grid'));
document.getElementById('list-view').addEventListener('click', () => toggleView('list'));

// Exibir o ano de copyright e a data da última modificação
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('last-modified').textContent = lastModified;

// Chama a função para buscar membros ao carregar a página
document.addEventListener("DOMContentLoaded", fetchMembers);
