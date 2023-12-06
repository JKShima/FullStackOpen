/*
const Notification = ({ message, type }) => {
  if (message === null){
    return null
  }

  if (type === 'success'){
    return (
      <div className = 'success'>
        {message}
      </div>
    )
  }

  if (type === 'error'){
    return (
      <div className = 'error'>
        {message}
      </div>
    )
  }
}

export default Notification
*/

import { useNotificationValue } from "../notificationContext"

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const notification = useNotificationValue()

  if (notification === "") return null

  return <div style={style}>{notification}</div>
}

export default Notification
