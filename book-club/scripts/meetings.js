
// começou aqui! mudar para dias que o clube se reune e os planos para comprar o livro
async function fetchMeetings() {
    try {
        const response = await fetch('data/meetings.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const meetings = await response.json();
        displayMeetings(meetings);
    } catch (error) {
        console.error('Error fetching meetings:', error);
    }
}

function displayMeetings(meetings) {
    const container = document.getElementById('businesses-container');
    if (container) {
        container.innerHTML = ''; // Limpa o container antes de exibir os dados
        meetings.forEach(meeting => {
            const card = document.createElement('div');
            card.classList.add('meeting-card');
            card.innerHTML = `
                <h3>${meeting.name}</h3>
                <p><strong>Day:</strong> ${meeting.day}</p>
                <p><strong>Time:</strong> ${meeting.time}</p>
            `;
            container.appendChild(card);
        });
    }
}

// Chama a função para buscar e exibir as reuniões ao carregar a página
document.addEventListener("DOMContentLoaded", fetchMeetings);
