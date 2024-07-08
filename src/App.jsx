import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Container, Stack, Table } from "react-bootstrap";
import TableCustomer from "./components/TableCustomer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <Stack className="pt-3">
        <h1 className="text-center">Pelanggan Wifi</h1>
        <TableCustomer />
      </Stack>
    </Container>
  );
}

export default App;
