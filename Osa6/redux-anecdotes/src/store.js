import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { appendAnecdote } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer,
    }
})

anecdoteService.getAll().then(notes =>
    notes.forEach(anecdote => {
        store.dispatch(appendAnecdote(anecdote))
    })
)

export default store