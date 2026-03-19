// ===== Elementos do DOM =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const cursorFollower = document.querySelector('.cursor-follower');
const statNumbers = document.querySelectorAll('.stat-number');
const typingText = document.querySelector('.typing-text');
const contactForm = document.getElementById('contact-form');

// ===== Seguidor do Cursor =====
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    if (cursorFollower) {
        cursorFollower.style.left = cursorX - 10 + 'px';
        cursorFollower.style.top = cursorY - 10 + 'px';
    }
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Aumentar cursor ao passar sobre elementos interativos
document.querySelectorAll('a, button, .project-card, .skill-item, .contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorFollower) {
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.borderColor = 'var(--primary-light)';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursorFollower) {
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = 'var(--primary)';
        }
    });
});

// ===== Efeito de Rolagem da Navbar =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Navegação Mobile =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Link de Navegação Ativo =====
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ===== Animação de Digitação =====
const words = ['Full Stack', 'Frontend', 'Backend', 'Web'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pausa no final da palavra
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pausa antes da próxima palavra
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Iniciar animação de digitação
if (typingText) {
    setTimeout(typeEffect, 1000);
}

// ===== Animação de Contador =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ===== Animação de Revelação ao Rolar =====
function revealElements() {
    const reveals = document.querySelectorAll('.reveal, .project-card, .skill-item, .contact-card, .cert-item, .future-list li');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Inicializar classes de revelação
document.querySelectorAll('.project-card, .skill-item, .contact-card, .cert-item, .future-list li').forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.skills-category, .section-header, .about-image, .about-text').forEach(el => {
    el.classList.add('reveal');
});

window.addEventListener('scroll', revealElements);

// ===== Observer de Interseção para Estatísticas =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => animateCounter(stat));
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== Rolagem Suave para Navegação =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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


// ===== Efeito Parallax para Formas do Hero =====
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// ===== Efeito de Inclinação dos Cards de Projeto =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== Animação da Janela de Código =====
const codeWindow = document.querySelector('.code-window');
if (codeWindow) {
    codeWindow.addEventListener('mousemove', (e) => {
        const rect = codeWindow.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        codeWindow.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    codeWindow.addEventListener('mouseleave', () => {
        codeWindow.style.transform = 'rotateY(-5deg) rotateX(5deg)';
    });
}

// ===== Animação dos Itens de Habilidades =====
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// ===== Inicialização =====
document.addEventListener('DOMContentLoaded', () => {
    // Disparar revelação inicial
    setTimeout(revealElements, 100);
    
    // Adicionar classe loaded ao body para animações iniciais
    document.body.classList.add('loaded');
});

// ===== Preloader =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Easter Egg do Console =====
console.log('%cOlá, desenvolvedor!', 'font-size: 24px; font-weight: bold; color: #10b981;');
console.log('%cObrigado por visitar meu portfólio!', 'font-size: 14px; color: #a1a1aa;');
console.log('%c📧 Entre em contato: andreluizluque@hotmail.com', 'font-size: 12px; color: #71717a;');
