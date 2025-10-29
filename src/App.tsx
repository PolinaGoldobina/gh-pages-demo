import React, { useEffect, useState } from 'react';
import './App.css';

type ResponseData = {
  greeting: string;
};

function App() {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // В development используем локальный сервер, в production - GitHub
        const isDevelopment = process.env.NODE_ENV === 'development';
        const baseUrl = isDevelopment 
          ? 'http://localhost:3001/api'
          : 'https://raw.githubusercontent.com/PolinaGoldibina/gh-pages-demo/gh-pages/static/db';
        
        const url = `${baseUrl}/data.json`;
        console.log('Fetching from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
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
          <div>
            <p style={{ color: 'red' }}>Error: {error}</p>
            <p>Make sure the repository exists and data files are deployed.</p>
          </div>
        )}
        {data && (
          <div>
            <p>Data loaded successfully:</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#61dafb' }}>
              {data.greeting}
            </p>
          </div>
        )}
        
        <div style={{ marginTop: '20px' }}>
          <p>Environment: {process.env.NODE_ENV}</p>
          <p>Homepage: {process.env.PUBLIC_URL}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
