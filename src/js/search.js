const input = document.querySelector("search-form__field");
const modalform = document.querySelector('.modal-form');
const first_button = document.querySelector(".header__search");
const overlay = document.querySelector('.modal-overlay');
const closeModalBtn = document.querySelector('button[data-action="close-modal-form"]');
first_button.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
closeModalBtn.addEventListener('click', closeModal);

export default function openModal(e) {
  e.preventDefault();
  modalform.classList.add('is-open');
  overlay.classList.add('is-open');
  window.addEventListener('keydown', handleButtonPress)
}

function closeModal() {
  modalform.classList.remove('is-open');
  overlay.classList.remove('is-open');
  window.removeEventListener('keydown', handleButtonPress)
}

function handleButtonPress(e) {
  if(e.code !== 'Escape') {
  return;
  }
  closeModal();
}
