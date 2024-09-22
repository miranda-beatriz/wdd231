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

});

function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('show-menu');
}

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 230,
        title: 'Frontend Development',
        credits: 2,
        completed: false
    }
];

function displayCourses(filteredCourses) {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        if (course.completed) {
            courseCard.classList.add('completed');
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
        `;
        container.appendChild(courseCard);
    });
}

function filterCourses(subject) {
    let filteredCourses;
    if (subject === 'all') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.subject === subject);
    }
    displayCourses(filteredCourses);
    calculateTotalCredits(filteredCourses);
}

function calculateTotalCredits(courses) {
    const totalCredits = courses.reduce((total, course) => total + course.credits, 0);
    document.getElementById('total-credits').textContent = totalCredits;
}

document.getElementById('all-btn').addEventListener('click', function () {
    filterCourses('all');
});

document.getElementById('cse-btn').addEventListener('click', function () {
    filterCourses('CSE');
});

document.getElementById('wdd-btn').addEventListener('click', function () {
    filterCourses('WDD');
});

// Exibir todos os cursos ao carregar a página
filterCourses('all');
