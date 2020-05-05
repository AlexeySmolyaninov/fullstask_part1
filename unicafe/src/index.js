import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayHeader = ({text}) => (<div><h1>{text}</h1></div>)

const Button = ({clickHandler, text}) => {
  return (
  <button onClick={clickHandler}>{text}</button>
  )
}

const Statistics = ({stats, text}) => {
  let allVotes = 0
  let average = 0
  let positive = 0

  allVotes = stats.reduce((firstEl, secondEl) => firstEl + secondEl, 0)

  if(allVotes === 0) {
    return (
      <div>
        <h1>{text}</h1>
        <p>No feedback given</p>
      </div>
    )
  } else{
    average = stats.map((el, i) => {
      if(i === 0){
        return el * 1
      } else if(i === 2){
        return el * -1
      }
      return el * 0
    }).reduce((fEl, sEl) => fEl + sEl, 0) / allVotes

    positive = stats[0] / allVotes * 100
  }
   
  
  return (
    <div>
      <h1>{text}</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={stats[0]}/>
          <StatisticLine text='neutral' value={stats[1]}/>
          <StatisticLine text='bad' value={stats[2]}/>
          <StatisticLine text='all' value={allVotes}/>
          <StatisticLine text='average' value={average}/>
          <StatisticLine text='positive' value={positive}/>
        </tbody>       
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  if(text === 'positive'){
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}

const App = () => {
  //save clicks for each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlerClickOnGood = () => setGood(good + 1)
  const handlerClickOnNeutral = () => setNeutral(neutral + 1)
  const handlerClickOnBad = () => setBad(bad + 1)

  return(
    <div>
      <DisplayHeader text={'give feedback'}/>
      <Button clickHandler={handlerClickOnGood} text='good' />
      <Button clickHandler={handlerClickOnNeutral} text='neutral' />
      <Button clickHandler={handlerClickOnBad} text='bad' /> 
      <Statistics stats={[good, neutral, bad]} text='statistics'/>   
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)