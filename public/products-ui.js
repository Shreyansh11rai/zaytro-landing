import { PRODUCTS, PRODUCT_WEIGHTS } from "./products-data.js";

const productCards = new Map();

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function updateImage(image, product, weight) {
  const source = product.images[weight];
  if (image.getAttribute("src") === source) return;

  const finishTransition = () => {
    if (image.getAttribute("src") === source) {
      requestAnimationFrame(() => image.classList.remove("is-changing"));
    }
  };
  image.classList.add("is-changing");
  image.addEventListener("load", finishTransition, { once: true });
  image.addEventListener(
    "error",
    () => {
      if (image.getAttribute("src") === source) {
        console.error(`Unable to load product image: ${source}`);
        image.classList.remove("is-changing");
      }
    },
    { once: true },
  );
  image.src = source;
  if (image.complete && image.naturalWidth > 0) {
    finishTransition();
  }
}

function setCardWeight(card, product, weight) {
  const image = card.querySelector(".product-image");
  const weightButtons = card.querySelectorAll("[data-weight]");
  const enquiryLink = card.querySelector("[data-product-enquiry]");

  updateImage(image, product, weight);
  image.alt = `Zaytro ${product.name} product pack`;
  weightButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.weight === weight));
  });

  if (enquiryLink) {
    const message = `Hi Zaytro, please share the price and availability of ${product.name} (${weight}).`;
    enquiryLink.href = `https://wa.me/919580216636?text=${encodeURIComponent(message)}`;
  }
}

function createProductCard(product, { showEnquiry = false } = {}) {
  const card = createElement("article", "product-card");
  card.dataset.productId = product.id;
  if (showEnquiry) card.id = product.id;

  const image = createElement("img", "product-image");
  image.src = product.images["50g"];
  image.alt = `Zaytro ${product.name} product pack`;
  image.width = 640;
  image.height = 640;
  image.loading = "lazy";
  image.decoding = "async";
  card.append(image);

  const body = createElement("div", "product-card-body");
  const status = createElement("span", "status", product.category);
  body.append(status);

  if (product.featured) {
    body.append(createElement("span", "product-badge", "Featured"));
  }
  if (product.offer) {
    body.append(createElement("span", "product-badge", product.offer));
  }

  body.append(createElement("h3", "card-title", product.name));
  body.append(createElement("p", "", product.description));

  const weightGroup = createElement("fieldset", "weight-options");
  weightGroup.append(createElement("legend", "", "Choose a pack size"));
  const buttons = createElement("div", "weight-options-list");
  PRODUCT_WEIGHTS.forEach(({ value, label }) => {
    const button = createElement("button", "weight-chip", label);
    button.type = "button";
    button.dataset.weight = value;
    button.setAttribute("aria-pressed", String(value === "50g"));
    button.addEventListener("click", () => setCardWeight(card, product, value));
    buttons.append(button);
  });
  weightGroup.append(buttons);
  body.append(weightGroup);

  const link = createElement("a", "text-link");
  link.href = `products.html#${product.id}`;
  link.textContent = showEnquiry
    ? `Ask about ${product.name} →`
    : "Product details →";
  if (showEnquiry) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.dataset.productEnquiry = "";
  }
  body.append(link);
  card.append(body);

  productCards.set(product.id, card);
  return card;
}

function renderProductGrid(grid, products, options) {
  if (!grid) return;
  products.forEach((product) => grid.append(createProductCard(product, options)));
}

function renderEmptyPanel(container, type) {
  const isFeatured = type === "featured";
  const panel = createElement("div", "empty-panel");
  panel.append(
    createElement(
      "span",
      "status",
      isFeatured ? "No featured products right now" : "No active offers",
    ),
    createElement(
      "h3",
      "",
      isFeatured ? "Nothing featured just yet." : "No offers at this time.",
    ),
    createElement(
      "p",
      "",
      isFeatured
        ? "Browse the full range or ask us which masala is available for your recipe."
        : "Contact us to check product prices and availability before ordering.",
    ),
  );
  const link = createElement(
    "a",
    "text-link",
    isFeatured ? "Browse all masalas →" : "Ask about a product →",
  );
  link.href = isFeatured ? "products.html#all-products" : "contact.html";
  panel.append(link);
  container.replaceChildren(panel);
}

function renderPromoGrid(container, products, type) {
  if (!container) return;
  if (products.length === 0) {
    renderEmptyPanel(container, type);
    return;
  }

  container.replaceChildren();
  renderProductGrid(container, products);
}

function initProductFilters() {
  const grid = document.querySelector("[data-product-list]");
  if (!grid) return;

  let activeWeight = "all";
  let activeSort = "recommended";
  const filterButtons = document.querySelectorAll("[data-weight-filter]");
  const sortSelect = document.querySelector("[data-product-sort]");

  function applyView() {
    const matchingProducts =
      activeWeight === "all"
        ? PRODUCTS
        : PRODUCTS.filter((product) => product.images[activeWeight]);

    const sortedProducts = [...matchingProducts];
    if (activeSort === "name-asc") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (activeSort === "name-desc") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    const visibleIds = new Set(sortedProducts.map((product) => product.id));
    productCards.forEach((card, id) => {
      card.hidden = !visibleIds.has(id);
      if (visibleIds.has(id)) {
        const product = PRODUCTS.find((item) => item.id === id);
        setCardWeight(card, product, activeWeight === "all" ? "50g" : activeWeight);
      }
    });
    sortedProducts.forEach((product) => grid.append(productCards.get(product.id)));

    filterButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.weightFilter === activeWeight),
      );
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeWeight = button.dataset.weightFilter;
      applyView();
    });
  });
  sortSelect?.addEventListener("change", () => {
    activeSort = sortSelect.value;
    applyView();
  });
  applyView();
}

renderProductGrid(document.querySelector("[data-product-list]"), PRODUCTS, {
  showEnquiry: true,
});
renderProductGrid(document.querySelector("[data-home-product-list]"), PRODUCTS);
renderPromoGrid(
  document.querySelector("[data-featured-products]"),
  PRODUCTS.filter((product) => product.featured),
  "featured",
);
renderPromoGrid(
  document.querySelector("[data-offer-products]"),
  PRODUCTS.filter((product) => product.offer),
  "offers",
);
initProductFilters();

document.querySelectorAll(".current-year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
