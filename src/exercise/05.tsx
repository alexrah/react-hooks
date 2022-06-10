// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt, {HTMLVanillaTiltElement} from 'vanilla-tilt'
// import '../lib/logger';

function Tilt({children}:{children:JSX.Element}) {
  // 🐨 create a ref here with React.useRef()

    const tiltRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(()=>{
        console.log('React.useEffect mount');
        if(tiltRef.current === null){
            return
        }

        // const {current: tiltNode} = tiltRef
        const tiltNode = tiltRef.current

        VanillaTilt.init((tiltNode),{
            speed: 400,
            max: 25,
            glare: true,
            'max-glare': 0.5
        });
        return () => {
            console.log('React.useEffect unmount');
            if(tiltNode === null){
                return
            }
            ((tiltNode as unknown) ! as HTMLVanillaTiltElement).vanillaTilt.destroy();
        }
    },[])

  // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  // div look fancy.
  // 💰 like this:
  // const tiltNode = tiltRef.current
  // VanillaTilt.init(tiltNode, {
  //   max: 25,
  //   speed: 400,
  //   glare: true,
  //   'max-glare': 0.5,
  // })
  //
  // 💰 Don't forget to return a cleanup function. VanillaTilt.init will add an
  // object to your DOM node to cleanup:
  // `return () => tiltNode.vanillaTilt.destroy()`
  //
  // 💰 Don't forget to specify your effect's dependencies array! In our case
  // we know that the tilt node will never change, so make it `[]`. Ask me about
  // this for a more in depth explanation.

  // 🐨 add the `ref` prop to the `tilt-root` div here:
  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
