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
