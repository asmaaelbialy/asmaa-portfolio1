/**
 * ==========================================================================
 * ASMAA MOHAMED | AI & DATA ENGINEERING PORTFOLIO JAVASCRIPT
 * Features: Typewriter, Project Filtering, Project Modal, Copy Toast, Scroll
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initNavbar();
    initProjectFiltering();
    initProjectModal();
    initCopyButtons();
    initBackToTop();
});

/* ==========================================================================
   1. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
    const typewriterEl = document.getElementById('typewriter');
    if (!typewriterEl) return;

    const phrases = [
        "AI & Data Engineering Solutions",
        "Automated Python Data Pipelines",
        "Predictive Machine Learning Models",
        "Smart Transportation AI Systems",
        "Scalable MySQL & Database Architectures"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 40;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIdx === currentPhrase.length) {
            typingSpeed = 2200; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typingSpeed = 450; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   2. NAVBAR SCROLL & MOBILE MENU
   ========================================================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll Navbar blur elevation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close on link click
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }
}

/* ==========================================================================
   3. PROJECT CATEGORY FILTERING
   ========================================================================== */
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* ==========================================================================
   4. PROJECT DETAILS MODAL & DATA DICTIONARY
   ========================================================================== */
const projectData = {
    bus: {
        title: "Delta University Bus System (AI Project)",
        category: "AI & Smart Logistics",
        metric: "-20% Route Planning Time",
        image: "assets/images/bus-system.svg",
        overview: "An AI-powered smart campus transportation and scheduling management system engineered in collaboration with a 5-member student engineering team at Delta University for Science and Technology. The system analyzes traffic bottlenecks, student rush hours, and campus stops to compute optimized fleet routes.",
        specs: [
            { label: "Role & Team", value: "Algorithm Design & AI Optimization (5-Member Student Team)" },
            { label: "Core Impact", value: "20% reduction in route planning duration and daily commute delays" },
            { label: "Key Technologies", value: "Python, AI Route Optimization, Graph Algorithms, Data Analytics" },
            { label: "Application Domain", value: "Smart Campus Transit Logistics & Real-time Scheduling" }
        ],
        githubUrl: "https://github.com/asmaaelbialy"
    },
    bio: {
        title: "Biological Age Estimation System (AI & Machine Learning)",
        category: "Machine Learning & Health Informatics",
        metric: "R² = 0.942 Predictive Model",
        image: "assets/images/bio-age-ml.svg",
        overview: "An automated predictive machine learning model developed in Jupyter Notebook utilizing biological biomarker health datasets. The model analyzes physiological markers (such as DNA methylation, blood panels, and metabolic indicators) to predict an individual's true biological age relative to chronological age.",
        specs: [
            { label: "Environment", value: "Jupyter Notebook & Python ML Ecosystem" },
            { label: "Core Algorithms", value: "Scikit-Learn Regression, Feature Selection, Data Normalization" },
            { label: "Dataset Focus", value: "Multivariate Health Biomarker Datasets" },
            { label: "Outcome", value: "Automated high-precision age variance prediction model" }
        ],
        githubUrl: "https://github.com/asmaaelbialy"
    },
    depi: {
        title: "DEPI Data Engineering & Automated ETL Pipelines",
        category: "Data Engineering & Pipelines",
        metric: "Automated Data Processing & Cleansing",
        image: "assets/images/data-pipeline.svg",
        overview: "Developed as part of the Microsoft Data Engineering Traineeship within the Digital Egypt Pioneers Initiative (DEPI). Involves building automated extraction, transformation, and loading (ETL) pipelines, handling missing values, standardizing schemas, and orchestrating database staging for downstream analytics.",
        specs: [
            { label: "Program", value: "Microsoft Track | Digital Egypt Pioneers Initiative (DEPI)" },
            { label: "Key Pipelines", value: "Automated Python workflows, Data Cleansing, SQL Ingestion" },
            { label: "Databases", value: "MySQL, Relational Database Modeling, Query Optimization" },
            { label: "Core Competencies", value: "Data Transformation, Pipeline Scheduling, Data Quality Checks" }
        ],
        githubUrl: "https://github.com/asmaaelbialy"
    },
    student: {
        title: "Student Management System (Java & SQL)",
        category: "Enterprise Software & Databases",
        metric: "ACID Compliant CRUD & Secure Auth",
        image: "assets/images/student-system.svg",
        overview: "A comprehensive database-driven desktop software solution developed using Java and MySQL. Features role-based secure login, dynamic student record management (Create, Read, Update, Delete), student GPA analytics, and optimized search and filter queries.",
        specs: [
            { label: "Architecture", value: "Java Desktop GUI with MySQL Relational Database Backend" },
            { label: "Database Layer", value: "JDBC Connector, Normalized Schema Design, Indexed Queries" },
            { label: "Security", value: "Hashed Authentication, Role-based Access Controls" },
            { label: "Functionality", value: "Fast record searching, multi-criteria filtering, and data export" }
        ],
        githubUrl: "https://github.com/asmaaelbialy"
    }
};

function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalContent = document.getElementById('modal-content-area');
    const openButtons = document.querySelectorAll('.open-modal-btn');

    if (!modal || !modalContent) return;

    openButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectKey = btn.getAttribute('data-project');
            const data = projectData[projectKey];

            if (!data) return;

            let specsHtml = data.specs.map(item => `
                <div class="modal-spec-item">
                    <h5>${item.label}</h5>
                    <p>${item.value}</p>
                </div>
            `).join('');

            modalContent.innerHTML = `
                <img src="${data.image}" alt="${data.title}" class="modal-preview-img">
                <div class="modal-info-body">
                    <div class="modal-meta-row">
                        <span class="project-badge badge-featured">${data.category}</span>
                        <span class="project-metric"><i class="fas fa-check-circle"></i> ${data.metric}</span>
                    </div>
                    <h2 class="modal-title">${data.title}</h2>
                    <p class="modal-full-desc">${data.overview}</p>
                    <div class="modal-specs-list">
                        ${specsHtml}
                    </div>
                    <div style="display: flex; gap: 14px; flex-wrap: wrap;">
                        <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                        <a href="mailto:asmaaelbyalley@gmail.com?subject=Inquiry%20Regarding%20${encodeURIComponent(data.title)}" class="btn btn-secondary">
                            <i class="fas fa-envelope"></i> Discuss Project
                        </a>
                    </div>
                </div>
            `;

            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   5. COPY TO CLIPBOARD & TOAST NOTIFICATION
   ========================================================================== */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied "${textToCopy}" to clipboard!`);
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                showToast(`Copied "${textToCopy}" to clipboard!`);
            });
        });
    });

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

/* ==========================================================================
   6. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
