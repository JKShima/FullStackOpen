import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },

    hideNotification() {
      return ''
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time*1000)
  }
}

export default notificationSlice.reducer