# State Management Rules

## State Hierarchy — Choose the Right Tool
```
Local state (useState)
  ↓ if shared between sibling components
Lifted state (parent useState)
  ↓ if shared across unrelated components
Zustand store
  ↓ if it's server data that needs caching
TanStack Query (server state)
  ↓ if it's complex with middleware needs
Redux Toolkit
```

**Default choice: Zustand + TanStack Query. Only add Redux if justified.**

## Local State Rules
- Use `useState` for: form inputs, toggles, local UI state (open/closed, focused)
- Use `useReducer` when local state has multiple sub-values that change together

```ts
// ✅ useReducer for complex local state
const [state, dispatch] = useReducer(formReducer, initialFormState);

// ✅ useState for simple toggles
const [isOpen, setIsOpen] = useState(false);
```

## Zustand Rules
- One store per feature domain — `auth.store.ts`, `ui.store.ts`, `cart.store.ts`
- Always use the slice pattern for large stores
- Keep stores flat — avoid deeply nested state objects
- Actions live inside the store definition — never dispatch from outside

```ts
// store/auth.store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }), // only persist user, not actions
    }
  )
);
```

- Use `partialize` to control what gets persisted — never persist the entire store
- For sensitive data (tokens), use `expo-secure-store` separately — not Zustand persist

## TanStack Query Rules
- Every server data fetch uses `useQuery` — no `useEffect` + `fetch` combos
- Every mutation uses `useMutation` with `onSuccess` invalidating related queries
- Define query keys as constants — never inline strings

```ts
// hooks/useUser.ts
export const useUser = (id: string) =>
  useQuery({
    queryKey: QUERY_KEYS.user(id),
    queryFn: () => userService.getUser(id),
    staleTime: 5 * 60 * 1000,   // 5 minutes
    gcTime: 10 * 60 * 1000,     // 10 minutes
    enabled: !!id,              // don't fetch if no id
  });

// hooks/useUpdateUser.ts
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.updateUser,
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user(updatedUser.id) });
    },
  });
};
```

## Separation of Concerns
- Server state → TanStack Query (never stored in Zustand)
- Client/UI state → Zustand or useState
- Never sync TanStack Query results into Zustand manually

```ts
// ❌ Bad — duplicating server state in Zustand
const { data } = useQuery(...);
useEffect(() => { useUserStore.setUser(data); }, [data]);

// ✅ Good — consume directly from the query
const { data: user, isLoading } = useUser(id);
```

## Context API
- Use React Context only for: theme, locale, auth session (read-only, changes rarely)
- Never use Context for frequently changing state — it causes excessive re-renders
- Wrap the provider at the layout level, not the root screen level

## Derived State
- Never store derived values in state — compute them inline or with `useMemo`

```ts
// ❌ Bad
const [fullName, setFullName] = useState(`${firstName} ${lastName}`);

// ✅ Good
const fullName = `${firstName} ${lastName}`;
// or if expensive:
const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);
```
