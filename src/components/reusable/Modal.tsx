import { Modal, Backdrop, Fade, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { closeModal, openModal } from "../../redux/UI/UISlice";
import classes from "./resuable.module.css";
import { type CustomModalProps } from "../../types";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

export default function CustomModal({
  buttonText,
  children,
}: CustomModalProps) {
  const isOpen = useAppSelector((state) => state.ui.isModalOpen);
  const dispatch = useAppDispatch();
  const handleOpen = () => dispatch(openModal());
  const handleClose = () => dispatch(closeModal());
  useEffect(() => {
    handleClose()
  }, [])
  return (
    <div className={classes["modal"]}>
      <Button
        onClick={handleOpen}
        className={classes["button"]}
        sx={{
          backgroundColor: "var(--primary-theme-color)",
          color: "var(--secondary-theme-color)",
        }}
      >
        {buttonText}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <div className={classes["modal-content-container"]}>
            <div className={classes["modal-dismiss-container"]}>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            {children}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
