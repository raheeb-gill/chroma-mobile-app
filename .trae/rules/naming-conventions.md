# Naming Conventions

## Files & Folders
| Item | Convention | Example |
|---|---|---|
| Route screen file | `kebab-case.tsx` | `user-profile.tsx` |
| Component file | `PascalCase.tsx` | `UserCard.tsx` |
| Hook file | `camelCase.ts` | `useUserProfile.ts` |
| Service file | `camelCase.service.ts` | `auth.service.ts` |
| Store file | `camelCase.store.ts` | `auth.store.ts` |
| Type file | `camelCase.types.ts` | `user.types.ts` |
| Utility file | `camelCase.ts` | `formatDate.ts` |
| Constant file | `SCREAMING_SNAKE_CASE.ts` | `QUERY_KEYS.ts` |
| Test file | `ComponentName.test.tsx` | `UserCard.test.tsx` |
| Folder (features) | `camelCase/` | `userProfile/` |
| Folder (routes/groups) | `(kebab-case)/` | `(auth)/` |

## Variables & Functions
```ts
// Variables — camelCase
const userName = 'John';
const isLoading = true;

// Constants — SCREAMING_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_TIMEOUT_MS = 5000;

// Functions — camelCase, verb-first
const fetchUser = async () => {};
const handlePress = () => {};
const formatCurrency = (amount: number) => {};

// Boolean variables — prefix with is/has/can/should
const isAuthenticated = false;
const hasPermission = true;
const canEdit = false;
const shouldRefetch = true;
```

## Components
```tsx
// PascalCase — always
const UserCard = () => {};
const PrimaryButton = () => {};

// Props interface — ComponentNameProps
interface UserCardProps { ... }
interface PrimaryButtonProps { ... }

// Style objects — camelCase keys
const styles = StyleSheet.create({
  container: {},
  headerText: {},
  avatarImage: {},
});
```

## Hooks
```ts
// Always prefix with "use"
const useAuth = () => {};
const useUserProfile = (id: string) => {};
const useDebounce = <T>(value: T, delay: number) => {};
```

## TypeScript Types & Interfaces
```ts
// Interfaces — PascalCase, no "I" prefix
interface User { ... }
interface ApiResponse<T> { ... }

// Types — PascalCase
type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';
type UserId = string;

// Enums — PascalCase name, PascalCase or SCREAMING members
enum UserRole {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Guest = 'GUEST',
}

// Generic type params — single uppercase letter or descriptive PascalCase
type ApiResponse<T> = { data: T; status: number };
type Dictionary<TValue> = Record<string, TValue>;
```

## Zustand Stores
```ts
// Store interface — describe the state shape
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  // Actions — verb-first
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}
```

## Event Handlers
```tsx
// Always prefix with "handle" for internal handlers
const handlePress = () => {};
const handleChangeText = (text: string) => {};
const handleSubmit = async () => {};

// Props that accept handlers — prefix with "on"
interface ButtonProps {
  onPress: () => void;
  onLongPress?: () => void;
}
```

## Query Keys
```ts
// Tuple format, noun-first, specific-to-general
export const QUERY_KEYS = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  userPosts: (id: string) => ['users', id, 'posts'] as const,
};
```
