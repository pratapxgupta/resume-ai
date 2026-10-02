import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getMe, login, logout, register } from "../services/auth.api";

const message = (error, fallback) => error.response?.data?.message || fallback;

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMe();
      return data.user;
    } catch (error) {
      return rejectWithValue(message(error, "No active session."));
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials);
      return data.user;
    } catch (error) {
      return rejectWithValue(
        message(error, "Unable to log in. Please try again."),
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (details, { rejectWithValue }) => {
    try {
      const data = await register(details);
      return data.user;
    } catch (error) {
      return rejectWithValue(
        message(error, "Unable to create your account. Please try again."),
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
    } catch (error) {
      return rejectWithValue(
        message(error, "Unable to log out. Please try again."),
      );
    }
  },
);

const initialState = {
  user: null,
  status: "idle",
  sessionInitialized: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.sessionInitialized = true;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.sessionInitialized = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          restoreSession.pending,
          loginUser.pending,
          registerUser.pending,
          logoutUser.pending,
        ),
        (state) => {
          state.status = "loading";
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          restoreSession.fulfilled,
          loginUser.fulfilled,
          registerUser.fulfilled,
          logoutUser.fulfilled,
        ),
        (state) => {
          state.status = "succeeded";
        },
      )
      .addMatcher(
        isAnyOf(loginUser.rejected, registerUser.rejected, logoutUser.rejected),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || action.error.message;
        },
      )
      .addMatcher(isAnyOf(restoreSession.rejected), (state) => {
        state.status = "idle";
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
