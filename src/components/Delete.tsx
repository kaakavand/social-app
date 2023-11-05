import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputAdornment, OutlinedInput } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  backgroundColor: "#202A35",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  //   bgcolor: "background.paper",
  borderRadius: 3,
  //   border: "2px solid #000",
  //   boxShadow: 24,
  p: 2,
};

export default function Delete({ onCLick }: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [confirm, setConfirm] = React.useState("");

  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<DeleteIcon sx={{ fontSize: 10 }} />}
        color="error"
        size="small"
        variant="text"
      >
        حذف
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            fontSize={14}
            sx={{ color: "#fff", marginBottom: "15px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            آیا از تصمیم خود مطمین هستید ؟
          </Typography>
          <Typography
            fontSize={11}
            sx={{ color: "#fff", marginBottom: "10px" }}
            id="modal-modal-description"
          >
            برای حذف مسیر ارتباطی لطفاتایید را بنویسید
          </Typography>
          <OutlinedInput
            size="small"
            sx={{ width: "100%", marginBottom: "10px" }}
            color="warning"
            placeholder="تایید"
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            onChange={({ target }) => setConfirm(target.value)}
            inputProps={{
              "aria-label": "weight",
            }}
          />
          <div style={{ textAlign: "left" }}>
            <Button
              color="warning"
              size="small"
              variant="text"
              onClick={() => setOpen(false)}
            >
              انصراف
            </Button>
            <Button
              color="error"
              size="small"
              variant="text"
              onClick={onCLick}
              disabled={confirm !== "تایید"}
            >
              حذف
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
