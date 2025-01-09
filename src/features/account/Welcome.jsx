import * as React from "react";
import { Button, Typography, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { selectName, selectLastname } from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./userSlice";

const Welcome = () => {
  const name = useSelector(selectName);
  const lastname = useSelector(selectLastname);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        background: "linear-gradient(to bottom, #d4fcdf, #10B981)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">
          Bienvenido {name} {lastname}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </Box>
    </Grid>
  );
};

export default Welcome;
