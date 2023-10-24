const Filter = ({filter, onChange}) => {
    return (
        <p>
            Find countries
            <input value={filter} onChange={onChange}/>
        </p>
    )
}

export default Filter