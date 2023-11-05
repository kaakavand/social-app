import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputAdornment, OutlinedInput, useTheme } from "@mui/material";

export default function Delete({ onCLickDelete , social_id}: {onCLickDelete : any , social_id : string}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [confirm, setConfirm] = React.useState("");
  const theme = useTheme();

  const style = {
    position: "absolute" as "absolute",
    backgroundColor: theme.palette.mode === "dark" ? "#202A35" : "#fff",
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
            sx={{
              color: theme.palette.mode === "dark" ? "#fff" : "#212121",
              marginBottom: "15px",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            آیا از تصمیم خود مطمین هستید ؟
          </Typography>
          <Typography
            fontSize={11}
            sx={{
              color: theme.palette.mode === "dark" ? "#fff" : "#212121",
              marginBottom: "10px",
            }}
            id="modal-modal-description"
          >
            برای حذف مسیر ارتباطی " {social_id} " لطفا تایید را بنویسید
          </Typography>
          <OutlinedInput
            autoComplete="off"
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
              onClick={onCLickDelete}
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
