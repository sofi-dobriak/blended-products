//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

import { updateWishList, updateCardList } from './handlers';
import { refs } from './refs';

export function openModal() {
  refs.modalBackdrop.classList.add('modal--is-open');

  refs.closeButton.addEventListener('click', closeModal);
  refs.modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', onEscapeClick);

  updateWishList();
  updateCardList();
}

export function closeModal(e) {
  if (!e || e.target === refs.modalBackdrop || e.target === refs.closeButton) {
    refs.modalBackdrop.classList.remove('modal--is-open');

    refs.closeButton.removeEventListener('click', closeModal);
    refs.modalBackdrop.removeEventListener('click', closeModal);

    document.removeEventListener('keydown', onEscapeClick);
  }
}

function onEscapeClick(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}
