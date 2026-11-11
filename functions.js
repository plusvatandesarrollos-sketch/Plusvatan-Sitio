// --- CONSTANTE GLOBAL DE WHATSAPP ---
const WHATSAPP_NUMBER = "529996049502";

// --- HACER DINÁMICOS TODOS LOS ELEMENTOS DE WHATSAPP ---
function initDynamicWhatsApp() {
    const formattedPhone = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 5)} ${WHATSAPP_NUMBER.slice(5, 8)} ${WHATSAPP_NUMBER.slice(8)}`;
    
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
    whatsappLinks.forEach(link => {
        try {
            const urlObj = new URL(link.href);
            if (urlObj.hostname.includes('wa.me')) {
                urlObj.pathname = '/' + WHATSAPP_NUMBER;
            }
            link.href = urlObj.toString();
        } catch (e) {
            if (link.href.includes('wa.me/')) {
                const parts = link.href.split('?');
                link.href = `https://wa.me/${WHATSAPP_NUMBER}${parts[1] ? '?' + parts[1] : ''}`;
            }
        }
    });

    const phoneDisplays = document.querySelectorAll('.whatsapp-display-number');
    phoneDisplays.forEach(el => {
        el.textContent = formattedPhone;
    });
}

// --- CARGA DE LA API OFICIAL DE YOUTUBE ---
let ytScriptLoaded = false;
function loadYouTubeAPI() {
    if (ytScriptLoaded || window.YT) return;
    ytScriptLoaded = true;
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Globales para el manejo de reproductores mediante API oficial
let activeSliderPlayer = null;
let activeLotsPlayers = {};
let activeApartmentsPlayers = {};
let activeHomesPlayers = {};

// --- NAVEGACIÓN Y MENÚ MÓVIL ---
document.addEventListener('DOMContentLoaded', () => {
    loadYouTubeAPI();
    initDynamicWhatsApp();

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburgerBtn && mobileMenu && menuIcon) {
        hamburgerBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuIcon.textContent = 'close';
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.textContent = 'menu';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.textContent = 'menu';
            });
        });
    }

    if (document.getElementById('properties-grid')) {
        initCatalogView();
    }
    if (document.getElementById('detail-container')) {
        initDetailView();
    }
    if (typeof promotions !== 'undefined' && document.getElementById('promoCarouselContainer')) {
        initPromotionsWidget();
    }
    if (document.getElementById('promo-detail-container')) {
        initPromoDetailView();
    }
    initContactForm();
});

// --- LÓGICA DEL WIDGET DE PROMOCIONES (index.html) ---
let currentPromoSlideIndex = 0;
let promoTimerInterval = null;
let promoAutoSlideTimer = null;

function initPromotionsWidget() {
    renderPromotionsWidget();
    startAllPromosCountdowns();
    startAutoSlide();

    function startAutoSlide() {
        if (promoAutoSlideTimer) clearInterval(promoAutoSlideTimer);
        promoAutoSlideTimer = setInterval(() => {
            nextPromoSlide();
        }, 4500);
    }

    function resetAutoSlide() {
        startAutoSlide();
    }

    function renderPromotionsWidget() {
        const carouselTrack = document.getElementById('promoCarouselTrack');
        if (!carouselTrack) return;

        const nowTime = new Date().getTime();
        const activePromos = promotions.filter(promo => {
            const targetTime = new Date(promo.targetDate).getTime();
            return targetTime > nowTime;
        });

        if (activePromos.length === 0) {
            const parentContainer = document.getElementById('promociones');
            if (parentContainer) parentContainer.style.display = 'none';
            return;
        }

        carouselTrack.innerHTML = activePromos.map(promo => `
            <div class="w-full md:w-1/3 flex-shrink-0 px-2 box-border">
                <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between h-full shadow-lg relative">
                    <div class="flex flex-col h-full">
                        <div class="px-4 pt-3 pb-2 text-center">
                            <span class="inline-flex items-center gap-1.5 text-slate-700 text-xs font-extrabold px-3.5 py-1 bg-amber-50 border border-amber-200 rounded-full shadow-2xs">
                                <span class="material-symbols-outlined text-sm text-amber-600">calendar_month</span> ${promo.validity}
                            </span>
                        </div>
                        <a href="promocion.html?id=${promo.id}" class="w-full block focus:outline-none group cursor-pointer flex-1">
                            <div class="w-full h-96 sm:h-[420px] bg-slate-50 overflow-hidden flex justify-center transition-transform duration-300 group-hover:scale-[1.01]">
                                <img src="${promo.image}" alt="${promo.title}" class="w-full h-full object-cover">
                            </div>
                        </a>
                        <div class="animated-gradient-timer p-3 rounded-none shadow-lg text-center w-full mt-auto">
                            <span class="text-xs font-extrabold text-white uppercase tracking-widest block mb-1.5 flex items-center justify-center gap-1.5 drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]">
                                <span class="material-symbols-outlined text-base animate-pulse text-amber-300">timer</span> La promoción finaliza en:
                            </span>
                            <div class="grid grid-cols-4 gap-2 text-center promo-timer" data-target="${promo.targetDate}">
                                <div class="bg-emerald-950/80 border border-emerald-400 p-1.5 rounded-lg shadow-[0_0_12px_rgba(74,222,128,0.8)]">
                                    <span class="p-days text-xs sm:text-sm font-black text-white block">00</span>
                                    <span class="text-[7px] sm:text-[8px] font-bold text-emerald-300 uppercase">Días</span>
                                </div>
                                <div class="bg-emerald-950/80 border border-emerald-400 p-1.5 rounded-lg shadow-[0_0_12px_rgba(74,222,128,0.8)]">
                                    <span class="p-hours text-xs sm:text-sm font-black text-white block">00</span>
                                    <span class="text-[7px] sm:text-[8px] font-bold text-emerald-300 uppercase">Horas</span>
                                </div>
                                <div class="bg-emerald-950/80 border border-emerald-400 p-1.5 rounded-lg shadow-[0_0_12px_rgba(74,222,128,0.8)]">
                                    <span class="p-mins text-xs sm:text-sm font-black text-white block">00</span>
                                    <span class="text-[7px] sm:text-[8px] font-bold text-emerald-300 uppercase">Mins</span>
                                </div>
                                <div class="bg-emerald-950/80 border border-amber-300 p-1.5 rounded-lg shadow-[0_0_15px_rgba(252,211,77,0.95)]">
                                    <span class="p-secs text-xs sm:text-sm font-black text-amber-300 block">00</span>
                                    <span class="text-[7px] sm:text-[8px] font-bold text-amber-200 uppercase">Segs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        updatePromoCarouselDots(activePromos.length);
        currentPromoSlideIndex = 0;
        updatePromoCarouselPosition();
        startAllPromosCountdowns();
    }

    function updatePromoCarouselDots(count) {
        const dotsContainer = document.getElementById('promoCarouselDots');
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('button');
            dot.className = `w-2.5 h-2.5 rounded-full transition ${i === 0 ? 'bg-brand-primary w-6' : 'bg-slate-300'}`;
            dot.onclick = () => {
                goToPromoSlide(i);
                resetAutoSlide();
            };
            dotsContainer.appendChild(dot);
        }
    }

    function updatePromoCarouselPosition() {
        const track = document.getElementById('promoCarouselTrack');
        if (!track) return;
        const nowTime = new Date().getTime();
        const activePromosCount = promotions.filter(p => new Date(p.targetDate).getTime() > nowTime).length;
        const isPc = window.innerWidth >= 768;
        const visibleCards = isPc ? 3 : 1;
        const maxIndex = Math.max(0, activePromosCount - visibleCards);

        if (currentPromoSlideIndex > maxIndex) {
            currentPromoSlideIndex = maxIndex;
        }

        const percentage = currentPromoSlideIndex * (100 / visibleCards);
        track.style.transform = `translateX(-${percentage}%)`;

        const dotsContainer = document.getElementById('promoCarouselDots');
        if (dotsContainer && dotsContainer.children.length > 0) {
            const dots = dotsContainer.children;
            Array.from(dots).forEach((dot, index) => {
                if (index === currentPromoSlideIndex) {
                    dot.className = 'w-6 h-2.5 rounded-full bg-brand-primary transition';
                } else {
                    dot.className = 'w-2.5 h-2.5 rounded-full bg-slate-300 transition';
                }
            });
        }
    }

    window.nextPromoSlide = function() {
        const nowTime = new Date().getTime();
        const activePromosCount = promotions.filter(p => new Date(p.targetDate).getTime() > nowTime).length;
        const isPc = window.innerWidth >= 768;
        const visibleCards = isPc ? 3 : 1;
        const maxIndex = activePromosCount - visibleCards;

        currentPromoSlideIndex++;
        if (currentPromoSlideIndex > maxIndex) {
            currentPromoSlideIndex = 0;
        }
        updatePromoCarouselPosition();
    };

    window.prevPromoSlide = function() {
        const nowTime = new Date().getTime();
        const activePromosCount = promotions.filter(p => new Date(p.targetDate).getTime() > nowTime).length;
        const isPc = window.innerWidth >= 768;
        const visibleCards = isPc ? 3 : 1;
        const maxIndex = activePromosCount - visibleCards;

        currentPromoSlideIndex--;
        if (currentPromoSlideIndex < 0) {
            currentPromoSlideIndex = maxIndex;
        }
        updatePromoCarouselPosition();
        resetAutoSlide();
    };

    function goToPromoSlide(index) {
        currentPromoSlideIndex = index;
        updatePromoCarouselPosition();
    }

    window.addEventListener('resize', () => {
        updatePromoCarouselPosition();
    });
}

// --- LÓGICA DE LA VISTA DETALLADA DE PROMOCIONES (promocion.html) ---
function initPromoDetailView() {
    const container = document.getElementById('promo-detail-container');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    const promo = promotions.find(p => p.id === idParam);
    const nowTime = new Date().getTime();

    if (!promo || new Date(promo.targetDate).getTime() <= nowTime) {
        container.innerHTML = `
            <div class="text-center py-16 bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
                <span class="material-symbols-outlined text-6xl text-slate-300 mb-4">error</span>
                <h2 class="text-2xl font-bold text-slate-800 mb-2">Promoción no encontrada</h2>
                <p class="text-slate-500 mb-6">La promoción que estás buscando no existe o ha expirado.</p>
                <a href="index.html#promociones" class="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-accent transition-colors">
                    Ir a Promociones
                </a>
            </div>
        `;
        return;
    }

    document.title = `${promo.title} - Plusvatan`;
    const pageUrl = window.location.href;
    const pageUrlEncoded = encodeURIComponent(pageUrl);
    const shareText = encodeURIComponent(`Mira esta increíble promoción de Plusvatan: ${promo.title}! ${promo.subtitle}`);

    const sheetWhatsappEl = document.getElementById('sheet-share-whatsapp');
    const sheetFacebookEl = document.getElementById('sheet-share-facebook');
    const sheetTwitterEl = document.getElementById('sheet-share-twitter');
    const sheetLinkedinEl = document.getElementById('sheet-share-linkedin');
    const shareUrlInput = document.getElementById('shareUrlInput');

    if (sheetWhatsappEl) sheetWhatsappEl.href = `https://api.whatsapp.com/send?text=${shareText}%20${pageUrlEncoded}`;
    if (sheetFacebookEl) sheetFacebookEl.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrlEncoded}`;
    if (sheetTwitterEl) sheetTwitterEl.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrlEncoded}`;
    if (sheetLinkedinEl) sheetLinkedinEl.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrlEncoded}`;
    if (shareUrlInput) shareUrlInput.value = pageUrl;

    const whatsappMsg = encodeURIComponent(`Hola, me interesa obtener más información sobre la promoción: "${promo.title}" (${promo.categoryName}).`);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

    container.innerHTML = `
        <div class="bg-white overflow-hidden p-1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                <div class="flex flex-col gap-3 justify-between">
                    <div class="bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm w-full h-[460px] sm:h-[540px]">
                        <img src="${promo.image}" alt="${promo.title}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <a href="index.html#promociones" class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-primary transition-colors">
                            <span class="material-symbols-outlined text-lg">arrow_back</span>
                            <span>Ir a promociones</span>
                        </a>
                        <button onclick="openShareModal()" class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-white hover:bg-brand-primary text-slate-700 hover:text-white px-3.5 py-1.5 rounded-xl transition border border-slate-200 shadow-2xs group">
                            <span class="material-symbols-outlined text-lg text-brand-primary group-hover:text-white transition-colors">share</span>
                            <span>Compartir</span>
                        </button>
                    </div>
                </div>
                <div class="flex flex-col justify-between h-full">
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <span class="px-3 py-1 rounded-full text-xs font-bold bg-brand-light text-brand-primary border border-brand-primary/20">${promo.categoryName}</span>
                            <span class="text-xs text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">Vigencia: ${promo.validity}</span>
                        </div>
                        <h1 class="text-xl sm:text-2xl font-extrabold text-brand-darkest mb-1">${promo.title}</h1>
                        <p class="text-slate-600 text-xs sm:text-sm mb-3">${promo.subtitle}</p>
                        
                        <div class="animated-gradient-timer p-2.5 rounded-xl text-center mb-3 shadow-md">
                            <span class="text-[10px] font-extrabold text-white uppercase tracking-widest block mb-1 flex items-center justify-center gap-1.5 drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]">
                                <span class="material-symbols-outlined text-sm animate-pulse text-amber-300">timer</span> Tiempo Limitado:
                            </span>
                            <div class="grid grid-cols-4 gap-1.5 text-center promo-timer" data-target="${promo.targetDate}">
                                <div class="bg-emerald-950/80 border border-emerald-400 p-1 rounded-lg shadow-[0_0_10px_rgba(74,222,128,0.7)]">
                                    <span class="p-days text-xs font-black text-white block">00</span>
                                    <span class="text-[7px] font-bold text-emerald-300 uppercase">Días</span>
                                </div>
                                <div class="bg-emerald-950/80 border border-emerald-400 p-1 rounded-lg shadow-[0_0_10px_rgba(74,222,128,0.7)]">
                                    <span class="p-hours text-xs font-black text-white block">00</span>
                                    <span class="text-[7px] font-bold text-emerald-300 uppercase">Hrs</span>
                                </div>
                                <div class="bg-emerald-950/80 border border-emerald-400 p-1 rounded-lg shadow-[0_0_10px_rgba(74,222,128,0.7)]">
                                    <span class="p-mins text-xs font-black text-white block">00</span>
                                    <span class="text-[7px] font-bold text-emerald-300 uppercase">Min</span>
                                </div>
                                <div class="bg-emerald-950/80 border border-amber-300 p-1 rounded-lg shadow-[0_0_12px_rgba(252,211,77,0.9)]">
                                    <span class="p-secs text-xs font-black text-amber-300 block">00</span>
                                    <span class="text-[7px] font-bold text-amber-200 uppercase">Seg</span>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-1.5 mb-3">
                            ${promo.highlights.map(h => `
                                <div class="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                                    <span class="material-symbols-outlined text-brand-primary text-base shrink-0">check_circle</span>
                                    <span>${h}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 mb-3">
                            <p class="font-bold text-brand-primary mb-0.5 flex items-center gap-1"><span class="material-symbols-outlined text-sm">verified</span> Términos y Condiciones:</p>
                            <p class="leading-relaxed text-slate-500">${promo.terms}</p>
                        </div>
                    </div>
                    <div>
                        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="w-full py-3 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl text-center flex items-center justify-center gap-3 transition-colors shadow-lg text-sm sm:text-base">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            <span>Solicitar promoción</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    startAllPromosCountdowns();
}

window.openShareModal = function() {
    const modal = document.getElementById('shareSheetModal');
    const overlay = document.getElementById('shareSheetOverlay');
    const panel = document.getElementById('shareSheetPanel');
    if (!modal || !overlay || !panel) return;
    modal.classList.remove('hidden');
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        panel.classList.remove('translate-y-full');
    }, 10);
};

window.closeShareModal = function() {
    const modal = document.getElementById('shareSheetModal');
    const overlay = document.getElementById('shareSheetOverlay');
    const panel = document.getElementById('shareSheetPanel');
    if (!modal || !overlay || !panel) return;
    overlay.classList.add('opacity-0');
    panel.classList.add('translate-y-full');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
};

window.copyShareLink = function() {
    const input = document.getElementById('shareUrlInput');
    const url = input ? input.value : window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        closeShareModal();
    });
};

function startAllPromosCountdowns() {
    if (promoTimerInterval) clearInterval(promoTimerInterval);
    function updateTimers() {
        const timers = document.querySelectorAll('.promo-timer');
        timers.forEach(timerEl => {
            const targetDateStr = timerEl.getAttribute('data-target') || '2026-10-31T23:59:59';
            const targetDate = new Date(targetDateStr).getTime();
            const now = new Date().getTime();
            const difference = targetDate - now;

            const dSpan = timerEl.querySelector('.p-days');
            const hSpan = timerEl.querySelector('.p-hours');
            const mSpan = timerEl.querySelector('.p-mins');
            const sSpan = timerEl.querySelector('.p-secs');

            if (difference <= 0) {
                if (dSpan) dSpan.textContent = '00';
                if (hSpan) hSpan.textContent = '00';
                if (mSpan) mSpan.textContent = '00';
                if (sSpan) sSpan.textContent = '00';
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (dSpan) dSpan.textContent = String(days).padStart(2, '0');
            if (hSpan) hSpan.textContent = String(hours).padStart(2, '0');
            if (mSpan) mSpan.textContent = String(minutes).padStart(2, '0');
            if (sSpan) sSpan.textContent = String(seconds).padStart(2, '0');
        });
    }
    updateTimers();
    promoTimerInterval = setInterval(updateTimers, 1000);
}

// --- LÓGICA DEL CATÁLOGO (index.html) ---
let currentPage = parseInt(sessionStorage.getItem('propertiesCurrentPage')) || 1;
const itemsPerPage = 18;
let activeCategory = sessionStorage.getItem('propertiesCategory') || 'all';
let activeLocation = sessionStorage.getItem('propertiesLocation') || 'all';
let activePayment = sessionStorage.getItem('propertiesPayment') || 'all';

function scrollToDesarrollos() {
    const desarrollosSection = document.getElementById('desarrollos');
    if (desarrollosSection) {
        desarrollosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function getFilteredProperties() {
    return developments.filter(item => {
        const matchesCategory = activeCategory === 'all' || (() => {
            if (Array.isArray(item.category)) {
                return item.category.some(cat => 
                    cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(activeCategory.toLowerCase())
                );
            } else if (typeof item.category === 'string') {
                return item.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(activeCategory.toLowerCase());
            }
            return false;
        })();

        const matchLocation = activeLocation === 'all' || (item.location && item.location.toLowerCase().includes(activeLocation.toLowerCase()));
        const matchPayment = activePayment === 'all' || (item.payments && item.payments.includes(activePayment));

        return matchesCategory && matchLocation && matchPayment;
    });
}

function getCardImage(mediaArray) {
    const firstImage = mediaArray.find(item => item.type === 'image');
    if (firstImage) return firstImage.url;
    return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop';
}

function renderProperties() {
    const propertiesGrid = document.getElementById('properties-grid');
    const paginationControls = document.getElementById('pagination-controls');
    if (!propertiesGrid) return;

    sessionStorage.setItem('propertiesCurrentPage', currentPage);
    sessionStorage.setItem('propertiesCategory', activeCategory);
    sessionStorage.setItem('propertiesLocation', activeLocation);
    sessionStorage.setItem('propertiesPayment', activePayment);

    propertiesGrid.innerHTML = '';
    const filteredData = getFilteredProperties();

    if (filteredData.length === 0) {
        propertiesGrid.innerHTML = `
            <div class="col-span-full text-center py-12 text-slate-500">
                <span class="material-symbols-outlined text-4xl mb-2">search_off</span>
                <p>No se encontraron desarrollos con los filtros seleccionados.</p>
            </div>
        `;
        if (paginationControls) paginationControls.innerHTML = '';
        return;
    }

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = 1;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

    paginatedItems.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg flex flex-col justify-between';
        
        const acceptsInfonavit = prop.payments.includes('Infonavit');
        const coverUrl = getCardImage(prop.media);

        card.innerHTML = `
            <a href="desarrollo.html?id=${prop.id}" class="relative w-full aspect-square overflow-hidden block group focus:outline-none">
                <img src="${coverUrl}" alt="${prop.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40"></div>
                
                <div class="absolute top-4 left-4 flex flex-col gap-1.5 items-start z-10">
                    <span class="bg-brand-darkest/90 backdrop-blur-md text-brand-accent text-xs font-bold px-3.5 py-1.5 rounded-full border border-brand-accent/30 shadow-lg">
                        ${prop.badge}
                    </span>
                    ${acceptsInfonavit ? `
                        <span class="bg-red-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-red-500/30">
                            <span class="material-symbols-outlined text-sm">verified</span> Acepta Infonavit
                        </span>
                    ` : ''}
                </div>

                <div class="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    <div></div>
                    <div class="flex flex-col items-center text-center mt-auto">
                        <span class="bg-brand-dark/90 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full mb-3 border border-brand-accent/40 shadow-lg">
                            ${prop.categoryLabel}
                        </span>
                        <h3 class="text-2xl font-extrabold text-white mb-2 drop-shadow-md">${prop.title}</h3>
                        <div class="flex items-center justify-center text-white/90 text-xs mb-5 gap-1 drop-shadow">
                            <span class="material-symbols-outlined text-red-500 text-lg">location_on</span>
                            <span class="font-medium">${prop.location}</span>
                        </div>
                        <div class="w-full grid grid-cols-2 items-center text-xs bg-white/15 backdrop-blur-md py-3 px-4 rounded-2xl border border-white/25 text-white shadow-xl">
                            <div class="flex items-center justify-center gap-1.5 pr-3 border-r border-white/20">
                                <span class="material-symbols-outlined text-slate-300 text-base">square_foot</span>
                                <span class="font-medium">${prop.size}</span>
                            </div>
                            <div class="text-white font-extrabold text-xs sm:text-sm pl-3 text-center">
                                <span class="text-slate-300 font-normal text-[11px]">desde</span> ${prop.price}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `;
        propertiesGrid.appendChild(card);
    });

    renderPaginationControls(totalPages);
}

function renderPaginationControls(totalPages) {
    const paginationControls = document.getElementById('pagination-controls');
    if (!paginationControls) return;
    paginationControls.innerHTML = '';

    if (totalPages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.className = `p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`;
    prevBtn.innerHTML = `<span class="material-symbols-outlined text-sm">chevron_left</span>`;
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderProperties();
            scrollToDesarrollos();
        }
    };
    paginationControls.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${i === currentPage ? 'bg-brand-primary text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => {
            currentPage = i;
            renderProperties();
            scrollToDesarrollos();
        };
        paginationControls.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = `p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`;
    nextBtn.innerHTML = `<span class="material-symbols-outlined text-sm">chevron_right</span>`;
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProperties();
            scrollToDesarrollos();
        }
    };
    paginationControls.appendChild(nextBtn);
}

function initCatalogView() {
    const locationSelect = document.getElementById('location-select');
    const paymentSelect = document.getElementById('payment-select');
    const catalogTypeSelect = document.getElementById('catalog-type-select');

    function updateLocationOptions() {
        if (!locationSelect || typeof developments === 'undefined') return;
        const filteredByCategory = developments.filter(item => {
            if (activeCategory === 'all') return true;
            if (Array.isArray(item.category)) {
                return item.category.some(cat => 
                    cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(activeCategory.toLowerCase())
                );
            } else if (typeof item.category === 'string') {
                return item.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(activeCategory.toLowerCase());
            }
            return false;
        });

        const uniqueLocations = [...new Set(filteredByCategory.map(item => item.location.trim()))].sort((a, b) => 
            a.localeCompare(b, 'es', { sensitivity: 'accent' })
        );

        const currentSelectedLoc = locationSelect.value;
        locationSelect.innerHTML = `<option value="all">Todas</option>` + 
            uniqueLocations.map(loc => `<option value="${loc}">${loc}</option>`).join('');

        if (uniqueLocations.includes(currentSelectedLoc)) {
            locationSelect.value = currentSelectedLoc;
            activeLocation = currentSelectedLoc;
        } else {
            locationSelect.value = 'all';
            activeLocation = 'all';
        }
    }

    if (locationSelect) locationSelect.value = activeLocation;
    if (paymentSelect) paymentSelect.value = activePayment;
    if (catalogTypeSelect) catalogTypeSelect.value = activeCategory;

    updateLocationOptions();

    if (catalogTypeSelect) {
        catalogTypeSelect.addEventListener('change', (e) => {
            activeCategory = e.target.value;
            currentPage = 1;
            updateLocationOptions();
            renderProperties();
        });
    }

    if (locationSelect) {
        locationSelect.addEventListener('change', (e) => {
            activeLocation = e.target.value;
            currentPage = 1;
            renderProperties();
        });
    }

    if (paymentSelect) {
        paymentSelect.addEventListener('change', (e) => {
            activePayment = e.target.value;
            currentPage = 1;
            renderProperties();
        });
    }

    renderProperties();
}

// --- LÓGICA DE LA VISTA DETALLADA DE DESARROLLOS (desarrollo.html) ---
let currentSlideIndex = 0;
let currentPropertyMedia = [];

function pauseAllOtherPlayers(exceptPlayer) {
    if (activeSliderPlayer && activeSliderPlayer !== exceptPlayer && typeof activeSliderPlayer.pauseVideo === 'function') {
        try { activeSliderPlayer.pauseVideo(); } catch (e) {}
    }
    for (let id in activeLotsPlayers) {
        if (activeLotsPlayers[id] && activeLotsPlayers[id] !== exceptPlayer && typeof activeLotsPlayers[id].pauseVideo === 'function') {
            try { activeLotsPlayers[id].pauseVideo(); } catch (e) {}
        }
    }
    for (let id in activeApartmentsPlayers) {
        if (activeApartmentsPlayers[id] && activeApartmentsPlayers[id] !== exceptPlayer && typeof activeApartmentsPlayers[id].pauseVideo === 'function') {
            try { activeApartmentsPlayers[id].pauseVideo(); } catch (e) {}
        }
    }
    for (let id in activeHomesPlayers) {
        if (activeHomesPlayers[id] && activeHomesPlayers[id] !== exceptPlayer && typeof activeHomesPlayers[id].pauseVideo === 'function') {
            try { activeHomesPlayers[id].pauseVideo(); } catch (e) {}
        }
    }
}

function setSlide(index) {
    currentSlideIndex = index;
    const container = document.getElementById('detail-media-container');
    if (container && currentPropertyMedia[currentSlideIndex]) {
        const item = currentPropertyMedia[currentSlideIndex];
        
        if (activeSliderPlayer && typeof activeSliderPlayer.destroy === 'function') {
            try { activeSliderPlayer.destroy(); } catch (e) {}
            activeSliderPlayer = null;
        }

        container.innerHTML = '';
        if (item.type === 'video') {
            const videoId = item.url.split('/').pop();
            const playerDivId = 'yt-slider-player-' + Date.now();
            container.innerHTML = `<div id="${playerDivId}" class="w-full h-full"></div>`;
            
            const initPlayerCheck = setInterval(() => {
                if (window.YT && window.YT.Player) {
                    clearInterval(initPlayerCheck);
                    activeSliderPlayer = new YT.Player(playerDivId, {
                        videoId: videoId,
                        playerVars: { 'autoplay': 0, 'controls': 1, 'loop': 1, 'playlist': videoId, 'enablejsapi': 1 },
                        events: {
                            'onStateChange': (event) => {
                                if (event.data === YT.PlayerState.PLAYING) {
                                    pauseAllOtherPlayers(activeSliderPlayer);
                                }
                            }
                        }
                    });
                }
            }, 100);
        } else {
            container.innerHTML = `<img src="${item.url}" alt="Vista detallada del desarrollo" class="w-full h-full object-cover transition-all">`;
        }
    }

    document.querySelectorAll('.slider-dot').forEach((dot, idx) => {
        if (idx === currentSlideIndex) {
            dot.classList.add('bg-white', 'w-6');
            dot.classList.remove('bg-white/50', 'w-2.5');
        } else {
            dot.classList.remove('bg-white', 'w-6');
            dot.classList.add('bg-white/50', 'w-2.5');
        }
    });
}

window.nextSlide = function() {
    if (currentPropertyMedia.length === 0) return;
    currentSlideIndex = (currentSlideIndex + 1) % currentPropertyMedia.length;
    setSlide(currentSlideIndex);
};

window.prevSlide = function() {
    if (currentPropertyMedia.length === 0) return;
    currentSlideIndex = (currentSlideIndex - 1 + currentPropertyMedia.length) % currentPropertyMedia.length;
    setSlide(currentSlideIndex);
};

function setupShareLinks(propTitle) {
    const pageUrl = window.location.href;
    const pageUrlEncoded = encodeURIComponent(pageUrl);
    const shareText = encodeURIComponent(`Mira este increíble desarrollo en Plusvatan: ${propTitle}!`);

    const sheetWhatsappEl = document.getElementById('sheet-share-whatsapp');
    const sheetFacebookEl = document.getElementById('sheet-share-facebook');
    const sheetTwitterEl = document.getElementById('sheet-share-twitter');
    const sheetLinkedinEl = document.getElementById('sheet-share-linkedin');
    const shareUrlInput = document.getElementById('shareUrlInput');

    if (sheetWhatsappEl) sheetWhatsappEl.href = `https://api.whatsapp.com/send?text=${shareText}%20${pageUrlEncoded}`;
    if (sheetFacebookEl) sheetFacebookEl.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrlEncoded}`;
    if (sheetTwitterEl) sheetTwitterEl.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrlEncoded}`;
    if (sheetLinkedinEl) sheetLinkedinEl.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrlEncoded}`;
    if (shareUrlInput) shareUrlInput.value = pageUrl;
}

// --- FUNCIÓN DE ZOOM AVANZADO (1.2x inicial, soltar para reset, arrastrar, zoom interactivo) ---
// --- FUNCIÓN DE ZOOM ELEGANTE, ARRASTRE Y SCROLL PARA PLANOS EN MÓVIL Y PC ---
// --- FUNCIÓN DE ZOOM ELEGANTE, ARRASTRE, PINCH-TO-ZOOM Y SCROLL PARA PLANOS ---
// --- FUNCIÓN DE ZOOM ELEGANTE, ARRASTRE, PINCH-TO-ZOOM Y SCROLL PARA PLANOS ---
function initBlueprintZoom() {
    const boxes = document.querySelectorAll('.blueprint-zoom-box');
    boxes.forEach(box => {
        const img = box.querySelector('.blueprint-zoom-img');
        if (!img) return;

        // Evitar comportamientos predeterminados del navegador al interactuar con el plano
        box.style.touchAction = 'none';

        let scale = 1;
        let originX = 50;
        let originY = 50;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let translateX = 0;
        let translateY = 0;

        // Variables para el control de 2 dedos (Pinch to Zoom en móvil)
        let initialPinchDistance = 0;
        let baseScale = 1;

        function updateTransform() {
            img.style.transformOrigin = `${originX}% ${originY}%`;
            img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        }

        function resetZoom() {
            scale = 1;
            translateX = 0;
            translateY = 0;
            originX = 50;
            originY = 50;
            isDragging = false;
            initialPinchDistance = 0;
            img.style.transformOrigin = 'center center';
            img.style.transform = 'translate(0px, 0px) scale(1)';
        }

        function getDistance(t1, t2) {
            return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        }

        // --- EVENTOS DE PC (MOUSE) ---
        box.addEventListener('mouseenter', (e) => {
            const rect = box.getBoundingClientRect();
            originX = ((e.clientX - rect.left) / rect.width) * 100;
            originY = ((e.clientY - rect.top) / rect.height) * 100;
            scale = 1.05; // Zoom inicial al 1.05x
            translateX = 0;
            translateY = 0;
            updateTransform();
        });

        box.addEventListener('mousemove', (e) => {
            if (scale === 1) return;
            if (isDragging) {
                translateX += e.movementX;
                translateY += e.movementY;
            } else {
                const rect = box.getBoundingClientRect();
                originX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                originY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
            }
            updateTransform();
        });

        box.addEventListener('mousedown', (e) => {
            if (scale > 1) {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
            }
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        box.addEventListener('mouseleave', () => {
            resetZoom(); // Quitar zoom al salir del contenedor
        });

        // Hacer más zoom con la rueda del mouse (Scroll)
        box.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (scale === 1) {
                scale = 1.05;
            }
            if (e.deltaY < 0) {
                scale = Math.min(scale + 0.3, 4.0); // Máximo 4x de zoom
            } else {
                scale = Math.max(scale - 0.3, 1.05);
                if (scale <= 1.05) {
                    translateX = 0;
                    translateY = 0;
                }
            }
            updateTransform();
        }, { passive: false });

        // --- EVENTOS TÁCTILES (MÓVIL: 1 dedo para arrastrar, 2 dedos para hacer más zoom) ---
        box.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                const rect = box.getBoundingClientRect();
                originX = ((touch.clientX - rect.left) / rect.width) * 100;
                originY = ((touch.clientY - rect.top) / rect.height) * 100;
                
                if (scale === 1) {
                    scale = 1.05; // Zoom inicial automático de 1.05x al tocar
                    translateX = 0;
                    translateY = 0;
                }
                isDragging = true;
                startX = touch.clientX;
                startY = touch.clientY;
                initialPinchDistance = 0;
                updateTransform();
            } else if (e.touches.length === 2) {
                // Al poner 2 dedos, pausamos el arrastre simple y medimos la distancia inicial para hacer zoom
                isDragging = false;
                initialPinchDistance = getDistance(e.touches[0], e.touches[1]);
                baseScale = scale;
            }
        }, { passive: true });

        box.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && initialPinchDistance > 0) {
                // GESTO DE 2 DEDOS (Pinch-to-zoom): Ajusta el zoom dinámicamente hasta 4.0x
                const currentDistance = getDistance(e.touches[0], e.touches[1]);
                const factor = currentDistance / initialPinchDistance;
                scale = Math.max(1.05, Math.min(baseScale * factor, 4.0));
                updateTransform();
            } else if (isDragging && e.touches.length === 1) {
                // ARRASTRE CON 1 DEDO: Mueve la imagen por el plano
                const touch = e.touches[0];
                const deltaX = touch.clientX - startX;
                const deltaY = touch.clientY - startY;
                
                translateX += deltaX;
                translateY += deltaY;
                
                startX = touch.clientX;
                startY = touch.clientY;
                updateTransform();
            }
        }, { passive: true });

        box.addEventListener('touchend', (e) => {
            if (e.touches.length === 0) {
                // Al soltar todos los dedos, se quita el zoom por completo
                resetZoom();
            } else if (e.touches.length === 1) {
                // Si levantas un dedo pero queda otro, cambiamos al modo arrastre con ese dedo restante
                isDragging = true;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                initialPinchDistance = 0;
            }
        });
    });
}

function initDetailView() {
    const container = document.getElementById('detail-container');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    const prop = developments.find(item => item.id === idParam);

    if (!prop) {
        container.innerHTML = `
            <div class="text-center py-20">
                <span class="material-symbols-outlined text-6xl text-slate-300 mb-4">error</span>
                <h2 class="text-2xl font-bold text-slate-800 mb-2">Desarrollo no encontrado</h2>
                <p class="text-slate-500 mb-6">El desarrollo que estás buscando no existe o fue removido.</p>
                <a href="index.html#desarrollos" class="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-accent transition-colors">
                    Ir al Catálogo
                </a>
            </div>
        `;
        return;
    }

    document.title = `${prop.title} - Plusvatan`;
    currentPropertyMedia = prop.media;
    currentSlideIndex = 0;
    setupShareLinks(prop.title);

    const whatsappMessage = encodeURIComponent(`Hola, me interesa solicitar más información sobre el desarrollo ${prop.title}`);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    container.innerHTML = `
        <div class="w-full bg-slate-900 shadow-inner overflow-hidden mb-3 sm:mb-4">
            <div class="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
                <div id="slider-wrapper" class="relative w-full h-72 sm:h-[450px] lg:rounded-3xl overflow-hidden bg-slate-900 select-none">
                    <div id="detail-media-container" class="w-full h-full"></div>
                    ${prop.media.length > 1 ? `
                        <button onclick="prevSlide()" aria-label="Multimedia anterior" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-brand-primary text-slate-800 hover:text-white w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 shadow-xl transition z-20">
                            <span class="material-symbols-outlined text-xl">chevron_left</span>
                        </button>
                        <button onclick="nextSlide()" aria-label="Multimedia siguiente" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-brand-primary text-slate-800 hover:text-white w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 shadow-xl transition z-20">
                            <span class="material-symbols-outlined text-xl">chevron_right</span>
                        </button>
                        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20" id="sliderDotsContainer">
                            ${prop.media.map((item, i) => `
                                <button onclick="setSlide(${i})" aria-label="Ir a multimedia ${i + 1}" class="slider-dot h-2.5 rounded-full ${i === 0 ? 'bg-brand-primary w-6' : 'bg-slate-300 w-2.5'} transition-all"></button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between mb-3 sm:mb-4 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                <a href="index.html#desarrollos" class="inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-primary transition-colors">
                    <span class="material-symbols-outlined text-base">arrow_back</span>
                    <span>Ir al Catálogo</span>
                </a>
                <button onclick="openShareModal()" class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-white hover:bg-brand-primary text-slate-700 hover:text-white px-3.5 py-1.5 rounded-xl transition border border-slate-200 shadow-2xs group">
                    <span class="material-symbols-outlined text-lg text-brand-primary group-hover:text-white transition-colors">share</span>
                    <span>Compartir</span>
                </button>
            </div>
            <div class="bg-white overflow-hidden p-1">
                <div class="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-5">
                    <div>
                        <span class="text-xs font-extrabold uppercase text-brand-primary tracking-wider bg-brand-light/60 px-3 py-1 rounded-full border border-brand-primary/20">
                            ${prop.categoryLabel}
                        </span>
                        <h1 class="text-3xl sm:text-4xl font-extrabold text-brand-darkest mt-1.5">${prop.title}</h1>
                        <p class="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                            <span class="material-symbols-outlined text-brand-primary text-base">location_on</span>
                            ${prop.location}
                        </p>
                    </div>
                    <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex gap-6 text-right">
                        <div>
                            <span class="block text-xs text-slate-500 uppercase font-semibold">Superficie</span>
                            <strong class="text-sm sm:text-base text-brand-darkest font-bold">${prop.size}</strong>
                        </div>
                        <div>
                            <span class="block text-xs text-slate-500 uppercase font-semibold">Inversión Desde</span>
                            <strong class="text-base sm:text-xl text-brand-primary font-extrabold">${prop.price}</strong>
                        </div>
                    </div>
                </div>
                <div class="mb-5 sm:mb-6 text-slate-600 text-sm leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <h3 class="font-bold text-brand-darkest text-sm uppercase mb-1.5">Descripción del Desarrollo:</h3>
                    <p>${prop.description}</p>
                </div>
                
                <!-- LISTA DE LOTES -->
                ${prop.lots && prop.lots.length > 0 ? `
                <div class="mb-8">
                    <h3 class="font-bold text-sm uppercase text-slate-700 mb-4 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-brand-primary text-lg">square_foot</span> Lotes Disponibles:
                    </h3>
                    <div class="flex flex-col gap-6">
                        ${prop.lots.map((lot, index) => {
                            const lotPlayerDivId = `yt-lote-player-${index}-${Date.now()}`;
                            const hasVideo = lot.video_url && lot.video_url.includes('youtube.com/embed');
                            const videoId = hasVideo ? lot.video_url.split('/').pop() : '';
                            const hasDiscount = lot.price.discount && lot.price.discount.trim() !== '';
                            return `
                            <div class="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden flex flex-col md:flex-row items-stretch">
                                <div class="w-full md:w-5/12 bg-slate-50 p-4 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-start gap-4">
                                    <div>
                                        <h4 class="font-extrabold text-brand-darkest text-base mb-3 text-center md:text-left">${lot.title}</h4>
                                        <div class="blueprint-zoom-box w-full h-56 bg-white rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center p-2 mb-3 cursor-zoom-in relative select-none">
                                            <img src="${lot.blueprint_url}" alt="${lot.title}" class="blueprint-zoom-img max-h-full max-w-full object-contain will-change-transform">
                                        </div>
                                    </div>
                                    <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                                        <span class="block text-xs font-bold text-brand-primary uppercase mb-1">Medidas:</span>
                                        <div class="grid grid-cols-3 gap-1 text-center text-xs text-slate-700 font-medium">
                                            <div class="bg-slate-50 p-1 rounded"><span class="block text-[10px] text-slate-400">Total</span>${lot.dimensions.total_area}</div>
                                            <div class="bg-slate-50 p-1 rounded"><span class="block text-[10px] text-slate-400">Frente</span>${lot.dimensions.front}</div>
                                            <div class="bg-slate-50 p-1 rounded"><span class="block text-[10px] text-slate-400">Fondo</span>${lot.dimensions.depth}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full md:w-7/12 p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div class="mb-4 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 flex items-center justify-between">
                                            ${hasDiscount ? `
                                                <div>
                                                    <span class="block text-[11px] font-bold text-slate-500 uppercase">Precio de Lista:</span>
                                                    <span class="text-sm font-semibold text-slate-600 line-through">${lot.price.list_price}</span>
                                                    <span class="ml-2 text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">-${lot.price.discount}</span>
                                                </div>
                                                <div class="text-right">
                                                    <span class="block text-[11px] font-bold text-brand-primary uppercase">Precio Final:</span>
                                                    <span class="text-lg sm:text-xl font-extrabold text-brand-darkest">${lot.price.final_price || lot.price.list_price}</span>
                                                </div>
                                            ` : `
                                                <div class="w-full flex items-center justify-between">
                                                    <span class="text-[11px] font-bold text-brand-primary uppercase">Precio de Lista:</span>
                                                    <span class="text-lg sm:text-xl font-extrabold text-brand-darkest">${lot.price.list_price}</span>
                                                </div>
                                            `}
                                        </div>
                                        <div class="mb-4">
                                            <span class="block text-xs font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1">
                                                <span class="material-symbols-outlined text-sm text-brand-primary">payments</span> Financiamiento:
                                            </span>
                                            <div class="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                <p><strong>Entrega:</strong> ${lot.financing.delivery}</p>
                                                <p><strong>Apartado:</strong> ${lot.financing.reservation}</p>
                                                <p><strong>Enganche:</strong> ${lot.financing.down_payment}</p>
                                                <p><strong>Métodos de pago:</strong></p>
                                                <div class="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-200">
                                                    ${lot.financing.payment_methods.map(pm => `<span class="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px] font-medium text-slate-700">${pm}</span>`).join('')}
                                                </div>
                                            </div>
                                        </div>
                                        ${lot.description && lot.description.length > 0 ? `
                                            <div class="mb-4 flex flex-wrap gap-2">
                                                ${lot.description.map(feat => `<span class="text-xs font-semibold text-slate-700 bg-brand-light/60 px-2.5 py-1 rounded-lg border border-brand-primary/20 flex items-center gap-1"><span class="material-symbols-outlined text-xs text-brand-primary">check_circle</span>${feat}</span>`).join('')}
                                            </div>
                                        ` : ''}
                                    </div>
                                    ${hasVideo ? `
                                        <div class="mt-4 pt-4 border-t border-slate-100 -mx-5 px-5 md:mx-0 md:px-0">
                                            <span class="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-1">
                                                <span class="material-symbols-outlined text-sm text-brand-primary">play_circle</span> Video Recorrido:
                                            </span>
                                            <div class="-mx-5 md:mx-0 w-[calc(100%+2.5rem)] md:w-full h-56 sm:h-72 lg:h-80 rounded-none md:rounded-xl overflow-hidden bg-slate-900 shadow-inner relative">
                                                <div id="${lotPlayerDivId}" class="w-full h-full" data-videoid="${videoId}"></div>
                                            </div>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `;}).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- LISTA DE DEPARTAMENTOS -->
                ${prop.apartments && prop.apartments.length > 0 ? `
                <div class="mb-8">
                    <h3 class="font-bold text-sm uppercase text-slate-700 mb-4 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-brand-primary text-lg">apartment</span> Departamentos Disponibles:
                    </h3>
                    <div class="flex flex-col gap-6">
                        ${prop.apartments.map((apt, index) => {
                            const aptPlayerDivId = `yt-apt-player-${index}-${Date.now()}`;
                            const hasVideo = apt.video_url && apt.video_url.includes('youtube.com/embed');
                            const videoId = hasVideo ? apt.video_url.split('/').pop() : '';
                            const hasDiscount = apt.price.discount && apt.price.discount.trim() !== '';
                            return `
                            <div class="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden flex flex-col md:flex-row items-stretch">
                                <div class="w-full md:w-5/12 bg-slate-50 p-4 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-start gap-4">
                                    <div>
                                        <h4 class="font-extrabold text-brand-darkest text-base mb-3 text-center md:text-left">${apt.title}</h4>
                                        <div class="blueprint-zoom-box w-full h-56 bg-white rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center p-2 mb-3 cursor-zoom-in relative select-none">
                                            <img src="${apt.blueprint_url}" alt="${apt.title}" class="blueprint-zoom-img max-h-full max-w-full object-contain will-change-transform">
                                        </div>
                                    </div>
                                    <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                                        <span class="block text-xs font-bold text-brand-primary uppercase mb-1">Medidas:</span>
                                        <div class="grid grid-cols-3 gap-1 text-center text-xs text-slate-700 font-medium">
                                            <div class="bg-slate-50 p-1 rounded"><span class="block text-[10px] text-slate-400">Total</span>${apt.dimensions.total_area}</div>
                                            <div class="bg-slate-50 p-1 rounded"><span class="block text-[10px] text-slate-400">Frente</span>${apt.dimensions.front}</div>
                                            <div class="bg-slate-50 p-1 rounded"><span class="block text-[10px] text-slate-400">Fondo</span>${apt.dimensions.depth}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full md:w-7/12 p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div class="mb-4 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 flex items-center justify-between">
                                            ${hasDiscount ? `
                                                <div>
                                                    <span class="block text-[11px] font-bold text-slate-500 uppercase">Precio de Lista:</span>
                                                    <span class="text-sm font-semibold text-slate-600 line-through">${apt.price.list_price}</span>
                                                    <span class="ml-2 text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">-${apt.price.discount}</span>
                                                </div>
                                                <div class="text-right">
                                                    <span class="block text-[11px] font-bold text-brand-primary uppercase">Precio Final:</span>
                                                    <span class="text-lg sm:text-xl font-extrabold text-brand-darkest">${apt.price.final_price || apt.price.list_price}</span>
                                                </div>
                                            ` : `
                                                <div class="w-full flex items-center justify-between">
                                                    <span class="text-[11px] font-bold text-brand-primary uppercase">Precio de Lista:</span>
                                                    <span class="text-lg sm:text-xl font-extrabold text-brand-darkest">${apt.price.list_price}</span>
                                                </div>
                                            `}
                                        </div>
                                        <div class="mb-4">
                                            <span class="block text-xs font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1">
                                                <span class="material-symbols-outlined text-sm text-brand-primary">payments</span> Financiamiento:
                                            </span>
                                            <div class="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                <p><strong>Entrega:</strong> ${apt.financing.delivery}</p>
                                                <p><strong>Apartado:</strong> ${apt.financing.reservation}</p>
                                                <p><strong>Enganche:</strong> ${apt.financing.down_payment}</p>
                                                <p><strong>Métodos de pago:</strong></p>
                                                <div class="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-200">
                                                    ${apt.financing.payment_methods.map(pm => `<span class="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px] font-medium text-slate-700">${pm}</span>`).join('')}
                                                </div>
                                            </div>
                                        </div>
                                        ${apt.description && apt.description.length > 0 ? `
                                            <div class="mb-4">
                                                <span class="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-1">
                                                    <span class="material-symbols-outlined text-sm text-brand-primary">list_alt</span> Características:
                                                </span>
                                                <ul class="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                    ${apt.description.map(feat => `
                                                        <li class="text-xs sm:text-sm text-slate-700 flex items-center gap-2">
                                                            <span class="material-symbols-outlined text-brand-primary text-base shrink-0">check_circle</span>
                                                            <span>${feat}</span>
                                                        </li>
                                                    `).join('')}
                                                </ul>
                                            </div>
                                        ` : ''}
                                    </div>
                                    ${hasVideo ? `
                                        <div class="mt-4 pt-4 border-t border-slate-100 -mx-5 px-5 md:mx-0 md:px-0">
                                            <span class="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-1">
                                                <span class="material-symbols-outlined text-sm text-brand-primary">play_circle</span> Video Recorrido:
                                            </span>
                                            <div class="-mx-5 md:mx-0 w-[calc(100%+2.5rem)] md:w-full h-56 sm:h-72 lg:h-80 rounded-none md:rounded-xl overflow-hidden bg-slate-900 shadow-inner relative">
                                                <div id="${aptPlayerDivId}" class="w-full h-full" data-videoid="${videoId}"></div>
                                            </div>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `;}).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- LISTA DE VIVIENDAS -->
                ${prop.homes && prop.homes.length > 0 ? `
                <div class="mb-8">
                    <h3 class="font-bold text-sm uppercase text-slate-700 mb-4 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-brand-primary text-lg">home</span> Viviendas Disponibles:
                    </h3>
                    <div class="flex flex-col gap-6">
                        ${prop.homes.map((home, index) => {
                            const homePlayerDivId = `yt-home-player-${index}-${Date.now()}`;
                            const hasVideo = home.video_url && home.video_url.includes('youtube.com/embed');
                            const videoId = hasVideo ? home.video_url.split('/').pop() : '';
                            const hasDiscount = home.price.discount && home.price.discount.trim() !== '';
                            return `
                            <div class="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden flex flex-col md:flex-row items-stretch">
                                <div class="w-full md:w-5/12 bg-slate-50 p-4 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-start gap-4">
                                    <div>
                                        <h4 class="font-extrabold text-brand-darkest text-base mb-3 text-center md:text-left">${home.title}</h4>
                                        <div class="blueprint-zoom-box w-full h-56 bg-white rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center p-2 mb-3 cursor-zoom-in relative select-none">
                                            <img src="${home.blueprint_url}" alt="${home.title}" class="blueprint-zoom-img max-h-full max-w-full object-contain will-change-transform">
                                        </div>
                                    </div>
                                    <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                                        <span class="block text-xs font-bold text-brand-primary uppercase mb-1">Medidas:</span>
                                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-1 text-center text-xs text-slate-700 font-medium">
                                            <div class="bg-slate-50 p-1 rounded"><span class="block text-[10px] text-slate-400">Total</span>${home.dimensions.total_area}</div>
                                            <div class="bg-slate-50 p-1 rounded"><span class="block text-[10px] text-slate-400">Construcción</span>${home.dimensions.built_area}</div>
                                            <div class="bg-slate-50 p-1 rounded"><span class="block text-[10px] text-slate-400">Frente</span>${home.dimensions.front}</div>
                                            <div class="bg-slate-50 p-1 rounded"><span class="block text-[10px] text-slate-400">Fondo</span>${home.dimensions.depth}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full md:w-7/12 p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div class="mb-4 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 flex items-center justify-between">
                                            ${hasDiscount ? `
                                                <div>
                                                    <span class="block text-[11px] font-bold text-slate-500 uppercase">Precio de Lista:</span>
                                                    <span class="text-sm font-semibold text-slate-600 line-through">${home.price.list_price}</span>
                                                    <span class="ml-2 text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">-${home.price.discount}</span>
                                                </div>
                                                <div class="text-right">
                                                    <span class="block text-[11px] font-bold text-brand-primary uppercase">Precio Final:</span>
                                                    <span class="text-lg sm:text-xl font-extrabold text-brand-darkest">${home.price.final_price || home.price.list_price}</span>
                                                </div>
                                            ` : `
                                                <div class="w-full flex items-center justify-between">
                                                    <span class="text-[11px] font-bold text-brand-primary uppercase">Precio de Lista:</span>
                                                    <span class="text-lg sm:text-xl font-extrabold text-brand-darkest">${home.price.list_price}</span>
                                                </div>
                                            `}
                                        </div>
                                        <div class="mb-4">
                                            <span class="block text-xs font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1">
                                                <span class="material-symbols-outlined text-sm text-brand-primary">payments</span> Financiamiento:
                                            </span>
                                            <div class="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                <p><strong>Entrega:</strong> ${home.financing.delivery}</p>
                                                <p><strong>Apartado:</strong> ${home.financing.reservation}</p>
                                                <p><strong>Enganche:</strong> ${home.financing.down_payment}</p>
                                                <p><strong>Métodos de pago:</strong></p>
                                                <div class="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-200">
                                                    ${home.financing.payment_methods.map(pm => `<span class="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px] font-medium text-slate-700">${pm}</span>`).join('')}
                                                </div>
                                            </div>
                                        </div>
                                        ${home.description && home.description.length > 0 ? `
                                            <div class="mb-4">
                                                <span class="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-1">
                                                    <span class="material-symbols-outlined text-sm text-brand-primary">list_alt</span> Características:
                                                </span>
                                                <ul class="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                    ${home.description.map(feat => `
                                                        <li class="text-xs sm:text-sm text-slate-700 flex items-center gap-2">
                                                            <span class="material-symbols-outlined text-brand-primary text-base shrink-0">check_circle</span>
                                                            <span>${feat}</span>
                                                        </li>
                                                    `).join('')}
                                                </ul>
                                            </div>
                                        ` : ''}
                                    </div>
                                    ${hasVideo ? `
                                        <div class="mt-4 pt-4 border-t border-slate-100 -mx-5 px-5 md:mx-0 md:px-0">
                                            <span class="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-1">
                                                <span class="material-symbols-outlined text-sm text-brand-primary">play_circle</span> Video Recorrido:
                                            </span>
                                            <div class="-mx-5 md:mx-0 w-[calc(100%+2.5rem)] md:w-full h-56 sm:h-72 lg:h-80 rounded-none md:rounded-xl overflow-hidden bg-slate-900 shadow-inner relative">
                                                <div id="${homePlayerDivId}" class="w-full h-full" data-videoid="${videoId}"></div>
                                            </div>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `;}).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Amenidades -->
                ${prop.amenities && prop.amenities.length > 0 ? `
                <div class="mb-8">
                    <h3 class="font-bold text-sm uppercase text-slate-700 mb-3">Amenidades:</h3>
                    <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            ${prop.amenities.map(item => `
                                <li class="text-xs sm:text-sm text-slate-700 flex items-center gap-2 leading-tight">
                                    <span class="material-symbols-outlined text-brand-accent text-base shrink-0">check_circle</span>
                                    <span>${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                ` : ''}

                <div class="mb-8">
                    <h3 class="font-bold text-sm uppercase text-slate-700 mb-3">Infraestructura y servicios:</h3>
                    <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            ${prop.infrastructure.map(item => `
                                <li class="text-xs sm:text-sm text-slate-700 flex items-center gap-2 leading-tight">
                                    <span class="material-symbols-outlined text-brand-accent text-base shrink-0">check_circle</span>
                                    <span>${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="font-bold text-sm uppercase text-slate-700 mb-3">Ubicación Estratégica:</h3>
                    <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            ${prop.strategicLocation.map(item => `
                                <li class="text-xs sm:text-sm text-slate-700 flex items-center gap-2 leading-tight">
                                    <span class="material-symbols-outlined text-brand-accent text-base shrink-0">check_circle</span>
                                    <span>${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <div class="mb-8">
                    <h3 class="font-bold text-xs uppercase text-brand-darkest mb-3 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-brand-primary text-lg">map</span> Ubicación
                    </h3>
                    <div class="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                        <iframe src="${prop.mapUrl}" class="w-full h-full border-0" allowfullscreen="" loading="lazy" title="Mapa de ubicación del desarrollo"></iframe>
                    </div>
                </div>
                <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl text-center flex items-center justify-center gap-3 transition-colors shadow-lg text-base sm:text-lg">
                    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    <span>Solicitar más información</span>
                </a>
            </div>
        </div>
    `;

    setSlide(0);
    initSliderTouchSwipe();
    initBlueprintZoom();

    const initAvailableCheck = setInterval(() => {
        if (window.YT && window.YT.Player) {
            clearInterval(initAvailableCheck);
            if (prop.lots) {
                prop.lots.forEach((lot) => {
                    if (lot.video_url && lot.video_url.includes('youtube.com/embed')) {
                        const lotVideoId = lot.video_url.split('/').pop();
                        const element = document.querySelector(`div[data-videoid="${lotVideoId}"]`);
                        if (element && element.id && !activeLotsPlayers[element.id]) {
                            activeLotsPlayers[element.id] = new YT.Player(element.id, {
                                videoId: lotVideoId,
                                playerVars: { 'autoplay': 0, 'controls': 1, 'enablejsapi': 1 },
                                events: {
                                    'onStateChange': (event) => {
                                        if (event.data === YT.PlayerState.PLAYING) {
                                            pauseAllOtherPlayers(activeLotsPlayers[element.id]);
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }
            if (prop.apartments) {
                prop.apartments.forEach((apt) => {
                    if (apt.video_url && apt.video_url.includes('youtube.com/embed')) {
                        const aptVideoId = apt.video_url.split('/').pop();
                        const element = document.querySelector(`div[data-videoid="${aptVideoId}"]`);
                        if (element && element.id && !activeApartmentsPlayers[element.id]) {
                            activeApartmentsPlayers[element.id] = new YT.Player(element.id, {
                                videoId: aptVideoId,
                                playerVars: { 'autoplay': 0, 'controls': 1, 'enablejsapi': 1 },
                                events: {
                                    'onStateChange': (event) => {
                                        if (event.data === YT.PlayerState.PLAYING) {
                                            pauseAllOtherPlayers(activeApartmentsPlayers[element.id]);
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }
            if (prop.homes) {
                prop.homes.forEach((home) => {
                    if (home.video_url && home.video_url.includes('youtube.com/embed')) {
                        const homeVideoId = home.video_url.split('/').pop();
                        const element = document.querySelector(`div[data-videoid="${homeVideoId}"]`);
                        if (element && element.id && !activeHomesPlayers[element.id]) {
                            activeHomesPlayers[element.id] = new YT.Player(element.id, {
                                videoId: homeVideoId,
                                playerVars: { 'autoplay': 0, 'controls': 1, 'enablejsapi': 1 },
                                events: {
                                    'onStateChange': (event) => {
                                        if (event.data === YT.PlayerState.PLAYING) {
                                            pauseAllOtherPlayers(activeHomesPlayers[element.id]);
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    }, 100);
}

function initSliderTouchSwipe() {
    const sliderWrapper = document.getElementById('slider-wrapper');
    if (!sliderWrapper) return;
    let touchStartX = 0;
    let touchEndX = 0;

    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        }
        if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }
}

function initContactForm() {
    const ladaSelect = document.getElementById('lada');
    const phoneInput = document.getElementById('phone');
    const contactForm = document.getElementById('contact-form');

    if (ladaSelect && phoneInput) {
        function updatePhoneValidation() {
            const selectedOption = ladaSelect.options[ladaSelect.selectedIndex];
            const digits = selectedOption.getAttribute('data-digits') || "10";
            phoneInput.setAttribute('minlength', digits);
            phoneInput.setAttribute('maxlength', digits);
            phoneInput.setAttribute('pattern', `\\d{${digits}}`);
            phoneInput.setAttribute('placeholder', `${digits} dígitos`);
            phoneInput.value = '';
        }
        ladaSelect.addEventListener('change', updatePhoneValidation);
        updatePhoneValidation();
    }

    if (contactForm) {
        const submitBtn = document.getElementById('submit-btn');
        const submitBtnText = document.getElementById('submit-btn-text');
        const formResponse = document.getElementById('form-response');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.disabled = status;
            if (submitBtnText) submitBtnText.textContent = 'Enviando...';
            if (formResponse) {
                formResponse.classList.add('hidden');
                formResponse.className = 'hidden p-4 rounded-xl text-sm font-medium transition-all text-center';
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    if (formResponse) {
                        formResponse.classList.remove('hidden');
                        formResponse.classList.add('bg-emerald-100', 'text-emerald-800', 'border', 'border-emerald-200');
                        formResponse.innerHTML = '¡Su mensaje ha sido enviado exitosamente! Un asesor se pondrá en contacto pronto.';
                    }
                    contactForm.reset();
                    if (ladaSelect && phoneInput) {
                        const event = new Event('change');
                        ladaSelect.dispatchEvent(event);
                    }
                } else {
                    throw new Error('Ocurrió un error al enviar el formulario.');
                }
            } catch (error) {
                if (formResponse) {
                    formResponse.classList.remove('hidden');
                    formResponse.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-200');
                    formResponse.innerHTML = '¡Hubo un problema al enviar su mensaje! Inténtelo más tarde o contáctenos por WhatsApp.';
                }
            } finally {
                submitBtn.disabled = false;
                if (submitBtnText) submitBtnText.textContent = 'Enviar Información';
            }
        });
    }
}