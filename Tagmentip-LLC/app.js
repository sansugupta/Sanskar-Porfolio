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
const assetDataUrlCache = new Map();

function escapeHtml(value = '') {
    return String(value)
        .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
function formatPeriod(period = '') {
    if (!period) return '';
    return period.startsWith('/') ? period : ` ${period}`;
}
function formatPrice(item) { return `${item.currency}${item.price.toLocaleString()}${formatPeriod(item.period)}`; }
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
    const mailtoLink = `mailto:hello@tagmentip.com?subject=Inquiry from ${encodeURIComponent(name)} — ${encodeURIComponent(service)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`)}`;
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
async function getContentData() {
    if (infraBuildState.content) return infraBuildState.content;
    const response = await fetch('data/content.json');
    if (!response.ok) throw new Error('Unable to load content data');
    infraBuildState.content = await response.json();
    return infraBuildState.content;
}
async function loadAssetDataUrl(path) {
    if (assetDataUrlCache.has(path)) return assetDataUrlCache.get(path);
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Unable to load asset: ${path}`);
    const blob = await response.blob();
    const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
    assetDataUrlCache.set(path, dataUrl);
    return dataUrl;
}

// ========== PDF BOOKLET ==========
async function generateBooklet() {
    const [servicesData, contentData, logoFull, shieldLogo] = await Promise.all([
        getServicesData(),
        getContentData().catch(() => null),
        loadAssetDataUrl('assets/logo-full.png').catch(() => null),
        loadAssetDataUrl('assets/logo-shield-cut.png').catch(() => null)
    ]);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const W = 210;
    const H = 297;
    const margin = 16;
    const contentW = W - margin * 2;
    const bg = [8, 10, 14];
    const panel = [18, 22, 30];
    const panelHi = [24, 31, 42];
    const line = [52, 73, 94];
    const accent = [113, 225, 255];
    const accentWarm = [255, 186, 94];
    const white = [247, 249, 252];
    const muted = [177, 186, 198];
    const dim = [107, 117, 130];

    function drawBackground() {
        doc.setFillColor(...bg);
        doc.rect(0, 0, W, H, 'F');
        doc.setFillColor(11, 16, 24);
        doc.roundedRect(9, 9, W - 18, H - 18, 7, 7, 'F');
        doc.setDrawColor(...line);
        doc.setLineWidth(0.45);
        doc.roundedRect(9, 9, W - 18, H - 18, 7, 7, 'S');
        doc.setFillColor(...accent);
        doc.rect(9, 9, W - 18, 2.2, 'F');
    }

    function drawFooter(pageLabel) {
        doc.setDrawColor(...line);
        doc.setLineWidth(0.2);
        doc.line(margin, H - 16, W - margin, H - 16);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(...dim);
        doc.text(pageLabel, margin, H - 10);
        doc.text('© 2026 Tagmentip LLC', W - margin, H - 10, { align: 'right' });
    }

    function drawPageHeader(label, title, subtitle) {
        drawBackground();
        if (logoFull) doc.addImage(logoFull, 'PNG', margin, 14, 42, 27.5);
        else {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.setTextColor(...white);
            doc.text('Tagmentip LLC', margin, 24);
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...accent);
        doc.text(label.toUpperCase(), margin, 52);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(23);
        doc.setTextColor(...white);
        doc.text(title, margin, 67);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...muted);
        doc.text(doc.splitTextToSize(subtitle, contentW), margin, 76);
        doc.setDrawColor(...line);
        doc.setLineWidth(0.25);
        doc.line(margin, 86, W - margin, 86);
    }

    function drawServiceRow(item, y, options = {}) {
        const cardHeight = options.cardHeight || 28;
        doc.setFillColor(...(options.featured ? panelHi : panel));
        doc.roundedRect(margin, y, contentW, cardHeight, 4, 4, 'F');
        doc.setFillColor(...(options.featured ? accentWarm : accent));
        doc.roundedRect(margin, y, 4, cardHeight, 4, 4, 'F');
        if (options.badge) {
            doc.setFillColor(...accentWarm);
            doc.roundedRect(W - margin - 38, y + 5, 32, 7, 3, 3, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(6.5);
            doc.setTextColor(15, 18, 24);
            doc.text(options.badge.toUpperCase(), W - margin - 22, y + 9.7, { align: 'center' });
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...white);
        doc.text(item.title, margin + 8, y + 9.5);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...accent);
        doc.text(formatPrice(item), W - margin - 8, y + 9.5, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.6);
        doc.setTextColor(...muted);
        const copy = options.copy || item.description;
        doc.text(doc.splitTextToSize(copy, contentW - 18), margin + 8, y + 17.5);
    }

    function drawListBlock(title, items, x, y, w, h) {
        doc.setFillColor(...panel);
        doc.roundedRect(x, y, w, h, 4, 4, 'F');
        doc.setDrawColor(...line);
        doc.setLineWidth(0.2);
        doc.roundedRect(x, y, w, h, 4, 4, 'S');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...white);
        doc.text(title, x + 7, y + 10);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.6);
        let lineY = y + 19;
        items.forEach(item => {
            doc.setTextColor(...accent);
            doc.text('•', x + 7, lineY);
            doc.setTextColor(...muted);
            doc.text(doc.splitTextToSize(item, w - 16), x + 11, lineY);
            lineY += 8.5;
        });
    }

    drawBackground();
    if (shieldLogo) doc.addImage(shieldLogo, 'PNG', W - 62, 18, 36, 29.4);
    if (logoFull) doc.addImage(logoFull, 'PNG', 44, 28, 122, 79.8);
    else {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.setTextColor(...white);
        doc.text('Tagmentip LLC', W / 2, 58, { align: 'center' });
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...accent);
    doc.text('ELITE ENGINEERING DELIVERY + CAREER SOLUTIONS FOR US CLIENTS', W / 2, 122, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(...white);
    doc.text('Services, training, and execution', W / 2, 142, { align: 'center' });
    doc.text('that ship on time.', W / 2, 154, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...muted);
    doc.text(doc.splitTextToSize('Infrastructure, software delivery, data support, interview prep, and job-search execution delivered under one brand system.', 122), W / 2, 167, { align: 'center' });

    const highlightY = 188;
    const statW = (contentW - 10) / 3;
    [
        { title: `${servicesData.engineering.length} engineering offers`, value: 'Delivery retainers and scoped support' },
        { title: `${servicesData.career.length} career packages`, value: 'From resume polish to placement help' },
        { title: '100% deadline focus', value: 'Execution-first with direct founder contact' }
    ].forEach((item, index) => {
        const x = margin + index * (statW + 5);
        doc.setFillColor(...panel);
        doc.roundedRect(x, highlightY, statW, 31, 4, 4, 'F');
        doc.setDrawColor(...line);
        doc.setLineWidth(0.2);
        doc.roundedRect(x, highlightY, statW, 31, 4, 4, 'S');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.4);
        doc.setTextColor(...white);
        doc.text(doc.splitTextToSize(item.title, statW - 10), x + 6, highlightY + 10);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.2);
        doc.setTextColor(...muted);
        doc.text(doc.splitTextToSize(item.value, statW - 10), x + 6, highlightY + 20);
    });

    doc.setFillColor(...panelHi);
    doc.roundedRect(margin, 232, contentW, 38, 5, 5, 'F');
    doc.setFillColor(...accentWarm);
    doc.roundedRect(margin, 232, 5, 38, 5, 5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(...white);
    doc.text('The Tagmentip guarantee', margin + 10, 245);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.4);
    doc.setTextColor(...muted);
    doc.text(doc.splitTextToSize('Every deadline, every time. If we commit, we deliver. Pricing in this booklet matches the current website plans.', contentW - 24), margin + 10, 254);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...accent);
    doc.text('hello@tagmentip.com  ·  US Clients · Remote Delivery', margin + 10, 266);
    drawFooter('Booklet cover');

    doc.addPage();
    drawPageHeader(
        '01 · Engineering services',
        'Build. Deploy. Scale.',
        'Direct engineering support across software, cloud, reliability, data, and interview execution.'
    );
    let y = 95;
    servicesData.engineering.forEach(service => {
        const serviceCopy = service.details?.subtitle || service.description;
        drawServiceRow(service, y, { copy: serviceCopy });
        y += 32;
    });
    drawFooter('Engineering services');

    doc.addPage();
    drawPageHeader(
        '02 · Career solutions',
        'Land your dream role.',
        'Guided career support packages for candidates who need better positioning, sharper interviews, and structured job-search execution.'
    );
    y = 96;
    servicesData.career.forEach(plan => {
        const summary = plan.details?.subtitle || plan.description;
        drawServiceRow(plan, y, { copy: summary, featured: plan.featured, badge: plan.badge, cardHeight: 30 });
        y += 34;
    });

    const spotlightProjects = (contentData?.projects || []).slice(0, 2).map(project => project.title);
    drawListBlock(
        'Why US clients choose Tagmentip',
        ['Delivery-focused support with direct execution', 'Pricing clearly listed and easy to scope', 'US market expertise with remote-first delivery'],
        margin,
        236,
        84,
        40
    );
    drawListBlock(
        'Recent proof points',
        spotlightProjects.length ? spotlightProjects : ['Enterprise Java Microservices Stack', 'AWS Bedrock Agent Terraform Module', 'AI-Powered Observability Automation'],
        margin + 88,
        236,
        contentW - 88,
        40
    );
    drawFooter('Career solutions');

    doc.save('Tagmentip_LLC_Booklet.pdf');
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
            getContentData()
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

    const SERVICE_KEYWORDS = {
        development: ['development', 'developer', 'developers', 'full stack', 'full-stack', 'app', 'application', 'web', 'website', 'api', 'frontend', 'backend', 'react', 'node', 'python', 'java'],
        devops: ['devops', 'ci/cd', 'cicd', 'pipeline', 'pipelines', 'terraform', 'docker', 'kubernetes', 'k8s', 'infrastructure', 'infra', 'deployment', 'github actions', 'gitlab'],
        bootcamp: ['bootcamp', 'training', 'course', 'cohort', 'learn', 'learning', 'mentorship', 'mentor'],
        sre: ['sre', 'site reliability', 'reliability', 'observability', 'incident', 'monitoring', 'prometheus', 'grafana', 'datadog', 'slo'],
        'data-engineering': ['data engineering', 'data engineer', 'etl', 'elt', 'pipeline', 'warehouse', 'airflow', 'dbt', 'spark'],
        'data-analyst': ['data analyst', 'analytics', 'dashboard', 'power bi', 'tableau', 'looker', 'reporting', 'sql'],
        interview: ['interview', 'mock interview', 'system design', 'coding round', 'technical interview'],
        'job-applying': ['job applying', 'applications', 'apply', 'job support', 'job pipeline'],
        'resume-linkedin': ['resume', 'linkedin', 'cv', 'profile', 'ats'],
        'full-job-search': ['job search', 'full job search', 'management', 'guided job search', 'high demand'],
        placement: ['placement', 'end-to-end', 'premium', 'refund', 'placement support']
    };
    const CAREER_SERVICE_IDS = new Set(['job-applying', 'resume-linkedin', 'full-job-search', 'placement', 'interview', 'bootcamp']);

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

    function scoreServiceMatch(query, service) {
        const normalized = query.toLowerCase();
        let score = 0;
        const keywords = SERVICE_KEYWORDS[service.id] || [];

        keywords.forEach(keyword => {
            if (normalized.includes(keyword)) score += keyword.includes(' ') ? 5 : 3;
        });

        if (normalized.includes(service.title.toLowerCase())) score += 8;
        if (normalized.includes(service.id.toLowerCase())) score += 5;

        service.title.toLowerCase().split(/[^a-z0-9]+/).forEach(token => {
            if (token.length > 3 && normalized.includes(token)) score += 2;
        });

        if (CAREER_SERVICE_IDS.has(service.id) && /(career|job|resume|linkedin|interview|placement|hiring)/.test(normalized)) score += 1;
        if (!CAREER_SERVICE_IDS.has(service.id) && /(engineering|project|build|software|cloud|infra|deployment|automation)/.test(normalized)) score += 1;

        return score;
    }

    function findMatchedServices(query, max = 3) {
        return getAllServices()
            .map(service => ({ service, score: scoreServiceMatch(query, service) }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, max)
            .map(item => item.service);
    }

    function describeService(service) {
        const primarySection = service.details?.sections?.[0]?.items?.slice(0, 2) || service.features?.slice(0, 2) || [];
        const extras = primarySection.length ? ` It usually covers ${primarySection.join(' and ')}.` : '';
        return `${service.title} is currently ${formatPrice(service)}. ${service.details?.subtitle || service.description}${extras}`;
    }

    function buildPricingSummary(services, maxItems = services.length) {
        return services
            .slice(0, maxItems)
            .map(service => `${service.title} ${formatPrice(service)}`)
            .join(', ');
    }

    function fallbackReply(q) {
        const s = q.toLowerCase().trim();
        const allServices = getAllServices();
        if (!allServices.length) {
            return 'I can help with pricing and package guidance, but the live service list has not loaded yet. Please try again in a moment.';
        }

        if (/hi|hello|hey|yo\b/.test(s)) {
            return "Hi! I'm Tagmentip AI. Pricing here stays synced with our current service plans for US clients, so ask me about DevOps, SRE, development, data, or career support.";
        }

        if (/contact|reach|email|whatsapp|call|talk/.test(s)) {
            return 'You can reach us at hello@tagmentip.com. If you want, I can also point you to the closest package before you contact us.';
        }

        if (/cheapest|lowest|minimum budget/.test(s)) {
            const cheapest = [...allServices].sort((a, b) => a.price - b.price)[0];
            return `${cheapest.title} is the lowest-priced option right now at ${formatPrice(cheapest)}. If you tell me your goal, I can show the nearest higher-value option too.`;
        }

        if (/highest|premium|most expensive|top package/.test(s)) {
            const priciest = [...allServices].sort((a, b) => b.price - a.price)[0];
            return `${priciest.title} is the highest-ticket package right now at ${formatPrice(priciest)}. It's the most hands-on option for clients who want broad execution support.`;
        }

        const pricingIntent = /(price|pricing|cost|rate|budget|quote|how much|charges|fee)/.test(s);
        const detailIntent = /(details|detail|tell me about|what is|what do you do|included|include|covers|overview)/.test(s);
        const matchedServices = findMatchedServices(s);

        if (pricingIntent && (!matchedServices.length || /all|everything|list|services|plans/.test(s))) {
            const engineeringSummary = buildPricingSummary(infraBuildState.services.engineering || [], 4);
            const careerSummary = buildPricingSummary(infraBuildState.services.career || [], 4);
            return `Current engineering pricing includes ${engineeringSummary}. Career pricing includes ${careerSummary}. Tell me which one you want and I'll break down what's included.`;
        }

        if (matchedServices.length === 1 || (matchedServices.length && (pricingIntent || detailIntent))) {
            return describeService(matchedServices[0]);
        }

        if (matchedServices.length > 1) {
            return `The closest matches are ${buildPricingSummary(matchedServices)}. Tell me which one fits best and I'll give you the exact scope and price.`;
        }

        if (/career|job|resume|linkedin|placement|interview/.test(s)) {
            return `For career support, the current packages are ${buildPricingSummary(infraBuildState.services.career || [])}. Tell me your stage and I'll suggest the right one.`;
        }

        return 'I can help with live pricing for engineering services and career support. Ask something like "What is your DevOps pricing?" or "Which package fits interview prep?"';
    }

    async function reply(q) {
        const typing = addTyping();
        try {
            await getServicesData();
            await new Promise(r => setTimeout(r, 380));
            typing.remove();
            addMsg(fallbackReply(q), 'bot');
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
