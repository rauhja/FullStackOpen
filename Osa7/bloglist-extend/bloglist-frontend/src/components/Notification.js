import {Alert} from '@mui/material';
import {useSelector} from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (notification === null) {
    return null;
  }

  return (
    <div>
      <Alert severity={notification.type}>{notification.message}</Alert>
    </div>
  );
};

export default Notification;
