import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FitnessCenter from "@material-ui/icons/FitnessCenter";
import moment from "moment";

function AddTraining(props) {
  const [newTraining, setNewTraining] = useState({
    activity: "",
    date: moment().toISOString(true),
    duration: "",
    customer: props.params.data.links[1].href,
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(newTraining);
    handleClose();
  };

  const inputChanged = (event) => {
    setNewTraining({
      ...newTraining,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div>
        <Button
          size="medium"
          onClick={handleClickOpen}
          startIcon={<FitnessCenter />}
        ></Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new training!</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Activity"
            name="activity"
            value={newTraining.activity}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Date"
            name="date"
            value={newTraining.date}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Duration"
            name="duration"
            value={newTraining.duration}
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

export default AddTraining;
