const PersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.addName}>
                <div>
                    name: <input value={props.newName} onChange={props.nameChange}/>
                </div>
                <div>
                    number: <input value={props.number} onChange={props.phoneNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm