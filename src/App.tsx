import React from "react";
import { SimpleTable } from "./SimpleTable";
import { makeData, Person } from "./makeData";

const columns = [
  { accessor: "id", Header: "ID" },
  { accessor: "name", Header: "Name" },
  { accessor: "billingAddress", Header: "Billing Address" },
  { accessor: "phoneNumber", Header: "Phone Number" },
  { accessor: "email", Header: "Email" },
];

function App() {
  const data: Person[] = makeData(100); // Generate 10 rows of data

  return (
    <div className="App">
      <SimpleTable columns={columns} data={data} />
    </div>
  );
}

export default App;
