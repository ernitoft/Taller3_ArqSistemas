import * as React from "react";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import EditForm from "./EditForm";

import agent from "../../app/api/agent";

import Navbar from "../../app/layout/Navbar";

/**
 * @description
 * Este componente muestra una tabla de estacionamientos disponibles y que se pueden editar.
 * @returns {React.Component}
 */

const Parkings = () => {
  const [Parkings, setParkings] = React.useState([]);
  const [editModal, setEditModal] = React.useState(false);
  const [selectedParking, setSelectedParking] = React.useState(null);

  const handleCloseEditModal = () => {
    setEditModal(false);
  };

  const handleEdit = (parking) => {
    setSelectedParking(parking);
    setEditModal(true);
  };

  const getParkings = async () => {
    agent.GetParkings.getParkings().then((response) => {
      setParkings(response.parkings);
    });
  };

  React.useEffect(() => {
    getParkings();
  }, []);

  return (
    <>
      <Navbar />

      <TableContainer component={Paper} sx={{ mt: 10 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#d8ebe5" }}>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Dirección</TableCell>
              <TableCell align="right">Precio base</TableCell>
              <TableCell align="right">Cantidad de pisos</TableCell>
              <TableCell align="right">Espacios por piso</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Parkings.map((parking) => (
              <TableRow
                key={parking.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {parking.name}
                </TableCell>
                <TableCell align="right">{parking.address}</TableCell>
                <TableCell align="right">{parking.base_price}</TableCell>
                <TableCell align="right">{parking.floor_count}</TableCell>
                <TableCell align="right">{parking.places_per_floor}</TableCell>
                <TableCell href="#admin" align="right">
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleEdit(parking)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editModal} onClose={handleCloseEditModal}>
        <EditForm parking={selectedParking} onClose={handleCloseEditModal} />
      </Dialog>
    </>
  );
};

export default Parkings;
