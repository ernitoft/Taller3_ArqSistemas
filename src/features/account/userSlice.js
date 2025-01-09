import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  id: null,
  name: null,
  lastname: null,
  email: null,
  priority: null,
  token: null,
};

/**
 * @param {object} state
 * @param {object} action
 * @returns {void}
 * @description
 * Esta función se encarga de guardar los datos del usuario en el store.
 * @see jwtDecode
 */

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const payload = jwtDecode(action.payload);
      state.id = payload.id;
      state.name = payload.name;
      state.lastname = payload.lastname;
      state.email = payload.email;
      state.priority = payload.priority;
      state.token = action.payload;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.lastname = null;
      state.email = null;
      state.token = null;
      state.priority = null;
    },
  },
});

export const selectToken = (state) => state.user.token;
export const selectId = (state) => state.user.id;
export const selectName = (state) => state.user.name;
export const selectLastname = (state) => state.user.lastname;
export const selectEmail = (state) => state.user.email;
export const selectPriority = (state) => state.user.priority;

export const { login, logout } = userSlice.actions;
