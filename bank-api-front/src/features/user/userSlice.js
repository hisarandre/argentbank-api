import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../utils/api";

export const loginUser = createAsyncThunk("user/loginUser", async ({ username, password, rememberMe }, thunkAPI) => {
  const user = {
    email: username,
    password: password,
  };

  try {
    const response = await axios.post(`${url}/login`, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (rememberMe) {
      localStorage.setItem("token", response.data.body.token);
    } else {
      sessionStorage.setItem("token", response.data.body.token);
    }
    return response.data.body.token;
  } catch (err) {
    console.log(err.response.data);
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const loadUser = createAsyncThunk("user/loadUser", async ({ token }, thunkAPI) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${url}/profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.log("Error", err.response.data);
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const editUser = createAsyncThunk("user/editUser", async ({ token, firstname, lastname }, thunkAPI) => {
  const user = {
    firstName: firstname,
    lastName: lastname,
  };

  try {
    const response = await axios.put(`${url}/profile`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.log("Error", err.response.data);
    thunkAPI.rejectWithValue(err.response.data);
  }
});

const initialState = {
  token: sessionStorage.getItem("token") || localStorage.getItem("token"),
  email: "",
  firstname: "",
  lastname: "",
  id: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkToken: (state, action) => {
      if (state.token) {
        return state;
      }
    },
    logout: (state, action) => {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        email: "",
        firstname: "",
        lastname: "",
        id: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        //if the token does not exist, return the state
        if (action.payload) {
          return {
            ...state,
            token: action.payload,
            loginStatus: "success",
          };
        } else {
          return state;
        }
      })
      .addCase(loginUser.pending, (state, action) => {
        return { ...state, loginStatus: "pending" };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          ...state,
          loginStatus: "rejected",
          loginError: action.payload.message,
        };
      })
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          firstname: payload.body.firstName,
          lastname: payload.body.lastName,
          email: payload.body.email,
          id: payload.body.id,
          userLoaded: true,
        };
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          firstname: payload.body.firstName,
          lastname: payload.body.lastName,
        };
      });
  },
});

export const { logout, checkToken } = userSlice.actions;
export const userSelector = (state) => state.user;
