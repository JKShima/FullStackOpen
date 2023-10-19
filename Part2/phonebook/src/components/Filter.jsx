const Filter = ({filter, onChange}) => {
    return (
        <p>
            Filter shown with <input value={filter} onChange={onChange}/>
        </p>
    )
}

export default Filter