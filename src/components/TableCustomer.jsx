import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputGroup,
  Modal,
  OverlayTrigger,
  Stack,
  Table,
  Tooltip,
} from "react-bootstrap";
import EditDataModal from "./EditDataModal";
import AddDataModal from "./AddDataModal";
import Loading from "./Loading";
import client from ".././sanityClient"; // Import Sanity client

function TableCustomer() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataCustomers, setDataCustomers] = useState([]);
  const [dataCustomersFiltered, setDataCustomersFiltered] = useState(null);
  const [sorteredDataCustomers, setSorteredDataCustomers] = useState([]);

  const [dataForEdit, setDataForEdit] = useState({
    _id: "",
    namaPelanggan: "",
    alamatMacWifi: "",
    _createdAt: "",
  });

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [copied, setCopied] = useState(false);

  // Copy MAC Address
  const handleCopy = (macAddress) => {
    navigator.clipboard.writeText(macAddress);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleClose = (modal) => {
    setDataForEdit({
      _id: "",
      namaPelanggan: "",
      alamatMacWifi: "",
      _createdAt: "",
    });
    if (modal === "edit") {
      setShowEdit(false);
    } else if (modal === "delete") {
      setShowDelete(false);
    } else if (modal === "add") {
      setShowAdd(false);
    }
  };

  // Mencari data
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = dataCustomers.filter((item) =>
      item.namaPelanggan.toLowerCase().includes(value)
    );

    if (!value) return setDataCustomersFiltered(null);

    setDataCustomersFiltered(filteredData);
  };

  const dataDisplay = dataCustomersFiltered || sorteredDataCustomers;

  // Fetch Data
  useEffect(() => {
    setIsLoading(true);
    client
      .fetch(`*[_type == "wifiCustomer"]{_id, namaPelanggan, alamatMacWifi, _createdAt}`)
      .then((data) => {
        setDataCustomers(data);
        setSorteredDataCustomers(data.sort((a, b) => a.namaPelanggan.localeCompare(b.namaPelanggan)));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  // Simpan hasil editan
  const handleSaveEdit = () => {
    setIsLoading(true);
    client
      .patch(dataForEdit._id)
      .set({
        namaPelanggan: dataForEdit.namaPelanggan,
        alamatMacWifi: dataForEdit.alamatMacWifi,
      })
      .commit()
      .then((updatedData) => {
        setDataCustomers((prev) =>
          prev.map((item) => (item._id === updatedData._id ? updatedData : item))
        );
        setSorteredDataCustomers((prev) =>
          prev.sort((a, b) => a.namaPelanggan.localeCompare(b.namaPelanggan))
        );
        setShowEdit(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        setIsLoading(false);
      });
  };

  // Hapus pelanggan wifi
  const handleDeleteOK = () => {
    setIsLoading(true);
    client
      .delete(dataForEdit._id)
      .then(() => {
        setDataCustomers((prev) => prev.filter((item) => item._id !== dataForEdit._id));
        setSorteredDataCustomers((prev) =>
          prev.filter((item) => item._id !== dataForEdit._id)
        );
        setShowDelete(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setIsLoading(false);
      });
  };

  // Tambah Data
  const handleAddData = (dc, callback) => {
    setIsLoading(true);
    client
      .create({
        _type: "wifiCustomer",
        namaPelanggan: dc.namaPelanggan,
        alamatMacWifi: dc.alamatMacWifi,
      })
      .then((newData) => {
        setDataCustomers((prev) => [...prev, newData]);
        setSorteredDataCustomers((prev) =>
          [...prev, newData].sort((a, b) => a.namaPelanggan.localeCompare(b.namaPelanggan))
        );
        setShowAdd(false);
        callback();
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <InputGroup className="mb-3 mx-auto" style={{ maxWidth: "500px" }}>
        <FormControl
          placeholder="Cari nama pelanggan"
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
      <div className="mb-3">
        <Button variant="success" onClick={() => setShowAdd(true)}>
          Tambah Pelanggan <i className="bi bi-plus-lg"></i>
        </Button>
      </div>
      <Table responsive bordered hover size="sm" className="position-relative">
        <thead>
          <tr>
            <th className="text-center">No</th>
            <th>Nama Pelanggan</th>
            <th>Alamat MAC Wifi</th>
            <th>Dibuat Pada</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataDisplay?.map((dc, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td>{dc.namaPelanggan}</td>
              <td onClick={() => handleCopy(dc.alamatMacWifi)} style={{ cursor: "pointer" }}>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <span>
                        {copied ? "Berhasil disalin" : "Klik untuk menyalin"}
                      </span>
                    </Tooltip>
                  }
                >
                  <span>{dc.alamatMacWifi}</span>
                </OverlayTrigger>
              </td>
              <td>{new Date(dc._createdAt).toLocaleDateString()}</td>
              <td>
                <Stack direction="horizontal" gap={2}>
                  <span
                    className="btn-edit-delete blue"
                    onClick={() => {
                      setDataForEdit(dc);
                      setShowEdit(true);
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </span>
                  <span
                    className="btn-edit-delete red"
                    onClick={() => {
                      setDataForEdit(dc);
                      setShowDelete(true);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </span>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddDataModal
        show={showAdd}
        handleClose={handleClose}
        handleAddData={handleAddData}
        dataCustomers={dataCustomers}
      />

      <EditDataModal
        show={showEdit}
        handleClose={handleClose}
        dataForEdit={dataForEdit}
        setDataForEdit={setDataForEdit}
        handleSaveEdit={handleSaveEdit}
      />

      <Modal show={showDelete} onHide={() => handleClose("delete")}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Pelanggan Wifi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Kamu yakin akan menghapus data pelanggan wifi ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose("delete")}>
            Tidak
          </Button>
          <Button variant="primary" onClick={handleDeleteOK}>
            Ya
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TableCustomer;
