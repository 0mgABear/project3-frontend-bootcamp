import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import axios from "axios";

export function AddReviewDialog({ user }) {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState();
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState();
  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_API_SERVER}/user?email=${user.email}`)
        .then((res) => setCurrentLoggedInUser(res.data));
    }
  }, [user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      description: description,
      rating: parseFloat(rating).toFixed(2),
      revieweeId: id,
      reviewerId: currentLoggedInUser[0].id,
    };
    if (!description) {
      alert("Please input your description");
      return;
    }
    if (!rating) {
      alert("Please input your rating");
      return;
    }
    e.preventDefault();
    axios.post(
      `${process.env.REACT_APP_API_SERVER}/user/postreview`,
      reviewData
    );
    handleClose();
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
              name="description"
              label="Your Review"
              type="text"
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Typography>
              Leave a rating for {user.firstName} {user.lastName}
            </Typography>
            <Rating
              name="rating"
              precision={0.5}
              onChange={(e) => setRating(parseFloat(e.target.value))}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Review</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
