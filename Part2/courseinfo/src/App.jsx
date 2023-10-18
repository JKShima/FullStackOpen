const Header = ({name}) => {
  //console.log(props)
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = ({name, exercises}) => {
  //console.log(props)
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Content = (props) => {
  //console.log(props)

  // Map different parts
  const parts = props.parts.map(part =>
    <Part key = {part.id} name={part.name} exercises={part.exercises}/>)
  return (
    <div>
      {parts}
    </div>
  )
}

const Course = (props) => {
    return (
      <div>
        <Header name = {props.course.name}/>
        <Content parts = {props.course.parts}/>
      </div>
    )
  }

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App