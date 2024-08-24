import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./Modal.css";

function ModalData({ open, handleClose, errorMessage }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <Typography component="h5" className="modal-title">
          Oops!
        </Typography>
        <Typography id="modal-description" className="modal-description">
          {errorMessage}
        </Typography>
      </Box>
    </Modal>
  );
}
export default ModalData;
