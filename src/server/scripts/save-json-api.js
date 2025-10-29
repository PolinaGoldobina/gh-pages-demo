const fs = require('fs');
const path = require('path');

// Создаем данные для production
const db = {
  data: { 
    greeting: "Hello from GitHub Pages! 🚀 Successfully deployed!" 
  }
};

// Создаем папку для данных
const dbDir = path.join(__dirname, '../../../build/static/db');
fs.mkdirSync(dbDir, { recursive: true });

console.log('Creating JSON API files in:', dbDir);

// Сохраняем данные в JSON файлы
Object.entries(db).forEach(([key, value]) => {
  const filePath = path.join(dbDir, `${key}.json`);
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
  console.log(`✅ Created: ${filePath}`);
  console.log(`   Content:`, JSON.stringify(value, null, 2));
});

console.log('✅ JSON API files created successfully!');
