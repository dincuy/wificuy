import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  InputGroup,
  Modal,
  Stack,
  Table,
} from "react-bootstrap";
import EditData from "./EditData";

function TableCustomer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataCustomers, setDataCustomers] = useState([
    {
      _id: "",
      nama: "",
      macAddress: "",
      dibuatPada: "",
    },
  ]);
  const [dataCustomersFiltered, setDataCustomersFiltered] = useState(null);

  const [dataForEdit, setDataForEdit] = useState({
    _id: "",
    nama: "",
    macAddress: "",
    dibuatPada: "",
  });

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = (modal) => {
    setDataForEdit({
      _id: "",
      nama: "",
      macAddress: "",
      dibuatPada: "",
    });
    if (modal === "edit") {
      setShowEdit(false);
    } else if (modal === "delete") {
      setShowDelete(false);
    }
  };

  // Mencari data
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = dataCustomers.filter((item) =>
      item.nama.toLowerCase().includes(value)
    );

    if (!value) return setDataCustomersFiltered(null);

    setDataCustomersFiltered(filteredData);
  };

  // tampilkan data
  const dataDislpay = dataCustomersFiltered
    ? dataCustomersFiltered
    : dataCustomers;

  // Simpan hasil editan
  const handleSaveEdit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://dincuyappserver.adaptable.app/api/wifi/${dataForEdit._id}`,
        dataForEdit
      )
      .then((response) => {
        setDataCustomers(
          dataCustomers.map((item) =>
            item._id === dataForEdit._id ? { ...item, ...dataForEdit } : item
          )
        );

        setShowEdit(false);
        setDataForEdit({
          _id: "",
          nama: "",
          macAddress: "",
          dibuatPada: "",
        });
      })
      .catch((error) => {
        console.error("There was an error updating the data!", error);
      });
  };

  // Hapus pelanggan wifi
  const handleDeleteOK = () => {
    axios
      .delete(
        `https://dincuyappserver.adaptable.app/api/wifi/${dataForEdit._id}`
      )
      .then((response) => {
        setDataCustomers(
          dataCustomers.filter((item) => item._id !== dataForEdit._id)
        );
        setShowDelete(false);
        setDataForEdit({
          _id: "",
          nama: "",
          macAddress: "",
          dibuatPada: "",
        });
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
      <InputGroup className="mb-3 mx-auto" style={{ maxWidth: "500px" }}>
        <FormControl
          placeholder="Cari..."
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
      <div className="mb-3">
        <Button
          variant="success"
          onClick={() => {
            setDataForEdit(dc);
            setShowEdit(true);
          }}
        >
          Tambah Pelanggan <i class="bi bi-plus-lg"></i>
        </Button>
      </div>
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
          {dataDislpay?.map((dc, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{dc.nama}</td>
              <td>{dc.macAddress}</td>
              <td>{dc.dibuatPada}</td>
              <td>
                <Stack direction="horizontal" gap={2}>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setDataForEdit(dc);
                      setShowEdit(true);
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setDataForEdit(dc);
                      setShowDelete(true);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit data pelanggan wifi */}
      <EditData
        show={showEdit}
        handleClose={handleClose}
        dataForEdit={dataForEdit}
        setDataForEdit={setDataForEdit}
        setDataCustomers={setDataCustomers}
        dataCustomers={dataCustomers}
        handleSaveEdit={handleSaveEdit}
      />

      {/* Delete data pelanggan wifi */}
      <Modal show={showDelete} onHide={() => handleClose("delete")}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Data Pelanggan Wifi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Kamu yakin akan menghapus data pelanggan wifi ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose("delete")}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteOK}>
            Yakin Dong!!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TableCustomer;
