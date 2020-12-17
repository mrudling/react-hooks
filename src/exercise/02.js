// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function getNameFromLocalStorage() {
  const data = window.localStorage.getItem('data')
  return JSON.parse(data)
}

function useLocalStorageState(initialData) {
  console.log(initialData)
  const [data, setData] = React.useState(
    () => getNameFromLocalStorage() || initialData,
  )
  React.useEffect(() => {
    window.localStorage.setItem('data', JSON.stringify(data))
  }, [data])

  return [data, setData]
}

function Greeting({initialName = ''}) {
  const [data, setData] = useLocalStorageState({name: initialName})
  const {name} = data

  function handleChange(event) {
    setData({name: event.target.value})
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Bob" />
}

export default App
