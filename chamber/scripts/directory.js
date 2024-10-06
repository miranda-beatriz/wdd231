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

async function fetchMembers() {
    try {
        const response = await fetch('chamber\data\members.json');
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

document.addEventListener("DOMContentLoaded", fetchMembers);

async function loadBusinesses() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const businesses = await response.json();
        const container = document.getElementById('businesses-container');
        container.innerHTML = '';

        businesses.forEach(business => {
            const card = document.createElement('div');
            card.classList.add('business-card');
            card.innerHTML = `
                <h3>${business.name}</h3>
                <p>Address: ${business.address}</p>
                <p>Phone: ${business.phone}</p>
                <p>Website: <a href="${business.website}" target="_blank">${business.website}</a></p>
                <img src="${business.image}" alt="${business.name} logo" style="width:100px;height:auto;">
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading businesses:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadBusinesses);

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

document.addEventListener("DOMContentLoaded", fetchMembers);


document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'e62bbb7db57fb5b140460e410f1362a7'; // Substitua pela sua API Key do OpenWeatherMap
    const city = 'Mogi das Cruzes';
    const units = 'metric'; // Ou 'imperial' se preferir Fahrenheit

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

    // Fetching current weather
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            const weatherContent = document.querySelector('.weather-content');
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const highTemp = data.main.temp_max;
            const lowTemp = data.main.temp_min;
            const humidity = data.main.humidity;
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

            weatherContent.innerHTML = `
                <p>Current temperature: ${temperature}°C</p>
                <p>${description}</p>
                <p>High: ${highTemp}°C</p>
                <p>Low: ${lowTemp}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Sunrise: ${sunrise}</p>
                <p>Sunset: ${sunset}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
        });

    // Fetching 3-day forecast (starting from the next day)
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecastContent = document.querySelector('.forecast-content');
            forecastContent.innerHTML = '';

            // Start from the second day (skip the current day)
            for (let i = 8; i < 32; i += 8) { // Start from index 8 (next day), increment by 8 for each day
                const forecastDay = data.list[i];
                const date = new Date(forecastDay.dt * 1000).toLocaleDateString();
                const temp = forecastDay.main.temp;

                forecastContent.innerHTML += `<p>${date}: ${temp}°C</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
});



function displaySpotlights(members) {
    // Filtra membros Silver (2) e Gold (3)
    const qualifiedMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);

    // Embaralha e seleciona aleatoriamente 2 ou 3 membros
    const randomMembers = qualifiedMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Seleciona o container de spotlight
    const spotlightContainer = document.querySelector('.spotlight-container');

    // Se o container não existir, retorna com um erro
    if (!spotlightContainer) {
        console.error('Spotlight container não encontrado!');
        return;
    }

    // Limpa o conteúdo anterior e adiciona os novos spotlights
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


// Função para exibir todos os membros na página (você já tinha isso)
function displayMembers(members) {
    const container = document.getElementById('businesses-container');
    container.innerHTML = '';  // Limpa o conteúdo anterior

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

// Carregar e exibir membros na página inicial
document.addEventListener("DOMContentLoaded", fetchMembers);
