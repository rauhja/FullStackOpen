import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state =>
        state.filter
        ? state.anecdotes.filter(anecdote => 
            anecdote.content
                .toLowerCase()
                .includes(state.filter.toLowerCase())).sort((a,b) => b.votes - a.votes)
        : state.anecdotes
        )

    const handleVote = (anecdote) => {
      dispatch(increaseVote(anecdote.id))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
    }

    return [...anecdotes].sort((a,b) => b.votes - a.votes)
        .map(anecdote => (
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
            </div>
        ))
}

export default AnecdoteList