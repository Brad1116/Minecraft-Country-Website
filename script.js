// script.js

// 1. 處理漢堡菜單開關
function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('open');
}

// 3. 處理同步導覽列內容 (模板功能)
function updateNavigation() {
    // 定義您的網站結構在這裡，方便未來統一修改
    const navItems = [
        { name: '首頁', href: 'index.html' },
        { name: '憲法', href: 'constitution.html' },
        { name: '國家架構', href: 'structure.html' },
        { name: '聯絡方式', href: 'contact.html' } // 新增聯絡方式
    ];

    const navElement = document.querySelector('nav .nav-links');
    if (navElement) {
        navElement.innerHTML = ''; // 清空現有內容

        navItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.href;
            link.textContent = item.name;
            navElement.appendChild(link);
        });
    }
}

// 4. 根據裝置設定自動調整夜覽模式
function applyDeviceDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// 頁面加載時執行
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    applyDeviceDarkMode();
    
    // 監聽裝置主題變更
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyDeviceDarkMode);
});
