// Função para alternar o menu mobile
function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburgerButton = document.querySelector('.mobile-menu-icon'); // certifique-se de que o botão do hamburguer está sendo selecionado
    if (mobileMenu && hamburgerButton) {
        mobileMenu.classList.toggle('open');

        if (mobileMenu.classList.contains('open')) {
            hamburgerButton.textContent = 'X';  // Mostra 'X' quando o menu estiver aberto
        } else {
            hamburgerButton.textContent = '☰';  // Mostra '☰' quando o menu estiver fechado
        }
    }
}


// Função para atualizar ano atual e última modificação
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

// Função para buscar membros de um arquivo JSON
async function fetchMembers() {
    try {
        const response = await fetch('chamber/data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

// Função para exibir membros na tela
function displayMembers(members) {
    const container = document.getElementById('businesses-container');
    if (container) {
        container.innerHTML = '';
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
}

// Função para alternar entre visualizações (grid/lista)
function toggleView(viewType) {
    const container = document.getElementById('businesses-container');
    if (container) {
        container.classList.toggle('grid', viewType === 'grid');
        container.classList.toggle('list', viewType === 'list');
    }
}

document.getElementById('grid-view').addEventListener('click', () => toggleView('grid'));
document.getElementById('list-view').addEventListener('click', () => toggleView('list'));

// Carregar membros ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    fetchMembers(); // Apenas uma chamada para evitar duplicação
});

// Função para exibir spotlights de membros Gold/Silver
function displaySpotlights(members) {
    const qualifiedMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);
    const randomMembers = qualifiedMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
    const spotlightContainer = document.querySelector('.spotlight-container');

    if (!spotlightContainer) {
        console.error('Spotlight container not found!');
        return;
    }

    spotlightContainer.innerHTML = '';
    randomMembers.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" class="spotlight-logo" />
            <h3>${member.name}</h3>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership Level: ${member.membership_level === 3 ? 'Gold' : 'Silver'}</p>
        `;
        spotlightContainer.appendChild(card);
    });
}

// Função para abrir e fechar modais
document.addEventListener('DOMContentLoaded', function () {
    const modalLinks = document.querySelectorAll('.open-modal');
    const closeButtons = document.querySelectorAll('.close');
    const modals = document.querySelectorAll('.modal');

    // Função para abrir modal
    modalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
                modal.querySelector('.close').focus(); // Acessibilidade
            }
        });
    });

    // Função para fechar modal
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                document.querySelector(`a[data-modal="${modalId}"]`).focus(); // Retorna o foco
            }
        });
    });

    // Fechar modal ao clicar fora do conteúdo
    window.addEventListener('click', function (e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });
});

// Função para buscar e exibir clima
document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'e62bbb7db57fb5b140460e410f1362a7';
    const city = 'Mogi das Cruzes';
    const units = 'metric';

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            const weatherContent = document.querySelector('.weather-content');
            const { temp, temp_max, temp_min, humidity } = data.main;
            const description = data.weather[0].description;
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

            if (weatherContent) {
                weatherContent.innerHTML = `
                    <p>Current temperature: ${temp}°C</p>
                    <p>${description}</p>
                    <p>High: ${temp_max}°C</p>
                    <p>Low: ${temp_min}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Sunrise: ${sunrise}</p>
                    <p>Sunset: ${sunset}</p>
                `;
            }
        })
        .catch(error => console.error('Error fetching current weather:', error));

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecastContent = document.querySelector('.forecast-content');
            if (forecastContent) {
                forecastContent.innerHTML = '';
                for (let i = 8; i < 32; i += 8) {
                    const forecastDay = data.list[i];
                    const date = new Date(forecastDay.dt * 1000).toLocaleDateString();
                    const temp = forecastDay.main.temp;
                    forecastContent.innerHTML += `<p>${date}: ${temp}°C</p>`;
                }
            }
        })
        .catch(error => console.error('Error fetching forecast data:', error));
});

// Função para calcular a diferença entre visitas
function calculateDaysBetween(lastVisit, currentVisit) {
    const oneDay = 24 * 60 * 60 * 1000; // milissegundos em um dia
    return Math.floor((currentVisit - lastVisit) / oneDay);
}

document.addEventListener("DOMContentLoaded", function () {
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    const messageElement = document.getElementById('visitMessage');

    if (messageElement) {
        if (lastVisit) {
            const lastVisitTime = parseInt(lastVisit, 10);
            const daysBetween = calculateDaysBetween(lastVisitTime, now);

            if (daysBetween < 1) {
                messageElement.textContent = "Back so soon! Awesome!";
            } else if (daysBetween === 1) {
                messageElement.textContent = "You last visited 1 day ago.";
            } else {
                messageElement.textContent = `You last visited ${daysBetween} days ago.`;
            }
        } else {
            messageElement.textContent = "Welcome! Let us know if you have any questions.";
        }

        // Armazenar a data da visita atual
        localStorage.setItem('lastVisit', now);
    } else {
        console.error('Elemento com o id "visitMessage" não encontrado.');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img.lazy");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((image) => {
        imageObserver.observe(image);
    });
});