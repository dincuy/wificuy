import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Stack } from "react-bootstrap";
import InputMACAddress from "./InputMACAddress";

function EditData({
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama Pengguna</Form.Label>
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
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditData;
