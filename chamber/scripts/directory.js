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
// Carrega dados dos membros usando fetch e async/await
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('businesses-container');
    const toggleButton = document.getElementById('toggleViewButton');
    let isListView = false;

    // Função para buscar e exibir dados
    async function loadMembers() {
        try {
            const response = await fetch('members.json'); // Ajuste para o caminho correto do seu JSON
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Erro ao carregar os membros:', error);
            container.innerHTML = '<p>Erro ao carregar os membros.</p>';
        }
    }

    // Função para exibir membros no HTML
    function displayMembers(members) {
        container.innerHTML = members.map(member => `
            <div class="business-card">
                <h3>${member.name}</h3>
                <p>${member.tagline}</p>
                <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
                <p>Phone: ${member.phone}</p>
                <p>URL: <a href="${member.url}" target="_blank">${member.url}</a></p>
            </div>
        `).join('');
    }

    // Alterna a visualização entre lista e grade
    toggleButton.addEventListener('click', () => {
        isListView = !isListView;
        container.classList.toggle('list-view', isListView);
        container.classList.toggle('grid-view', !isListView);
    });

    // Carrega os membros no início
    await loadMembers();
});
document.addEventListener('DOMContentLoaded', function () {
    // Exibe o ano atual no rodapé
    let yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Exibe a data de última modificação no rodapé
    let lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = new Date(document.lastModified).toLocaleString();
    }
