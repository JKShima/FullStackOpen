import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value}) => (
  <div>
    <p>{text} {value}</p>
  </div>
)

const Statistics = (props) => {
  //console.log('Statistics ', props)
  const total = props.good + props.neutral + props.bad

  if (total == 0){
    return(
      <div>No feedback given.</div>
    )
  }

  return (
    <div>
      <StatisticsLine text = "good" value = {props.good}/>
      <StatisticsLine text = "neutral" value = {props.neutral}/>
      <StatisticsLine text = "bad" value = {props.bad}/>
      <StatisticsLine text = "total" value = {total}/>
      <StatisticsLine text = "average" value = {(props.good*1 + props.neutral*0 + props.bad*(-1))/total}/>
      <StatisticsLine text = "positive" value = {`${(props.good/total)*100} %`}/>
    </div>
  )
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App