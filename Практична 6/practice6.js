const apiURL = 'https://jsonplaceholder.typicode.com/users';
const loader = document.getElementById('loader');
const container = document.getElementById('data-container');
const searchInput = document.getElementById('searchInput');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const pageNumber = document.getElementById('pageNumber');

let currentPage = 1;
const itemsPerPage = 3;
let allUsers = [];

async function fetchData() {
  showLoader();

  try {
    const cached = localStorage.getItem('users');
    if (cached) {
      allUsers = JSON.parse(cached);
      displayData();
      hideLoader();
    } else {
      const res = await fetch(apiURL);
      if (!res.ok) throw new Error('Помилка при завантаженні даних');
      allUsers = await res.json();
      localStorage.setItem('users', JSON.stringify(allUsers));
      displayData();
      hideLoader();
    }
  } catch (err) {
    container.innerHTML = `<p style="color:red;">${err.message}</p>`;
    hideLoader();
  }
}

function displayData() {
  const filtered = filterData();
  const paginated = paginate(filtered);
  container.innerHTML = '';

  if (paginated.length === 0) {
    container.innerHTML = '<p>Нічого не знайдено.</p>';
    return;
  }

  paginated.forEach(user => {
    const div = document.createElement('div');
    div.classList.add('user-card');
    div.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Телефон:</strong> ${user.phone}</p>
    `;
    container.appendChild(div);
  });

  pageNumber.textContent = currentPage;
}

function filterData() {
  const query = searchInput.value.toLowerCase();
  return allUsers.filter(user => user.name.toLowerCase().includes(query));
}

function paginate(data) {
  const start = (currentPage - 1) * itemsPerPage;
  return data.slice(start, start + itemsPerPage);
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

searchInput.addEventListener('input', () => {
  currentPage = 1;
  displayData();
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayData();
  }
});

nextBtn.addEventListener('click', () => {
  const filtered = filterData();
  if (currentPage * itemsPerPage < filtered.length) {
    currentPage++;
    displayData();
  }
});

fetchData();
