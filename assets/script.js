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

    // Contact dropdowns
    const contactBtn = document.getElementById('contactBtn');
    const contactDropdown = document.getElementById('contactDropdown');

    const mobileContactBtn = document.getElementById('mobileContactBtn');
    const mobileContactDropdown = document.getElementById('mobileContactDropdown');

    function closeContactDropdowns() {
        [contactDropdown, mobileContactDropdown].forEach(dropdown => {
            if (dropdown) {
                dropdown.classList.add('hidden');
            }
        });

        [contactBtn, mobileContactBtn].forEach(button => {
            if (button) {
                button.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function toggleContactDropdown(button, dropdown) {
        if (!button || !dropdown) return;

        const shouldOpen = dropdown.classList.contains('hidden');

        closeContactDropdowns();

        if (shouldOpen) {
            dropdown.classList.remove('hidden');
            button.setAttribute('aria-expanded', 'true');
        }
    }

    // Desktop
    contactBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleContactDropdown(contactBtn, contactDropdown);
    });

    // Mobile
    mobileContactBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleContactDropdown(
            mobileContactBtn,
            mobileContactDropdown
        );
    });

    // Prevent clicks inside dropdown from closing it
    [contactDropdown, mobileContactDropdown].forEach(dropdown => {
        dropdown?.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
        closeContactDropdowns();
    });
});