import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState({ hits: [] })
  
  useEffect(() => {
    async function fetchData() {
      const dataRaw = await fetch(
        "https://hn.algolia.com/api/v1/search?query=redux"
      );

      const result = await dataRaw.json();

      setData(result);
      console.log(result);
    }

    fetchData()
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <ul>
        {data.hits.map(i => (
          <li key={i.objectID}>
            <a href={i.url}>{i.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
