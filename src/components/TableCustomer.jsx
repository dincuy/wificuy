import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Stack, Table } from "react-bootstrap";
import EditData from "./EditData";

function TableCustomer() {
  const [dataCustomers, setDataCustomers] = useState([
    {
      _id: "",
      nama: "",
      macAddress: "",
      dibuatPada: "",
    },
  ]);

  const [showEditData, setShowEditData] = useState(false);
  const handleShow = () => {
    setShowEditData(true);
  };
  const handleClose = () => {
    setShowEditData(false);
  };

  useEffect(() => {
    axios
      .get("https://dincuyappserver.adaptable.app/api/wifi")
      .then((response) => {
        setDataCustomers(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        // setError(error);
        // setLoading(false);
      });
  }, []);

  return (
    <>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pengguna</th>
            <th>Alamat MAC Wifi</th>
            <th>Dibuat Pada</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataCustomers?.map((dc, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{dc.nama}</td>
              <td>{dc.macAddress}</td>
              <td>{dc.dibuatPada}</td>
              <td>
                <Stack direction="horizontal" gap={2}>
                  <Button variant="primary" onClick={handleShow}>
                  <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="danger" onClick={handleShow}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditData show={showEditData} onHide={handleClose} />
    </>
  );
}

export default TableCustomer;
