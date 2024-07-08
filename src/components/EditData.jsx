import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Stack } from "react-bootstrap";

function EditData({ show, onHide }) {
  const [valueBlockMAC, setValueBlockMAC] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [valueMAC, setValueMAC] = useState("")

  const handleChangeBlockMAC = (index, e) => {
    setValueBlockMAC(
      valueBlockMAC.map((item, i) => (i === index ? e.target.value : item))
    );
  };

  useEffect(() => {
    setValueMAC(valueBlockMAC.join(":"))
  }, [valueBlockMAC])

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
              <Form.Control type="text" placeholder="Nama..." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Alamat MAC Wifi</Form.Label>
              <Stack direction="horizontal" gap={2} className="my-2">
                {valueBlockMAC.map((d, i) => (
                  <>
                    <Form.Control
                      name={`value${i}`}
                      type="text"
                      className="text-center"
                      maxLength="2"
                      value={valueBlockMAC[i]}
                      onChange={(e) => handleChangeBlockMAC(i, e)}
                    />
                    {i < 5 && <span>:</span>}
                  </>
                ))}
              </Stack>
              <Form.Control
                type="text"
                placeholder="Nama..."
                value={valueMAC}
                // onChange={handleChangeInputMAC}
                disabled
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={onHide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditData;
