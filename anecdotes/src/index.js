import React, { useState } from 'react'
import ReactDom from 'react-dom'

const Button = ({handleClickEvent, text}) => <button onClick={handleClickEvent}>{text}</button>

const DisplayAnecdote = ({anecdote, votes, text}) => {
  return (
    <>
      
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotse] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0});
  const [topAnecdote, setTopAnecdote] = useState(0)

  const pickRandomAnecdote = () => {
    const randomNum = Math.round(Math.random() * 5)
    console.log(randomNum)
    setSelected(randomNum)
  }

  const voteForAnecdote = () => {
    const copyOfVotes = {...votes}
    copyOfVotes[selected] += 1

    let indexOfTopAnecdote = 0
    let maxvotes = 0
    for(let i = 0; i < 6; i++) {
      const value = copyOfVotes[i]
      if(maxvotes < value) {
        indexOfTopAnecdote = i
        maxvotes = value
      }
    }

    setTopAnecdote(indexOfTopAnecdote)
    setVotse(copyOfVotes)
    
  }

  return(
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote anecdote={props.anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClickEvent={voteForAnecdote} text='vote'/>
      <Button handleClickEvent={pickRandomAnecdote} text='next anecdote'/>
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote anecdote={props.anecdotes[topAnecdote]} votes={votes[topAnecdote]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDom.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)