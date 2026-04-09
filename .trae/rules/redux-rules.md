# Redux Rules

> **Note**: This project uses Redux Toolkit (RTK) — never plain Redux. If Zustand covers your needs, prefer it. Use Redux when you need advanced middleware, RTK Query, or strong DevTools integration.

## When to Use Redux vs Zustand
| Scenario | Use |
|---|---|
| Simple UI state (modals, toasts) | Zustand |
| Auth state | Zustand |
| Complex server state with caching | RTK Query |
| Multi-step forms with complex validation | Redux Toolkit |
| Need time-travel debugging | Redux Toolkit |

## Setup
```ts
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth.slice';
import { api } from '@/services/rtk-api';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Typed Hooks — Always Use These
```ts
// hooks/redux.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);
```

Never use raw `useDispatch` or `useSelector` — always use typed wrappers.

## Slice Rules
```ts
// store/auth.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
```

- One slice per feature — no giant combined slice files
- All state mutations happen inside `reducers` or `extraReducers` only
- Never mutate state outside of a slice reducer
- Always type `PayloadAction<T>` — never use untyped actions

## RTK Query (preferred over manual thunks)
```ts
// services/rtk-api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    updateUser: builder.mutation<User, Partial<User> & { id: string }>({
      query: ({ id, ...patch }) => ({ url: `/users/${id}`, method: 'PATCH', body: patch }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = api;
```

## Async Thunks (only if RTK Query doesn't fit)
```ts
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginPayload, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (err) {
      return rejectWithValue((err as ApiError).message);
    }
  }
);
```

## Selectors
- Define selectors alongside the slice file
- Use `createSelector` from `reselect` for derived/computed values

```ts
// store/auth.selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = createSelector(
  selectUser,
  (user) => user !== null
);
```
