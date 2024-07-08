import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Stack, Table } from "react-bootstrap";
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

  const [dataForEdit, setDataForEdit] = useState({
    _id: "",
    nama: "",
    macAddress: "",
    dibuatPada: "",
  });

  const [idForDelete, setIdForDelete] = useState("");

  const [showEditData, setShowEditData] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = () => {
    setDataForEdit({
      _id: "",
      nama: "",
      macAddress: "",
      dibuatPada: "",
    });
    setShowEditData(false);
  };

  const handleShowEditData = (dc) => {
    setDataForEdit(dc);
    setShowEditData(true);
  };

  const handleEditData = (e, dataEdited) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3500/api/wifi/${dataForEdit._id}`, dataEdited)
      .then((response) => {
        setDataCustomers(
          dataCustomers.map((item) =>
            item._id === dataPelanggan._id ? { ...item, ...dataEdited } : item
          )
        );

        setShowEditData(false);
      })
      .catch((error) => {
        console.error("There was an error updating the data!", error);
      });
  };

  const handleShowDelete = (id) => {
    setIdForDelete(id);
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleDeleteDataPelanggan = () => {
    axios
      .delete(`http://localhost:3500/api/wifi/${idForDelete}`)
      .then((response) => {
        setDataCustomers(
          dataCustomers.filter((item) => item._id !== idForDelete)
        );
        setShowDelete(false);
      })
      .catch((error) => {
        console.error("There was an error deleting the data!", error);
      });
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
                  <Button
                    variant="primary"
                    onClick={() => handleShowEditData(dc)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowDelete(dc._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditData
        show={showEditData}
        onHide={handleClose}
        dataPelanggan={dataForEdit}
        setDataCustomers={setDataCustomers}
        dataCustomers={dataCustomers}
        handleEditData={handleEditData}
      />

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Data Pelanggan Wifi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Kamu yakin akan menghapus data pelanggan wifi ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteDataPelanggan}>
            Yakin Dong!!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TableCustomer;
