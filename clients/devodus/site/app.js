const state = {
  services: null,
  pricingTarget: "devodus"
};

const selectors = {
  devodusServices: document.querySelector("#devodusServices"),
  deliveryServices: document.querySelector("#deliveryServices"),
  pricingGrid: document.querySelector("#pricingGrid"),
  tabs: document.querySelectorAll(".tab"),
  menuButton: document.querySelector(".menu-button"),
  header: document.querySelector(".site-header")
};

function serviceCard(service) {
  const features = service.features.slice(0, 5).map((feature) => `<li>${feature}</li>`).join("");
  return `
    <article class="service-card">
      <h3>${service.title}</h3>
      <div class="price">${service.price}</div>
      <p>${service.summary}</p>
      <ul>${features}</ul>
    </article>
  `;
}

function priceCard(service) {
  const features = service.features.map((feature) => `<li>${feature}</li>`).join("");
  return `
    <article class="price-card">
      <h3>${service.title}</h3>
      <div class="price">${service.price}</div>
      <p>${service.summary}</p>
      <ul>${features}</ul>
    </article>
  `;
}

function renderServices() {
  selectors.devodusServices.innerHTML = state.services.devodus.map(serviceCard).join("");
  selectors.deliveryServices.innerHTML = state.services.poweredDelivery.map(serviceCard).join("");
}

function renderPricing() {
  selectors.pricingGrid.innerHTML = state.services[state.pricingTarget].map(priceCard).join("");
}

function bindTabs() {
  selectors.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.pricingTarget = tab.dataset.target;
      selectors.tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });
      renderPricing();
    });
  });
}

function bindMenu() {
  selectors.menuButton.addEventListener("click", () => {
    const isOpen = selectors.header.classList.toggle("menu-open");
    selectors.menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      selectors.header.classList.remove("menu-open");
      selectors.menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

async function init() {
  const response = await fetch("data/services.json");
  state.services = await response.json();
  renderServices();
  renderPricing();
  bindTabs();
  bindMenu();
}

init().catch((error) => {
  selectors.devodusServices.innerHTML = "<p>Service data could not be loaded.</p>";
  console.error(error);
});
