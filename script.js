const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Загрузка текущей темы из localStorage 
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  body.classList.add(currentTheme);
}

// Обработчик для кнопки переключения темы
themeToggle.addEventListener('click', () => {
  if (body.classList.contains('light')) {
    body.classList.replace('light', 'dark');
    localStorage.setItem('theme', 'dark');
    updateTextElements('dark');
  } else {
    body.classList.replace('dark', 'light');
    localStorage.setItem('theme', 'light');
    updateTextElements('light');
  }
});

// Функция для загрузки темы из JSON
async function loadThemeFromJSON() {
  try {
    const response = await fetch('theme.json');
    const themeData = await response.json();

    if (themeData.theme === 'dark') {
      body.classList.add('dark');
      updateTextElements('dark');
    } else {
      body.classList.add('light');
      updateTextElements('light');
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
}

// Функция для обновления цвета текста на карточках и в блоках
function updateTextElements(theme) {
  const textElements = document.querySelectorAll('.card, .block');
  textElements.forEach(element => {
    if (theme === 'dark') {
      element.style.color = '#fcfcfc;'; // Светлый цвет текста на темной теме
    } else {
      element.style.color = '#333'; // Темный цвет текста на светлой теме 
    }
  });
}

loadThemeFromJSON();