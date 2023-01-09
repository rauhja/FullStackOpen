import { filterChange } from '../reducers/filterReducer'
import { connect } from "react-redux";

const Filter = (props) => {
    const handleFilterChange = (event) => {
        event.preventDefault()
        props.filterChange(event.target.value)
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
const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}
const mapDispatchToProps = {
    filterChange
}
const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter