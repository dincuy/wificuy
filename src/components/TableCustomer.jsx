import React, { useEffect, useState } from "react";
import axios from "axios";
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

function TableCustomer() {
  const [isLoading, setIsLoading] = useState(true);

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
  const [sorteredDataCustomers, setSorteredDataCustomers] = useState([
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

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  // copy paste
  const [copied, setCopied] = useState(false);

  const handleCopy = (macAddress) => {
    navigator.clipboard.writeText(macAddress);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleClose = (modal, callback) => {
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
    } else if (modal === "add") {
      setShowAdd(false);
      callback();
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
    : sorteredDataCustomers;

  // Simpan hasil editan
  const handleSaveEdit = (e) => {
    e.preventDefault();
    // loading true
    setIsLoading(true);
    axios
      .put(
        `${import.meta.env.VITE_API_URL}api/wifi/${dataForEdit._id}`,
        dataForEdit
      )
      .then((response) => {
        const dataUpdated = dataCustomers.map((item) =>
          item._id === dataForEdit._id ? { ...item, ...dataForEdit } : item
        );
        setDataCustomers(dataUpdated);

        // loading false
        setIsLoading(false);
        localStorage.setItem("dataCustomer", JSON.stringify(dataUpdated));

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
        // loading false
        setIsLoading(false);
      });
  };

  // Hapus pelanggan wifi
  const handleDeleteOK = () => {
    setIsLoading(true);
    axios
      .delete(`${import.meta.env.VITE_API_URL}api/wifi/${dataForEdit._id}`)
      .then((response) => {
        const dataUpdated = dataCustomers.filter(
          (item) => item._id !== dataForEdit._id
        );
        setDataCustomers(dataUpdated);
        setIsLoading(false);
        localStorage.setItem("dataCustomer", JSON.stringify(dataUpdated));

        setShowDelete(false);
        setDataForEdit({
          _id: "",
          nama: "",
          macAddress: "",
          dibuatPada: "",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("There was an error deleting the data!", error);
      });
  };

  const handleAddData = (e, dc, callback) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}api/wifi`, dc)
      .then((response) => {
        setDataCustomers([...dataCustomers, response.data]);
        // loading false
        setIsLoading(false);
        setShowAdd(false);
        callback();

        localStorage.setItem(
          "dataCustomer",
          JSON.stringify([...dataCustomers, response.data])
        );
      })
      .catch((error) => {
        alert(error.response.data.message);
        // loading false
        setIsLoading(false);
        console.error("There was an error adding the data!", error);
      });
  };

  useEffect(() => {
    const localData = localStorage.getItem("dataCustomer");
    if (localData) {
      setDataCustomers(JSON.parse(localData));
      setIsLoading(false);
    } else {
      axios
        .get(`${import.meta.env.VITE_API_URL}api/wifi`)
        .then((response) => {
          setDataCustomers(response.data);
          setIsLoading(false);
          localStorage.setItem("dataCustomer", JSON.stringify(response.data));
        })
        .catch((error) => {
          // setError(error);
          // setLoading(false);
        });
    }
  }, []);

  // fungsi mengurutkan data
  const sortDataByName = (data) => {
    return data.sort((a, b) => a.nama.localeCompare(b.nama));
  };

  useEffect(() => {
    setSorteredDataCustomers(sortDataByName(dataCustomers));
  }, [dataCustomers]);

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
        <tbody className="data-tabel">
          {dataDislpay?.map((dc, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td>{dc.nama}</td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => handleCopy(dc.macAddress)}
              >
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
                  <span>{dc.macAddress}</span>
                </OverlayTrigger>
              </td>
              <td>{dc.dibuatPada}</td>
              <td>
                <Stack direction="horizontal" gap={2}>
                  <span
                    className="btn-edit-delete blue"
                    variant="primary"
                    onClick={() => {
                      setDataForEdit(dc);
                      setShowEdit(true);
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </span>
                  <span
                    className="btn-edit-delete red"
                    variant="danger"
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

      {/* Tambah data pelanggan */}
      <AddDataModal
        show={showAdd}
        handleClose={handleClose}
        handleAddData={handleAddData}
      />

      {/* Edit data pelanggan wifi */}
      <EditDataModal
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
          <Modal.Title>Hapus Pelanggan Wifi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Kamu yakin akan menghapus data pelanggan wifi ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose("delete")}>
            Ora
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
