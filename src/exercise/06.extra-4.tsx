// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm,fetchPokemon,PokemonDataView,PokemonInfoFallback} from '../pokemon'

type tStatus = 'idle'| 'pending' | 'resolved' | 'successful' | 'rejected'

type tPokemonDataSpecial = {
    name: string,
    type: string,
    damage: string
}[]

type tPokemonData = {
    name: string,
    number: number|'XXX',
    image: string,
    attacks: {
        special: tPokemonDataSpecial[],
    },
    fetchedAt: string,
    errMsg: string
}

type tState = {
    status: tStatus,
    pokemonName: string,
    pokemonErr: string,
    pokemonData: tPokemonData | null
}

function PokemonInfo({state,setState}:{state:tState,setState: React.Dispatch<React.SetStateAction<tState>>}) {
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />



    // const [pokemonData,setPokemonData] = React.useState<tPokemonData | null>(null);
    // const [pokemonErr,setPokemonErr] = React.useState<string>('');

    console.log('PokemonInfo',state.pokemonData);

    React.useEffect(() => {

        console.log('PokemonInfo useEffect');

        if(state.pokemonName){
            console.log('PokemonInfo useEffect setPokemonData');
            // setPokemonData(null);
            // setPokemonErr('');

            setState((prevState:tState):tState => {
                return {
                    ...prevState,
                    pokemonData: null,
                    pokemonErr: '',
                }
            })

            fetchPokemon(state.pokemonName)
                .then(data => {
                    // setPokemonData(data);
                    // setStatus('resolved');
                    setState( (prevState):tState => {
                        return {
                            ...prevState,
                            pokemonData: data,
                            status: 'resolved'
                        }
                    })
                })
                .catch(err => {
                    console.log('fetch err',err);
                    // setPokemonData(null);
                    // setPokemonErr(err.message);
                    // setStatus('rejected');
                    setState( (prevState) :tState => {
                        return {
                            ...prevState,
                            pokemonData: null,
                            pokemonErr: err.message,
                            status: 'rejected'
                        }
                    })

                })

        }



    },[state.pokemonName])

  // 💣 remove this

    // if (!pokemonName) {
    //     return <p>"Please select a Pokemon"</p>
    // } else if( pokemonData ){
    //     setStatus('successful');
    //     return <PokemonDataView pokemon={pokemonData}/>
    // } else {
    //     return <PokemonInfoFallback errMsg={pokemonErr} name={pokemonName} />
    // }

    switch(state.status){
        case "idle":
            return <p>"Please select a Pokemon"</p>
        case "resolved":
        case "successful":
            return <PokemonDataView pokemon={state.pokemonData}/>
        case "pending":
        case "rejected":
            return <PokemonInfoFallback errMsg={state.pokemonErr} name={state.pokemonName} />
        }
}

class ErrorBoundaryPokemon extends React.Component<any, any>{

    constructor(props:any){
        super(props);
        this.state = { hasError: false, pokemonName: props.pokemonName };
    }

    static getDerivedStateFromError(error:any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, errorData: error };
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <PokemonInfoFallback errMsg={this.state.errorData.message} name={this.state.pokemonName} />;
        }

        return this.props.children;
    }

}

function App() {
  // const [pokemonName, setPokemonName] = React.useState('');
  // const [status,setStatus] = React.useState<tStatus>('idle');

  const [state,setState] = React.useState<tState>({
      status: "idle",
      pokemonName: '',
      pokemonErr: '',
      pokemonData: null
  })


  function handleSubmit(newPokemonName:string) {
    // setPokemonName(newPokemonName);
    // setStatus('pending');
    setState((prevState)=> {
        return {
            ...prevState,
            status: "pending",
            pokemonName: newPokemonName
        }
    })
  }

  return (

        <div className="pokemon-info-app">
          <pre>{state.status}</pre>
          <PokemonForm pokemonName={state.pokemonName} onSubmit={handleSubmit} />
          <hr />
          <div className="pokemon-info">
              <ErrorBoundaryPokemon pokemonName={state.pokemonName}>
                <PokemonInfo state={state} setState={setState} />
              </ErrorBoundaryPokemon>
          </div>
        </div>

  )
}

export default App
