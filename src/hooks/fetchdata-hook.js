import { useState, useEffect, useReducer } from 'react'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      throw new Error()
  }
}

export const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_INIT'})

      try {
        const dataRaw = await fetch(url);

        const result = await dataRaw.json();

        dispatch({type: 'FETCH_SUCCESS', payload: result})
        console.log(result);
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE'})
      }
    };

    fetchData();
  }, [url]);

  // ! state as one, but in component can decontruct
  return [state, setUrl]
}