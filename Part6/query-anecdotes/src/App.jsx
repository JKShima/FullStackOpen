import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './services/requests'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }


  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })


  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
