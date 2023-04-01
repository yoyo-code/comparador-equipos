import {useState, useEffect} from 'react';

export function useLocalStorage(key, defaultValue) {
    const [state, setState] = useState(() => {
      let value
      try {
        value = JSON.parse(
          window.localStorage.getItem(key) || JSON.stringify(defaultValue),
        )
      } catch (e) {
        value = defaultValue
      }
      return value
    })
  
    useEffect(
      () => {
        window.localStorage.setItem(key, JSON.stringify(state))
      },
      // eslint-disable-next-line
      [state],
    )
    return [state, setState]
  }

export default useLocalStorage;