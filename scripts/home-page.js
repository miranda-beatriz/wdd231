document.addEventListener('DOMContentLoaded', function () {
    let yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    let lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        function formatLastModified(date) {
            return new Date(date).toLocaleString();
        }

        function updateLastModified() {
            let lastModified = document.lastModified;
            lastModifiedSpan.textContent = formatLastModified(lastModified);
        }

        updateLastModified();
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
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

document.addEventListener('DOMContentLoaded', function () {
    const courses = [
        { title: 'Introduction to Programming', subject: 'CSE', number: 101, description: 'Learn how to program...', technology: ['Java', 'Python'], credits: 3, completed: true },
        { title: 'Advanced Web Development', subject: 'WDD', number: 202, description: 'Advanced web design course...', technology: ['HTML', 'CSS', 'JavaScript'], credits: 4, completed: false },
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
                <h3>${course.title} (${course.subject} ${course.number})</h3>
                <p>${course.description}</p>
                <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
            `;
            container.appendChild(courseCard);
        });
    }

    function calculateTotalCredits(courses) {
        const totalCredits = courses.reduce((total, course) => total + course.credits, 0);
        document.getElementById('total-credits').textContent = totalCredits;
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

    document.getElementById('all-btn').addEventListener('click', function () {
        filterCourses('all');
    });

    document.getElementById('cse-btn').addEventListener('click', function () {
        filterCourses('CSE');
    });

    document.getElementById('wdd-btn').addEventListener('click', function () {
        filterCourses('WDD');
    });

    function applyStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .course-card {
                border: 1px solid #ddd;
                padding: 10px;
                margin-bottom: 10px;
                background-color: #f9f9f9;
            }
            .course-card.completed {
                background-color: #dff0d8; /* Different color for completed courses */
                border-color: #3c763d;
            }
        `;
        document.head.appendChild(style);
    }
    applyStyles();
    filterCourses('all');
});
