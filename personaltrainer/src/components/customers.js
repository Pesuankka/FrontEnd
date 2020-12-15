import react, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Customers() {
  const [customers, setCustomers] = useState([]);

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
      <AgGridReact
        rowData={customers}
        columnDefs={colums}
        pagination="true"
        paginationPageSize="10"
      ></AgGridReact>
    </div>
  );
}

export default Customers;
