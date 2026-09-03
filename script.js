const currentTime = document.querySelector('#currentTime');
const checkButton = document.querySelector('#checkButton');
const checkMessage = document.querySelector('#checkMessage');
const checkDetail = document.querySelector('#checkDetail');

function updateClock() {
  currentTime.textContent = new Date().toLocaleTimeString('ru-RU');
}

checkButton.addEventListener('click', () => {
  const time = new Date().toLocaleTimeString('ru-RU');
  checkMessage.textContent = 'Страница отвечает';
  checkDetail.textContent = `Проверка выполнена локально в ${time}. Если вы видите это, файлы загружены.`;
  checkButton.innerHTML = 'Проверено <span>✓</span>';
});

updateClock();
setInterval(updateClock, 1000);
