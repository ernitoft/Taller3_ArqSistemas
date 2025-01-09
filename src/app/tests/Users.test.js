import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Users from "../../features/account/Users";
import { Provider } from "react-redux";
import { store } from "../../app/store/store";
import { RouterProvider, BrowserRouter } from "react-router-dom";
import { router, AppRouter } from "../../app/router/Routes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../app/store/store";
import userEvent from "@testing-library/user-event";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const listName = [
  "Maria",
  "Diego",
  "Juan",
  "Pedro",
  "Luis",
  "Carlos",
  "Jorge",
  "Andres",
  "Santiago",
  "Felipe",
  "Camilo",
  "Mateo",
  "Daniel",
  "Alejandro",
  "Sebastian",
  "Nicolas",
  "Samuel",
  "David",
  "Gabriel",
  "Benjamin",
  "Lucas",
  "Emmanuel",
];
const newName = listName[Math.floor(Math.random() * listName.length)];
const emailToFind = "usuario1@example.com";
const editId = "editar-2";
const id = "id-2";
const confirmId = "confirm-2";

async function loginUser() {
  const emailInput = screen.getByLabelText(/correo electrónico/i);
  const passwordInput = screen.getByLabelText(/contraseña/i);
  const submitButton = screen.getByRole("button", { name: /iniciar sesión/i });

  act(() => {
    userEvent.type(emailInput, "admin@parknmove.com");
    userEvent.type(passwordInput, "password");
  });

  fireEvent.click(submitButton);
}

describe("Users", () => {
  test("After logging, should find users table", async () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    );
    await loginUser();

    const name = await screen.findByText(/Nombre/i);
    expect(name).toBeInTheDocument();
    const lastname = await screen.findByText(/Apellido/i);
    expect(lastname).toBeInTheDocument();
    const email = await screen.findByText(/Correo/i);
    expect(email).toBeInTheDocument();
    const role = await screen.findByText(/Prioridad/i);
    expect(role).toBeInTheDocument();
    const actions = await screen.findByText(/Acciones/i);
    expect(actions).toBeInTheDocument();
  });

  test("After logging, should not find users table with incorrect header", async () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    );

    await expect(screen.findByText(/Nombres/i)).rejects.toThrow();
  });

  test("After logging, should not find users table within incorrect timeout", async () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    );

    await expect(
      waitFor(
        () => {
          screen.getAllByText(new RegExp(newName, "i"));
        },
        { timeout: 1 }
      )
    ).rejects.toThrow();
  });

  test("After logging, should not find users with name wrongName", async () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    );

    await expect(screen.findByText(/wrongName/i)).rejects.toThrow();
  });

  test("After logging, should not find users with name Usuario1 within incorrect timeout", async () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    );

    await expect(
      waitFor(
        () => {
          screen.getAllByText(/Usuario2/i);
        },
        { timeout: 1 }
      )
    ).rejects.toThrow();
  });
});
