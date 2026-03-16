/* ============================================
   Grand Prix Motors  Main Script
   ============================================ */

// ===== BFCACHE RECOVERY (must be top-level, outside DOMContentLoaded) =====
// When browser restores a page from bfcache (back/forward), DOMContentLoaded does NOT
// fire again. The page is frozen with page-exiting (opacity:0) and pt-enter on overlay.
// This handler runs immediately on restore and makes the page visible again.
window.addEventListener('pageshow', function(e) {
    if (e.persisted || document.body.classList.contains('page-exiting')) {
        document.body.classList.remove('page-exiting');
        document.documentElement.classList.remove('pt-arriving');
        sessionStorage.removeItem('pt-navigating');
        var overlay = document.getElementById('pageTransition');
        if (overlay) {
            overlay.classList.remove('pt-enter', 'pt-exit');
            var layers = overlay.querySelectorAll('.pt-bg, .pt-fg, .pt-icon');
            for (var i = 0; i < layers.length; i++) layers[i].style.willChange = '';
        }
    }
});

// F1 Car Database for Search
const f1Database = [
    { name: "Ferrari SF-23", team: "Scuderia Ferrari", year: 2023, price: "$8,500,000", emoji: "\uD83C\uDFCE\uFE0F", page: "products.html", type: "modern" },
    { name: "Red Bull RB19", team: "Red Bull Racing", year: 2023, price: "$12,000,000", emoji: "\uD83C\uDFCE\uFE0F", page: "products.html", type: "modern" },
    { name: "Mercedes W11", team: "Mercedes-AMG Petronas", year: 2020, price: "$15,000,000", emoji: "\uD83C\uDFCE\uFE0F", page: "products.html", type: "modern" },
    { name: "McLaren MCL60", team: "McLaren F1 Team", year: 2023, price: "$6,800,000", emoji: "\uD83C\uDFCE\uFE0F", page: "products.html", type: "modern" },
    { name: "Alpine A523", team: "BWT Alpine F1 Team", year: 2023, price: "$5,200,000", emoji: "\uD83C\uDFCE\uFE0F", page: "products.html", type: "modern" },
    { name: "Aston Martin AMR23", team: "Aston Martin F1 Team", year: 2023, price: "$7,100,000", emoji: "\uD83C\uDFCE\uFE0F", page: "products.html", type: "modern" },
    { name: "Ferrari F2004", team: "Scuderia Ferrari", year: 2004, price: "$25,000,000", emoji: "\uD83C\uDFC6", page: "products.html", type: "classic" },
    { name: "McLaren MP4/4", team: "McLaren Honda", year: 1988, price: "$30,000,000", emoji: "\uD83C\uDFC6", page: "products.html", type: "classic" },
    { name: "Lotus 79", team: "Team Lotus", year: 1978, price: "$18,000,000", emoji: "\uD83C\uDFC6", page: "products.html", type: "classic" },
    { name: "Williams FW14B", team: "Williams Renault", year: 1992, price: "$20,000,000", emoji: "\uD83C\uDFC6", page: "products.html", type: "classic" },
    { name: "Pit Stop Strategy", team: "Racing Tactics", year: 2024, price: "", emoji: "\u23F1\uFE0F", page: "strategy.html", type: "strategy" },
    { name: "Tire Compounds", team: "Pirelli", year: 2024, price: "", emoji: "\uD83D\uDFE1", page: "strategy.html", type: "strategy" },
    { name: "Aerodynamics", team: "Technical", year: 2024, price: "", emoji: "\uD83D\uDCA8", page: "strategy.html", type: "strategy" },
    { name: "Company History", team: "Grand Prix Motors", year: 2024, price: "", emoji: "\uD83C\uDFDB\uFE0F", page: "charter.html", type: "info" },
    { name: "Our Team", team: "Grand Prix Motors", year: 2024, price: "", emoji: "\uD83D\uDC65", page: "charter.html", type: "info" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Embed mode: hide chrome when loaded in iframe
    if (window !== window.top) {
        document.documentElement.classList.add('embedded');
        return; // Skip initializing nav, search, etc. in embedded mode
    }
    // MUST run first — clears the pt-arriving overlay before anything else can fail
    playPageEnterAnimation();
    initSearch();
    initScrollHandlers();
    initNavToggle();
    initAnimateOnScroll();
    initPageTransitions();
    initCatalogSort();
    loadCarPhotos();
    initAIChat();
});

// ===== UNIFIED SCROLL HANDLER (single rAF-throttled listener) =====
function initScrollHandlers() {
    const bar = document.getElementById('scrollProgress');
    const btn = document.getElementById('backToTop');
    const nav = document.getElementById('topnav');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            // Scroll progress
            if (bar) {
                const docH = document.documentElement.scrollHeight - window.innerHeight;
                bar.style.width = docH > 0 ? (scrollY / docH * 100) + '%' : '0%';
            }
            // Back to top
            if (btn) {
                const show = scrollY > 400;
                if (btn.classList.contains('visible') !== show) {
                    btn.classList.toggle('visible', show);
                }
            }
            // Nav scroll effect
            if (nav) {
                const scrolled = scrollY > 50;
                if (nav.classList.contains('scrolled') !== scrolled) {
                    nav.classList.toggle('scrolled', scrolled);
                }
            }
            ticking = false;
        });
    }, { passive: true });

    // Back to top click
    if (btn) {
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ===== SEARCH (debounced) =====
function initSearch() {
    const input = document.getElementById('searchInput');
    const resultsBox = document.getElementById('searchResults');
    if (!input || !resultsBox) return;

    let debounceTimer = null;

    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = input.value.trim().toLowerCase();
            if (query.length < 2) {
                resultsBox.classList.remove('active');
                resultsBox.innerHTML = '';
                return;
            }
            const matches = f1Database.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.team.toLowerCase().includes(query) ||
                String(item.year).includes(query)
            );
            if (matches.length === 0) {
                resultsBox.innerHTML = '<div class="search-no-results">Nothing found. Try another query.</div>';
                resultsBox.classList.add('active');
                return;
            }
            resultsBox.innerHTML = matches.map(item => {
                const meta = [item.team, item.year, item.price].filter(Boolean).join(' \u2022 ');
                return '<div class="search-result-item" data-page="' + item.page + '">' +
                    '<span class="result-emoji">' + item.emoji + '</span>' +
                    '<div class="result-info">' +
                    '<div class="result-name">' + item.name + '</div>' +
                    '<div class="result-meta">' + meta + '</div>' +
                    '</div></div>';
            }).join('');
            resultsBox.classList.add('active');

            resultsBox.querySelectorAll('.search-result-item').forEach(el => {
                el.addEventListener('click', () => {
                    const page = el.getAttribute('data-page');
                    if (page) navigateWithTransition(page);
                });
            });
        }, 150);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            resultsBox.classList.remove('active');
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            resultsBox.classList.remove('active');
            input.blur();
        }
    });
}

// ===== LOAD CAR PHOTOS FROM WIKIPEDIA (4K, lazy) =====
function loadCarPhotos() {
    const carImages = document.querySelectorAll('img.car-photo[data-wiki]');
    if (!carImages.length) return;

    // Set decoding=async on every car image so decode doesn't block main thread
    carImages.forEach(img => { img.decoding = 'async'; });

    // Helper: fetch & apply a 4K photo for one <img>
    function fetchAndApply(imgEl) {
        const article = imgEl.getAttribute('data-wiki');
        if (!article) return;

        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(article)}`)
            .then(res => res.json())
            .then(data => {
                /* Prefer original image (full res / 4K), fallback to 3840px thumbnail */
                let src4k = null;
                if (data.originalimage && data.originalimage.source) {
                    src4k = data.originalimage.source;
                } else if (data.thumbnail && data.thumbnail.source) {
                    src4k = data.thumbnail.source.replace(/\/\d+px-/, '/3840px-');
                }
                if (!src4k) return;

                const preload = new Image();
                preload.crossOrigin = 'anonymous';
                preload.decoding = 'async';
                preload.onload = () => {
                    imgEl.src = src4k;
                    imgEl.onload = () => imgEl.classList.add('loaded');
                };
                preload.onerror = () => {
                    /* Fallback: 3840px thumbnail resize */
                    if (data.thumbnail && data.thumbnail.source) {
                        const fallback = data.thumbnail.source.replace(/\/\d+px-/, '/3840px-');
                        if (fallback !== src4k) {
                            imgEl.src = fallback;
                            imgEl.onload = () => imgEl.classList.add('loaded');
                            imgEl.onerror = () => { imgEl.style.display = 'none'; };
                        } else {
                            imgEl.src = data.thumbnail.source;
                            imgEl.onload = () => imgEl.classList.add('loaded');
                            imgEl.onerror = () => { imgEl.style.display = 'none'; };
                        }
                    } else {
                        imgEl.style.display = 'none';
                    }
                };
                preload.src = src4k;
            })
            .catch(() => { imgEl.style.display = 'none'; });
    }

    // Lazy-load: only fetch when image is near viewport (saves bandwidth & CPU)
    if ('IntersectionObserver' in window) {
        const lazyObs = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fetchAndApply(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px 0px' });
        carImages.forEach(img => lazyObs.observe(img));
    } else {
        // Fallback: load all immediately
        carImages.forEach(img => fetchAndApply(img));
    }
}

// ===== NAV TOGGLE (mobile) =====
function initNavToggle() {
    const toggle = document.getElementById('topnavToggle');
    const links = document.getElementById('topnavLinks');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });
}

// ===== ANIMATE ON SCROLL =====
function initAnimateOnScroll() {
    const elements = document.querySelectorAll('.card, .stat-card, .f1-car-card, .timeline-item, .partner-card, .relationship-card');
    if (!elements.length) return;
    elements.forEach(el => el.classList.add('animate-on-scroll'));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => observer.observe(el));
}

// ===== PAGE TRANSITIONS =====
function initPageTransitions() {
    // Pre-build transition DOM on page load (not on click) for zero jank
    buildTransitionDOM();

    // (bfcache recovery is handled by the top-level pageshow listener)

    // Intercept all internal links
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateWithTransition(href);
            });
        }
    });
}

// Clean up any stuck transition state (bfcache restore, back navigation, JS errors)
function resetTransitionState() {
    document.body.classList.remove('page-exiting');
    document.documentElement.classList.remove('pt-arriving');
    const overlay = document.getElementById('pageTransition');
    if (overlay) {
        overlay.classList.remove('pt-enter', 'pt-exit');
        overlay.querySelectorAll('.pt-bg, .pt-fg, .pt-icon').forEach(l => {
            l.style.willChange = '';
        });
    }
}

function buildTransitionDOM() {
    // DOM is now pre-built in HTML — nothing to do
}

function playPageEnterAnimation() {
    const overlay = document.getElementById('pageTransition');
    if (!overlay) return;

    if (sessionStorage.getItem('pt-navigating')) {
        sessionStorage.removeItem('pt-navigating');

        // Promote layers to GPU for the duration of the animation
        const layers = overlay.querySelectorAll('.pt-bg, .pt-fg, .pt-icon');
        layers.forEach(l => { l.style.willChange = 'transform, opacity'; });

        // pt-arriving is on <html> — overlay covers screen.
        // Add pt-exit directly — CSS specificity is set so pt-exit beats pt-arriving.
        overlay.classList.add('pt-exit');

        // Clean up after the longest animation (bg: 0.28s + 0.04s delay = 0.32s)
        const cleanup = () => {
            overlay.classList.remove('pt-exit');
            document.documentElement.classList.remove('pt-arriving');
            // Release GPU layers after animation
            layers.forEach(l => { l.style.willChange = ''; });
            overlay.removeEventListener('animationend', cleanup);
        };
        overlay.addEventListener('animationend', cleanup);

        // Safety fallback
        setTimeout(cleanup, 500);
    }
}

function navigateWithTransition(url) {
    const overlay = document.getElementById('pageTransition');
    if (!overlay) { window.location.href = url; return; }

    // Prevent double-clicks
    if (document.body.classList.contains('page-exiting')) return;

    // Mark that we're navigating (so next page plays the reveal)
    sessionStorage.setItem('pt-navigating', '1');

    // Promote layers to GPU for smooth entrance animation
    const layers = overlay.querySelectorAll('.pt-bg, .pt-fg, .pt-icon');
    layers.forEach(l => { l.style.willChange = 'transform, opacity'; });

    // Fade out body (single opacity — no per-child transitions)
    document.body.classList.add('page-exiting');

    // Animate layers covering the screen
    overlay.classList.add('pt-enter');

    // Navigate once layers have fully covered the viewport
    setTimeout(() => { window.location.href = url; }, 350);
}

// ===== CATALOG SORT & FILTER =====
function initCatalogSort() {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.f1-car-card'));
    const originalOrder = cards.map(c => c);
    let currentFilter = 'all';

    // Sort buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const sortType = btn.getAttribute('data-sort');
            sortCards(sortType);
        });
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            applyFilter();
        });
    });

    function sortCards(sortType) {
        let sorted;
        if (sortType === 'default') {
            sorted = [...originalOrder];
        } else if (sortType === 'year-asc') {
            sorted = [...cards].sort((a, b) => getYear(a) - getYear(b));
        } else if (sortType === 'year-desc') {
            sorted = [...cards].sort((a, b) => getYear(b) - getYear(a));
        } else if (sortType === 'price-asc') {
            sorted = [...cards].sort((a, b) => getPrice(a) - getPrice(b));
        } else if (sortType === 'price-desc') {
            sorted = [...cards].sort((a, b) => getPrice(b) - getPrice(a));
        }
        sorted.forEach((card, i) => {
            card.style.order = i;
        });
        sorted.forEach(card => grid.appendChild(card));
        applyFilter();
    }

    function applyFilter() {
        cards.forEach(card => {
            const type = card.getAttribute('data-type');
            if (currentFilter === 'all' || type === currentFilter) {
                card.classList.remove('hidden-card');
            } else {
                card.classList.add('hidden-card');
            }
        });
    }

    function getYear(card) { return parseInt(card.getAttribute('data-year')) || 0; }
    function getPrice(card) { return parseInt(card.getAttribute('data-price')) || 0; }

    // Animate bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.bar-fill').forEach(bar => {
                    const w = bar.style.width;
                    bar.style.width = '0%';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => { bar.style.width = w; });
                    });
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    cards.forEach(card => observer.observe(card));
}

// ===== TAVILY AI CHAT WIDGET =====
function initAIChat() {
    // Site context — injected into every query so Tavily knows about our site
    const siteContext = 'Grand Prix Motors is an exclusive Formula 1 car dealership website. ' +
        'Cars for sale: Ferrari SF-23 ($8.5M), Red Bull RB19 ($12M), Mercedes W11 ($15M), McLaren MCL60 ($6.8M), Alpine A523 ($5.2M), Aston Martin AMR23 ($7.1M). ' +
        'Classic cars: Ferrari F2004 ($25M), McLaren MP4/4 ($30M), Lotus 79 ($18M), Williams FW14B ($20M). ' +
        'Services: FIA-verified authentic cars, full service center with F1 engineers, worldwide delivery in climate-controlled containers to 30+ countries, complete provenance history, investment consulting (15-25% yearly growth), exclusive track days. ' +
        'Stats: 50+ cars in stock, 200+ sold, 10 partner F1 teams, 55 years on market, 98% satisfied clients. ' +
        'Site sections: Home, Catalog (products.html), About (charter.html), Strategies — pit stops/tires/aero (strategy.html), WBS, Gantt chart, Observer pattern demo, Decorator pattern demo.';

    const siteKeywords = [
        'сайт', 'grand prix', 'motors', 'каталог', 'catalog', 'машин', 'car', 'болид',
        'цен', 'price', 'cost', 'стоим', 'доставк', 'delivery', 'shipping', 'сервис',
        'service', 'трек', 'track', 'инвестиц', 'invest', 'команд', 'team', 'ferrari',
        'red bull', 'mercedes', 'mclaren', 'alpine', 'aston martin', 'f1', 'формул',
        'formula', 'wbs', 'gantt', 'гант', 'observer', 'decorator', 'стратег', 'strategy',
        'о вас', 'about', 'что это', 'что здесь', 'что продаёте', 'ассортимент',
        'помощь', 'help', 'что умеешь', 'привет', 'hello', 'контакт', 'contact',
        'истори', 'history', 'пит-стоп', 'шин', 'tire', 'аэродинамик'
    ];

    function isAboutSite(query) {
        const q = query.toLowerCase();
        return siteKeywords.some(kw => q.includes(kw));
    }

    // Fallback: build answer from site data when Tavily can't help
    function generateLocalAnswer(query) {
        const q = query.toLowerCase();
        const parts = [];

        if (/привет|hello|hi|здравствуй|салам|hey/.test(q)) {
            return 'Привет! Я AI-ассистент Grand Prix Motors. Задайте вопрос о нашем сайте или любую другую тему!';
        }

        if (/цен|price|стоим|cost|сколько/.test(q)) {
            parts.push('Наши цены на болиды F1:');
            f1Database.filter(c => c.price).forEach(c => {
                parts.push('• ' + c.name + ' (' + c.year + ') — ' + c.price);
            });
        } else if (/каталог|catalog|машин|car|модел|ассортимент/.test(q)) {
            parts.push('В каталоге Grand Prix Motors:');
            f1Database.filter(c => c.type === 'modern' || c.type === 'classic').forEach(c => {
                parts.push('• ' + c.emoji + ' ' + c.name + ' — ' + c.team + (c.price ? ', ' + c.price : ''));
            });
        } else if (/доставк|delivery|shipping/.test(q)) {
            parts.push('Grand Prix Motors осуществляет доставку в 30+ стран мира в закрытых климат-контролируемых контейнерах.');
        } else if (/серви|service|обслужи|ремонт/.test(q)) {
            parts.push('Наш сервисный центр укомплектован инженерами из команд F1. Обслуживание, реставрация, подготовка к трек-дням.');
        } else if (/стратег|strategy|пит|pit/.test(q)) {
            parts.push('Раздел "Strategies" — стратегии пит-стопов, управление шинами и аэродинамический анализ.');
        } else {
            parts.push('Grand Prix Motors — эксклюзивный дилер болидов Формулы 1.');
            parts.push('50+ машин в наличии, 10 команд-партнёров, 55 лет на рынке, доставка в 30+ стран.');
            parts.push('Разделы сайта: Catalog, About, Strategies, WBS, Gantt, Observer, Decorator.');
        }

        return parts.join('\n');
    }

    // Build DOM
    const fab = document.createElement('button');
    fab.className = 'ai-chat-fab';
    fab.setAttribute('aria-label', 'AI Assistant');
    fab.innerHTML =
        '<svg class="icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
        '<svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    const panel = document.createElement('div');
    panel.className = 'ai-chat-panel';
    panel.innerHTML =
        '<div class="ai-chat-header">' +
            '<div class="ai-chat-header-dot"></div>' +
            '<h4>AI Assistant</h4>' +
            '<span>Powered by Tavily</span>' +
        '</div>' +
        '<div class="ai-chat-messages" id="aiChatMessages">' +
            '<div class="ai-msg bot">Привет!  Я AI-ассистент Grand Prix Motors. Спросите меня о сайте, каталоге, ценах — или задайте любой вопрос, и я найду ответ в интернете!</div>' +
        '</div>' +
        '<div class="ai-chat-input-row" id="aiInputRow">' +
            '<input type="text" id="aiChatInput" placeholder="Ask a question..." autocomplete="off">' +
            '<button class="ai-chat-send-btn" id="aiSendBtn" aria-label="Send">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
            '</button>' +
        '</div>' +
        '<div class="ai-chat-key-row" id="aiKeyRow">' +
            '<label>Enter your Tavily API key to start:</label>' +
            '<div class="key-input-group">' +
                '<input type="password" id="aiKeyInput" placeholder="tvly-...">' +
                '<button id="aiKeySave">Save</button>' +
            '</div>' +
        '</div>';

    document.body.appendChild(panel);
    document.body.appendChild(fab);

    const messages = panel.querySelector('#aiChatMessages');
    const inputRow = panel.querySelector('#aiInputRow');
    const keyRow = panel.querySelector('#aiKeyRow');
    const chatInput = panel.querySelector('#aiChatInput');
    const sendBtn = panel.querySelector('#aiSendBtn');
    const keyInput = panel.querySelector('#aiKeyInput');
    const keySave = panel.querySelector('#aiKeySave');

    let apiKey = localStorage.getItem('tavily_api_key') || '';

    function updateKeyUI() {
        if (apiKey) {
            keyRow.style.display = 'none';
            inputRow.style.display = 'flex';
        } else {
            keyRow.style.display = 'flex';
            inputRow.style.display = 'none';
        }
    }
    updateKeyUI();

    // Toggle panel
    fab.addEventListener('click', () => {
        const open = panel.classList.toggle('visible');
        fab.classList.toggle('open', open);
        if (open && apiKey) chatInput.focus();
    });

    // Save API key
    keySave.addEventListener('click', () => {
        const val = keyInput.value.trim();
        if (!val) return;
        apiKey = val;
        localStorage.setItem('tavily_api_key', apiKey);
        updateKeyUI();
        chatInput.focus();
    });
    keyInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') keySave.click();
    });

    // Send message
    function sendMessage() {
        const query = chatInput.value.trim();
        if (!query || !apiKey) return;
        chatInput.value = '';
        appendMsg(query, 'user');
        fetchTavily(query);
    }
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function appendMsg(text, type) {
        const div = document.createElement('div');
        div.className = 'ai-msg ' + type;
        div.textContent = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
        return div;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'ai-typing';
        div.innerHTML = '<span></span><span></span><span></span>';
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
        return div;
    }

    async function fetchTavily(query) {
        sendBtn.disabled = true;
        chatInput.disabled = true;
        const typing = showTyping();

        // Build the search query — add brief site hint for site-related questions
        const searchQuery = isAboutSite(query)
            ? 'Grand Prix Motors F1 car dealership: ' + query
            : query;

        try {
            const res = await fetch('https://api.tavily.com/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    api_key: apiKey,
                    query: searchQuery,
                    search_depth: 'basic',
                    include_answer: true,
                    max_results: 5
                })
            });

            typing.remove();

            if (!res.ok) {
                let errText = 'Error ' + res.status;
                try {
                    const errData = await res.json();
                    if (typeof errData.detail === 'string') {
                        errText = errData.detail;
                    } else if (errData.detail) {
                        errText = JSON.stringify(errData.detail);
                    } else if (errData.message) {
                        errText = errData.message;
                    } else if (errData.error) {
                        errText = errData.error;
                    }
                } catch (_) {}

                if (res.status === 401 || res.status === 403) {
                    appendMsg('Неверный API ключ. Проверьте ваш Tavily ключ.', 'bot');
                    apiKey = '';
                    localStorage.removeItem('tavily_api_key');
                    updateKeyUI();
                } else {
                    appendMsg('Ошибка: ' + errText, 'bot');
                }
                return;
            }

            const data = await res.json();
            let answer = data.answer || '';

            // For site-related questions with no good Tavily answer, use local context
            if (isAboutSite(query) && (!answer || answer.length < 20)) {
                answer = generateLocalAnswer(query);
            }

            if (!answer) answer = 'К сожалению, не удалось найти ответ. Попробуйте переформулировать вопрос.';

            const msgDiv = document.createElement('div');
            msgDiv.className = 'ai-msg bot';
            msgDiv.style.whiteSpace = 'pre-line';
            msgDiv.textContent = answer;

            // Sources
            if (data.results && data.results.length > 0) {
                const srcDiv = document.createElement('div');
                srcDiv.className = 'ai-sources';
                srcDiv.innerHTML = '<strong>Sources:</strong>';
                data.results.slice(0, 3).forEach(r => {
                    const a = document.createElement('a');
                    a.href = r.url;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.textContent = r.title || r.url;
                    srcDiv.appendChild(a);
                });
                msgDiv.appendChild(srcDiv);
            }

            messages.appendChild(msgDiv);
            messages.scrollTop = messages.scrollHeight;
        } catch (err) {
            typing.remove();
            // If it's a site question, answer from local data even on network error
            if (isAboutSite(query)) {
                const fallback = generateLocalAnswer(query);
                const msgDiv = document.createElement('div');
                msgDiv.className = 'ai-msg bot';
                msgDiv.style.whiteSpace = 'pre-line';
                msgDiv.textContent = fallback;
                messages.appendChild(msgDiv);
                messages.scrollTop = messages.scrollHeight;
            } else {
                appendMsg('Ошибка соединения. Попробуйте ещё раз.', 'bot');
            }
        } finally {
            sendBtn.disabled = false;
            chatInput.disabled = false;
            chatInput.focus();
        }
    }
}
