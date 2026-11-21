const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    });
  });
}

const contactModal = document.querySelector('#contact-modal');
if (contactModal) {
  const closeButtons = contactModal.querySelectorAll('[data-modal-close]');
  const dismissedKey = 'rank-risers-contact-popup-dismissed';
  let previousFocus;

  const closeModal = () => {
    contactModal.classList.remove('is-visible');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    sessionStorage.setItem(dismissedKey, 'true');
    if (previousFocus) previousFocus.focus();
  };

  const openModal = () => {
    if (sessionStorage.getItem(dismissedKey) === 'true') return;
    previousFocus = document.activeElement;
    contactModal.classList.add('is-visible');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const closeButton = contactModal.querySelector('.contact-modal__close');
    if (closeButton) closeButton.focus();
  };

  closeButtons.forEach((button) => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contactModal.classList.contains('is-visible')) closeModal();
  });
  window.setTimeout(openModal, 3000);
}

const projectForm = document.querySelector('#project-form');
if (projectForm) {
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(projectForm);
    const subject = encodeURIComponent(`Project inquiry from ${formData.get('name')}`);
    const body = encodeURIComponent(
      `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nService: ${formData.get('service')}\n\nProject details:\n${formData.get('message')}`
    );
    window.location.href = `mailto:hello@rankrisersdigital.com?subject=${subject}&body=${body}`;
  });
}
