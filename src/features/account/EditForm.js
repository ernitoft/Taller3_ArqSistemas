import React, { useState } from "react";
import agent from "../../app/api/agent";
import {
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Controller, useForm } from "react-hook-form";

/**
 * Este componente se encarga de mostrar un formulario para editar los datos de un estacionamiento.
 * @returns Un formulario para editar los datos de un estacionamiento.
 */

const EditForm = ({ parking, onClose }) => {
  const { control, handleSubmit, setError } = useForm({ mode: "onTouched" });

  const [parkings] = useState(parking);

  const handleSubmitButton = (data) => {
    if (data["Pisos"] > 10) {
      setError("Pisos", {
        type: "manual",
        message: "La cantidad de pisos no debe ser mayor a 10.",
      });
      return;
    }

    if (
      !/^[0-9]+$/.test(data["Pisos"]) ||
      !/^[0-9]+$/.test(data["Estacionamientos por piso"]) ||
      !/^[0-9]+$/.test(data["Precio Base"])
    ) {
      setError("Pisos", {
        type: "manual",
        message: "Solo se pueden ingresar números",
      });
      setError("Estacionamientos por piso", {
        type: "manual",
        message: "Solo se pueden ingresar números",
      });
      setError("Precio Base", {
        type: "manual",
        message: "Solo se pueden ingresar números",
      });
      return;
    }

    if (data["Estacionamientos por piso"] > 20) {
      setError("Estacionamientos por piso", {
        type: "manual",
        message:
          "La cantidad de estacionamientos por piso no debe ser mayor a 20.",
      });
      return;
    }

    if (data["Pisos"] <= 0 || data["Estacionamientos por piso"] <= 0) {
      setError("Pisos", {
        type: "manual",
        message: "No se permiten valores negativos.",
      });
      setError("Estacionamientos por piso", {
        type: "manual",
        message: "No se permiten valores negativos.",
      });
      return;
    }

    if (data["Precio Base"] <= 0) {
      setError("Precio Base", {
        type: "manual",
        message: "El precio base no puede ser negativo o cero.",
      });
      return;
    }
    parkings.base_price = data["Precio Base"];
    parkings.floor_count = data["Pisos"];
    parkings.places_per_floor = data["Estacionamientos por piso"];
    try {
      agent.EditParking.editParking(parkings);
      onClose();
    } catch (error) {}
  };

  return (
    <Paper elevation={3} sx={{ p: 4, border: "2px" }}>
      <Typography
        variant="h3"
        fontSize={25}
        fontWeight={550}
        sx={{ textAlign: "center", mb: 2 }}
      >
        Editar estacionamientos
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitButton)} sx={{ mt: 4 }}>
        <Controller
          name="Pisos"
          control={control}
          defaultValue={parkings ? parkings.floor_count : ""}
          render={({ field, fieldState }) => (
            <TextField
              margin="dense"
              fullWidth
              label="Cantidad de pisos"
              autoFocus
              error={Boolean(fieldState.error)}
              helperText={fieldState.error ? fieldState.error.message : null}
              {...field}
              sx={{ mb: 2 }}
            />
          )}
        />

        <Controller
          name="Estacionamientos por piso"
          control={control}
          defaultValue={parkings ? parkings.places_per_floor : ""}
          render={({ field, fieldState }) => (
            <TextField
              margin="dense"
              fullWidth
              label="Cantidad de estacionamientos"
              autoFocus
              error={Boolean(fieldState.error)}
              helperText={fieldState.error ? fieldState.error.message : null}
              {...field}
              sx={{ mb: 2 }}
            />
          )}
        />

        <Controller
          name="Precio Base"
          control={control}
          defaultValue={parkings ? parkings.base_price : ""}
          render={({ field, fieldState }) => (
            <TextField
              margin="dense"
              fullWidth
              label="Precio base"
              autoComplete="current-password"
              error={Boolean(fieldState.error)}
              helperText={fieldState.error ? fieldState.error.message : null}
              {...field}
            />
          )}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Button
            color="error"
            type="button"
            onClick={() => {
              onClose();
            }}
          >
            Cancelar
          </Button>
          <Button color="success" type="submit">
            Guardar cambios
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>
      </form>
    </Paper>
  );
};

export default EditForm;
