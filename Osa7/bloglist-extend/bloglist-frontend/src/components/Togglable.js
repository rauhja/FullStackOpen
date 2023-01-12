import {useState, useImperativeHandle, forwardRef} from 'react';
import {Button, Box} from '@mui/material';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = {display: visible ? 'none' : ''};
  const showWhenVisible = {display: visible ? '' : 'none'};

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Box sx={{'& button': {m: 1}}}>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          color="primary"
          margin="normal"
          size="small"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </Box>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
