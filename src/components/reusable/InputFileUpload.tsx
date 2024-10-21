import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import classes from './resuable.module.css';
import { type InputFileUploadProps } from '../../types';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});



export default function InputFileUpload({multiple = false, onchangeInput, text}: InputFileUploadProps) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      className={classes['button']}
    >
      {text}
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => {
          const files = event.target.files;
          onchangeInput(files ? files : null);
        }}
        multiple={multiple}
      />
    </Button>
  );
}
