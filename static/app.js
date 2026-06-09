/**
 * TechStore — Script Principal
 * Projeto BMVC Python — Orientacao a Objetos
 *
 * Funcionalidades:
 *  - Carregar produtos via API REST
 *  - Filtrar por categoria
 *  - Adicionar produto (modal)
 *  - Carrinho com sidebar: adicionar, remover, alterar qty, total
 */

"use strict";

/* ========================
   SELETORES
   ======================== */
const API_URL        = "/api/produtos";
const grid           = document.getElementById("products-grid");
const filterBtns     = document.querySelectorAll(".filter-btn");
const modalOverlay   = document.getElementById("modal-overlay");
const openModalBtn   = document.getElementById("btn-open-modal");
const closeModalBtn  = document.getElementById("btn-close-modal");
const addForm        = document.getElementById("form-add");
const toast          = document.getElementById("toast");
const heroCount      = document.getElementById("hero-count");
const heroCats       = document.getElementById("hero-cats");

// Carrinho
const cartOverlay    = document.getElementById("cart-overlay");
const openCartBtn    = document.getElementById("btn-open-cart");
const closeCartBtn   = document.getElementById("btn-close-cart");
const cartBadge      = document.getElementById("cart-badge");
const cartBody       = document.getElementById("cart-body");
const cartFooter     = document.getElementById("cart-footer");
const cartCountLabel = document.getElementById("cart-count-label");

/* ========================
   ESTADO
   ======================== */
let allProdutos   = [];
let currentFilter = "Todos";
let cart          = [];   // [{ produto, qty }]

/* ========================
   INICIALIZACAO
   ======================== */
document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos();
  bindEvents();
});

/* ========================
   API — Carregar produtos
   ======================== */
async function carregarProdutos() {
  grid.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <span>Carregando produtos...</span>
    </div>`;

  try {
    const res  = await fetch(API_URL);
    const data = await res.json();
    allProdutos = data;
    atualizarHeroStats();
    renderizarProdutos(allProdutos);
  } catch (err) {
    grid.innerHTML = `
      <p style="color:#ef4444;grid-column:1/-1;text-align:center;padding:3rem;font-size:.85rem;">
        Erro ao conectar a API: ${err.message}
      </p>`;
  }
}

/* ========================
   API — Adicionar produto
   ======================== */
async function adicionarProdutoAPI(dados) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Falha ao adicionar produto.");
  return await res.json();
}

/* ========================
   ICONES SVG por categoria
   ======================== */
function iconeCategoria(categoria) {
  const map = {
    "Tecnologia": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>`,
    "Perifericos": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="7" width="20" height="15" rx="2"/>
        <polyline points="17 2 12 7 7 2"/>
      </svg>`,
    "Audio": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </svg>`,
  };
  return map[categoria] || map["Tecnologia"];
}

function iconeCategoriaMini(categoria) {
  return iconeCategoria(categoria);
}

/* ========================
   RENDERIZAR PRODUTOS
   ======================== */
function renderizarProdutos(lista) {
  if (lista.length === 0) {
    grid.innerHTML = `
      <p style="color:#737373;grid-column:1/-1;text-align:center;padding:3rem;font-size:.85rem;">
        Nenhum produto encontrado nessa categoria.
      </p>`;
    return;
  }

  grid.innerHTML = lista.map(p => `
    <article class="product-card" id="card-${p.id}">
      <div class="card-top">
        <span class="card-category">${p.categoria}</span>
        <div class="card-icon">${iconeCategoria(p.categoria)}</div>
      </div>
      <h3 class="card-name">${p.nome}</h3>
      <p class="card-desc">${p.descricao}</p>
      <div class="card-footer">
        <span class="card-price">R$ ${Number(p.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
        <button class="card-btn" data-id="${p.id}" onclick="adicionarAoCarrinho(${p.id}, event)">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Adicionar
        </button>
      </div>
    </article>
  `).join("");
}

/* ========================
   FILTROS
   ======================== */
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.cat;

    const filtrados = currentFilter === "Todos"
      ? allProdutos
      : allProdutos.filter(p => p.categoria === currentFilter);

    renderizarProdutos(filtrados);
  });
});

/* ========================
   MODAL — Adicionar via form
   ======================== */
function bindEvents() {
  // Abrir modal
  openModalBtn.addEventListener("click", () => {
    modalOverlay.classList.add("open");
    document.getElementById("input-nome").focus();
  });

  // Fechar modal
  closeModalBtn.addEventListener("click", fecharModal);
  modalOverlay.addEventListener("click", e => {
    if (e.target === modalOverlay) fecharModal();
  });

  // Submit form
  addForm.addEventListener("submit", async e => {
    e.preventDefault();
    const dados = {
      nome:      document.getElementById("input-nome").value.trim(),
      descricao: document.getElementById("input-desc").value.trim(),
      preco:     parseFloat(document.getElementById("input-preco").value),
      categoria: document.getElementById("input-cat").value,
    };

    const btnSalvar = document.getElementById("btn-salvar");
    btnSalvar.textContent = "Salvando...";
    btnSalvar.disabled = true;

    try {
      const novo = await adicionarProdutoAPI(dados);
      allProdutos.push(novo);
      fecharModal();
      addForm.reset();
      atualizarHeroStats();

      const filtrados = currentFilter === "Todos"
        ? allProdutos
        : allProdutos.filter(p => p.categoria === currentFilter);
      renderizarProdutos(filtrados);
      mostrarToast(`"${novo.nome}" adicionado ao catalogo.`, "ok");
    } catch (err) {
      mostrarToast("Erro ao salvar produto.", "err");
    } finally {
      btnSalvar.textContent = "Salvar produto";
      btnSalvar.disabled = false;
    }
  });

  // Carrinho — abrir/fechar
  openCartBtn.addEventListener("click", abrirCarrinho);
  closeCartBtn.addEventListener("click", fecharCarrinho);
  cartOverlay.addEventListener("click", e => {
    if (e.target === cartOverlay) fecharCarrinho();
  });

  // Fechar com ESC
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      fecharModal();
      fecharCarrinho();
    }
  });
}

function fecharModal() { modalOverlay.classList.remove("open"); }

/* ========================
   CARRINHO — Estado
   ======================== */
function adicionarAoCarrinho(id, event) {
  const produto = allProdutos.find(p => p.id === id);
  if (!produto) return;

  const item = cart.find(i => i.produto.id === id);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ produto, qty: 1 });
  }

  atualizarBadge();
  renderizarCarrinho();

  // --- Animacao fly-to-cart ---
  flyToCart(produto, event);
}

/**
 * Cria um clone visual do produto e anima ele voando ate o icone do carrinho.
 */
function flyToCart(produto, event) {
  // Posicao de origem: botao clicado
  let startX, startY;
  if (event && event.target) {
    const btn = event.target.closest(".card-btn");
    if (btn) {
      const r = btn.getBoundingClientRect();
      startX = r.left;
      startY = r.top;
    }
  }
  // Fallback se nao encontrar o botao
  if (startX === undefined) {
    startX = window.innerWidth / 2 - 80;
    startY = window.innerHeight / 2;
  }

  // Posicao destino: icone do carrinho na navbar
  const cartRect = openCartBtn.getBoundingClientRect();
  const endX = cartRect.left + cartRect.width / 2 - 80;
  const endY = cartRect.top + cartRect.height / 2 - 16;

  // Criar o elemento clone
  const flyEl = document.createElement("div");
  flyEl.className = "fly-item";
  flyEl.innerHTML = `
    <div class="fly-icon">${iconeCategoria(produto.categoria)}</div>
    <span class="fly-name">${produto.nome}</span>
  `;

  // Posicionar na origem
  flyEl.style.left = startX + "px";
  flyEl.style.top  = startY + "px";

  document.body.appendChild(flyEl);

  // Forcar reflow para que a transicao funcione
  flyEl.offsetHeight;

  // Animar para destino
  requestAnimationFrame(() => {
    flyEl.style.left = endX + "px";
    flyEl.style.top  = endY + "px";
    flyEl.classList.add("flying");
  });

  // Bounce no badge quando o clone chega
  setTimeout(() => {
    cartBadge.classList.add("bounce");
    setTimeout(() => cartBadge.classList.remove("bounce"), 300);
  }, 400);

  // Remover o clone do DOM e mostrar toast
  setTimeout(() => {
    flyEl.remove();
    mostrarToast(`"${produto.nome}" adicionado ao carrinho.`, "ok");
  }, 600);
}

function removerDoCarrinho(id) {
  cart = cart.filter(i => i.produto.id !== id);
  atualizarBadge();
  renderizarCarrinho();
}

function alterarQty(id, delta) {
  const item = cart.find(i => i.produto.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.produto.id !== id);
  }
  atualizarBadge();
  renderizarCarrinho();
}

function limparCarrinho() {
  if (cart.length === 0) return;
  const msg = `Carrinho limpo (${totalItens()} itens removidos).`;
  cart = [];
  atualizarBadge();
  // Delay para não conflitar com o botão que está sendo removido do DOM
  setTimeout(() => {
    renderizarCarrinho();
    fecharCarrinho();
    mostrarToast(msg, "ok");
  }, 50);
}

function totalCarrinho() {
  return cart.reduce((acc, i) => acc + i.produto.preco * i.qty, 0);
}

function totalItens() {
  return cart.reduce((acc, i) => acc + i.qty, 0);
}

/* ========================
   CARRINHO — Renderizacao
   ======================== */
function abrirCarrinho() {
  renderizarCarrinho();
  cartOverlay.classList.add("open");
}

function fecharCarrinho() {
  cartOverlay.classList.remove("open");
}

function atualizarBadge() {
  const n = totalItens();
  cartBadge.textContent = n;
  if (n > 0) {
    cartBadge.classList.add("visible");
  } else {
    cartBadge.classList.remove("visible");
  }
  cartCountLabel.textContent = `${n} ${n === 1 ? "item" : "itens"}`;
}

function renderizarCarrinho() {
  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9"  cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span>Seu carrinho esta vazio.</span>
      </div>`;
    cartFooter.innerHTML = "";
    return;
  }

  cartBody.innerHTML = cart.map(({ produto: p, qty }) => `
    <div class="cart-item" id="cart-item-${p.id}">
      <div class="cart-item-icon">${iconeCategoriaMini(p.categoria)}</div>
      <div class="cart-item-info">
        <div class="cart-item-name" title="${p.nome}">${p.nome}</div>
        <div class="cart-item-cat">${p.categoria}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="alterarQty(${p.id}, -1)">−</button>
          <span class="qty-value">${qty}</span>
          <button class="qty-btn" onclick="alterarQty(${p.id}, +1)">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-price">
          R$ ${(p.preco * qty).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </span>
        <button class="cart-item-remove" onclick="removerDoCarrinho(${p.id})">Remover</button>
      </div>
    </div>
  `).join("");

  const n     = totalItens();
  const total = totalCarrinho();

  cartFooter.innerHTML = `
    <div class="cart-summary-row">
      <span>Subtotal (${n} ${n === 1 ? "item" : "itens"})</span>
      <span>R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
    </div>
    <div class="cart-summary-row">
      <span>Frete</span>
      <span style="color:var(--green)">Gratis</span>
    </div>
    <div class="cart-total-row">
      <span class="cart-total-label">Total</span>
      <span class="cart-total-value">R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
    </div>
    <button class="btn-checkout" onclick="finalizarCompra()">Finalizar compra</button>
  `;
}

function finalizarCompra() {
  if (cart.length === 0) return;
  const total = totalCarrinho();
  
  cart = [];
  atualizarBadge();
  
  setTimeout(() => {
    renderizarCarrinho();
    fecharCarrinho();
    mostrarToast(`Compra de R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} finalizada. Obrigado!`, "ok");
  }, 50);
}

/* ========================
   HERO STATS
   ======================== */
function atualizarHeroStats() {
  heroCount.textContent = allProdutos.length;
  heroCats.textContent  = new Set(allProdutos.map(p => p.categoria)).size;
}

/* ========================
   TOAST
   ======================== */
function mostrarToast(msg, tipo = "ok") {
  const svgOk = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="20 6 9 17 4 12"/></svg>`;
  const svgErr = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  toast.innerHTML = (tipo === "ok" ? svgOk : svgErr) + msg;
  toast.style.color       = tipo === "ok" ? "var(--text-300)" : "var(--red)";
  toast.style.borderColor = tipo === "ok" ? "var(--border)" : "var(--red)";

  if (toastTimer) clearTimeout(toastTimer);
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

let toastTimer = null;
