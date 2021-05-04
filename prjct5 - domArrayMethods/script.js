const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionariesBtn = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();

// Fetch random user and money
async function getRandomUser () {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name : `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser)
}

// Add a new object to data arr
function addData (obj) {
  data.push(obj);

  updateDOM();
}

// Doubles everyones money
function doubleMoney () {
  data = data.map(user => {
    return { ...user, money: user.money * 2};
  });
  updateDOM();
}

// Sort by riches
function sortByRichest () {
  data.sort((a,b) => b.money - a.money);

  updateDOM();
}

// Show only millionaries
function showMillionaries () {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

// Calculate the total wealth
function calculateWealth () {
  const wealth = data.reduce((acc, user) => (acc += user.money),0)
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(wealth)}</strong></h3>`
  main.appendChild(wealthEl)
}
// Update DOM
function updateDOM (providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element)
  });
}

// format number as money
function formatMoney (number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// add event listners
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortButton.addEventListener('click',sortByRichest);
showMillionariesBtn.addEventListener('click',showMillionaries);
calculateWealthBtn.addEventListener('click',calculateWealth);