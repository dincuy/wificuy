import React, { useEffect, useState } from "react";
import InputMACAddress from "./InputMACAddress";
import { Button, Form, Modal } from "react-bootstrap";

function AddDataModal({ show, handleClose, handleAddData, dataCustomers }) {
  const [customer, setCustomer] = useState({
    nama: "",
    alamatMacWifi: ":::::",
  });

  const handleChangeNama = (e) => {
    setCustomer({ ...customer, nama: e.target.value });
  };

  const isMacAddressPresent = dataCustomers.some(
    (item) => item.alamatMacWifi === customer.alamatMacWifi
  );

  return (
    <>
      <Modal
        show={show}
        onHide={() =>
          handleClose("add", () => {
            setCustomer({
              nama: "",
              alamatMacWifi: ":::::",
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
            {isMacAddressPresent && <p>mac addres sudah ada</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() =>
              handleClose("add", () => {
                setCustomer({
                  nama: "",
                  alamatMacWifi: ":::::",
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
                  alamatMacWifi: ":::::",
                });
              })
            }
            disabled={
              customer.nama.length < 1 ||
              customer.alamatMacWifi.length < 17 ||
              isMacAddressPresent
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
