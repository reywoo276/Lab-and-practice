const items = [
    { name: "Ноутбук", price: 30000, category: "Електроніка" },
    { name: "Футболка", price: 500, category: "Одяг" },
    { name: "Книга з JavaScript", price: 400, category: "Книги" },
    { name: "Смартфон", price: 25000, category: "Електроніка" },
    { name: "Куртка", price: 1500, category: "Одяг" },
    { name: "Роман", price: 300, category: "Книги" },
  ];
  
  class FilterSystem {
    constructor(data) {
      this.originalData = data;
      this.filteredData = [...data];
  
      this.state = {
        search: '',
        category: '',
        sortBy: 'name'
      };
  
      this.loadState();
      this.initEvents();
      this.applyFilters();
    }
  
    initEvents() {
      document.getElementById('search').addEventListener('input', (e) => {
        this.state.search = e.target.value.toLowerCase();
        this.applyFilters();
      });
  
      document.getElementById('categoryFilter').addEventListener('change', (e) => {
        this.state.category = e.target.value;
        this.applyFilters();
      });
  
      document.getElementById('sortBy').addEventListener('change', (e) => {
        this.state.sortBy = e.target.value;
        this.applyFilters();
      });
  
      document.getElementById('resetFilters').addEventListener('click', () => {
        this.state = { search: '', category: '', sortBy: 'name' };
        this.saveState();
        this.updateControls();
        this.applyFilters();
      });
    }
  
    applyFilters() {
      this.filteredData = this.originalData
        .filter(item =>
          item.name.toLowerCase().includes(this.state.search) &&
          (this.state.category === '' || item.category === this.state.category)
        );
  
      this.sortData();
      this.renderItems();
      this.renderActiveFilters();
      this.saveState();
    }
  
    sortData() {
      const sort = this.state.sortBy;
      this.filteredData.sort((a, b) => {
        if (sort === 'priceAsc') return a.price - b.price;
        if (sort === 'priceDesc') return b.price - a.price;
        return a.name.localeCompare(b.name);
      });
    }
  
    renderItems() {
      const container = document.getElementById('items-container');
      container.innerHTML = '';
  
      if (this.filteredData.length === 0) {
        container.innerHTML = '<p>Нічого не знайдено.</p>';
        return;
      }
  
      this.filteredData.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
          <h4>${item.name}</h4>
          <p>Ціна: ${item.price} грн</p>
          <p>Категорія: ${item.category}</p>
        `;
        container.appendChild(div);
      });
    }
  
    renderActiveFilters() {
      const { search, category, sortBy } = this.state;
      const out = [];
  
      if (search) out.push(`Пошук: "${search}"`);
      if (category) out.push(`Категорія: ${category}`);
      if (sortBy !== 'name') {
        const sortLabel = sortBy === 'priceAsc' ? 'Ціна ↑' : 'Ціна ↓';
        out.push(`Сортування: ${sortLabel}`);
      }
  
      document.getElementById('active-filters').textContent = out.join(', ') || 'Фільтри не застосовані';
    }
  
    saveState() {
      localStorage.setItem('filterState', JSON.stringify(this.state));
    }
  
    loadState() {
      const saved = localStorage.getItem('filterState');
      if (saved) {
        this.state = JSON.parse(saved);
        this.updateControls();
      }
    }
  
    updateControls() {
      document.getElementById('search').value = this.state.search;
      document.getElementById('categoryFilter').value = this.state.category;
      document.getElementById('sortBy').value = this.state.sortBy;
    }
  }
  
  new FilterSystem(items);
  