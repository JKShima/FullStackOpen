const PersonsList = ({persons , deletePerson}) => {
    return (
      <div>
        {persons.map(props => (
            <div key={props.name}>
                {props.name} {props.number}
                <button onClick = {() => deletePerson(props)}>
                  delete
                </button>
            </div>
        ))}
      </div>
    )
  }

export default PersonsList