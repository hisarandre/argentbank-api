import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("user/login", async ({ username, password }, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      sessionStorage.setItem("token", data.body.token);
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    console.log("Error", e.response.data);
    thunkAPI.rejectWithValue(e.response.data);
  }
});

export const fetchUserBytoken = createAsyncThunk("user/fetchUserByToken", async ({ token }, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    console.log("data", data, response.status);

    if (response.status === 200) {
      return data;
    }
  } catch (e) {
    console.log("Error", e.response.data);
    thunkAPI.rejectWithValue(e.response.data);
  }
});

const initialState = {
  email: "",
  firstname: "",
  lastname: "",
  id: "",
  token: sessionStorage.getItem("token"),
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      return state;
    },

    checkToken: (state) => {
      state.token = sessionStorage.getItem("token");
      return state;
    },

    logout: (state) => {
      sessionStorage.removeItem("token");
      return state;
    },

    reset: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
        state.token = payload.body.token;
        return state;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        console.log("payload", payload);
        state.isError = true;
        state.errorMessage = payload.message;
        return state;
      })
      .addCase(fetchUserBytoken.fulfilled, (state, { payload }) => {
        state.firstname = payload.body.firstName;
        state.lastname = payload.body.lastName;
        state.email = payload.body.email;
        state.id = payload.body.id;
        return state;
      });
  },
});

export const { clearState, checkToken, logout } = userSlice.actions;
export const userSelector = (state) => state.user;
