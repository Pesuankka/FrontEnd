import react, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { IconButton, TextField } from "@material-ui/core";
import moment from "moment";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Training() {
  const [training, setTraining] = useState([]);
  const [input, setInput] = useState("");

  const inputChanged = (event) => {
    setInput(event.target.value);
    console.log(input);
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => setTraining(data.content))
      .catch((err) => console.log(err));
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
    { field: "duration", sortable: true, filter: true, width: 150 },
    { field: "activity", sortable: true, filter: true, width: 150 },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: 400, width: "30%", margin: "auto" }}
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
        rowData={training}
        columnDefs={columsTraining}
        pagination="true"
        paginationPageSize="10"
      ></AgGridReact>
    </div>
  );
}

export default Training;
