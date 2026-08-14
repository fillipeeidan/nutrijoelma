// Dra. Joelma Marinho Landing Page - Interactive & Modal Scripts
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('menuToggle');
    const mobileDropdown = document.getElementById('mobileDropdown');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

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

    // 3. Lead Capture Modal Pop-up Logic
    const leadModal = document.getElementById('leadModal');
    const modalClose = document.getElementById('modalClose');
    const leadForm = document.getElementById('leadForm');
    const openModalTriggers = document.querySelectorAll('.open-modal-trigger');
    const leadPhoneInput = document.getElementById('leadPhone');

    const openModal = () => {
        if (!leadModal) return;
        leadModal.classList.add('active');
        leadModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        
        // Focus first input field
        const firstInput = document.getElementById('leadName');
        if (firstInput) setTimeout(() => firstInput.focus(), 150);
    };

    const closeModal = () => {
        if (!leadModal) return;
        leadModal.classList.remove('active');
        leadModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    // Attach click handlers to all CTA triggers
    openModalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileDropdown && mobileDropdown.classList.contains('active')) {
                mobileDropdown.classList.remove('active');
                if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
            
            openModal();
        });
    });

    // Close modal triggers
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (leadModal) {
        leadModal.addEventListener('click', (e) => {
            if (e.target === leadModal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && leadModal && leadModal.classList.contains('active')) {
            closeModal();
        }
    });

    // WhatsApp Phone Formatting Mask ( (82) 99999-9999 )
    if (leadPhoneInput) {
        leadPhoneInput.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 11) v = v.substring(0, 11);

            if (v.length > 10) {
                // (XX) XXXXX-XXXX
                v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if (v.length > 6) {
                // (XX) XXXX-XXXX
                v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
            } else if (v.length > 2) {
                // (XX) XXX
                v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
            } else if (v.length > 0) {
                v = v.replace(/^(\d{0,2})$/, '($1');
            }

            e.target.value = v;
        });
    }

    // Lead Form Submit Handler
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('leadName');
            const phoneInput = document.getElementById('leadPhone');
            const emailInput = document.getElementById('leadEmail');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';

            // Reset error states
            [nameInput, phoneInput, emailInput].forEach(inp => {
                if (inp) inp.classList.remove('input-error');
            });

            let hasError = false;

            if (!name) {
                if (nameInput) nameInput.classList.add('input-error');
                hasError = true;
            }

            if (!phone || phone.replace(/\D/g, '').length < 10) {
                if (phoneInput) phoneInput.classList.add('input-error');
                hasError = true;
            }

            if (!email || !email.includes('@')) {
                if (emailInput) emailInput.classList.add('input-error');
                hasError = true;
            }

            if (hasError) {
                return;
            }

            // Format custom WhatsApp redirection message
            const customMessage = `Oi doutora, eu me chamo ${name} e quero saber mais sobre sua consulta.`;
            const waNumber = '5582999257916';
            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(customMessage)}`;

            // Open WhatsApp in a new tab
            window.open(waUrl, '_blank');

            // Close modal & reset form
            closeModal();
            leadForm.reset();
        });
    }

});
