import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    //console.log(state.filter)
    if (state.filter === null) {
      return state.anecdotes.sort((a,b) => b.votes - a.votes)
    }
    return state.anecdotes.filter((anecdote) => 
      anecdote.content.toLowerCase()
      .includes(state.filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  })


  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
      )}
    </div>
  )
}

export default AnecdoteList