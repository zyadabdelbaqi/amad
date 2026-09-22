(function(){const c=document.getElementById('particles');if(!c)return;for(let i=0;i<40;i++){const p=document.createElement('div');p.className='particle';p.style.left=Math.random()*100+'%';p.style.animationDuration=(Math.random()*10+8)+'s';p.style.animationDelay=(Math.random()*10)+'s';p.style.width=p.style.height=(Math.random()*4+2)+'px';c.appendChild(p)}})();
        const navbar=document.getElementById('navbar'),scrollTopBtn=document.getElementById('scrollTop');
        window.addEventListener('scroll',()=>{const s=window.scrollY;navbar.classList.toggle('scrolled',s>80);scrollTopBtn.classList.toggle('visible',s>500)});
        scrollTopBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
        const sections=document.querySelectorAll('section[id]'),navLinks=document.querySelectorAll('.nav-links a');
        window.addEventListener('scroll',()=>{let c='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)c=s.getAttribute('id')});navLinks.forEach(l=>{l.classList.remove('active');if(l.getAttribute('href')==='#'+c)l.classList.add('active')})});
        const hamburger=document.getElementById('hamburger'),mobileMenu=document.getElementById('mobileMenu'),mobileOverlay=document.getElementById('mobileOverlay'),mobileClose=document.getElementById('mobileClose');
        function openMenu(){mobileMenu.classList.add('open');mobileOverlay.classList.add('open');document.body.style.overflow='hidden'}
        function closeMenu(){mobileMenu.classList.remove('open');mobileOverlay.classList.remove('open');document.body.style.overflow=''}
        hamburger.addEventListener('click',openMenu);mobileClose.addEventListener('click',closeMenu);mobileOverlay.addEventListener('click',closeMenu);
                mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
        const mobileDropdownBtns = document.querySelectorAll(".mobile-dropdown-btn");
        mobileDropdownBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                btn.parentElement.classList.toggle("active");
            });
        });
        const revealEls=document.querySelectorAll('.reveal');
        const revealObs=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('revealed')})},{threshold:0.05,rootMargin:'0px 0px 0px 0px'});
        revealEls.forEach(el=>revealObs.observe(el));
        const counters=document.querySelectorAll('.stat-number');let cStarted=false;
        const cObs=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting&&!cStarted){cStarted=true;counters.forEach(c=>{const t=+c.getAttribute('data-target'),suf=c.querySelector('span')?.outerHTML||'',dur=2000,step=t/(dur/16);let cur=0;const up=()=>{cur+=step;if(cur>=t){c.innerHTML=t.toLocaleString('ar-SA')+suf;return}c.innerHTML=Math.floor(cur).toLocaleString('ar-SA')+suf;requestAnimationFrame(up)};up()})}})},{threshold:.5});
        counters.forEach(c=>cObs.observe(c));

        document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',function(e){const t=document.querySelector(this.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}})});

        // === ORDER SYSTEM ===
        (function(){
            const WHATSAPP_NUMBER = '966545759422';
            let cart = [];

            // Audio for click sound
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = AudioContext ? new AudioContext() : null;
            function playClickSound() {
                if (!audioCtx) return;
                if (audioCtx.state === 'suspended') audioCtx.resume();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.05);
            }

            // Tab switching
            const tabs = document.querySelectorAll('.order-tab');
            const contents = document.querySelectorAll('.order-tab-content');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));
                    tab.classList.add('active');
                    const target = document.getElementById('content-' + tab.dataset.tab);
                    if (target) target.classList.add('active');
                    // Scroll services area back to top
                    const wrap = document.querySelector('.order-services-wrap');
                    if (wrap) wrap.scrollTo({ top: 0, behavior: 'smooth' });
                });
            });

            // Quantity buttons
            document.querySelectorAll('.order-service-card:not(.quote-card)').forEach(card => {
                const minusBtn = card.querySelector('.qty-minus');
                const plusBtn = card.querySelector('.qty-plus');
                const qtyNum = card.querySelector('.qty-num');
                const addBtn = card.querySelector('.add-to-order-btn');

                plusBtn.addEventListener('click', () => {
                    playClickSound();
                    let val = parseInt(qtyNum.textContent);
                    qtyNum.textContent = val + 1;
                });

                minusBtn.addEventListener('click', () => {
                    playClickSound();
                    let val = parseInt(qtyNum.textContent);
                    if (val > 0) qtyNum.textContent = val - 1;
                });

                addBtn.addEventListener('click', () => {
                    playClickSound();
                    let qty = parseInt(qtyNum.textContent);
                    if (qty === 0) qty = 1;
                    qtyNum.textContent = qty;
                    const service = card.dataset.service;
                    const serviceEn = card.dataset.serviceEn || service;
                    const price = parseInt(card.dataset.price);

                    const isFirst = cart.length === 0;
                    // Check if already in cart
                    const existing = cart.find(i => i.service === service);
                    if (existing) {
                        existing.qty = qty;
                    } else {
                        cart.push({ service, serviceEn, price, qty });
                    }
                    card.classList.add('in-cart');
                    const curLang = (window.i18n && window.i18n.getLang()) || 'ar';
                    addBtn.innerHTML = '<i class="fas fa-check"></i> ' + (curLang === 'en' ? 'Added' : 'تم الإضافة');
                    addBtn.classList.add('added');
                    // Bounce the floating cart button
                    const toggleBtn = document.getElementById('mobileCartToggle');
                    if (toggleBtn) {
                        toggleBtn.classList.add('has-items');
                        setTimeout(() => toggleBtn.classList.remove('has-items'), 500);
                    }
                    setTimeout(() => {
                        const nowLang = (window.i18n && window.i18n.getLang()) || 'ar';
                        addBtn.innerHTML = nowLang === 'en' ? 'Add to Order' : 'أضف للطلب';
                        addBtn.classList.remove('added');
                    }, 1500);
                    renderCart();

                    // Open cart drawer on every add
                    openMobileCart();
                });
            });

            // Quote buttons (services with price after visit)
            document.querySelectorAll('.quote-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const card = btn.closest('.order-service-card');
                    const curLang = (window.i18n && window.i18n.getLang()) || 'ar';
                    const isEn = curLang === 'en';
                    const service = (isEn && card.dataset.serviceEn) ? card.dataset.serviceEn : card.dataset.service;
                    const msg = isEn
                        ? encodeURIComponent(
                            `Hello 👋\n\nI would like to request an inspection quote for: *${service}*\n\nPlease contact me to schedule a convenient appointment.\n\nThank you 🙏`
                        )
                        : encodeURIComponent(
                            `السلام عليكم 👋\n\nأرغب في طلب زيارة تقييم لخدمة: *${service}*\n\nأرجو التواصل معي لتحديد الموعد المناسب.\n\nشكراً لكم 🙏`
                        );
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
                });
            });

            // Render cart
            function renderCart() {
                const cartItems = document.getElementById('cartItems');
                if (!cartItems) return;
                const cartEmpty = document.getElementById('cartEmpty');
                const cartFooter = document.getElementById('cartFooter');
                const cartCount = document.getElementById('cartCount');
                const cartTotal = document.getElementById('cartTotal');
                const mobileCount = document.querySelector('.mobile-cart-count');

                // Clear old items (keep empty state)
                cartItems.querySelectorAll('.cart-item').forEach(el => el.remove());

                if (cart.length === 0) {
                    cartEmpty.style.display = 'block';
                    cartFooter.style.display = 'none';
                    cartCount.textContent = '0';
                    if (mobileCount) mobileCount.textContent = '0';
                    const toggleBtn = document.getElementById('mobileCartToggle');
                    if (toggleBtn) toggleBtn.style.display = 'none';
                    // Remove in-cart class from all cards
                    document.querySelectorAll('.order-service-card.in-cart').forEach(c => c.classList.remove('in-cart'));
                    return;
                }

                const toggleBtn = document.getElementById('mobileCartToggle');
                if (toggleBtn) toggleBtn.style.display = 'flex';

                cartEmpty.style.display = 'none';
                cartFooter.style.display = 'block';

                let total = 0;
                let totalItems = 0;
                const curLang = (window.i18n && window.i18n.getLang()) || 'ar';
                const isEn = curLang === 'en';
                const currLabel = isEn ? ' SAR' : ' ر.س';
                const qtyLabel = isEn ? 'Qty: ' : 'العدد: ';

                cart.forEach((item, index) => {
                    total += item.price * item.qty;
                    totalItems += item.qty;
                    const name = isEn ? (item.serviceEn || item.service) : item.service;

                    const el = document.createElement('div');
                    el.className = 'cart-item';
                    el.innerHTML = `
                        <div class="cart-item-info">
                            <div class="cart-item-name">${name}</div>
                            <div class="cart-item-qty">${qtyLabel}${item.qty}</div>
                        </div>
                        <div class="cart-item-price">${(item.price * item.qty).toLocaleString()}${currLabel}</div>
                        <button class="cart-item-remove" data-index="${index}" aria-label="${isEn ? 'Remove' : 'حذف'}"><i class="fas fa-times"></i></button>
                    `;
                    cartItems.appendChild(el);
                });

                cartCount.textContent = totalItems;
                if (mobileCount) mobileCount.textContent = totalItems;
                cartTotal.textContent = total.toLocaleString() + currLabel;

                // Remove button listeners
                cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const idx = parseInt(btn.dataset.index);
                        const removed = cart[idx];
                        cart.splice(idx, 1);
                        // Remove in-cart class & reset qty
                        document.querySelectorAll('.order-service-card').forEach(card => {
                            if (card.dataset.service === removed.service) {
                                card.classList.remove('in-cart');
                                const qn = card.querySelector('.qty-num');
                                if (qn) qn.textContent = '0';
                            }
                        });
                        renderCart();
                    });
                });
            }

            // Clear cart
            const clearCartBtn = document.getElementById('clearCartBtn');
            if (clearCartBtn) {
                clearCartBtn.addEventListener('click', () => {
                    cart = [];
                    document.querySelectorAll('.order-service-card').forEach(card => {
                        card.classList.remove('in-cart');
                        const qn = card.querySelector('.qty-num');
                        if (qn) qn.textContent = '0';
                    });
                    renderCart();
                });
            }

            // Send order via WhatsApp
            const sendOrderBtn = document.getElementById('sendOrderBtn');
            if (sendOrderBtn) {
                sendOrderBtn.addEventListener('click', () => {
                    playClickSound();
                    if (cart.length === 0) return;

                    const curLang = (window.i18n && window.i18n.getLang()) || 'ar';
                    const isEn = curLang === 'en';
                    const currLabel = isEn ? ' SAR' : ' ر.س';

                    let total = 0;
                    let lines = cart.map(item => {
                        const subtotal = item.price * item.qty;
                        total += subtotal;
                        const name = isEn ? (item.serviceEn || item.service) : item.service;
                        return `• ${name} × ${item.qty} = ${subtotal.toLocaleString()}${currLabel}`;
                    });

                    const msg = isEn
                        ? encodeURIComponent(
                            `Hello 👋\n\n` +
                            `🛒 *New Order from Amdco Website*\n` +
                            `━━━━━━━━━━━━━━━━\n` +
                            lines.join('\n') + '\n' +
                            `━━━━━━━━━━━━━━━━\n` +
                            `💰 *Total: ${total.toLocaleString()} SAR*\n\n` +
                            `Please contact me to confirm the order and schedule an appointment.\n` +
                            `Thank you 🙏`
                        )
                        : encodeURIComponent(
                            `السلام عليكم 👋\n\n` +
                            `🛒 *طلب جديد من موقع أمدكو*\n` +
                            `━━━━━━━━━━━━━━━━\n` +
                            lines.join('\n') + '\n' +
                            `━━━━━━━━━━━━━━━━\n` +
                            `💰 *الإجمالي: ${total.toLocaleString()} ر.س*\n\n` +
                            `أرجو التواصل لتأكيد الطلب وتحديد الموعد.\n` +
                            `شكراً لكم 🙏`
                        );

                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
                });
            }

            // Sync cart language dynamically
            document.addEventListener('langchange', (e) => {
                const lang = (e.detail && e.detail.lang) ? e.detail.lang : 'ar';
                document.querySelectorAll('.add-to-order-btn:not(.added)').forEach(btn => {
                    btn.textContent = lang === 'en' ? 'Add to Order' : 'أضف للطلب';
                });
                document.querySelectorAll('.quote-btn').forEach(btn => {
                    btn.textContent = lang === 'en' ? 'Request Quote' : 'طلب تسعيرة';
                });
                renderCart();
            });

            // Mobile cart toggle
            const mobileCartToggle = document.getElementById('mobileCartToggle');
            const orderCart = document.getElementById('cartDrawer') || document.getElementById('orderCart');
            const cartOverlay = document.getElementById('cartOverlay');
            const cartCloseBtn = document.getElementById('cartCloseBtn');
            const cartToast = document.getElementById('cartToast');
            let toastTimer;

            function showToast(serviceName) {
                if (!cartToast) return;
                const nameEl = cartToast.querySelector('.toast-name');
                if (nameEl) nameEl.textContent = serviceName;
                
                cartToast.classList.add('show');
                clearTimeout(toastTimer);
                toastTimer = setTimeout(() => {
                    cartToast.classList.remove('show');
                }, 3000);
            }

            function openMobileCart() {
                if (!orderCart) return;
                orderCart.classList.add('mobile-open');
                if (cartOverlay) cartOverlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
            function closeMobileCart() {
                if (!orderCart) return;
                orderCart.classList.remove('mobile-open');
                if (cartOverlay) cartOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }

            if (mobileCartToggle && orderCart) {
                mobileCartToggle.addEventListener('click', () => {
                    if (orderCart.classList.contains('mobile-open')) {
                        closeMobileCart();
                    } else {
                        openMobileCart();
                    }
                });
            }
            if (cartCloseBtn) {
                cartCloseBtn.addEventListener('click', closeMobileCart);
            }
            if (cartOverlay) {
                cartOverlay.addEventListener('click', closeMobileCart);
            }
        })();

        // Preloader Logic
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => {
                        preloader.remove();
                    }, 600); // Wait for transition
                }, 600); // Pulse a bit for premium feel
            }
        });
