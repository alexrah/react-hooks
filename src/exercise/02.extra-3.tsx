// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useLocalStorageGeneric} from "../hooks/useLocalStorageGeneric";

type greetingVal =
    {
      nickname: string,
      surname: string
    }


function Greeting({ initialVal  }:{initialVal:greetingVal[]}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('names') ?? initialVal

  const [names, setNames] = useLocalStorageGeneric<greetingVal>('names',initialVal)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `names` in localStorage.
  // 💰 window.localStorage.setItem('names', names)

  console.log(`window.localStorage.getItem('names')`,window.localStorage.getItem('names'));


  function handleChange(event:React.FormEvent<HTMLButtonElement>) {
    console.log('handleChange')
    event.preventDefault();
    names.pop();
    setNames([...names]);
  }

  const showLocalStorage = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    (document.querySelector('.local-storage-debug > p')! as HTMLParagraphElement).textContent = JSON.stringify(window.localStorage.getItem('names'));
  }

  

  return (
    <div>
      {names.map(name => (
          <div key={name.nickname}>
            <h5>{name.nickname}</h5>
            <h4>{name.surname}</h4>
          </div>
      ))}
      <form>
        <button onClick={handleChange}>Remove item</button>
        <button onClick={showLocalStorage}>Show Current localStorage</button>
      </form>
      <div className="local-storage-debug">
        <h5>Current Storage:</h5>
        <p></p>
      </div>
    </div>
  )
}

function App() {

  const initVal:greetingVal[] = [
    {
      nickname: "Foo",
      surname: "Bar"
    },
    {
      nickname: "John",
      surname: "Doe"
    },
    {
      nickname: "Gibson",
      surname: "Brown"
    },

  ]

  return <Greeting initialVal={initVal} />
}

export default App
