
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
        container.innerHTML = '';
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

document.addEventListener("DOMContentLoaded", fetchMeetings);
