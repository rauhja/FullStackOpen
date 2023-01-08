import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from "react-redux";

const Filter = () => {
    const dispatch = useDispatch()
    
    const handleFilterChange = (event) => {
        event.preventDefault()
        dispatch(filterChange(event.target.value))
    }
    const style = {
        marginBottom: 10
    }
    return (
        <div style={style}>
            filter <input onChange={handleFilterChange} />
        </div>
    )
}

export default Filter