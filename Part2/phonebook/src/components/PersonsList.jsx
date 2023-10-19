const PersonsList = ({persons}) => {
    return (
      <div>
        {persons.map(props => (
            <div key={props.name}>
                {props.name} {props.number}
            </div>
        ))}
      </div>
    )
  }

export default PersonsList