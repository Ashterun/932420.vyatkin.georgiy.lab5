const name = prompt('Введите ваше имя:');
const scores = [];
let countFail = 0;

if (name) {
  alert(`Привет, ${name}!`);
  console.log(`Имя: ${name}`);
} else {
  alert(`Привет!`);
  console.log(`Имя не было введено.`);
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
    console.log(`Отличная работа! Молодец!`);
}
