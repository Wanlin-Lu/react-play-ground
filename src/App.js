import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState({ hits: [] })
  const [query, setQuery] = useState('redux')
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const dataRaw = await fetch(url);

        const result = await dataRaw.json();

        setData(result);
        console.log(result);
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false);
    }

    fetchData()
  },[url])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {/* !form onSubmit to enable "ENTER" key. */}
      <form
        onSubmit={e => {
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)

          //! stop broser reload on submit
          e.preventDefault()
        }
        }
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((i) => (
            <li key={i.objectID}>
              <a href={i.url}>{i.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
