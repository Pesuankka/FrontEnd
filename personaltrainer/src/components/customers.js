import react, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { IconButton, TextField } from "@material-ui/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [input, setInput] = useState("");

  const inputChanged = (event) => {
    setInput(event.target.value);
    console.log(input);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.log(err));
    console.log(customers);
  };

  const colums = [
    { field: "firstname", sortable: true, filter: true, width: 150 },
    { field: "lastname", sortable: true, filter: true, width: 150 },
    { field: "streetaddress", sortable: true, filter: true, width: 150 },
    { field: "postcode", sortable: true, filter: true, width: 150 },
    { field: "city", sortable: true, filter: true, width: 150 },
    { field: "email", sortable: true, filter: true, width: 150 },
    { field: "phone", sortable: true, filter: true, width: 150 },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: 400, width: "55%", margin: "auto" }}
    >
        <TextField
        style={{ marginTop: 10, marginRight: "80%", marginBottom: 15 }}
        color="primary"
        type="text"
        placeholder="Search"
        onInput={inputChanged}
      ></TextField>
      <AgGridReact
        quickFilterText={input}
        rowData={customers}
        columnDefs={colums}
        pagination="true"
        paginationPageSize="10"
      ></AgGridReact>
    </div>
  );
}

export default Customers;
