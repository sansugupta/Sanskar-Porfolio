// ========== PARTICLES BACKGROUND ==========
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0, mouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
            this.x -= dx * 0.01;
            this.y -= dy * 0.01;
            this.opacity = Math.min(0.8, this.opacity + 0.02);
        }
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 124, 255, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(79, 124, 255, ${0.1 * (1 - dist / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    const scrollBtn = document.getElementById('scrollTop');
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
});

// ========== MOBILE MENU ==========
function toggleMobile() {
    document.getElementById('mobileMenu').classList.toggle('active');
    document.getElementById('hamburger').classList.toggle('active');
}
function closeMobile() {
    document.getElementById('mobileMenu').classList.remove('active');
    document.getElementById('hamburger').classList.remove('active');
}

// ========== SCROLL REVEAL ==========
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ========== COUNTER ANIMATION ==========
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const count = parseInt(el.dataset.count);
            if (!count || el.dataset.animated) return;
            el.dataset.animated = 'true';
            let current = 0;
            const step = Math.ceil(count / 40);
            const suffix = el.textContent.includes('%') ? '%' : '+';
            const timer = setInterval(() => {
                current += step;
                if (current >= count) { current = count; clearInterval(timer); }
                el.textContent = current + suffix;
            }, 30);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ========== CONTACT FORM + DYNAMIC DATA ==========
const infraBuildState = {
    services: null,
    content: null
};

function escapeHtml(value = '') {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function formatPrice(item) {
    return `${item.currency}${item.price.toLocaleString()}${item.period}`;
}

function getAllServices() {
    if (!infraBuildState.services) return [];
    return [...(infraBuildState.services.engineering || []), ...(infraBuildState.services.career || [])];
}

function renderDetailSections(details) {
    if (!details?.sections?.length) return '';

    return details.sections.map(section => `
        <section class="service-modal-section">
            <h4>${escapeHtml(section.title)}</h4>
            <ul>
                ${(section.items || []).map(item => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
        </section>
    `).join('');
}

function openServiceModal(serviceId) {
    const service = getAllServices().find(item => item.id === serviceId && item.details);
    const modal = document.getElementById('service-modal');
    if (!service || !modal) return;

    document.getElementById('service-modal-title').textContent = service.title;
    document.getElementById('service-modal-price').textContent = formatPrice(service);
    document.getElementById('service-modal-subtitle').textContent = service.details.subtitle || service.description;
    document.getElementById('service-modal-body').innerHTML = renderDetailSections(service.details);

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

function handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const service = document.getElementById('contact-service').value;
    const message = document.getElementById('contact-message').value;
    const mailtoLink = `mailto:sanskargupta966@gmail.com?subject=Inquiry from ${encodeURIComponent(name)} — ${encodeURIComponent(service)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
    alert('Thank you! Your inquiry has been prepared. Your email client will open shortly.');
}

async function getServicesData() {
    if (infraBuildState.services) return infraBuildState.services;

    const response = await fetch('data/services.json');
    if (!response.ok) {
        throw new Error('Unable to load service data');
    }

    infraBuildState.services = await response.json();
    return infraBuildState.services;
}

// ========== PDF BOOKLET GENERATOR ==========
async function generateBooklet() {
    const servicesData = await getServicesData();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const W = 210, H = 297, margin = 20, contentW = W - margin * 2;
    const bg = [10, 10, 15], cardBg = [18, 18, 26];
    const blue = [79, 124, 255], purple = [124, 92, 255], cyan = [0, 212, 255];
    const green = [0, 230, 118], white = [240, 240, 245], muted = [138, 138, 154];
    const colorMap = {
        'card-dev': purple,
        'card-devops': blue,
        'card-bootcamp': [255, 193, 7],
        'card-sre': cyan,
        'card-data': green,
        'card-analyst': [255, 145, 0],
        'card-interview': [255, 64, 129]
    };

    function drawBg() {
        doc.setFillColor(...bg);
        doc.rect(0, 0, W, H, 'F');
    }

    function drawBar(y) {
        doc.setFillColor(...blue);
        doc.rect(margin, y, contentW * 0.6, 3, 'F');
        doc.setFillColor(...purple);
        doc.rect(margin + contentW * 0.6, y, contentW * 0.4, 3, 'F');
    }

    drawBg();
    doc.setFillColor(...blue);
    doc.rect(0, 0, W, 4, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(36);
    doc.setTextColor(...white);
    doc.text('InfraBuild', margin, 80);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...muted);
    doc.text('Partners', margin + 95, 80);
    drawBar(88);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...white);
    doc.text('Engineering Excellence,', margin, 110);
    doc.text('Delivered On Deadline.', margin, 120);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...muted);
    doc.text(doc.splitTextToSize('We are a specialized team across DevOps, SRE, software delivery, boot camps, and career acceleration. Edit data/services.json to keep this booklet aligned with the website.', contentW), margin, 138);

    const stats = [
        { n: `${servicesData.engineering.length}+`, l: 'Engineering Services' },
        { n: `${servicesData.career.length}+`, l: 'Career Packages' },
        { n: '24/7', l: 'Execution Mindset' },
        { n: 'GitOps', l: 'JSON-driven updates' }
    ];
    const statW = (contentW - 15) / 4;
    stats.forEach((stat, index) => {
        const x = margin + index * (statW + 5);
        doc.setFillColor(...cardBg);
        doc.roundedRect(x, 165, statW, 35, 3, 3, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(...blue);
        doc.text(stat.n, x + statW / 2, 180, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(...muted);
        doc.text(stat.l, x + statW / 2, 190, { align: 'center' });
    });

    doc.setDrawColor(...green);
    doc.roundedRect(margin, 215, contentW, 30, 3, 3, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...green);
    doc.text('\u2713  Our Ironclad Guarantee: Every Deadline, Every Time.', margin + 8, 228);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text('We keep service data centralized so website pricing, offer details, and brochure content stay in sync.', margin + 8, 237);
    doc.setFontSize(7);
    doc.text('\u00A9 2026 InfraBuild Partners. All rights reserved.', W / 2, H - 15, { align: 'center' });

    doc.addPage();
    drawBg();
    doc.setFillColor(...blue);
    doc.rect(0, 0, W, 4, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...blue);
    doc.text('ENGINEERING SERVICES', margin, 25);
    doc.setFontSize(24);
    doc.setTextColor(...white);
    doc.text('Build. Deploy. Scale.', margin, 38);
    drawBar(43);

    let y = 52;
    servicesData.engineering.forEach(service => {
        const color = colorMap[service.cardClass] || blue;
        doc.setFillColor(...cardBg);
        doc.roundedRect(margin, y, contentW, 30, 3, 3, 'F');
        doc.setFillColor(...color);
        doc.rect(margin, y, 3, 30, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...white);
        doc.text(service.title, margin + 10, y + 10);
        doc.setTextColor(...color);
        doc.text(formatPrice(service), margin + contentW - 5, y + 10, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(...muted);
        doc.text(doc.splitTextToSize(service.description, contentW - 20), margin + 10, y + 18);
        y += 35;
    });

    doc.addPage();
    drawBg();
    doc.setFillColor(...blue);
    doc.rect(0, 0, W, 4, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...blue);
    doc.text('CAREER SOLUTIONS', margin, 25);
    doc.setFontSize(24);
    doc.setTextColor(...white);
    doc.text('Land Your Dream Role.', margin, 38);
    drawBar(43);

    y = 55;
    servicesData.career.forEach(plan => {
        const cardHeight = 12 + plan.features.length * 7 + (plan.badge ? 8 : 0);
        doc.setFillColor(...cardBg);
        doc.roundedRect(margin, y, contentW, cardHeight, 3, 3, 'F');
        if (plan.featured) {
            doc.setDrawColor(...blue);
            doc.roundedRect(margin, y, contentW, cardHeight, 3, 3, 'D');
            doc.setFillColor(...blue);
            doc.rect(margin, y, contentW, 3, 'F');
        }
        let innerY = y + 8;
        if (plan.badge) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(6);
            doc.setTextColor(...blue);
            doc.text(plan.badge, margin + 8, innerY);
            innerY += 7;
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...white);
        doc.text(plan.title, margin + 8, innerY);
        doc.setTextColor(...blue);
        doc.text(formatPrice(plan), margin + contentW - 5, innerY, { align: 'right' });
        innerY += 8;
        plan.features.forEach(feature => {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(...green);
            doc.text('\u2713', margin + 8, innerY);
            doc.setTextColor(...muted);
            doc.text(feature, margin + 16, innerY);
            innerY += 7;
        });
        y += cardHeight + 6;
    });

    doc.setFontSize(7);
    doc.setTextColor(...muted);
    doc.text('\u00A9 2026 InfraBuild Partners. All rights reserved.', W / 2, H - 15, { align: 'center' });

    doc.save('InfraBuild_Partners_Services_Booklet.pdf');
}

function renderEngineeringCard(service) {
    const clickable = service.details ? 'is-clickable' : '';
    const triggerAttrs = service.details
        ? `data-service-id="${escapeHtml(service.id)}" tabindex="0" role="button" aria-label="View ${escapeHtml(service.title)} overview"`
        : '';

    return `
        <div class="service-card ${service.cardClass} reveal ${clickable}" ${triggerAttrs}>
            <div class="service-icon"><i class="${escapeHtml(service.icon)}"></i></div>
            <h3>${escapeHtml(service.title)}</h3>
            <p>${escapeHtml(service.description)}</p>
            <div class="service-card-footer">
                <div class="service-price">
                    <span class="amount">${service.currency}${service.price.toLocaleString()}</span>
                    <span class="period">${escapeHtml(service.period)}</span>
                </div>
                ${service.details ? '<span class="service-detail-pill">View overview <i class="fas fa-arrow-right"></i></span>' : ''}
            </div>
        </div>
    `;
}

function renderCareerCard(plan) {
    const clickable = plan.details ? 'is-clickable' : '';
    const triggerAttrs = plan.details
        ? `data-service-id="${escapeHtml(plan.id)}" tabindex="0" role="button" aria-label="View ${escapeHtml(plan.title)} overview"`
        : '';

    return `
        <div class="premium-card ${plan.featured ? 'featured' : ''} reveal ${clickable}" ${triggerAttrs}>
            ${plan.badge ? `<div class="premium-badge">${escapeHtml(plan.badge)}</div>` : ''}
            <h3>${escapeHtml(plan.title)}</h3>
            <div class="desc">${escapeHtml(plan.description)}</div>
            <div class="premium-price">
                <span class="dollar">${escapeHtml(plan.currency)}</span>
                <span class="amount">${plan.price.toLocaleString()}</span>
                <span class="period">${escapeHtml(plan.period)}</span>
            </div>
            <ul class="premium-features">
                ${plan.features.map(feature => `<li><i class="fas fa-check-circle"></i> ${escapeHtml(feature)}</li>`).join('')}
            </ul>
            <div class="premium-actions">
                ${plan.details ? '<span class="service-detail-pill">View overview <i class="fas fa-arrow-right"></i></span>' : ''}
                <a href="#contact" class="premium-cta ${plan.featured ? 'primary' : 'secondary'}">${plan.featured ? 'Get Started →' : 'Get Started'}</a>
            </div>
        </div>
    `;
}

// ========== DYNAMIC DATA LOADER (GitOps — edit JSON, push, auto-deploy) ==========
async function loadDynamicData() {
    try {
        const [servicesData, contentData] = await Promise.all([
            getServicesData(),
            fetch('data/content.json').then(response => {
                if (!response.ok) throw new Error('Unable to load content data');
                return response.json();
            })
        ]);

        infraBuildState.content = contentData;

        const servicesGrid = document.getElementById('services-grid');
        if (servicesGrid && servicesData.engineering) {
            servicesGrid.innerHTML = servicesData.engineering.map(renderEngineeringCard).join('');
        }

        const premiumGrid = document.getElementById('premium-grid');
        if (premiumGrid && servicesData.career) {
            premiumGrid.innerHTML = servicesData.career.map(renderCareerCard).join('');
        }

        const serviceSelect = document.getElementById('contact-service');
        if (serviceSelect && servicesData.engineering) {
            const allServices = getAllServices();
            serviceSelect.innerHTML = '<option value="">Select a Service...</option>' +
                allServices.map(service => `<option value="${escapeHtml(service.id)}">${escapeHtml(service.title)} — ${escapeHtml(formatPrice(service))}</option>`).join('') +
                '<option value="custom">Custom Project</option>';
        }

        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid && contentData.projects) {
            projectsGrid.innerHTML = contentData.projects.map(project => `
                <div class="project-card reveal">
                    <span class="project-tag">${escapeHtml(project.tag)}</span>
                    <h3>${escapeHtml(project.title)}</h3>
                    <p>${escapeHtml(project.description)}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span>${escapeHtml(tech)}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        }

        const testimonialsGrid = document.getElementById('testimonials-grid');
        if (testimonialsGrid && contentData.testimonials) {
            testimonialsGrid.innerHTML = contentData.testimonials.map(testimonial => `
                <div class="testimonial-card reveal">
                    <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <blockquote>"${escapeHtml(testimonial.message)}"</blockquote>
                    <div class="testimonial-author">
                        <img src="${escapeHtml(testimonial.image)}" alt="${escapeHtml(testimonial.name)}" loading="lazy">
                        <div class="info"><h4>${escapeHtml(testimonial.name)}</h4><p>${escapeHtml(testimonial.role)}</p></div>
                    </div>
                </div>
            `).join('');
        }

        document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
    } catch (err) {
        console.log('Using static HTML fallback (JSON not available):', err.message);
    }
}

document.addEventListener('click', (event) => {
    const modalTrigger = event.target.closest('[data-service-id]');
    if (modalTrigger && !event.target.closest('a')) {
        openServiceModal(modalTrigger.dataset.serviceId);
    }

    if (event.target.closest('[data-close-service-modal]')) {
        closeServiceModal();
    }
});

document.addEventListener('keydown', (event) => {
    const focused = document.activeElement;
    if (event.key === 'Escape') {
        closeServiceModal();
    }

    if ((event.key === 'Enter' || event.key === ' ') && focused?.dataset?.serviceId) {
        event.preventDefault();
        openServiceModal(focused.dataset.serviceId);
    }
});

// Load data on DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadDynamicData);

// ========== LIGHTWEIGHT ANALYTICS TRACKER ==========
(function() {
    const ANALYTICS_KEY = 'ibp_analytics';
    const session = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36),
        start: new Date().toISOString(),
        page: location.pathname,
        referrer: document.referrer,
        screen: `${screen.width}x${screen.height}`,
        userAgent: navigator.userAgent,
        clicks: [],
        scrollDepth: 0
    };

    // Track clicks on CTAs and nav links
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button, .cta-btn, .premium-cta');
        if (target) {
            session.clicks.push({
                text: target.textContent?.trim().slice(0, 50),
                href: target.href || '',
                time: new Date().toISOString()
            });
        }
    });

    // Track scroll depth
    window.addEventListener('scroll', () => {
        const depth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        session.scrollDepth = Math.max(session.scrollDepth, depth);
    });

    // Save to localStorage on unload
    window.addEventListener('beforeunload', () => {
        session.end = new Date().toISOString();
        const existing = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
        existing.push(session);
        // Keep last 100 sessions
        if (existing.length > 100) existing.splice(0, existing.length - 100);
        localStorage.setItem(ANALYTICS_KEY, JSON.stringify(existing));
    });

    // Expose for dashboard
    window.getAnalytics = () => JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
})();
