import react, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";

function Training() {
  const [training, setTraining] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);


  const inputChanged = (event) => {
    setInput(event.target.value);
    //console.log(input);
  };


  //DELTE TRAININGS

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getTrainingInfomations();
  }, []);

  //DELETE CUSTOMERS
  const deleteTraining = (params) => {
    if (window.confirm("Are you sure?")) {
      fetch(
        "https://customerrest.herokuapp.com/api/trainings/" + params.data.id,
        {
          method: "DELETE",
        }
      )
        .then((_) => getTrainingInfomations())
        .then((_) => handleOpen())
        .catch((err) => console.log(err));
    }
  };

  //GET TRAINING INFO
  const getTrainingInfomations = (getTrainingNames) => {
    fetch("https://customerrest.herokuapp.com/gettrainings", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(getTrainingNames),
    })
      .then((response) => response.json())
      .then((data) => setTraining(data))
      .catch((err) => console.log(err));
    console.log(training);
  };

  const columsTraining = [
    {
      sortable: true,
      filter: true,
      width: 150,
      headerName: "Date",
      field: "date",
      width: 120,
      cellRendererFramework: (element) =>
        moment(element.value).format("DD/MM/YYYY"),
    },
    { field: "duration", sortable: true, filter: true, width: 110 },
    { field: "activity", sortable: true, filter: true, width: 130 },
    {
      sortable: true,
      filter: true,
      headerName: "First Name",
      field: "customer.firstname",
      width: 130,
    },
    {
      sortable: true,
      filter: true,
      headerName: "Last Name",
      field: "customer.lastname",
      width: 130,
    },
    {
      headerName: "Delete",
      field: "links.0.href",
      width: 100,
      cellRendererFramework: (params) => (
        <IconButton color="secondary" onClick={() => deleteTraining(params)}>
          <DeleteIcon fontSize="small"></DeleteIcon>
        </IconButton>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: 400, width: "40%", margin: "auto", marginTop: 50 }}
    >
       <div className='training'>Trainings</div>
      <TextField
        style={{ marginTop: 10, marginRight: "75%", marginBottom: 15 }}
        color="primary"
        type="text"
        placeholder="Search"
        onInput={inputChanged}
      ></TextField>
      <AgGridReact
        quickFilterText={input}
        rowData={training}
        columnDefs={columsTraining}
        pagination="true"
        paginationPageSize="10"
      ></AgGridReact>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2500}
        message="Training deleted succesfully!"
      ></Snackbar>
    </div>
  );
}

export default Training;
