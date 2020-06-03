import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

export default function UpdateUser(props) {
   
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(true);
    const [user, setUser] = useState();
    


 /* useEffect(() => {
    setToken(this.props.token);
    setUserId(this.props.userId);
      console.log(token);
      console.log(userId);
      
    axios
      .get(`http://localhost:8080/user/get/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((responseArr) => {
        setUser(responseArr.data);
      });
  }, []);*/

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update</DialogTitle>
        <DialogContent>
          <DialogContentText>hhg</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
