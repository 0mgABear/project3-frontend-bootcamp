import React, { useState } from "react";
import { FormGroup } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export function FormDialog({ user }) {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Review
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add A Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Leave a review on how your working experience with {user.firstName}{" "}
            {user.lastName} was!
          </DialogContentText>
          <FormGroup>
            <TextField
              autoFocus
              required
              margin="dense"
              id="review"
              name="review"
              label="Your Review"
              type="text"
              variant="standard"
              onChange={handleChange}
            />
            <Typography>
              Leave a rating for {user.firstName} {user.lastName}
            </Typography>
            <Rating
              required
              name="rating"
              defaultValue={2.5}
              precision={0.5}
              onChange={handleChange}
            >
              Test
            </Rating>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add Review</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
