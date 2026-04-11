document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');

    // --- Mobile Menu Toggle ---
    btn.addEventListener('click', () => {
        const isHidden = menu.classList.toggle('hidden');
        btn.innerHTML = isHidden ? '☰' : '✕';
    });

    // --- Page Switching Logic ---
    window.showPage = function(pageId) { // Attached to window so onclick="" can find it
        // 1. Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));

        // 2. Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            targetPage.classList.add('content-visible');
        }

        // 3. Update active state in Navbar
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        // 4. Close mobile menu
        menu.classList.add('hidden');
        btn.innerHTML = '☰';
    };

    // --- Initialize Click Listeners ---
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const page = link.getAttribute('data-page');
            showPage(page);
        });
    });

    // --- Vanta Setup ---
    VANTA.NET({
        el: "#vanta-canvas",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x473fff,
        backgroundColor: 0x0
    });

    // --- Unified Reveal ---
    setTimeout(() => {
        const canvas = document.getElementById('vanta-canvas');
        if (canvas) canvas.classList.add('vanta-loaded');
        showPage('home');
    }, 100);
});