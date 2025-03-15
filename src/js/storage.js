//Робота з localStorage

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

export function saveToSS(key, value) {
  const data = JSON.stringify(value);
  sessionStorage.setItem(key, data);
}

export function loadFromSS(key) {
  const data = sessionStorage.getItem(key);

  try {
    const parseData = JSON.parse(data);
    return parseData || '';
  } catch {
    return '';
  }
}
