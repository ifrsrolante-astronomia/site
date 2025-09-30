function initSearchAndPaginate(options) {
  const {
    searchInputId,
    listContainerSelector,
    listItemSelector,
    emptyStateSelector,
    dataAttribute,
    perPage
  } = options;

  const searchInput = document.getElementById(searchInputId);
  if (!searchInput) return;

  const listEl = document.querySelector(listContainerSelector);
  const allItems = Array.from(listEl.querySelectorAll(listItemSelector));
  const emptyEl = document.querySelector(emptyStateSelector);

  function normalizeText(s) {
    if (!s) return '';
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  allItems.forEach(it => {
    const raw = it.getAttribute(dataAttribute) || '';
    it.dataset.normalizedSearch = normalizeText(raw);
  });

  function filterItems(query) {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) return allItems;
    return allItems.filter(it => it.dataset.normalizedSearch.includes(normalizedQuery));
  }

  function render(query) {
    const filtered = filterItems(query);
    listEl.innerHTML = ''; 

    if (filtered.length === 0) {
      emptyEl.style.display = 'block';
    } else {
      emptyEl.style.display = 'none';
      filtered.forEach(item => listEl.appendChild(item));
    }
  }

  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      render(searchInput.value);
    }, 250);
  });

  render('');
}