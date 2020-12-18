import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function EditCustomer(props) {
  const [editCustomer, setEditCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setEditCustomer({
      firstname: props.params.data.firstname,
      lastname: props.params.data.lastname,
      streetaddress: props.params.data.streetaddress,
      postcode: props.params.data.postcode,
      city: props.params.data.city,
      email: props.params.data.email,
      phone: props.params.data.phone,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateCustomer(props.params.value, editCustomer);
    handleClose();
  };

  const inputChanged = (event) => {
    setEditCustomer({
      ...editCustomer,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Button
        size="medium"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<EditIcon />}
      ></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Edit customer </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            name="firstname"
            value={editCustomer.firstname}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="lastname"
            value={editCustomer.lastname}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Street Adress"
            name="streetaddress"
            value={editCustomer.streetaddress}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Postcode"
            name="postcode"
            value={editCustomer.postcode}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="City"
            name="city"
            value={editCustomer.city}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={editCustomer.email}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={editCustomer.phone}
            onChange={inputChanged}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default EditCustomer;
