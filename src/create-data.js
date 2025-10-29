const fs = require('fs');
const path = require('path');

console.log('🎯 Creating data files for production...');

// Создаем папку static/db в build
const dataDir = path.join(process.cwd(), 'build', 'static', 'db');
fs.mkdirSync(dataDir, { recursive: true });

// Создаем данные
const data = {
  greeting: "🎉 ПРИВЕТ! GitHub Pages РАБОТАЕТ! 🚀"
};

// Сохраняем в JSON файл
const filePath = path.join(dataDir, 'data.json');
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log('✅ Файл создан:', filePath);
console.log('📁 Содержимое:', JSON.stringify(data, null, 2));

// Проверяем что файл создался
if (fs.existsSync(filePath)) {
  console.log('🎉 УСПЕХ! Файл data.json создан в билде!');
} else {
  console.log('❌ ОШИБКА! Файл не создался!');
}
