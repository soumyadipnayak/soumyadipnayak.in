document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');

    btn.addEventListener('click', () => {
        const isHidden = menu.classList.toggle('hidden');
        btn.innerHTML = isHidden ? '☰' : '✕';
    });

    function showPage(pageId, addToHistory = true) {
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

        if (addToHistory) {
            history.pushState({ page: pageId }, "", `#${pageId}`);
        }
    }

    window.showPage = showPage;

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const page = link.getAttribute('data-page');
            showPage(page);
        });
    });

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.page) {
            showPage(event.state.page, false);
        } else {
            showPage('home', false);
        }
    });

    const initialPage = window.location.hash.replace('#', '') || 'home';
    showPage(initialPage, false);
});