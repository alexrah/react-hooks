// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import useLocalStorageString from "../hooks/useLocalStorageString";

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName

  const [name, setName] = useLocalStorageString('name',initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  console.log(`window.localStorage.getItem('name')`,window.localStorage.getItem('name'));


  function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
    console.log('handleChange')
    setName(event.target.value)
  }

  const showLocalStorage = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    (document.querySelector('.local-storage-debug > p')! as HTMLParagraphElement).textContent = JSON.stringify(window.localStorage.getItem('name'));
  }

  
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
        <button onClick={showLocalStorage}>Show Current localStorage</button>
      </form>
      <div className="local-storage-debug">
        <h5>Current Storage:</h5>
        <p></p>
      </div>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting  />
}

export default App
