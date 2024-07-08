import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function TableCustomer() {
  const [dataCustomers, setDataCustomers] = useState([
    {
      _id: "",
      nama: "",
      macAddress: "",
      dibuatPada: "",
    },
  ]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const res = axios.get("https://dincuyappserver.adaptable.app/api/wifi");
        const data = res.data;

        setDataCustomers(data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Alamat MAC</th>
          <th>Dibuat Pada</th>
        </tr>
      </thead>
      <tbody>
        {dataCustomers.map((dc, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{dc.nama}</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableCustomer;
