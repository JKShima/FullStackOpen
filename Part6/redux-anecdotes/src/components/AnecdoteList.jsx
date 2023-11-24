import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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


  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 10))
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
      )}
    </div>
  )
}

export default AnecdoteList