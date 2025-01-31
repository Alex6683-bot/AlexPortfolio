// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply the current theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Modal functionality
const modal = document.getElementById('aboutModal');
const aboutButtons = document.querySelectorAll('a[href="#about"]');
const closeModal = document.querySelector('.close-modal');

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

aboutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

closeModal.addEventListener('click', closeModalFunc);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModalFunc();
    }
});

// Projects data
const projectsData = [
    {
        name: "Matrix3D",
        description: "A simple 3D Viewer engine built with C#",
        technologies: ["C#", "OpenGL"],
        url: "https://github.com/Alex6683-bot/Matrix3D"
    },
    {
        name: "MazeGenerator",
        description: "Simple Maze Generator made with OpenGL",
        technologies: ["C#", "OpenGL"],
        url: "https://github.com/Alex6683-bot/MazeGenerator"
    },
    {
        name: "GLRenderer",
        description: "A set of abstraction classes for rendering meshes and scenes in OpenTK",
        technologies: ["C#", "OpenTK"],
        url: "https://github.com/Alex6683-bot/GLRenderer"
    },
    {
        name: "Sprite-Deets-App",
        description: "A tool to assist editing sprite metadata for importing into any game engine",
        technologies: ["TypeScript", "HTML"],
        url: "https://github.com/Alex6683-bot/Sprite-Deets-App"
    },
    {
        name: "WPF-ToDo-Application",
        description: "Simple WPF ToDo app built with MVVM architecture",
        technologies: ["C#", "WPF"],
        url: "https://github.com/Alex6683-bot/WPF-ToDo-Application"
    },
    {
        name: "Simple-Console-Arithmetic-Interpreter",
        description: "A console-based arithmetic expression interpreter",
        technologies: ["C#"],
        url: "https://github.com/Alex6683-bot/Simple-Console-Arithmetic-Interpreter"
    }
];

// Projects Modal functionality
const projectsModal = document.getElementById('projectsModal');
const projectsButtons = document.querySelectorAll('a[href="#projects"]');
const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Render projects in the modal
function renderProjects(projects) {
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-technologies='${JSON.stringify(project.technologies)}'>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.url}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i> View Project
                </a>
            </div>
        </div>
    `).join('');
}

// Filter projects
function filterProjects(filter) {
    const filteredProjects = filter === 'all' 
        ? projectsData
        : projectsData.filter(project => 
            project.technologies.includes(filter)
        );
    renderProjects(filteredProjects);
}

// Event listeners for filter buttons
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjects(btn.dataset.filter);
    });
});

// Open projects modal
projectsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        projectsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderProjects(projectsData); // Render projects immediately
    });
});

// Close projects modal
projectsModal.querySelector('.close-modal').addEventListener('click', () => {
    projectsModal.classList.remove('active');
    document.body.style.overflow = '';
});

projectsModal.addEventListener('click', (e) => {
    if (e.target === projectsModal) {
        projectsModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}); 