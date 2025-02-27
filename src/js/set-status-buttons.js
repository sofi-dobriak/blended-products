export function setStatusButtons(e) {
  const activeButton = document.querySelector('.categories__btn--active');

  if (activeButton && activeButton !== e.target) {
    activeButton.classList.remove('categories__btn--active');
  }

  e.target.classList.add('categories__btn--active');
}
