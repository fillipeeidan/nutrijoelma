// Dra. Joelma Marinho Landing Page - Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('menuToggle');
    const mobileDropdown = document.getElementById('mobileDropdown');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .btn-mobile-dropdown');

    if (menuToggle && mobileDropdown) {
        menuToggle.addEventListener('click', () => {
            const isActive = mobileDropdown.classList.contains('active');
            if (isActive) {
                mobileDropdown.classList.remove('active');
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            } else {
                mobileDropdown.classList.add('active');
                menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            }
        });

        // Close menu when clicking any dropdown link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDropdown.classList.remove('active');
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // 2. FAQ Accordion Interactivity
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isOpen = faqItem.classList.contains('active');

            // Close all items first
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = null;
            });

            // Toggle clicked item
            if (!isOpen) {
                faqItem.classList.add('active');
                const answer = faqItem.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            }
        });
    });

});
