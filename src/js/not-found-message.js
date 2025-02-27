export function showNotFoundMessage() {
  refs.notFoundDiv.classList.add('not-found--visible');
}

export function hideNotFoundMessage() {
  refs.notFoundDiv.classList.remove('not-found--visible');
}
