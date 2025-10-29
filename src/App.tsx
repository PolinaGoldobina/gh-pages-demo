import React, { useEffect, useState } from 'react';
import './App.css';

interface ResponseData {
  greeting: string;
}

function App() {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const isDevelopment = process.env.NODE_ENV === 'development';
        let url: string;
        
        if (isDevelopment) {
          // Development - локальный сервер
          url = 'http://localhost:3001/api/data';
        } else {
          // Production - GitHub raw content
          url = 'https://raw.githubusercontent.com/PolinaGoldibina/gh-pages-demo/gh-pages/static/db/data.json';
        }
        
        console.log('Fetching from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          // Если 404, возможно файлы еще не задеплоены
          if (response.status === 404) {
            throw new Error('Data file not found. It might not be deployed yet.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result: ResponseData = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        
        // Fallback данные если не удалось загрузить
        setData({ greeting: "Hello from React! (Fallback data)" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Pages Demo</h1>
        <p>Welcome to my React app deployed on GitHub Pages!</p>
        
        {loading && <p>Loading data...</p>}
        
        {error && (
          <div style={{ background: '#ff4444', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
            <p style={{ color: 'white', fontWeight: 'bold' }}>Error: {error}</p>
            <p style={{ color: 'white' }}>This is normal for the first deployment. Data files will be available after deployment.</p>
          </div>
        )}
        
        {data && (
          <div style={{ background: '#4CAF50', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
            <p style={{ fontSize: '20px', marginBottom: '10px' }}>✅ Data loaded successfully:</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>
              {data.greeting}
            </p>
          </div>
        )}
        
        <div style={{ marginTop: '30px', padding: '15px', background: '#333', borderRadius: '5px' }}>
          <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
          <p><strong>Homepage:</strong> {process.env.PUBLIC_URL}</p>
          <p><strong>Repository:</strong> <a href="https://github.com/PolinaGoldibina/gh-pages-demo" style={{ color: '#61dafb' }}>PolinaGoldibina/gh-pages-demo</a></p>
        </div>
      </header>
    </div>
  );
}

export default App;
