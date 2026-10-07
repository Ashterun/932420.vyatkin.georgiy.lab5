const name = prompt('Введите ваше имя:');
const scores = [];
let countFail = 0;

if (name) {
  alert(`Привет, ${name}!`);
  console.log(`Имя: ${name}`);
} else {
  alert('Привет!');
  console.log('Имя не было введено.');
}

for (let i = 0; i < 7; i++) {
  scores[i] = Math.floor(Math.random() * 101);
}

for (let i = 0; i < scores.length; i++) {
  if (scores[i] < 50) {
    countFail++;
  }
}

function findMax(scores) {
  let max = scores[0];

  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > max) {
      max = scores[i];
    }
  }

  return max;
}

function filterHighScores(scores) {
  const highScores = [];

  for (let i = 0; i < scores.length; i++) {
    if (scores[i] >= 80) {
      highScores.push(scores[i]);
    }
  }

  return highScores;
}

function calculateSum(scores) {
  let sum = 0;

  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }

  return sum;
}

const maxScore = findMax(scores);
const highScores = filterHighScores(scores);
const totalSum = calculateSum(scores);
const averageScore = totalSum / scores.length;

alert(`У вас ${highScores.length} отличных работ, максимальный балл - ${maxScore}`);
console.log(`Средний балл: ${averageScore}`);
console.log(`Количество неудовлетворительных работ: ${countFail}`);

if (averageScore >= 85) {
    console.log('Отличная работа! Молодец!');
}

function checkElement(element, elementName) {
  if (!element) {
    console.error(`Ошибка: элемент "${elementName}" не найден`);
    return false;
  }

  return true;
}

function switchTheme() {
  const body = document.body;

  if (!checkElement(body, 'body')) return;

  if (body.classList.contains('theme-light')) {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
    localStorage.setItem('theme', 'light');
  }
}

function restoreState() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('theme-dark');
  } else {
    document.body.classList.add('theme-light');
  }

}

document.addEventListener('DOMContentLoaded', function () {
  const projectsSection = document.getElementById('projects');
  const header = projectsSection.querySelector('h3');

  if (
    checkElement(projectsSection, 'projects-section') &&
    checkElement(header, 'projects-header')
  ) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'projects-controls';

    const addButton = document.createElement('button');
    addButton.id = 'add-projects-button';
    addButton.textContent = 'Добавить проект';

    const removeButton = document.createElement('button');
    removeButton.id = 'remove-projects-button';
    removeButton.textContent = 'Удалить последний';

    const switchButton = document.createElement('button');
    switchButton.id = 'switch-projects-button';
    switchButton.textContent = 'Свернуть проекты';

    const themeButton = document.createElement('button');
    themeButton.id = 'theme-switch-button';
    themeButton.textContent = 'Переключить тему';

    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(removeButton);
    buttonContainer.appendChild(switchButton);
    buttonContainer.appendChild(themeButton);

    header.parentNode.insertBefore(buttonContainer, header.nextSibling);

    themeButton.addEventListener('click', switchTheme);

    restoreState();
  }
});
