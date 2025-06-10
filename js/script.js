// script.js

const allUsersBtn = document.getElementById('getAll');
const underTenBtn = document.getElementById('getUnderTen');
const resetBtn = document.getElementById('reset');
const userCards = document.getElementById('userCards');

const DATA_URL = 'https://dan-collins-dev.github.io/dummy-data-fetching-repo/data/users.json';

async function fetchUsers() {
    try {
        const res = await fetch(DATA_URL);
        if (!res.ok) throw new Error('Network response was not ok');
        return await res.json();
    } catch (err) {
        console.error('Fetching users failed:', err);
    }
}

function createUserCard(user) {
    const card = document.createElement('div');
    card.classList.add('user-card');

    card.innerHTML = `
        <p><strong>${user.firstName} ${user.lastName}</strong></p>
        <p>${user.email}</p>
        <p>${user.companyName}</p>
        <p>Years Employed: ${user.yearsEmployed}</p>
    `;

    userCards.appendChild(card);
}

function clearCards() {
    userCards.innerHTML = '';
}

allUsersBtn.addEventListener('click', async () => {
    clearCards();
    const users = await fetchUsers();
    users.forEach(createUserCard);
});

underTenBtn.addEventListener('click', async () => {
    clearCards();
    const users = await fetchUsers();
    users.filter(u => u.yearsEmployed < 10).forEach(createUserCard);
});

resetBtn.addEventListener('click', clearCards);
