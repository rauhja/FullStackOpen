import { useState } from 'react'

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Title = ({text}) => <h1>{text}</h1>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const copyVotes = [...votes]
  const [best, setBest] = useState(0)

  const handleVoteClick = () => {
    copyVotes[selected] += 1
    setVotes(copyVotes)
    if (copyVotes[selected] > copyVotes[best]) {
      setBest(selected)
    }
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVoteClick} text='Vote'/>
      <Button handleClick={() => setSelected(Math.floor(Math.random()*anecdotes.length))} text="next anecdote" />
      <Title text="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[best]} votes={votes[best]} />
    </div>
  )
}

export default App