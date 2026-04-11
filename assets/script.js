document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');

    btn.addEventListener('click', () => {
        const isHidden = menu.classList.toggle('hidden');
        btn.innerHTML = isHidden ? '☰' : '✕';
    });

    window.showPage = function(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            targetPage.classList.add('content-visible');
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        menu.classList.add('hidden');
        btn.innerHTML = '☰';
    };

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const page = link.getAttribute('data-page');
            showPage(page);
        });
    });

    VANTA.NET({
        el: "#vanta-canvas",
        mouseControls: true,
        touchControls: true,
        gyroControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x473fff,
        backgroundColor: 0x0
    });

    setTimeout(() => {
        const canvas = document.getElementById('vanta-canvas');
        if (canvas) canvas.classList.add('vanta-loaded');
        showPage('home');
    }, 100);
});