import React, { useState } from "react";
import InputMACAddress from "./InputMACAddress";
import { Button, Form, Modal } from "react-bootstrap";

function AddDataModal({ show, handleClose, handleAddData }) {
  const [customer, setCustomer] = useState({
    nama: "",
    macAddress: ":::::",
  });

  const handleChangeNama = (e) => {
    setCustomer({ ...customer, nama: e.target.value });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() =>
          handleClose("add", () => {
            setCustomer({
              nama: "",
              macAddress: ":::::",
            });
          })
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pelanggan WIfi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama Pelanggan</Form.Label>
              <Form.Control
                type="text"
                value={customer.nama}
                placeholder="Nama..."
                onChange={handleChangeNama}
              />
            </Form.Group>
            <InputMACAddress
              setDataForEdit={setCustomer}
              dataForEdit={customer}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() =>
              handleClose("add", () => {
                setCustomer({
                  nama: "",
                  macAddress: ":::::",
                });
              })
            }
          >
            Nggak jadi ahh
          </Button>
          <Button
            variant="primary"
            onClick={(e) =>
              handleAddData(e, customer, () => {
                setCustomer({
                  nama: "",
                  macAddress: ":::::",
                });
              })
            }
            disabled={
              customer.nama.length < 1 || customer.macAddress.length < 17
            }
          >
            Yoi broo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddDataModal;
