import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Stack } from "react-bootstrap";
import InputMACAddress from "./InputMACAddress";

function EditDataModal({
  show,
  handleClose,
  dataForEdit,
  setDataForEdit,
  handleSaveEdit,
}) {
  const handleChangeNama = (e) => {
    setDataForEdit({ ...dataForEdit, nama: e.target.value });
  };

  return (
    <>
      <Modal show={show} onHide={() => handleClose("edit")}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pelanggan Wifi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama Pelanggan</Form.Label>
              <Form.Control
                type="text"
                value={dataForEdit.nama}
                placeholder="Nama..."
                onChange={handleChangeNama}
              />
            </Form.Group>
            <InputMACAddress
              setDataForEdit={setDataForEdit}
              dataForEdit={dataForEdit}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose("edit")}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Sipp lahhh!!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditDataModal;
