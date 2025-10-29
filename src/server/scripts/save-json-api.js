const fs = require('node-fs');

// Создаем данные для production
const db = {
  data: { greeting: "Hello from GitHub Pages! 🚀" }
};

// Создаем папку для данных
fs.mkdirSync('./build/static/db', { recursive: true });

// Сохраняем данные в JSON файлы
for (let [key, value] of Object.entries(db)) {
  fs.writeFileSync(
    `./build/static/db/${key}.json`,
    JSON.stringify(value, null, 2),
    (err) => {
      if (err) throw err;
    }
  );
  console.log(`Created ./build/static/db/${key}.json`);
}

console.log('JSON API files created successfully!');
