const Persons = ({ personsToShow, handlePersonDelete }) => {
    return (
        <table>
            <tbody>
                {personsToShow.map(name =>
                    <tr key={name.id}>
                        <td>{name.name} {name.number} <button onClick={() => handlePersonDelete(name)}>delete</button></td>
                    </tr>
                )}
            </tbody>
      </table>
    )
}

export default Persons