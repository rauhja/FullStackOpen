import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state =>
        state.filter
        ? state.anecdotes.filter(anecdote => 
            anecdote.content
                .toLowerCase()
                .includes(state.filter.toLowerCase()))
        : state.anecdotes
    )
    
    const handleVote = (anecdote) => {
      dispatch(vote(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
    return (
        <div>
            {sortedAnecdotes.map(anecdote => 
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

export default AnecdoteList