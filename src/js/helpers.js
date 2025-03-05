import { refs } from './refs';

//Допоміжні функції
export function setStatusButtons(e) {
  const activeButton = document.querySelector('.categories__btn--active');

  if (activeButton && activeButton !== e.target) {
    activeButton.classList.remove('categories__btn--active');
  }

  e.target.classList.add('categories__btn--active');
}

export function showNotFoundMessage() {
  refs.notFoundDiv.classList.add('not-found--visible');
}

export function hideNotFoundMessage() {
  refs.notFoundDiv.classList.remove('not-found--visible');
}

export function showLoadMoreButton() {
  refs.loadMoreButton.classList.remove('hide');
}

export function hideLoadMoreButton() {
  refs.loadMoreButton.classList.add('hide');
}

export function saveToLS(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}

export function loadFromLS(key) {
  const data = localStorage.getItem(key);

  try {
    const parseData = JSON.parse(data);
    return Array.isArray(parseData) ? parseData : [];
  } catch {
    return [];
  }
}
