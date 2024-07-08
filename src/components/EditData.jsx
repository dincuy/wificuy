import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Stack } from "react-bootstrap";
import InputMACAddress from "./InputMACAddress";

function EditData({ show, onHide, dataPelanggan, handleEditData }) {
  const [dataEdited, setDataEdited] = useState({
    nama: "",
    macAddress: "",
  });

  const handleChange = (e) => {
    setDataEdited({ ...dataEdited, nama: e.target.value });
  };

  useEffect(() => {
    if (dataPelanggan.nama) {
      setDataEdited({ ...dataEdited, nama: dataPelanggan.nama });
      console.log("nama ", dataPelanggan.nama);
    }
  }, [dataPelanggan.nama]);

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama Pengguna</Form.Label>
              <Form.Control
                type="text"
                value={dataEdited.nama}
                placeholder="Nama..."
                onChange={handleChange}
              />
            </Form.Group>
            <InputMACAddress
              valueMACForEdit={dataPelanggan.macAddress}
              setDataEdited={setDataEdited}
              dataEdited={dataEdited}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleEditData(e, dataEdited);
              setDataEdited({ nama: "", macAddress: "" });
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditData;
