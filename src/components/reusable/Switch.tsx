import { styled, Switch } from "@mui/material";

const CustomSwitch = styled(Switch)(() => ({
    width: 46,
    height: 22,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 18,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(24px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(24px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#12B669',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      width: 18,
      height: 18,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    '& .MuiSwitch-track': {
      borderRadius: 13,
      opacity: 1,
      backgroundColor: '#bdbdbd', // Default grey color when not checked
    },
  }));

  export default CustomSwitch;