const Header = ({name}) => {
  //console.log(props)
  return (
    <div>
      <h2>{name}</h2>
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
  const partsMap = props.parts.map(part =>
    <Part key = {part.id} name={part.name} exercises={part.exercises}/>)
  return (
    <div>
      {partsMap}
    </div>
  )
}

const Total = (props) => {
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  //console.log(totalExercises)

  return (
    <div>
      <p>Total of {totalExercises} exercises</p>
    </div>
  )
}

const Course = (props) => {
    return (
      <div>
        <h1>Web Development Curriculum</h1>
        <Header name = {props.course.name}/>
        <Content parts = {props.course.parts}/>
        <Total parts = {props.course.parts}/>
      </div>
    )
  }

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }
  ]

  const courseMap = courses.map(course =>
    <Course key = {course.id} course={course}/>)

  return (
    <div>
      {courseMap}
    </div>
  )
}

export default App