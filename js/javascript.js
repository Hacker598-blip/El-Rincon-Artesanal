(function() {
    // ─────────────────────────────────────
    // PLANTILLAS ESTÁTICAS (sin fetch)
    // ─────────────────────────────────────
    const headerHTML = `
<header class="header" id="header">
    <div class="container">
        <a href="index.html" class="header__logo" aria-label="El Rincón Artesanal - Inicio">
            <img src="icons/icon.png" alt="Logo" class="header__logo-img">
            El Rincón Artesanal
        </a>
        <nav class="nav" aria-label="Navegación principal">
            <a href="index.html" class="nav__link">Inicio</a>
            <a href="productos.html" class="nav__link">Piezas</a>
            <a href="nosotros.html" class="nav__link">Nosotros</a>
            <a href="contacto.html" class="nav__link">Contacto</a>
        </nav>
        <div class="header__actions">
            <button class="btn-icon" id="themeToggle" aria-label="Cambiar modo claro/oscuro" title="Cambiar tema">
                <span class="theme-icon-dark">☾</span>
                <span class="theme-icon-light" style="display:none;">☀</span>
            </button>
            <button class="btn-icon btn-icon--cart" id="cartToggle" aria-label="Abrir carrito">
                🧺
                <span class="cart-badge" id="cartBadge">0</span>
            </button>
            <button class="hamburger" id="hamburger" aria-label="Abrir menú" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
        </div>
    </div>
</header>`;

    const footerHTML = `
<footer class="footer">
    <div class="container">
        <div class="footer__links">
            <a href="index.html">Inicio</a>
            <a href="productos.html">Piezas</a>
            <a href="nosotros.html">Nosotros</a>
            <a href="contacto.html">Contacto</a>
        </div>
        <div class="footer__links" style="font-size:0.8rem; gap:1.5rem;">
            <a href="terminos.html">Términos</a>
            <a href="privacidad.html">Privacidad</a>
            <a href="licencia.html">Licencia de Reventa</a>
        </div>
        <p style="margin-top:0.8rem;">&copy; 2026 El Rincón Artesanal. Hecho con tierra, fuego y ❤️.</p>
        <p class="footer__credits">
            <span>Desarrollador: Jesús Emanuel Rodríguez Vázquez</span><br>
            <span>Artesano creador: Luis Manuel Rodríguez Peña</span>
        </p>
    </div>
</footer>`;

    // ─────────────────────────────────────
    // DATOS DE PRODUCTOS
    // ─────────────────────────────────────
    const products = [
        { id: 1, name: 'Jarrón Tradicional', desc: 'Jarrón alto de barro cocido, ideal para flores secas o como pieza central.', price: 45, badge: 'Bestseller', svg: 'vase-tall' },
        { id: 2, name: 'Cuenco Artesanal', desc: 'Cuenco hondo con esmalte natural, perfecto para servir o decorar.', price: 28, badge: '', svg: 'bowl' },
        { id: 3, name: 'Plato Decorativo', desc: 'Plato llano con borde irregular, esmaltado a mano en tonos tierra.', price: 35, badge: 'Nuevo', svg: 'plate' },
        { id: 4, name: 'Maceta de Terracota', desc: 'Maceta rústica con drenaje, ideal para suculentas y plantas pequeñas.', price: 32, badge: '', svg: 'pot' },
        { id: 5, name: 'Taza Rústica', desc: 'Taza de barro con asa trenzada, cada sorbo sabe a tradición.', price: 18, badge: '', svg: 'mug' },
        { id: 6, name: 'Cántaro Clásico', desc: 'Cántaro tradicional de dos asas, pieza emblemática de la alfarería.', price: 55, badge: 'Exclusivo', svg: 'pitcher' },
        { id: 7, name: 'Set de Cuencos', desc: 'Conjunto de 3 cuencos pequeños, coordinados en tonalidades cálidas.', price: 48, badge: 'Set', svg: 'bowl-set' },
        { id: 8, name: 'Figura de Barro', desc: 'Pequeña escultura abstracta moldeada a mano, pieza de colección.', price: 22, badge: '', svg: 'figure' }
    ];

    // ─────────────────────────────────────
    // GENERADOR DE SVG DE PRODUCTOS
    // ─────────────────────────────────────
    function getProductSVG(svgType) {
        const color = 'currentColor';
        const svgs = {
            'vase-tall': `<svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="60" cy="130" rx="38" ry="14" fill="${color}" opacity="0.12"/><path d="M42 35 C42 20 52 10 60 10 C68 10 78 20 78 35 L74 125 C74 132 65 138 60 138 C55 138 46 132 46 125 Z" stroke="${color}" stroke-width="2.8" fill="none" opacity="0.65"/><ellipse cx="60" cy="28" rx="22" ry="8" stroke="${color}" stroke-width="2.2" fill="none" opacity="0.5"/><ellipse cx="60" cy="88" rx="16" ry="5" stroke="${color}" stroke-width="1.2" fill="none" opacity="0.25"/></svg>`,
            'bowl': `<svg viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="70" cy="90" rx="50" ry="18" fill="${color}" opacity="0.12"/><path d="M20 45 C20 25 35 12 70 12 C105 12 120 25 120 45 L115 85 C115 98 95 105 70 105 C45 105 25 98 25 85 Z" stroke="${color}" stroke-width="2.8" fill="none" opacity="0.65"/><ellipse cx="70" cy="38" rx="40" ry="14" stroke="${color}" stroke-width="2.2" fill="none" opacity="0.5"/></svg>`,
            'plate': `<svg viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="75" cy="65" rx="60" ry="22" fill="${color}" opacity="0.12"/><ellipse cx="75" cy="55" rx="60" ry="22" stroke="${color}" stroke-width="2.5" fill="none" opacity="0.6"/><ellipse cx="75" cy="55" rx="32" ry="11" stroke="${color}" stroke-width="1.8" fill="none" opacity="0.4"/><ellipse cx="75" cy="55" rx="12" ry="4" fill="${color}" opacity="0.2"/></svg>`,
            'pot': `<svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="60" cy="115" rx="40" ry="14" fill="${color}" opacity="0.12"/><path d="M35 50 L30 110 C30 120 42 126 60 126 C78 126 90 120 90 110 L85 50 Z" stroke="${color}" stroke-width="2.6" fill="none" opacity="0.6"/><rect x="48" y="28" width="24" height="22" rx="3" stroke="${color}" stroke-width="2.4" fill="none" opacity="0.55"/><line x1="48" y1="38" x2="35" y2="38" stroke="${color}" stroke-width="1.5" opacity="0.3"/><line x1="72" y1="38" x2="85" y2="38" stroke="${color}" stroke-width="1.5" opacity="0.3"/></svg>`,
            'mug': `<svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="60" cy="108" rx="32" ry="12" fill="${color}" opacity="0.12"/><path d="M40 30 L37 100 C37 110 48 116 60 116 C72 116 83 110 83 100 L80 30 Z" stroke="${color}" stroke-width="2.6" fill="none" opacity="0.6"/><path d="M80 40 C92 40 98 48 98 58 C98 68 92 74 80 74" stroke="${color}" stroke-width="2.4" fill="none" opacity="0.5"/><ellipse cx="60" cy="30" rx="20" ry="7" stroke="${color}" stroke-width="2" fill="none" opacity="0.45"/></svg>`,
            'pitcher': `<svg viewBox="0 0 130 155" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="60" cy="130" rx="38" ry="14" fill="${color}" opacity="0.12"/><path d="M35 50 C30 40 28 35 40 30 L42 22 C44 15 52 14 55 20 L60 35 C80 38 95 55 95 75 L90 120 C90 130 78 138 60 138 C42 138 30 130 30 120 Z" stroke="${color}" stroke-width="2.6" fill="none" opacity="0.6"/><path d="M60 35 L95 50" stroke="${color}" stroke-width="2" fill="none" opacity="0.4"/></svg>`,
            'bowl-set': `<svg viewBox="0 0 150 110" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="55" cy="85" rx="28" ry="12" fill="${color}" opacity="0.1"/><ellipse cx="95" cy="88" rx="24" ry="10" fill="${color}" opacity="0.1"/><ellipse cx="75" cy="80" rx="32" ry="13" fill="${color}" opacity="0.1"/><path d="M30 55 C30 38 38 30 55 30 C72 30 80 38 80 55 L78 78 C78 86 68 90 55 90 C42 90 32 86 32 78 Z" stroke="${color}" stroke-width="2.2" fill="none" opacity="0.55"/><path d="M55 60 C55 48 62 42 75 42 C88 42 96 48 96 60 L94 80 C94 86 86 89 75 89 C64 89 56 86 56 80 Z" stroke="${color}" stroke-width="2" fill="none" opacity="0.45"/><path d="M68 68 C68 58 73 53 82 53 C91 53 97 58 97 68 L96 82 C96 86 90 88 82 88 C74 88 68 86 68 82 Z" stroke="${color}" stroke-width="1.8" fill="none" opacity="0.38"/></svg>`,
            'figure': `<svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="118" rx="28" ry="12" fill="${color}" opacity="0.1"/><path d="M50 15 C35 25 22 48 20 75 C18 100 30 120 50 120 C70 120 82 100 80 75 C78 48 65 25 50 15 Z" stroke="${color}" stroke-width="2.5" fill="none" opacity="0.6"/><path d="M50 35 C42 42 36 58 35 75 C34 90 40 105 50 108" stroke="${color}" stroke-width="1.2" fill="none" opacity="0.3"/></svg>`
        };
        return svgs[svgType] || svgs['vase-tall'];
    }

    // ─────────────────────────────────────
    // ESTADO
    // ─────────────────────────────────────
    let cart = [];
    let theme = 'dark';
    let refs = {};

    // ─────────────────────────────────────
    // REFERENCIAS DEL DOM
    // ─────────────────────────────────────
    function getDomRefs() {
        const $ = (sel) => document.querySelector(sel);
        return {
            body: document.body,
            html: document.documentElement,
            themeToggle: $('#themeToggle'),
            themeIconDark: $('.theme-icon-dark'),
            themeIconLight: $('.theme-icon-light'),
            cartToggle: $('#cartToggle'),
            cartSidebar: $('#cartSidebar'),
            cartOverlay: $('#cartOverlay'),
            cartClose: $('#cartClose'),
            cartItems: $('#cartItems'),
            cartFooter: $('#cartFooter'),
            cartTotal: $('#cartTotal'),
            cartBadge: $('#cartBadge'),
            cartCheckout: $('#cartCheckout'),
            productsGrid: $('#productsGrid'),
            hamburger: $('#hamburger'),
            mobileNav: $('#mobileNav'),
            toastContainer: $('#toastContainer'),
            newsletterForm: $('#newsletterForm')
        };
    }

    // ─── TEMA ──────────────────────────
    function loadTheme() {
        const saved = localStorage.getItem('elrincon-theme');
        theme = saved || 'dark';
        applyTheme(theme);
    }

    function applyTheme(t) {
        theme = t;
        document.documentElement.setAttribute('data-theme', t);
        if (refs.themeIconDark) {
            refs.themeIconDark.style.display = t === 'dark' ? '' : 'none';
            refs.themeIconLight.style.display = t === 'dark' ? 'none' : '';
        }
        localStorage.setItem('elrincon-theme', t);
    }

    function toggleTheme() {
        applyTheme(theme === 'dark' ? 'light' : 'dark');
    }

    // ─── CARRITO ──────────────────────
    function loadCart() {
        try {
            const saved = localStorage.getItem('elrincon-cart');
            cart = saved ? JSON.parse(saved) : [];
        } catch (e) {
            cart = [];
        }
    }
    function saveCart() { localStorage.setItem('elrincon-cart', JSON.stringify(cart)); }

    function addToCart(productId) {
        const existing = cart.find(item => item.id === productId);
        if (existing) existing.quantity += 1;
        else {
            const product = products.find(p => p.id === productId);
            if (product) cart.push({ id: product.id, quantity: 1 });
        }
        saveCart();
        updateCartUI();
        const product = products.find(p => p.id === productId);
        if (product) showToast(`"${product.name}" añadido a la cesta`);
        if (refs.cartBadge) {
            refs.cartBadge.classList.remove('cart-badge--pulse');
            void refs.cartBadge.offsetWidth;
            refs.cartBadge.classList.add('cart-badge--pulse');
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
    }

    function updateQuantity(productId, delta) {
        const item = cart.find(item => item.id === productId);
        if (!item) return;
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart();
        updateCartUI();
    }

    function getCartCount() { return cart.reduce((sum, item) => sum + item.quantity, 0); }
    function getCartTotal() {
        return cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);
    }

    function updateCartUI() {
        if (!refs.cartBadge) return;
        const count = getCartCount();
        refs.cartBadge.textContent = count;
        refs.cartBadge.classList.toggle('cart-badge--visible', count > 0);
        renderCartItems();
    }

    function renderCartItems() {
        if (!refs.cartItems || !refs.cartFooter) return;
        if (cart.length === 0) {
            refs.cartItems.innerHTML = `<div class="cart-sidebar__empty"><span class="cart-sidebar__empty-icon">🧺</span><p>Tu cesta está vacía</p></div>`;
            refs.cartFooter.style.display = 'none';
        } else {
            refs.cartItems.innerHTML = cart.map(item => {
                const product = products.find(p => p.id === item.id);
                if (!product) return '';
                const subtotal = product.price * item.quantity;
                return `<div class="cart-item">
                    <div class="cart-item__image">${getProductSVG(product.svg)}</div>
                    <div class="cart-item__info"><div class="cart-item__name">${product.name}</div><div class="cart-item__price">€${subtotal.toFixed(2)}</div></div>
                    <div class="cart-item__quantity">
                        <button class="cart-item__qty-btn" data-action="decrease" data-id="${product.id}">−</button>
                        <span class="cart-item__qty-num">${item.quantity}</span>
                        <button class="cart-item__qty-btn" data-action="increase" data-id="${product.id}">+</button>
                    </div>
                    <button class="cart-item__remove" data-action="remove" data-id="${product.id}">✕</button>
                </div>`;
            }).join('');
            refs.cartFooter.style.display = 'flex';
            if (refs.cartTotal) refs.cartTotal.textContent = `€${getCartTotal().toFixed(2)}`;
        }

        refs.cartItems.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const action = btn.dataset.action;
                if (action === 'increase') updateQuantity(id, 1);
                if (action === 'decrease') updateQuantity(id, -1);
                if (action === 'remove') removeFromCart(id);
            });
        });
    }

    function openCart() {
        if (!refs.cartSidebar) return;
        refs.cartSidebar.classList.add('active');
        refs.cartOverlay.classList.add('active');
        refs.body.classList.add('cart-open');
        renderCartItems();
    }
    function closeCart() {
        if (!refs.cartSidebar) return;
        refs.cartSidebar.classList.remove('active');
        refs.cartOverlay.classList.remove('active');
        refs.body.classList.remove('cart-open');
    }

    // ─── TOASTS ────────────────────────
    function showToast(message) {
        if (!refs.toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        refs.toastContainer.appendChild(toast);
        setTimeout(() => { if (toast.parentNode) toast.remove(); }, 3200);
    }

    // ─── MENÚ MÓVIL ────────────────────
    function closeMobileMenu() {
        if (!refs.hamburger || !refs.mobileNav) return;
        refs.hamburger.classList.remove('active');
        refs.mobileNav.classList.remove('active');
        refs.hamburger.setAttribute('aria-expanded', 'false');
    }
    function openMobileMenu() {
        if (!refs.hamburger || !refs.mobileNav) return;
        closeCart();
        refs.hamburger.classList.add('active');
        refs.mobileNav.classList.add('active');
        refs.hamburger.setAttribute('aria-expanded', 'true');
    }

    // ─── SCROLL REVEAL ─────────────────
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = parseFloat(el.dataset.delay) || 0;
                    setTimeout(() => el.classList.add('revealed'), delay * 1000);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    }

    // ─── RENDERIZADO DE PRODUCTOS ──────
    function productCardHTML(product, index) {
        return `<article class="product-card" data-reveal data-delay="${index * 0.08}">
            <div class="product-card__image">
                ${getProductSVG(product.svg)}
                ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-card__body">
                <h3 class="product-card__name">${product.name}</h3>
                <p class="product-card__desc">${product.desc}</p>
                <div class="product-card__footer">
                    <span class="product-card__price">€${product.price.toFixed(2)}</span>
                    <button class="product-card__add" data-add="${product.id}">Añadir</button>
                </div>
            </div>
        </article>`;
    }

    function addAddToCartListeners() {
        document.querySelectorAll('[data-add]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.add);
                addToCart(id);
                btn.textContent = '✓ Añadido';
                btn.style.background = 'var(--accent)';
                btn.style.color = '#fff';
                setTimeout(() => {
                    btn.textContent = 'Añadir';
                    btn.style.background = '';
                    btn.style.color = '';
                }, 1200);
            });
        });
    }

    // ─── INICIALIZACIÓN AUTOMÁTICA ─────
    function initCurrentPage() {
        if (document.querySelector('.hero')) {
            // index.html → 4 productos
            if (refs.productsGrid) {
                refs.productsGrid.innerHTML = products.slice(0, 4).map((p, i) => productCardHTML(p, i)).join('');
                addAddToCartListeners();
                initScrollReveal();
            }
        } else if (refs.productsGrid && !document.querySelector('.hero')) {
            // productos.html → todos los productos
            refs.productsGrid.innerHTML = products.map((p, i) => productCardHTML(p, i)).join('');
            addAddToCartListeners();
            initScrollReveal();
        }
    }

    // ─── CARGA DE COMPONENTES (local) ──
    function loadComponents() {
        const headerPlaceholder = document.getElementById('header');
        const footerPlaceholder = document.getElementById('footer');
        if (headerPlaceholder) headerPlaceholder.innerHTML = headerHTML;
        if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;

        refs = getDomRefs();
        loadTheme();
        loadCart();
        updateCartUI();
        attachGlobalEvents();
        initCurrentPage();
        initScrollReveal();
        document.dispatchEvent(new Event('componentsLoaded'));
    }

    function attachGlobalEvents() {
        if (refs.themeToggle) refs.themeToggle.addEventListener('click', toggleTheme);
        if (refs.cartToggle) refs.cartToggle.addEventListener('click', openCart);
        if (refs.cartClose) refs.cartClose.addEventListener('click', closeCart);
        if (refs.cartOverlay) refs.cartOverlay.addEventListener('click', closeCart);
        if (refs.cartCheckout) {
            refs.cartCheckout.addEventListener('click', () => {
                if (cart.length === 0) return;
                showToast('✨ ¡Gracias por tu pedido! Nos pondremos en contacto pronto.');
                cart = [];
                saveCart();
                updateCartUI();
                setTimeout(closeCart, 600);
            });
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && refs.cartSidebar && refs.cartSidebar.classList.contains('active')) closeCart();
        });
        if (refs.hamburger) {
            refs.hamburger.addEventListener('click', () => {
                if (refs.hamburger.classList.contains('active')) closeMobileMenu();
                else openMobileMenu();
            });
        }
        document.querySelectorAll('.mobile-nav__link').forEach(link => link.addEventListener('click', closeMobileMenu));
        if (refs.newsletterForm) {
            refs.newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = refs.newsletterForm.querySelector('input');
                if (input && input.value.includes('@')) {
                    showToast('📬 ¡Gracias por suscribirte, ' + input.value + '!');
                    input.value = '';
                } else {
                    showToast('Por favor, introduce un correo válido.');
                }
            });
        }
    }

    // Arranque inmediato (ya no depende de fetch)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadComponents);
    } else {
        loadComponents();
    }

    console.log('%c🏺 El Rincón Artesanal %c— Listo para inspirarte.',
        'font-family: "Playfair Display", serif; font-size: 1.3rem; color: #c49a6c;',
        'font-family: "Raleway", sans-serif; font-size: 0.85rem; color: #8c857d;');
})();
