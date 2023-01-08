import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
let timeoutID

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            state = action.payload
            return state
        },
        hideNotification(state, action) {
            state = initialState
            return state
        }
    }
})
const { reducer } = notificationSlice
export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        clearTimeout(timeoutID)
        dispatch(showNotification(message))
        timeoutID = setTimeout(() => dispatch(hideNotification()), time)
    }
}
export default reducer