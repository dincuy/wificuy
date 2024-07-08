import React from "react";
import { Form } from "react-bootstrap";

function InputMACAddress() {
  const [valueBlockMAC, setValueBlockMAC] = useState(["", "", "", "", "", ""]);

  const [valueMAC, setValueMAC] = useState("");

  const handleChangeBlockMAC = (index, e) => {
    setValueBlockMAC(
      valueBlockMAC.map((item, i) => (i === index ? e.target.value : item))
    );
  };

  useEffect(() => {
    setValueMAC(valueBlockMAC.join(":"));
  }, [valueBlockMAC]);

  return (
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
  );
}

export default InputMACAddress;
