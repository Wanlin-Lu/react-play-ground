import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { useDataApi } from './hooks/fetchdata-hook'

function App() {
  const [query, setQuery] = useState('redux')
  const [
    { data, isLoading, isError }, //! deconstruction state
    doFetch,
  ] = useDataApi("https://hn.algolia.com/api/v1/search?query=redux", { hits: [] });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {/* !form onSubmit to enable "ENTER" key. */}
      <form
        onSubmit={e => {
          doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`)

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
