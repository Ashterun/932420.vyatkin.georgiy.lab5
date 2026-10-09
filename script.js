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

function saveProjects() {
  const projectsContainer = document.querySelector('.projects-flex');

  if (!checkElement(projectsContainer, 'projects-container')) return;

  const projects = projectsContainer.querySelectorAll('.projects-card');
  const projectsData = [];

  projects.forEach((project, index) => {
    if (index > 2) {
      const h3 = project.querySelector('h3');
      const p = project.querySelector('p');

      if (h3 && p) {
        projectsData.push({
          name: h3.textContent,
          description: p.textContent,
        });
      }
    }
  });

  localStorage.setItem('custom-projects', JSON.stringify(projectsData));
}

function createProjectCard(projectName, projectDescription) {
  const article = document.createElement('article');
  article.className = 'projects-card';

  const iconDiv = document.createElement('div');
  iconDiv.className = 'projects-icon';
  iconDiv.textContent = '📌';

  const infoDiv = document.createElement('div');
  infoDiv.className = 'projects-info';

  const h3 = document.createElement('h3');
  h3.textContent = projectName;

  const p = document.createElement('p');
  p.textContent = projectDescription;

  const button = document.createElement('button');
  button.textContent = 'Подробнее';

  infoDiv.appendChild(h3);
  infoDiv.appendChild(p);
  infoDiv.appendChild(button);

  article.appendChild(iconDiv);
  article.appendChild(infoDiv);

  return article;
}

function addProject() {
  const projectsContainer = document.querySelector('.projects-flex');
  const addButton = document.getElementById('add-projects-button');

  if (!checkElement(projectsContainer, 'projects-container')) return;
  if (!checkElement(addButton, 'add-projects-button')) return;

  const projectName = prompt('Введите название проекта:');

  if (!projectName) return;

  const projectDescription = prompt('Введите описание проекта:');

  if (!projectDescription) return;

  const article = createProjectCard(projectName, projectDescription);
  projectsContainer.appendChild(article);
  saveProjects();
}

function removeLastProject() {
  const projectsContainer = document.querySelector('.projects-flex');
  const removeButton = document.getElementById('remove-projects-button');

  if (!checkElement(projectsContainer, 'projects-container')) return;
  if (!checkElement(removeButton, 'remove-projects-button')) return;

  const projects = projectsContainer.querySelectorAll('.projects-card');

  if (projects.length > 0) {
    projects[projects.length - 1].remove();
    saveProjects();
  } else {
    console.log('Нет проектов для удаления');
    alert('Список пуст');
  }
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

function switchProjects() {
  const projectsContainer = document.querySelector('.projects-flex');
  const switchButton = document.getElementById('switch-projects-button');

  if (!checkElement(projectsContainer, 'projects-container')) return;
  if (!checkElement(switchButton, 'switch-projects-button')) return;

  if (projectsContainer.classList.contains('hidden')) {
    projectsContainer.classList.remove('hidden');
    switchButton.textContent = 'Свернуть проекты';
    localStorage.setItem('projects-visible', 'false');
  } else {
    projectsContainer.classList.add('hidden');
    switchButton.textContent = 'Показать проекты';
    localStorage.setItem('projects-visible', 'true');
  }
}

function restoreState() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('theme-dark');
  } else {
    document.body.classList.add('theme-light');
  }

  const projectsVisible = localStorage.getItem('projects-visible');
  const projectsContainer = document.querySelector('.projects-flex');
  const switchButton = document.getElementById('switch-projects-button');

  if (
    checkElement(projectsContainer, 'projects-container') &&
    checkElement(switchButton, 'switch-projects-button')
  ) {
    if (projectsVisible === 'false') {
      projectsContainer.classList.add('hidden');
      switchButton.textContent = 'Показать проекты';
    } else {
      projectsContainer.classList.remove('hidden');
      switchButton.textContent = 'Свернуть проекты';
    }
  }

  const savedProjects = localStorage.getItem('custom-projects');

  if (savedProjects) {
    try {
      const projectsData = JSON.parse(savedProjects);
      const projectsContainer = document.querySelector('.projects-flex');

      if (checkElement(projectsContainer, 'projects-container')) {
        projectsData.forEach((project) => {
          const article = createProjectCard(project.name, project.description);

          projectsContainer.appendChild(article);
        });
      }
    } catch (error) {
      console.error('Ошибка при восстановлении проектов:', error);
    }
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

    addButton.addEventListener('click', addProject);
    removeButton.addEventListener('click', removeLastProject);
    switchButton.addEventListener('click', switchProjects);
    themeButton.addEventListener('click', switchTheme);

    restoreState();
  }
});
