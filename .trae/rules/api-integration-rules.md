# API Integration Rules

## Base Setup
- Always create a centralized `services/api.ts` file using `axios` or `fetch` with a configured base instance
- Set `baseURL` from `process.env.EXPO_PUBLIC_API_URL` — never hardcode URLs
- Attach auth tokens via request interceptors, not inline in each call
- Handle 401 responses in a response interceptor — refresh token or redirect to login

## File Structure
```
services/
  api.ts          # base axios instance + interceptors
  auth.service.ts
  user.service.ts
  [feature].service.ts
```

## Service Layer Rules
- Every API call lives in a `services/` file — never call fetch/axios directly inside a component or hook
- Each service function must be typed: define request and response interfaces in `types/api.ts`
- Always return the unwrapped data, not the full axios response

```ts
// ✅ Good
export const getUser = async (id: string): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
};

// ❌ Bad — fetching inside a component
const res = await fetch(`https://api.example.com/users/${id}`);
```

## TanStack Query (React Query)
- Use `useQuery` for all GET requests — never manual `useEffect` + `useState` for fetching
- Use `useMutation` for POST / PUT / DELETE
- Define query keys as constants in `constants/queryKeys.ts`
- Set `staleTime` and `gcTime` explicitly — never rely on defaults for production

```ts
// constants/queryKeys.ts
export const QUERY_KEYS = {
  user: (id: string) => ['user', id],
  posts: ['posts'],
} as const;
```

## Error Handling
- All service functions throw typed errors — create a custom `ApiError` class
- Display user-facing errors via a toast/snackbar, never `console.error` only
- Always handle network errors separately from server errors (check `error.response` vs `error.request`)

## Authentication & Tokens
- Store tokens in `expo-secure-store` only — never AsyncStorage for sensitive data
- Access token goes in `Authorization: Bearer <token>` header
- Implement silent token refresh before expiry using interceptors

## Environment Variables
- Prefix all public env vars with `EXPO_PUBLIC_`
- Keep a `.env.example` file committed to the repo
- Never commit `.env` — add to `.gitignore`
