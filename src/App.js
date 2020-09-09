import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState({ hits: [] })
  const [query, setQuery] = useState('redux')
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  
  useEffect(() => {
    async function fetchData() {
      const dataRaw = await fetch(url);

      const result = await dataRaw.json();

      setData(result);
      console.log(result);
    }

    fetchData()
  },[url])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          onClick={() =>
            setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
          }
        >
          Search
        </button>
      </div>
      <ul>
        {data.hits.map((i) => (
          <li key={i.objectID}>
            <a href={i.url}>{i.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
