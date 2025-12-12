// script.js

// 1. 處理漢堡菜單開關
function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('open');
}

// 2. 處理同步導覽列內容
function updateNavigation() {
    const navItems = [
        { name: '🏠 首頁', href: 'index.html' },
        { name: '⚖️ 憲法', href: 'constitution.html' },
        { name: '🏛️ 國家架構', href: 'structure.html' },
        { name: '📬 聯絡方式', href: 'contact.html' }
    ];

    const navElement = document.querySelector('nav .nav-links');
    if (navElement) {
        navElement.innerHTML = '';
        navItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.href;
            link.textContent = item.name;
            navElement.appendChild(link);
        });
    }
}

// 3. 根據裝置設定自動調整夜覽模式
function applyDeviceDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// 4. 修憲匯報排序功能
const constitutionalUpdates = [
    { date: '2025-12-04', version: 'v.1.1-2', title: '國家領事局：第一次憲法更新', content: '確立本憲法的正統性', link: '#' },
    { date: '2025-12-01', version: 'v.1.0', title: '憲法發布', content: '國家憲法第一版正式發布，確立基本法源。', link: '#' },
];

function renderUpdates(updates) {
    const container = document.querySelector('.updates-container');
    if (!container) return;

    container.innerHTML = '';

    updates.forEach(update => {
        const cardHTML = `
            <a href="${update.link}" class="update-card">
                <div class="card-image-placeholder">
                    圖 片
                </div>
                <div class="card-content">
                    <h3>${update.title}</h3>
                    <div class="meta-row">
                        <div class="meta-group">
                            <span class="card-label">版本</span>
                            <span class="meta-value">${update.version}</span>
                        </div>
                        <div class="meta-group date-group">
                            <span class="card-label">日期</span>
                            <span class="meta-value">${update.date.substring(5)}</span>
                        </div>
                    </div>
                    <div class="content-row">
                        <span class="card-label">變更內容</span>
                        <span class="content-value">${update.content}</span>
                    </div>
                    <p class="read-more">點擊查看詳情...</p>
                </div>
            </a>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function sortUpdates() {
    const selectElement = document.getElementById('sortOrder');
    if (!selectElement) return;

    const order = selectElement.value;
    let sortedUpdates = [...constitutionalUpdates];

    sortedUpdates.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return order === 'newest' ? dateB - dateA : dateA - dateB;
    });

    renderUpdates(sortedUpdates);
}

// --- 5. 處理頭條進場動畫 ---
function initHeroEntranceAnimation() {
    const hero = document.querySelector('.hero-banner');
    if (!hero) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                hero.classList.add('visible');
                observer.unobserve(hero);
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(hero);
}

// --- 6. 處理頭條捲動漸變效果 ---
function initHeroScrollFade() {
    const hero = document.querySelector('.hero-banner');
    const overlay = document.querySelector('.hero-overlay');
    if (!hero || !overlay) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;

        // 計算捲動進度 (延長變色時間：捲動到 1.5 倍高度才全黑)
        let progress = scrollY / (heroHeight * 1.5);
        progress = Math.min(Math.max(progress, 0), 1);

        overlay.style.opacity = progress;
    });
}


// 頁面加載時執行
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    applyDeviceDarkMode();
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyDeviceDarkMode);

    if (document.querySelector('.updates-container')) {
        sortUpdates();
    }

    initHeroEntranceAnimation();
    initHeroScrollFade();
});