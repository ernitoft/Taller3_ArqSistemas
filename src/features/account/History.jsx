import * as React from "react";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Navbar from "../../app/layout/Navbar";
import agent from "../../app/api/agent";

const pages = ["Usuarios", "Estacionamientos", "Reportes"];

/**
 * @description
 * Este componente muestra el reporte de estacionamiento.
 * @returns {React.Component}
 */

const History = () => {
  const [reservations, setReservations] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [address, setAddress] = React.useState("");

  const getReservations = async () => {
    try {
      agent.GetReservations.getReservations().then((response) => {
        setReservations(response.history);
      });
    } catch (error) {}
  };

  React.useEffect(() => {
    getReservations();
  }, []);

  return (
    <>
      <Navbar />
      <TableContainer component={Paper} sx={{ mt: 10 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#d8ebe5" }}>
            <TableRow>
              <TableCell>Nombre Usuario</TableCell>
              <TableCell align="right">Direccion</TableCell>
              <TableCell align="right">Fecha de entrada</TableCell>
              <TableCell align="right">Hora de entrada</TableCell>
              <TableCell align="right">Hora de salida</TableCell>
              <TableCell align="right">Precio total</TableCell>
              <TableCell align="right">Tarifa por disponibilidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow
                key={reservation.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {reservation.userName + " " + reservation.userLastName}
                </TableCell>
                <TableCell align="right">
                  {reservation.parkingAddress}
                </TableCell>
                <TableCell align="right">
                  {new Date(reservation.entry_time).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  {new Date(reservation.entry_time).toLocaleTimeString()}
                </TableCell>
                <TableCell align="right">
                  {new Date(reservation.exit_time).toLocaleTimeString()}
                </TableCell>
                <TableCell align="right">{reservation.total_price}</TableCell>
                <TableCell align="right">{reservation.extra_fee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default History;
