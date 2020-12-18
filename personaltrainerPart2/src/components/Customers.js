import react, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import EditCustomer from "./EditCustomer";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Snackbar from "@material-ui/core/Snackbar";
import { IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function Customers(props) {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const inputChanged = (event) => {
    setInput(event.target.value);
    console.log(input);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //DELETE CUSTOMERS
  const deleteCustomer = (params) => {
    if (window.confirm("Are you sure?")) {
      fetch(params.value, {
        method: "DELETE",
      })
        .then((_) => getCustomers())
        .then((_) => handleOpen())
        .catch((err) => console.log(err));
      console.log(params);
    }
  };

  // GET CUSTOMERS
  const getCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.log(err));
  };

  // ADD CUSTOMERS
  const addCustomer = (newCustomer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => getCustomers())
      .catch((err) => console.error(err));
    console.log(newCustomer);
  };

  // EDIT CUSTOMERS
  const updateCustomer = (link, editCustomer) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(editCustomer),
    })
      .then((response) => getCustomers())
      .catch((err) => console.error(err));
  };

  //ADD TRAINING TO CUSTOMER

  const addTraining = (newTraining) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(newTraining),
    })
      .then((response) => props.getTrainings())
      .catch((err) => console.error(err));
    console.log(newTraining);
  };

  const colums = [
    { field: "firstname", sortable: true, filter: true, width: 150 },
    { field: "lastname", sortable: true, filter: true, width: 150 },
    { field: "streetaddress", sortable: true, filter: true, width: 150 },
    { field: "postcode", sortable: true, filter: true, width: 150 },
    { field: "city", sortable: true, filter: true, width: 150 },
    { field: "email", sortable: true, filter: true, width: 150 },
    { field: "phone", sortable: true, filter: true, width: 150 },
    {
      headerName: "Edit",
      field: "links.0.href",
      width: 100,
      cellRendererFramework: (params) => (
        <EditCustomer updateCustomer={updateCustomer} params={params} />
      ),
    },
    {
      headerName: "Add Training",
      field: "links.2.href",
      width: 130,
      cellRendererFramework: (params) => (
        <AddTraining addTraining={addTraining} params={params}></AddTraining>
      ),
    },
    {
      headerName: "Delete",
      field: "links.0.href",
      width: 100,
      cellRendererFramework: (params) => (
        <IconButton color="secondary" onClick={() => deleteCustomer(params)}>
          <DeleteIcon fontSize="small"></DeleteIcon>
        </IconButton>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: 400, width: "75%", margin: "auto" }}
    >
      <AddCustomer addCustomer={addCustomer}></AddCustomer>
      <TextField
        style={{ marginTop: 10, marginRight: "85%", marginBottom: 15 }}
        color="primary"
        type="text"
        placeholder="Search"
        onInput={inputChanged}
      ></TextField>
      <AgGridReact
        rowData={customers}
        quickFilterText={input}
        columnDefs={colums}
        pagination="true"
        paginationPageSize="10"
      ></AgGridReact>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2500}
        message="Customer deleted succesfully!"
      ></Snackbar>
    </div>
  );
}

export default Customers;
