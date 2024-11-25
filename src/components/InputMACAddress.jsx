import React, { useEffect, useState } from "react";
import { Form, Stack } from "react-bootstrap";

function InputMACAddress({ setDataForEdit, dataForEdit }) {
  const [valueBlockMAC, setValueBlockMAC] = useState(["", "", "", "", "", ""]);

  const [valueMAC, setValueMAC] = useState("");

  const handleChangeBlockMAC = (index, e) => {
    setValueBlockMAC(
      valueBlockMAC.map((item, i) => (i === index ? e.target.value : item))
    );
  };

  // menangani copy paste
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    setValueBlockMAC(pasteData.split(":"));
  };

  useEffect(() => {
    setValueMAC(valueBlockMAC.join(":"));
    setDataForEdit({ ...dataForEdit, alamatMacWifi: valueBlockMAC.join(":") });
  }, [valueBlockMAC]);

  useEffect(() => {
    setValueBlockMAC(dataForEdit.alamatMacWifi.split(":"));
  }, []);

  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Alamat MAC Wifi</Form.Label>
      <Stack direction="horizontal" gap={2} className="my-2">
        {valueBlockMAC.map((d, i) => (
          <React.Fragment key={i}>
            <Form.Control
              name={`value${i}`}
              type="text"
              className="text-center"
              maxLength="2"
              value={valueBlockMAC[i]}
              onChange={(e) => handleChangeBlockMAC(i, e)}
              onPaste={handlePaste}
            />
            {i < 5 && <span>:</span>}
          </React.Fragment>
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
  );
}

export default InputMACAddress;
