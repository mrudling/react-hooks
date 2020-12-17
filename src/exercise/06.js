// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonForm,
} from '../pokemon'
// import ErrorBoundary from './ErrorBoundary'
import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  const [{error, pokemon, status}, setState] = React.useState({
    error: null,
    pokemon: null,
    status: pokemonName ? 'pending' : 'idle',
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending'})
    async function fetchData() {
      try {
        const pokemon = await fetchPokemon(pokemonName)
        setState({status: 'resolved', pokemon})
      } catch (err) {
        setState({status: 'rejected', error: err})
      }
    }
    fetchData()
  }, [pokemonName])

  if (status === 'rejected') {
    throw error
  }

  if (status === 'idle') {
    return 'Submit a pokemon'
  }

  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }

  // status is resolved
  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          key={pokemonName}
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
