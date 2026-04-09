# TypeScript Rules

## Compiler Config
```json
// tsconfig.json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

`strict: true` is non-negotiable. Never weaken the config to silence errors — fix the types instead.

## No `any`
```ts
// ❌ Never
const process = (data: any) => {};
const result: any = await fetchData();

// ✅ Use unknown and narrow
const process = (data: unknown) => {
  if (typeof data === 'string') { ... }
};

// ✅ Use generics
const fetchData = async <T>(url: string): Promise<T> => {
  const res = await api.get<T>(url);
  return res.data;
};
```

## Interfaces vs Types
```ts
// Use interface for object shapes (component props, API responses, store state)
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Use type for unions, intersections, primitives, and utility types
type UserId = string;
type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';
type AdminUser = User & { permissions: Permission[] };
type Optional<T> = T | null | undefined;
```

## Enums
```ts
// Use string enums — numeric enums are error-prone
enum UserRole {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Guest = 'GUEST',
}

// Or use const assertions as a lighter alternative
const USER_ROLES = {
  Admin: 'ADMIN',
  Member: 'MEMBER',
  Guest: 'GUEST',
} as const;
type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
```

## Component Props
```tsx
// Always define explicit Props interfaces
interface UserCardProps {
  user: User;
  onPress: (userId: string) => void;
  variant?: 'compact' | 'full';
  testID?: string;          // always include for testing
}

// For children — use React.ReactNode
interface ScreenProps {
  children: React.ReactNode;
  title: string;
}
```

## API Types
```ts
// types/api.types.ts

// Generic wrapper for all API responses
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// Generic wrapper for paginated responses
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

// Custom error class
class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

## Utility Types — Use Built-ins
```ts
// Pick only what you need
type LoginPayload = Pick<User, 'email'> & { password: string };

// Make all fields optional for PATCH
type UpdateUserPayload = Partial<Pick<User, 'name' | 'email' | 'avatarUrl'>>;

// Required fields only
type RequiredUser = Required<User>;

// Read-only
type ImmutableConfig = Readonly<AppConfig>;

// Extract from union
type AdminRole = Extract<UserRole, 'ADMIN'>;
```

## Type Guards
```ts
// Use type guards instead of casting with "as"
const isUser = (value: unknown): value is User => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value
  );
};

// ❌ Never use "as" to force types
const user = data as User;

// ✅ Validate shape with a type guard
if (isUser(data)) {
  console.log(data.email); // TypeScript knows this is User
}
```

## Async Functions
```ts
// Always type the return of async functions explicitly
const getUser = async (id: string): Promise<User> => { ... };
const deleteUser = async (id: string): Promise<void> => { ... };

// Always handle both success and error paths with typed errors
const fetchUser = async (id: string): Promise<User> => {
  try {
    return await userService.getUser(id);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Unexpected error', 500);
  }
};
```

## Navigation Types (Expo Router)
```ts
// types/navigation.types.ts
// Expo Router uses file-based types — import from '.expo/types'
import type { Href } from 'expo-router';

// For dynamic params, create typed helpers
type ProfileParams = { id: string };

// Access in screen
import { useLocalSearchParams } from 'expo-router';
const { id } = useLocalSearchParams<ProfileParams>();
```

## Strict Null Checks
```ts
// Always handle null/undefined explicitly
const user: User | null = getUser();

// ✅ Nullish coalescing
const name = user?.name ?? 'Anonymous';

// ✅ Optional chaining
const avatar = user?.profile?.avatarUrl;

// ❌ Non-null assertion — avoid unless certain
const name = user!.name;
```
