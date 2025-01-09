import * as React from "react";
import {
  Button,
  TextField,
  Typography,
  IconButton,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Controller, useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../account/userSlice";
import { selectPriority } from "../account/userSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../auth/assets/icon.png";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#10B981",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const Login = () => {
  const { control, handleSubmit, reset } = useForm({ mode: "onTouched" });
  const [showPassword, setShowPassword] = React.useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const priority = useSelector(selectPriority);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitButton = (data) => {
    const email = data.email?.toString() ?? "";
    const password = data.password?.toString() ?? "";
    if (email === "" && password === "") {
      let errorDefault = "Debe completar todos los campos.";
      toast.error(errorDefault, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (email === "") {
      let errorDefault = "Debe completar el campo usuario.";
      toast.error(errorDefault, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (password === "") {
      let errorDefault = "Debe completar el campo contraseña.";
      toast.error(errorDefault, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("El email no es válido.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    agent.Login.login(data.email, data.password)
      .then((response) => {
        dispatch(login(response.token));
        if (priority === 0) {
          dispatch(logout());
          let errorMessage = "No tiene permisos para acceder.";
          toast.error(errorMessage, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        } else {
          navigate("/main/users");
        }
      })
      .catch((error) => {
        let errorMessage = "Ha ocurrido un error. Intente nuevamente.";
        if (error.response.data.errors.includes("El usuario no existe.")) {
          errorMessage = "Usuario o contraseña incorrectos.";
        }
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          reset({ email: "", password: "" });
        }, 300);
      })
      .finally(() => {});
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          background: "linear-gradient(to bottom, #9fe0cb, #10B981)",
        }}
      >
        <Container>
          <Container component="main" maxWidth="xs">
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="logo" width={256} height={200} />
              <Typography
                component="h1"
                variant="h5"
                fontSize={35}
                fontWeight={550}
                fontFamily={"roboto"}
                mt={3}
                textAlign={"center"}
              >
                Panel 
              </Typography>
              <Typography
                component="h1"
                variant="h5"
                fontSize={20}
                fontWeight={550}
                fontFamily={"roboto"}
                mt={2}
              >
                Inicia Sesión
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(handleSubmitButton)}
                noValidate
                sx={{ mt: 1 }}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Correo electrónico"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Contraseña"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar sesión
                </Button>
              </Box>
            </Paper>
          </Container>
        </Container>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
