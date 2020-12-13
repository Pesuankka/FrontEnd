import react, { useState, useEffect } from "react";
import AddCar from './AddCar'
import EditCar from './EditCar'
import { AgGridReact } from "ag-grid-react";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AutoWidthCalculator } from "ag-grid-community";

function CarList() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCars();
  }, []);

  const handleOpen = () => {
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false)
  }

  const getCars = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.log(err));
  };

  const deleteCar = (params) => {
      if (window.confirm('Are you sure?')) {
        fetch(params.value, {
            method: 'DELETE'
        })
        .then(_ => getCars())
        .then(_ => handleOpen())
        .catch(err => console.log(err))
        }
  }

  const addCar = (newCar) => {
    fetch("https://carstockrest.herokuapp.com/cars", {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(newCar)
    })
    .then(response => getCars())
    .catch(err => console.error(err))
  }

  const updateCar = (link, car) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(car)
    })
    .then(response => getCars())
    .catch(err => console.error(err))
  }

  const colums = [
    { field: "brand", sortable: true, filter: true, width: 150},
    { field: "model", sortable: true, filter: true},
    { field: "color", sortable: true, filter: true, width: 100 },
    { field: "fuel", sortable: true, filter: true, width: 100 },
    { field: "year", sortable: true, filter: true, width: 100 },
    { field: "price", sortable: true, filter: true, width: 100 },
     {
      headerName: '',
      field: '_links.self.href',
      width: 60,
      cellRendererFramework: params => 
        <EditCar updateCar={updateCar} params={params}/>
    },
    {
        headerName: '',
        field: '_links.self.href',
        width: 110,
        cellRendererFramework: params => 
        <IconButton color='secondary' onClick={() => deleteCar(params)}>
          <DeleteIcon fontSize='small'></DeleteIcon >
        </IconButton>
    }
  ];

  return (
      <div>
        <AddCar addCar={addCar}></AddCar>
        <div
        className="ag-theme-material"
        style={{ height: 400, width: "55%", margin: "auto" }}
        >
        <AgGridReact
            rowData={cars}
            columnDefs={colums}
            pagination="true"
            paginationPageSize="10"
        ></AgGridReact>
        </div>
        <Snackbar open={open} onClose={handleClose} autoHideDuration={2500} message='Car deleted successfully!'></Snackbar>
    </div>
  );
}

export default CarList;
