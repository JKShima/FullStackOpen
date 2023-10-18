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

export default Course