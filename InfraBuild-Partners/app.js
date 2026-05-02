// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    const scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) scrollBtn.classList.toggle('visible', window.scrollY > 400);
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
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

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

// ========== CURSOR-AWARE SERVICE CARDS ==========
document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.service-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (e.clientY > rect.top - 100 && e.clientY < rect.bottom + 100 && e.clientX > rect.left - 100 && e.clientX < rect.right + 100) {
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', x + '%');
            card.style.setProperty('--my', y + '%');
        }
    });
});

// ========== CONTACT FORM + DYNAMIC DATA ==========
const infraBuildState = { services: null, content: null };

function escapeHtml(value = '') {
    return String(value)
        .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
function formatPrice(item) { return `${item.currency}${item.price.toLocaleString()}${item.period}`; }
function getAllServices() {
    if (!infraBuildState.services) return [];
    return [...(infraBuildState.services.engineering || []), ...(infraBuildState.services.career || [])];
}
function renderDetailSections(details) {
    if (!details?.sections?.length) return '';
    return details.sections.map(section => `
        <section class="service-modal-section">
            <h4>${escapeHtml(section.title)}</h4>
            <ul>${(section.items || []).map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </section>`).join('');
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
    if (!response.ok) throw new Error('Unable to load service data');
    infraBuildState.services = await response.json();
    return infraBuildState.services;
}

// ========== PDF BOOKLET — MONOCHROME ==========
async function generateBooklet() {
    const servicesData = await getServicesData();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const W = 210, H = 297, margin = 20, contentW = W - margin * 2;
    const bg = [10, 10, 12], cardBg = [22, 22, 26], line = [60, 60, 66];
    const white = [250, 250, 250], muted = [140, 140, 148], dim = [90, 90, 98];

    function drawBg() { doc.setFillColor(...bg); doc.rect(0, 0, W, H, 'F'); }
    function drawRule(y) { doc.setDrawColor(...line); doc.setLineWidth(0.2); doc.line(margin, y, W - margin, y); }

    drawBg();
    doc.setFillColor(...white); doc.rect(0, 0, W, 3, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(32); doc.setTextColor(...white);
    doc.text('Infrabuild', margin, 70);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(...muted);
    doc.text('Partners', margin + 82, 70);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...dim);
    doc.text('BUILDING  THE  FOUNDATION  FOR  YOUR  GROWTH.', margin, 78);
    drawRule(90);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(18); doc.setTextColor(...white);
    doc.text('Engineering excellence,', margin, 110);
    doc.text('delivered on deadline.', margin, 120);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(...muted);
    doc.text(doc.splitTextToSize('A specialized team across DevOps, SRE, software delivery, boot camps, and career acceleration.', contentW), margin, 138);

    const stats = [
        { n: `${servicesData.engineering.length}+`, l: 'ENGINEERING SERVICES' },
        { n: `${servicesData.career.length}+`, l: 'CAREER PACKAGES' },
        { n: '24/7', l: 'EXECUTION MINDSET' },
        { n: '100%', l: 'DEADLINE HIT RATE' }
    ];
    const statW = (contentW - 15) / 4;
    stats.forEach((stat, index) => {
        const x = margin + index * (statW + 5);
        doc.setFillColor(...cardBg); doc.roundedRect(x, 165, statW, 32, 2, 2, 'F');
        doc.setFont('helvetica', 'bold'); doc.setFontSize(16); doc.setTextColor(...white);
        doc.text(stat.n, x + statW / 2, 180, { align: 'center' });
        doc.setFont('helvetica', 'normal'); doc.setFontSize(6); doc.setTextColor(...dim);
        doc.text(stat.l, x + statW / 2, 190, { align: 'center' });
    });

    doc.setDrawColor(...white); doc.setLineWidth(0.3);
    doc.roundedRect(margin, 215, contentW, 28, 2, 2, 'D');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(...white);
    doc.text('The Infrabuild guarantee — every deadline, every time.', margin + 8, 228);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...muted);
    doc.text('If we commit, we deliver. No exceptions, no excuses.', margin + 8, 236);
    doc.setFontSize(7); doc.setTextColor(...dim);
    doc.text('© 2026 Infrabuild Partners. All rights reserved.', W / 2, H - 15, { align: 'center' });

    doc.addPage(); drawBg();
    doc.setFillColor(...white); doc.rect(0, 0, W, 3, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(...muted);
    doc.text('01  ·  ENGINEERING SERVICES', margin, 25);
    doc.setFontSize(22); doc.setTextColor(...white);
    doc.text('Build. Deploy. Scale.', margin, 40);
    drawRule(46);

    let y = 55;
    servicesData.engineering.forEach(service => {
        doc.setFillColor(...cardBg); doc.roundedRect(margin, y, contentW, 28, 2, 2, 'F');
        doc.setFillColor(...white); doc.rect(margin, y, 2, 28, 'F');
        doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(...white);
        doc.text(service.title, margin + 8, y + 10);
        doc.text(formatPrice(service), margin + contentW - 5, y + 10, { align: 'right' });
        doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5); doc.setTextColor(...muted);
        doc.text(doc.splitTextToSize(service.description, contentW - 16), margin + 8, y + 18);
        y += 32;
    });

    doc.addPage(); drawBg();
    doc.setFillColor(...white); doc.rect(0, 0, W, 3, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(...muted);
    doc.text('02  ·  CAREER SOLUTIONS', margin, 25);
    doc.setFontSize(22); doc.setTextColor(...white);
    doc.text('Land your dream role.', margin, 40);
    drawRule(46);

    y = 58;
    servicesData.career.forEach(plan => {
        const cardHeight = 12 + plan.features.length * 6 + (plan.badge ? 7 : 0);
        doc.setFillColor(...cardBg); doc.roundedRect(margin, y, contentW, cardHeight, 2, 2, 'F');
        if (plan.featured) { doc.setDrawColor(...white); doc.setLineWidth(0.3); doc.roundedRect(margin, y, contentW, cardHeight, 2, 2, 'D'); }
        let innerY = y + 8;
        if (plan.badge) {
            doc.setFont('helvetica', 'bold'); doc.setFontSize(6); doc.setTextColor(...muted);
            doc.text(plan.badge.toUpperCase(), margin + 8, innerY); innerY += 6;
        }
        doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(...white);
        doc.text(plan.title, margin + 8, innerY);
        doc.text(formatPrice(plan), margin + contentW - 5, innerY, { align: 'right' });
        innerY += 7;
        plan.features.forEach(feature => {
            doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...white);
            doc.text('—', margin + 8, innerY);
            doc.setTextColor(...muted);
            doc.text(feature, margin + 14, innerY);
            innerY += 6;
        });
        y += cardHeight + 5;
    });

    doc.setFontSize(7); doc.setTextColor(...dim);
    doc.text('© 2026 Infrabuild Partners. All rights reserved.', W / 2, H - 15, { align: 'center' });
    doc.save('Infrabuild_Partners_Booklet.pdf');
}

function renderEngineeringCard(service, index) {
    const clickable = service.details ? 'is-clickable' : '';
    const triggerAttrs = service.details
        ? `data-service-id="${escapeHtml(service.id)}" tabindex="0" role="button" aria-label="View ${escapeHtml(service.title)} overview"` : '';
    const idx = String(index + 1).padStart(2, '0');
    return `
        <div class="service-card ${service.cardClass} reveal ${clickable}" ${triggerAttrs}>
            <div class="service-head">
                <div class="service-icon"><i class="${escapeHtml(service.icon)}"></i></div>
                <span class="service-index">/ ${idx}</span>
            </div>
            <h3>${escapeHtml(service.title)}</h3>
            <p>${escapeHtml(service.description)}</p>
            <div class="service-card-footer">
                <div class="service-price">
                    <span class="amount">${service.currency}${service.price.toLocaleString()}</span>
                    <span class="period">${escapeHtml(service.period)}</span>
                </div>
                ${service.details ? '<span class="service-detail-pill">View overview <i class="fas fa-arrow-right"></i></span>' : ''}
            </div>
        </div>`;
}

function renderCareerCard(plan) {
    const clickable = plan.details ? 'is-clickable' : '';
    const triggerAttrs = plan.details
        ? `data-service-id="${escapeHtml(plan.id)}" tabindex="0" role="button" aria-label="View ${escapeHtml(plan.title)} overview"` : '';
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
                ${plan.features.map(feature => `<li><i class="fas fa-check"></i> ${escapeHtml(feature)}</li>`).join('')}
            </ul>
            <div class="premium-actions">
                ${plan.details ? '<span class="service-detail-pill">View overview <i class="fas fa-arrow-right"></i></span>' : ''}
                <a href="#contact" class="premium-cta ${plan.featured ? 'primary' : 'secondary'}">${plan.featured ? 'Get started →' : 'Get started'}</a>
            </div>
        </div>`;
}

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
            serviceSelect.innerHTML = '<option value="">Select a service…</option>' +
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
                </div>`).join('');
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
                </div>`).join('');
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
    if (event.target.closest('[data-close-service-modal]')) closeServiceModal();
});

document.addEventListener('keydown', (event) => {
    const focused = document.activeElement;
    if (event.key === 'Escape') closeServiceModal();
    if ((event.key === 'Enter' || event.key === ' ') && focused?.dataset?.serviceId) {
        event.preventDefault();
        openServiceModal(focused.dataset.serviceId);
    }
});

document.addEventListener('DOMContentLoaded', loadDynamicData);

// ========== LIGHTWEIGHT ANALYTICS ==========
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
    window.addEventListener('scroll', () => {
        const depth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        session.scrollDepth = Math.max(session.scrollDepth, depth);
    });
    window.addEventListener('beforeunload', () => {
        session.end = new Date().toISOString();
        const existing = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
        existing.push(session);
        if (existing.length > 100) existing.splice(0, existing.length - 100);
        localStorage.setItem(ANALYTICS_KEY, JSON.stringify(existing));
    });
    window.getAnalytics = () => JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
})();

// ========== AI CHAT ASSISTANT ==========
(() => {
    const chat = document.getElementById('aiChat');
    const launcher = document.getElementById('aiLauncher');
    const closeBtn = document.getElementById('aiClose');
    const body = document.getElementById('aiBody');
    const form = document.getElementById('aiForm');
    const input = document.getElementById('aiText');
    if (!chat || !launcher || !body || !form) return;

    const open  = () => chat.classList.add('open');
    const close = () => chat.classList.remove('open');
    launcher.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);

    // First-time nudge
    setTimeout(() => {
        if (!localStorage.getItem('ibp_ai_nudged')) {
            launcher.animate(
                [{ transform: 'translateY(0)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0)' }],
                { duration: 700, iterations: 3 }
            );
            localStorage.setItem('ibp_ai_nudged', '1');
        }
    }, 4000);

    const KB = `You are Infrabuild AI, a friendly concierge for Infrabuild Partners — a remote-first consultancy
run by Sanskar Gupta. Reply in 2-4 short sentences, warm and helpful, never salesy.

SERVICES (with starting prices in USD):
• DevOps Engineering — CI/CD, IaC (Terraform), Kubernetes, Docker. From $1,500/project.
• Site Reliability Engineering (SRE) — monitoring (Prometheus/Grafana/Datadog), incident response, SLOs. From $2,000/project.
• Full-Stack Development — React, Node.js, Python, APIs. From $2,500/project.
• Data Engineering — Airflow, dbt, Spark, warehousing. From $3,000/project.
• Career Solutions — resume, LinkedIn optimization, mock interviews, placement support. From $99.

STATS: 100% on-time delivery, 50+ clients served, 5/5 avg rating, <24h response.
CONTACT: sanskargupta966@gmail.com · WhatsApp +91 9289869370 · GitHub sanskargupta966.

If the user asks something outside this scope, gently steer them back and offer to schedule a call.`;

    const history = [];

    function addMsg(text, who = 'bot') {
        // Remove any typing indicator
        body.querySelectorAll('.ai-msg.typing').forEach(el => el.remove());
        const el = document.createElement('div');
        el.className = `ai-msg ${who}`;
        el.textContent = text;
        body.appendChild(el);
        body.scrollTop = body.scrollHeight;
        return el;
    }
    function addTyping() {
        body.querySelectorAll('.ai-msg.typing').forEach(el => el.remove());
        const el = document.createElement('div');
        el.className = 'ai-msg bot typing';
        el.innerHTML = '<span></span><span></span><span></span>';
        body.appendChild(el);
        body.scrollTop = body.scrollHeight;
        return el;
    }

    function fallbackReply(q) {
        const s = q.toLowerCase();
        if (/price|pricing|cost|rate|how much/.test(s))
            return "Here's the quick version — DevOps from $1,500, SRE from $2,000, Full-stack dev from $2,500, Data from $3,000, and Career support from $99. Want me to share a detailed scope? Email sanskargupta966@gmail.com.";
        if (/devops|ci\/cd|pipeline|terraform|kubernetes|k8s|docker/.test(s))
            return "DevOps is our most-requested service — CI/CD, Terraform-based IaC, Kubernetes, containerization, the whole stack. Projects start at $1,500. What part of your pipeline needs work?";
        if (/\bsre\b|reliability|monitoring|observability|incident|prometheus|grafana/.test(s))
            return "SRE work covers monitoring (Prometheus/Grafana/Datadog), incident response, SLOs, and on-call setup. Starts at $2,000. Are you looking at green-field setup or hardening an existing stack?";
        if (/data|airflow|dbt|spark|warehouse|etl|pipeline/.test(s))
            return "Data engineering — Airflow, dbt, Spark, warehousing. Projects from $3,000. What's your current data flow like?";
        if (/dev|develop|react|node|full.?stack|web|app/.test(s))
            return "Full-stack development with React, Node, Python and modern APIs — from $2,500/project. Want to tell me a bit about the app?";
        if (/career|resume|linkedin|interview|job|placement/.test(s))
            return "Career support includes resume rewrites, LinkedIn optimization, mock interviews, and placement help — from $99. What stage are you at?";
        if (/contact|reach|email|whatsapp|call/.test(s))
            return "Easiest ways to reach us — email sanskargupta966@gmail.com, WhatsApp +91 9289869370, or use the contact form on this page. Usually reply within 24h.";
        if (/hi|hello|hey|yo\b/.test(s))
            return "Hey! 👋 I'm Infrabuild AI. Tell me what you're building and I'll point you at the right service.";
        return "Happy to help — could you tell me a bit more? I can walk you through our DevOps, SRE, development, data or career services.";
    }

    async function reply(q) {
        const typing = addTyping();
        try {
            if (window.claude && typeof window.claude.complete === 'function') {
                history.push({ role: 'user', content: q });
                const messages = [{ role: 'user', content: `${KB}\n\nConversation so far:\n${history.slice(-8).map(m => `${m.role}: ${m.content}`).join('\n')}\n\nReply as the assistant.` }];
                const text = await window.claude.complete({ messages });
                typing.remove();
                addMsg(text.trim(), 'bot');
                history.push({ role: 'assistant', content: text.trim() });
            } else {
                await new Promise(r => setTimeout(r, 650));
                typing.remove();
                addMsg(fallbackReply(q), 'bot');
            }
        } catch (e) {
            typing.remove();
            addMsg(fallbackReply(q), 'bot');
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = input.value.trim();
        if (!q) return;
        addMsg(q, 'user');
        input.value = '';
        reply(q);
    });

    body.addEventListener('click', (e) => {
        const chip = e.target.closest('.ai-chip');
        if (!chip) return;
        const q = chip.dataset.ask;
        addMsg(q, 'user');
        // Hide chips after first use
        chip.parentElement?.remove();
        reply(q);
    });
})();
