import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // В production берем данные из GitHub
        const url = 'https://raw.githubusercontent.com/PolinaGoldibina/gh-pages-demo/gh-pages/static/db/data.json';
        
        console.log('🔄 Загружаем данные из:', url);
        
        const response = await fetch(url);
        
        if (response.ok) {
          const result = await response.json();
          setData(result.greeting);
          console.log('✅ Данные загружены:', result);
        } else {
          throw new Error(`Ошибка ${response.status}`);
        }
      } catch (error) {
        console.log('❌ Ошибка загрузки, используем fallback');
        setData('🎉 УРА! React приложение работает на GitHub Pages!');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Pages Demo</h1>
        <p>Добро пожаловать в мое React приложение!</p>
        
        {loading ? (
          <p>🔄 Загрузка...</p>
        ) : (
          <div style={{
            background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
            padding: '30px',
            borderRadius: '15px',
            margin: '20px 0',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            <p style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              {data}
            </p>
          </div>
        )}
        
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#2c3e50',
          borderRadius: '10px',
          textAlign: 'left'
        }}>
          <h3>📊 Информация:</h3>
          <p><strong>Окружение:</strong> {process.env.NODE_ENV}</p>
          <p><strong>Домашняя страница:</strong> {process.env.PUBLIC_URL}</p>
          <p><strong>Репозиторий:</strong> PolinaGoldibina/gh-pages-demo</p>
          <p><strong>Статус:</strong> ✅ РАБОТАЕТ</p>
        </div>
      </header>
    </div>
  );
}

export default App;
