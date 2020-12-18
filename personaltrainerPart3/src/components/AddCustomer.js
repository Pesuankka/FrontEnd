import React, { useState } from "react";
import { Button } from "evergreen-ui";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function AddCustomer(props) {
  const [newCustomer, setNewCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const [open, setOpen] = useState(false);

  //Add Customers below

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addCustomer(newCustomer);
    handleClose();
  };

  const inputChanged = (event) => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div style={{ paddingTop: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <Button
            variant="outlined"
            appearance="primary"
            intent="success"
            onClick={handleClickOpen}
          >
            <h2 style={{ color: "#f3f3f3" }}>New Customer</h2>
          </Button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            name="firstname"
            value={newCustomer.firstname}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="lastname"
            value={newCustomer.lastname}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Street Adress"
            name="streetaddress"
            value={newCustomer.streetaddress}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Postcode"
            name="postcode"
            value={newCustomer.postcode}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="City"
            name="city"
            value={newCustomer.city}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={newCustomer.email}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={newCustomer.phone}
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

export default AddCustomer;
