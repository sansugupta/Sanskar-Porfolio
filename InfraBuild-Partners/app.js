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

// ========== CONTACT FORM ==========
function handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const service = document.getElementById('contact-service').value;
    const message = document.getElementById('contact-message').value;
    const mailtoLink = `mailto:contact@infrabuildpartners.com?subject=Inquiry from ${encodeURIComponent(name)} — ${encodeURIComponent(service)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
    alert('Thank you! Your inquiry has been prepared. Your email client will open shortly.');
}

// ========== PDF BOOKLET GENERATOR ==========
function generateBooklet() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const W = 210, H = 297, margin = 20, contentW = W - margin * 2;
    const bg = [10, 10, 15], cardBg = [18, 18, 26];
    const blue = [79, 124, 255], purple = [124, 92, 255], cyan = [0, 212, 255];
    const green = [0, 230, 118], white = [240, 240, 245], muted = [138, 138, 154];

    function drawBg() { doc.setFillColor(...bg); doc.rect(0, 0, W, H, 'F'); }
    function drawBar(y) {
        doc.setFillColor(...blue); doc.rect(margin, y, contentW * 0.6, 3, 'F');
        doc.setFillColor(...purple); doc.rect(margin + contentW * 0.6, y, contentW * 0.4, 3, 'F');
    }

    // PAGE 1: COVER
    drawBg();
    doc.setFillColor(...blue); doc.rect(0, 0, W, 4, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(36); doc.setTextColor(...white);
    doc.text('InfraBuild', margin, 80);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(...muted);
    doc.text('Partners', margin + 95, 80);
    drawBar(88);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(16); doc.setTextColor(...white);
    doc.text('Engineering Excellence,', margin, 110);
    doc.text('Delivered On Deadline.', margin, 120);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(...muted);
    doc.text(doc.splitTextToSize('We are a specialized team of DevOps, SRE, Development, and Data professionals. From infrastructure to interview prep — we build careers and systems that don\'t break.', contentW), margin, 138);

    const stats = [{ n: '100%', l: 'Deadline Hit Rate' }, { n: '50+', l: 'Projects Delivered' }, { n: '24/7', l: 'Engineering Support' }, { n: '15+', l: 'Team Members' }];
    const statW = (contentW - 15) / 4;
    stats.forEach((s, i) => {
        const x = margin + i * (statW + 5);
        doc.setFillColor(...cardBg); doc.roundedRect(x, 165, statW, 35, 3, 3, 'F');
        doc.setFont('helvetica', 'bold'); doc.setFontSize(18); doc.setTextColor(...blue);
        doc.text(s.n, x + statW / 2, 180, { align: 'center' });
        doc.setFont('helvetica', 'normal'); doc.setFontSize(7); doc.setTextColor(...muted);
        doc.text(s.l, x + statW / 2, 190, { align: 'center' });
    });

    doc.setDrawColor(...green); doc.roundedRect(margin, 215, contentW, 30, 3, 3, 'FD');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...green);
    doc.text('\u2713  Our Ironclad Guarantee: Every Deadline, Every Time.', margin + 8, 228);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...muted);
    doc.text('We don\'t just promise delivery — we guarantee it. No exceptions, no excuses.', margin + 8, 237);
    doc.setFontSize(7); doc.text('\u00A9 2026 InfraBuild Partners. All rights reserved.', W / 2, H - 15, { align: 'center' });

    // PAGE 2: SERVICES
    doc.addPage(); drawBg();
    doc.setFillColor(...blue); doc.rect(0, 0, W, 4, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(...blue);
    doc.text('ENGINEERING SERVICES', margin, 25);
    doc.setFontSize(24); doc.setTextColor(...white); doc.text('Build. Deploy. Scale.', margin, 38);
    drawBar(43);

    const services = [
        { name: 'Development Support', price: '$599/month', desc: 'Full-stack dev across Java, Python, Node.js, Angular, React.', color: purple },
        { name: 'DevOps Support', price: '$549/month', desc: 'CI/CD pipelines, Docker/ECS/K8s, Terraform, GitHub Actions.', color: blue },
        { name: 'SRE Support', price: '$699/month', desc: 'Prometheus, Grafana, Datadog, incident response, SLA mgmt.', color: cyan },
        { name: 'Data Engineering', price: '$799/month', desc: 'ETL/ELT, Spark, Airflow, dbt, cloud-native data architectures.', color: green },
        { name: 'Data Analyst', price: '$399/month', desc: 'BI dashboards, SQL analytics, Tableau, Power BI, Looker.', color: [255, 145, 0] },
        { name: 'Interview Support', price: '$249/each', desc: 'Mock interviews, system design, coding walkthroughs.', color: [255, 64, 129] }
    ];
    let y = 55;
    services.forEach(s => {
        doc.setFillColor(...cardBg); doc.roundedRect(margin, y, contentW, 34, 3, 3, 'F');
        doc.setFillColor(...s.color); doc.rect(margin, y, 3, 34, 'F');
        doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.setTextColor(...white);
        doc.text(s.name, margin + 10, y + 12);
        doc.setTextColor(...s.color); doc.text(s.price, margin + contentW - 5, y + 12, { align: 'right' });
        doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...muted);
        doc.text(doc.splitTextToSize(s.desc, contentW - 20), margin + 10, y + 22);
        y += 40;
    });

    // PAGE 3: CAREER
    doc.addPage(); drawBg();
    doc.setFillColor(...blue); doc.rect(0, 0, W, 4, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(...blue);
    doc.text('CAREER SOLUTIONS', margin, 25);
    doc.setFontSize(24); doc.setTextColor(...white); doc.text('Land Your Dream Role.', margin, 38);
    drawBar(43);

    const careers = [
        { name: 'Job Applying Support', price: '$399/mo', badge: '', features: ['Targeted applications', 'Full tracking report', 'Weekly updates', 'Strategy optimization'] },
        { name: 'Resume & LinkedIn', price: '$149/mo', badge: '', features: ['ATS-optimized resume', 'LinkedIn optimization', 'Ongoing updates', 'One-time available'] },
        { name: 'Full Job Search Mgmt', price: '$1,499/mo', badge: 'HIGH DEMAND', features: ['Full search & applications', 'Resume & LinkedIn', 'Mock interviews', 'Study guides', 'Exam support', '1-on-1 teaching'] },
        { name: 'End-to-End Placement', price: '$2,499', badge: 'PREMIUM', features: ['Everything above', 'Placement manager', 'Salary negotiation', 'Onboarding coaching', 'Guaranteed pipeline'] }
    ];
    y = 55;
    careers.forEach(c => {
        const cardH = 12 + c.features.length * 7 + (c.badge ? 8 : 0);
        doc.setFillColor(...cardBg); doc.roundedRect(margin, y, contentW, cardH, 3, 3, 'F');
        if (c.badge.includes('HIGH DEMAND')) {
            doc.setDrawColor(...blue); doc.roundedRect(margin, y, contentW, cardH, 3, 3, 'D');
            doc.setFillColor(...blue); doc.rect(margin, y, contentW, 3, 'F');
        }
        let innerY = y + 8;
        if (c.badge) {
            doc.setFont('helvetica', 'bold'); doc.setFontSize(6); doc.setTextColor(...blue);
            doc.text(c.badge, margin + 8, innerY); innerY += 7;
        }
        doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(...white);
        doc.text(c.name, margin + 8, innerY);
        doc.setTextColor(...blue); doc.text(c.price, margin + contentW - 5, innerY, { align: 'right' });
        innerY += 8;
        c.features.forEach(f => {
            doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
            doc.setTextColor(...green); doc.text('\u2713', margin + 8, innerY);
            doc.setTextColor(...muted); doc.text(f, margin + 16, innerY);
            innerY += 7;
        });
        y += cardH + 6;
    });

    doc.setFontSize(7); doc.setTextColor(...muted);
    doc.text('\u00A9 2026 InfraBuild Partners. All rights reserved.', W / 2, H - 15, { align: 'center' });

    doc.save('InfraBuild_Partners_Services_Booklet.pdf');
}

// ========== DYNAMIC DATA LOADER (GitOps — edit JSON, push, auto-deploy) ==========
async function loadDynamicData() {
    try {
        const [servicesRes, contentRes] = await Promise.all([
            fetch('data/services.json'),
            fetch('data/content.json')
        ]);
        if (!servicesRes.ok || !contentRes.ok) return; // fallback to static HTML
        const servicesData = await servicesRes.json();
        const contentData = await contentRes.json();

        // Render Engineering Services
        const servicesGrid = document.getElementById('services-grid');
        if (servicesGrid && servicesData.engineering) {
            servicesGrid.innerHTML = servicesData.engineering.map(s => `
                <div class="service-card ${s.cardClass} reveal">
                    <div class="service-icon"><i class="${s.icon}"></i></div>
                    <h3>${s.title}</h3>
                    <p>${s.description}</p>
                    <div class="service-price">
                        <span class="amount">${s.currency}${s.price.toLocaleString()}</span>
                        <span class="period">${s.period}</span>
                    </div>
                </div>
            `).join('');
        }

        // Render Career Plans
        const premiumGrid = document.getElementById('premium-grid');
        if (premiumGrid && servicesData.career) {
            premiumGrid.innerHTML = servicesData.career.map(c => `
                <div class="premium-card ${c.featured ? 'featured' : ''} reveal">
                    ${c.badge ? `<div class="premium-badge">${c.badge}</div>` : ''}
                    <h3>${c.title}</h3>
                    <div class="desc">${c.description}</div>
                    <div class="premium-price">
                        <span class="dollar">${c.currency}</span>
                        <span class="amount">${c.price.toLocaleString()}</span>
                        <span class="period">${c.period}</span>
                    </div>
                    <ul class="premium-features">
                        ${c.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
                    </ul>
                    <a href="#contact" class="premium-cta ${c.featured ? 'primary' : 'secondary'}">${c.featured ? 'Get Started →' : 'Get Started'}</a>
                </div>
            `).join('');
        }

        // Render Contact Form Dropdown
        const serviceSelect = document.getElementById('contact-service');
        if (serviceSelect && servicesData.engineering) {
            const allServices = [...servicesData.engineering, ...servicesData.career];
            serviceSelect.innerHTML = '<option value="">Select a Service...</option>' +
                allServices.map(s => `<option value="${s.id}">${s.title} — ${s.currency}${s.price.toLocaleString()}${s.period}</option>`).join('') +
                '<option value="custom">Custom Project</option>';
        }

        // Render Projects
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid && contentData.projects) {
            projectsGrid.innerHTML = contentData.projects.map(p => `
                <div class="project-card reveal">
                    <span class="project-tag">${p.tag}</span>
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <div class="project-tech">
                        ${p.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        }

        // Render Testimonials
        const testimonialsGrid = document.getElementById('testimonials-grid');
        if (testimonialsGrid && contentData.testimonials) {
            testimonialsGrid.innerHTML = contentData.testimonials.map(t => `
                <div class="testimonial-card reveal">
                    <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <blockquote>"${t.message}"</blockquote>
                    <div class="testimonial-author">
                        <img src="${t.image}" alt="${t.name}" loading="lazy">
                        <div class="info"><h4>${t.name}</h4><p>${t.role}</p></div>
                    </div>
                </div>
            `).join('');
        }

        // Re-observe new elements for scroll reveal
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));

    } catch (err) {
        console.log('Using static HTML fallback (JSON not available):', err.message);
    }
}

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
